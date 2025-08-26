package com.infantjesus.controller;

import com.infantjesus.dto.AdminLoginDto;
import com.infantjesus.dto.AdminRegistrationDto;
import com.infantjesus.dto.AdminCreationDto;
import com.infantjesus.security.JwtUtil;
import com.infantjesus.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AdminService adminService;
    
    /**
     * Bootstrap super admin (idempotent): creates or updates the super admin
     * with the fixed credentials requested. Exposed to allow first-time setup.
     */
    @PostMapping("/bootstrap-super-admin")
    public ResponseEntity<Map<String, Object>> bootstrapSuperAdmin() {
        Map<String, Object> result = adminService.bootstrapSuperAdmin(
            "visithrand@gmail.com","visithran@123","superadmin"
        );
        return (Boolean) result.get("success") ? ResponseEntity.ok(result) : ResponseEntity.badRequest().body(result);
    }

    /**
     * Admin registration (regular) — will still be inaccessible to portal unless SUPER_ADMIN grants access.
     */
    @PostMapping("/register")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> register(@RequestBody AdminRegistrationDto registrationDto) {
        Map<String, Object> result = adminService.registerAdmin(registrationDto);
        return (Boolean) result.get("success") ? ResponseEntity.ok(result) : ResponseEntity.badRequest().body(result);
    }
    
    /**
     * Admin login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AdminLoginDto loginDto) {
        Map<String, Object> authResult = adminService.authenticateAdmin(loginDto);
        
        if ((Boolean) authResult.get("success")) {
            try {
                // Generate JWT token
                final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getUsername());
                final String jwt = jwtUtil.generateToken(userDetails.getUsername());
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("token", jwt);
                response.put("message", "Login successful");
                response.put("username", authResult.get("username"));
                response.put("email", authResult.get("email"));
                response.put("role", authResult.get("role"));
                
                return ResponseEntity.ok(response);
                
            } catch (Exception e) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Token generation failed: " + e.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
        } else {
            return ResponseEntity.badRequest().body(authResult);
        }
    }

    /**
     * Create another admin (SUPER_ADMIN only)
     */
    @PostMapping("/create")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> createAdmin(@RequestBody AdminCreationDto dto) {
        Map<String, Object> result = adminService.createAdmin(dto);
        return (Boolean) result.get("success") ? ResponseEntity.ok(result) : ResponseEntity.badRequest().body(result);
    }
    
    /**
     * Validate token endpoint
     */
    @GetMapping("/validate")
    public ResponseEntity<Map<String, String>> validateToken(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            // Extract username from token
            String username = jwtUtil.extractUsername(token);
            
            // Validate token
            if (jwtUtil.validateToken(token, username)) {
                Map<String, String> response = new HashMap<>();
                response.put("valid", "true");
                response.put("username", username);
                adminService.findByUsername(username).ifPresent(a -> response.put("role", a.getRole() != null ? a.getRole().name() : ""));
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("valid", "false");
                response.put("error", "Invalid token");
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("valid", "false");
            response.put("error", "Token validation failed");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
