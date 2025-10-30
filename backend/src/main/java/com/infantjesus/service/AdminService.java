package com.infantjesus.service;

import com.infantjesus.dto.AdminLoginDto;
import com.infantjesus.dto.AdminRegistrationDto;
import com.infantjesus.dto.AdminCreationDto;
import com.infantjesus.entity.Admin;
import com.infantjesus.entity.Role;
import com.infantjesus.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
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
        
        // Create new admin (regular admin)
        Admin admin = new Admin();
        admin.setUsername(registrationDto.getUsername().trim());
        admin.setEmail(registrationDto.getEmail().trim().toLowerCase());
        admin.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        admin.setRole(Role.ROLE_ADMIN);
        
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
     * Create an admin (super admin only)
     */
    public Map<String, Object> createAdmin(AdminCreationDto dto) {
        Map<String, Object> response = new HashMap<>();

        if (dto.getUsername() == null || dto.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return response;
        }
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email is required");
            return response;
        }
        if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return response;
        }
        if (adminRepository.existsByUsername(dto.getUsername())) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }
        if (adminRepository.existsByEmail(dto.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        Admin admin = new Admin();
        admin.setUsername(dto.getUsername().trim());
        admin.setEmail(dto.getEmail().trim().toLowerCase());
        admin.setPassword(passwordEncoder.encode(dto.getPassword()));
        admin.setRole(Role.ROLE_ADMIN);

        Admin saved = adminRepository.save(admin);
        response.put("success", true);
        response.put("message", "Admin created successfully");
        response.put("adminId", saved.getId());
        response.put("username", saved.getUsername());
        return response;
    }
    
    /**
     * Authenticate admin login with hardcoded credentials (superadmin / superadmin@123) only
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
        // Hardcoded admin username and password
        String HARD_CODED_USERNAME = "superadmin";
        String HARD_CODED_PASSWORD = "superadmin@123";
        if (loginDto.getUsername().trim().equals(HARD_CODED_USERNAME)
            && loginDto.getPassword().equals(HARD_CODED_PASSWORD)) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("username", HARD_CODED_USERNAME);
            response.put("email", "hardcoded@admin.com");
            response.put("role", "ROLE_SUPER_ADMIN");
            response.put("adminId", 1);
            return response;
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return response;
        }
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

    /**
     * Bootstrap or update the super admin with fixed credentials
     * This method ensures the SUPER_ADMIN account always exists and cannot be deleted
     */
    public Map<String, Object> bootstrapSuperAdmin(String email, String password, String username) {
        Map<String, Object> response = new HashMap<>();
        
        // First check if a super admin already exists by role
        List<Admin> existingSuperAdmins = adminRepository.findByRole(Role.ROLE_SUPER_ADMIN);
        
        if (!existingSuperAdmins.isEmpty()) {
            // If multiple super admins exist, keep only the first one and remove others
            if (existingSuperAdmins.size() > 1) {
                // Keep the first one, remove the rest
                for (int i = 1; i < existingSuperAdmins.size(); i++) {
                    adminRepository.delete(existingSuperAdmins.get(i));
                }
            }
            
            // Update the existing super admin
            Admin existingSuperAdmin = existingSuperAdmins.get(0);
            
            // Update credentials but preserve the SUPER_ADMIN role
            existingSuperAdmin.setUsername(username);
            existingSuperAdmin.setEmail(email.toLowerCase());
            existingSuperAdmin.setPassword(passwordEncoder.encode(password));
            existingSuperAdmin.setRole(Role.ROLE_SUPER_ADMIN);
            
            Admin saved = adminRepository.save(existingSuperAdmin);
            response.put("success", true);
            response.put("message", "Existing super admin updated successfully");
            response.put("adminId", saved.getId());
            response.put("email", saved.getEmail());
            response.put("role", saved.getRole().name());
            return response;
        }
        
        // Check if admin exists by email
        Optional<Admin> existingByEmail = adminRepository.findByEmail(email.toLowerCase());
        
        Admin superAdmin;
        if (existingByEmail.isPresent()) {
            // Update existing admin to super admin
            superAdmin = existingByEmail.get();
            superAdmin.setUsername(username);
            superAdmin.setPassword(passwordEncoder.encode(password));
            superAdmin.setRole(Role.ROLE_SUPER_ADMIN);
        } else {
            // Create new super admin
            superAdmin = new Admin();
            superAdmin.setUsername(username);
            superAdmin.setEmail(email.toLowerCase());
            superAdmin.setPassword(passwordEncoder.encode(password));
            superAdmin.setRole(Role.ROLE_SUPER_ADMIN);
        }

        Admin saved = adminRepository.save(superAdmin);
        response.put("success", true);
        response.put("message", "Super admin bootstrapped successfully");
        response.put("adminId", saved.getId());
        response.put("email", saved.getEmail());
        response.put("role", saved.getRole().name());
        return response;
    }
    
    /**
     * Clean up duplicate admin entries and ensure data consistency
     * This method should be called after bootstrap to clean up any inconsistencies
     */
    public Map<String, Object> cleanupDuplicateAdmins() {
        Map<String, Object> response = new HashMap<>();
        int cleanedCount = 0;
        
        try {
            // Get all admins
            List<Admin> allAdmins = adminRepository.findAll();
            
            // Check for duplicate emails (keep the one with SUPER_ADMIN role if exists)
            for (Admin admin : allAdmins) {
                // Find all admins with the same email
                List<Admin> duplicatesByEmail = allAdmins.stream()
                    .filter(a -> a.getEmail().equals(admin.getEmail()))
                    .collect(java.util.stream.Collectors.toList());
                
                if (duplicatesByEmail.size() > 1) {
                    // Find the one with SUPER_ADMIN role
                    Admin superAdmin = duplicatesByEmail.stream()
                        .filter(a -> a.getRole() == Role.ROLE_SUPER_ADMIN)
                        .findFirst()
                        .orElse(duplicatesByEmail.get(0));
                    
                    // Remove duplicates, keep the super admin or first one
                    for (Admin duplicate : duplicatesByEmail) {
                        if (!duplicate.getId().equals(superAdmin.getId())) {
                            adminRepository.delete(duplicate);
                            cleanedCount++;
                        }
                    }
                }
            }
            
            response.put("success", true);
            response.put("message", "Cleanup completed successfully");
            response.put("cleanedCount", cleanedCount);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Cleanup failed: " + e.getMessage());
        }
        
        return response;
    }
    
    /**
     * Check if a user can be deleted (SUPER_ADMIN cannot be deleted)
     */
    public boolean canDeleteAdmin(Long adminId) {
        Optional<Admin> admin = adminRepository.findById(adminId);
        if (admin.isPresent()) {
            return admin.get().getRole() != Role.ROLE_SUPER_ADMIN;
        }
        return false;
    }
    
    /**
     * Get all admins (for SUPER_ADMIN management)
     */
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
