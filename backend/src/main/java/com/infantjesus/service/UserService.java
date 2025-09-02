package com.infantjesus.service;

import com.infantjesus.dto.UserRegistrationDto;
import com.infantjesus.entity.User;
import com.infantjesus.entity.Role;
import com.infantjesus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Register a new regular user (always gets USER role)
     */
    public Map<String, Object> registerUser(UserRegistrationDto registrationDto) {
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
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }
        
        // Check if email already exists
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }
        
        // Create new user (always USER role)
        User user = new User();
        user.setUsername(registrationDto.getUsername().trim());
        user.setEmail(registrationDto.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setRole(Role.ROLE_USER); // Always USER role for regular users
        
        try {
            User savedUser = userRepository.save(user);
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("userId", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("role", savedUser.getRole().name());
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }
        
        return response;
    }
    
    /**
     * Get user by username
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    /**
     * Check if user exists by username
     */
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    /**
     * Check if user exists by email
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
