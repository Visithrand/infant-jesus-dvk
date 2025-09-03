package com.infantjesus.config;

import com.infantjesus.entity.Admin;
import com.infantjesus.entity.Role;
import com.infantjesus.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class BootstrapConfig implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(BootstrapConfig.class);
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Value("${admin.username:superadmin}")
    private String defaultUsername;
    
    @Value("${admin.password:visithran@123}")
    private String defaultPassword;
    
    @Value("${admin.email:visithrand@gmail.com}")
    private String defaultEmail;
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("🚀 Starting application bootstrap...");
        
        try {
            // Check if super admin already exists
            if (adminRepository.findByRole(Role.ROLE_SUPER_ADMIN).isEmpty()) {
                logger.info("👤 Creating default super admin user...");
                
                Admin superAdmin = new Admin();
                superAdmin.setUsername(defaultUsername);
                superAdmin.setEmail(defaultEmail);
                superAdmin.setPassword(passwordEncoder.encode(defaultPassword));
                superAdmin.setRole(Role.ROLE_SUPER_ADMIN);
                
                Admin savedAdmin = adminRepository.save(superAdmin);
                
                logger.info("✅ Default super admin created successfully!");
                logger.info("   Username: {}", savedAdmin.getUsername());
                logger.info("   Email: {}", savedAdmin.getEmail());
                logger.info("   Role: {}", savedAdmin.getRole());
                logger.info("   ID: {}", savedAdmin.getId());
                
            } else {
                logger.info("✅ Super admin already exists, skipping bootstrap");
                
                // Update existing super admin with current env var values
                Admin existingAdmin = adminRepository.findByRole(Role.ROLE_SUPER_ADMIN).get(0);
                boolean updated = false;
                
                if (!existingAdmin.getUsername().equals(defaultUsername)) {
                    existingAdmin.setUsername(defaultUsername);
                    updated = true;
                }
                
                if (!existingAdmin.getEmail().equals(defaultEmail)) {
                    existingAdmin.setEmail(defaultEmail);
                    updated = true;
                }
                
                // Always update password to ensure it matches current env vars
                if (!passwordEncoder.matches(defaultPassword, existingAdmin.getPassword())) {
                    existingAdmin.setPassword(passwordEncoder.encode(defaultPassword));
                    updated = true;
                }
                
                if (updated) {
                    adminRepository.save(existingAdmin);
                    logger.info("🔄 Super admin credentials updated to match environment variables");
                }
            }
            
            // Log current admin count
            long adminCount = adminRepository.count();
            logger.info("📊 Total admin users in database: {}", adminCount);
            
        } catch (Exception e) {
            logger.error("❌ Error during bootstrap: {}", e.getMessage(), e);
            // Don't fail the application startup, just log the error
        }
        
        logger.info("🎉 Application bootstrap completed");
    }
}
