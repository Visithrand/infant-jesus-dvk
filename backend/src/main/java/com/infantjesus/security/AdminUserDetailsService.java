package com.infantjesus.security;

import com.infantjesus.entity.Admin;
import com.infantjesus.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
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
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> adminOptional = adminRepository.findByUsername(username);
        
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            String roleName = admin.getRole() != null && admin.getRole().name().equals("SUPER_ADMIN")
                    ? "ROLE_SUPER_ADMIN" : "ROLE_ADMIN";
            return new User(admin.getUsername(), admin.getPassword(), 
                Collections.singletonList(new SimpleGrantedAuthority(roleName)));
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }
}
