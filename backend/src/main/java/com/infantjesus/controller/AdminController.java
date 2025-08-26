package com.infantjesus.controller;

import com.infantjesus.dto.AdminLoginDto;
import com.infantjesus.dto.AdminRegistrationDto;
import com.infantjesus.security.JwtUtil;
import com.infantjesus.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AdminService adminService;
    
    /**
     * Admin registration endpoint
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody AdminRegistrationDto registrationDto) {
        Map<String, Object> result = adminService.registerAdmin(registrationDto);
        
        if ((Boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
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
