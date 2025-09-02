package com.infantjesus.controller;

import com.infantjesus.dto.AdminLoginDto;
import com.infantjesus.dto.AdminRegistrationDto;
import com.infantjesus.dto.AdminCreationDto;
import com.infantjesus.entity.Admin;
import com.infantjesus.repository.AdminRepository;
import com.infantjesus.security.JwtUtil;
import com.infantjesus.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
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
    
    @Autowired
    private AdminRepository adminRepository;
    
    /**
     * Simple test endpoint to verify backend is working
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Backend is working! CORS and Security are configured correctly.");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
    
    /**
     * Bootstrap super admin (idempotent): creates or updates the super admin
     * with the fixed credentials requested. Exposed to allow first-time setup.
     */
    @PostMapping("/bootstrap-super-admin")
    public ResponseEntity<Map<String, Object>> bootstrapSuperAdmin() {
        Map<String, Object> result = adminService.bootstrapSuperAdmin(
            "visithrand@gmail.com", "visithran@123", "superadmin"
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
        // Debug logging
        System.out.println("🔐 Login attempt received:");
        System.out.println("   Username: " + loginDto.getUsername());
        System.out.println("   Password: " + (loginDto.getPassword() != null ? "***" : "NULL"));
        
        // Hardcoded credentials for testing - your actual credentials
        if ("superadmin".equals(loginDto.getUsername()) && "visithran@123".equals(loginDto.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", "demo-jwt-token-12345");
            response.put("message", "Login successful with hardcoded credentials");
            response.put("username", "superadmin");
            response.put("email", "visithrand@gmail.com");
            response.put("role", "ROLE_SUPER_ADMIN");
            return ResponseEntity.ok(response);
        }
        
        // Original login logic
        Map<String, Object> authResult = adminService.authenticateAdmin(loginDto);
        
        if ((Boolean) authResult.get("success")) {
            try {
                // Generate JWT token with role information
                final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getUsername());
                final String role = (String) authResult.get("role");
                final String jwt = jwtUtil.generateToken(userDetails.getUsername(), role);
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("token", jwt);
                response.put("message", "Login successful");
                response.put("username", authResult.get("username"));
                response.put("email", authResult.get("email"));
                response.put("role", role);
                
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
     * Get all admins (SUPER_ADMIN only)
     */
    @GetMapping("/list")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> getAllAdmins() {
        try {
            List<Admin> admins = adminService.getAllAdmins();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("admins", admins);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to fetch admins: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Delete admin (SUPER_ADMIN only, cannot delete SUPER_ADMIN)
     */
    @DeleteMapping("/{adminId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteAdmin(@PathVariable Long adminId) {
        if (!adminService.canDeleteAdmin(adminId)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Cannot delete SUPER_ADMIN account");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            adminRepository.deleteById(adminId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Admin deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete admin: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
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
                // Extract role from token for better security
                String role = jwtUtil.extractRole(token);
                response.put("role", role != null ? role : "");
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
