package com.infantjesus.service;

import com.infantjesus.dto.AdminLoginDto;
import com.infantjesus.dto.AdminRegistrationDto;
import com.infantjesus.entity.Admin;
import com.infantjesus.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Register a new admin
     */
    public Map<String, Object> registerAdmin(AdminRegistrationDto registrationDto) {
        Map<String, Object> response = new HashMap<>();
        
        // Validate input
        if (registrationDto.getUsername() == null || registrationDto.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return response;
        }
        
        if (registrationDto.getEmail() == null || registrationDto.getEmail().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email is required");
            return response;
        }
        
        if (registrationDto.getPassword() == null || registrationDto.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return response;
        }
        
        if (!registrationDto.getPassword().equals(registrationDto.getConfirmPassword())) {
            response.put("success", false);
            response.put("message", "Passwords do not match");
            return response;
        }
        
        if (registrationDto.getPassword().length() < 6) {
            response.put("success", false);
            response.put("message", "Password must be at least 6 characters long");
            return response;
        }
        
        // Check if username already exists
        if (adminRepository.existsByUsername(registrationDto.getUsername())) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }
        
        // Check if email already exists
        if (adminRepository.existsByEmail(registrationDto.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }
        
        // Create new admin
        Admin admin = new Admin();
        admin.setUsername(registrationDto.getUsername().trim());
        admin.setEmail(registrationDto.getEmail().trim().toLowerCase());
        admin.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        
        try {
            Admin savedAdmin = adminRepository.save(admin);
            response.put("success", true);
            response.put("message", "Admin registered successfully");
            response.put("adminId", savedAdmin.getId());
            response.put("username", savedAdmin.getUsername());
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }
        
        return response;
    }
    
    /**
     * Authenticate admin login
     */
    public Map<String, Object> authenticateAdmin(AdminLoginDto loginDto) {
        Map<String, Object> response = new HashMap<>();
        
        // Validate input
        if (loginDto.getUsername() == null || loginDto.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return response;
        }
        
        if (loginDto.getPassword() == null || loginDto.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return response;
        }
        
        // Find admin by username
        Optional<Admin> adminOptional = adminRepository.findByUsername(loginDto.getUsername().trim());
        
        if (adminOptional.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return response;
        }
        
        Admin admin = adminOptional.get();
        
        // Verify password
        if (!passwordEncoder.matches(loginDto.getPassword(), admin.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return response;
        }
        
        // Login successful
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("adminId", admin.getId());
        response.put("username", admin.getUsername());
        response.put("email", admin.getEmail());
        
        return response;
    }
    
    /**
     * Get admin by username
     */
    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
    
    /**
     * Check if admin exists by username
     */
    public boolean existsByUsername(String username) {
        return adminRepository.existsByUsername(username);
    }
}
