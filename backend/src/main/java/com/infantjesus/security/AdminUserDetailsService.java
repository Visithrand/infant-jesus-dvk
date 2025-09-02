package com.infantjesus.security;

import com.infantjesus.entity.Admin;
import com.infantjesus.entity.User;
import com.infantjesus.repository.AdminRepository;
import com.infantjesus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Optional;

@Service
public class AdminUserDetailsService implements UserDetailsService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // First try to find an admin
        Optional<Admin> adminOptional = adminRepository.findByUsername(username);
        
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            String roleName = admin.getRole() != null && admin.getRole().name().equals("SUPER_ADMIN")
                    ? "ROLE_SUPER_ADMIN" : "ROLE_ADMIN";
            return new org.springframework.security.core.userdetails.User(admin.getUsername(), admin.getPassword(), 
                Collections.singletonList(new SimpleGrantedAuthority(roleName)));
        }
        
        // If not an admin, try to find a regular user
        Optional<User> userOptional = userRepository.findByUsername(username);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), 
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        }
        
        // User not found
        throw new UsernameNotFoundException("User not found: " + username);
    }
}
