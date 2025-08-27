package com.infantjesus.config;

import com.infantjesus.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(authz -> authz
                // Public endpoints
                .requestMatchers("/admin/login").permitAll()
                .requestMatchers("/admin/bootstrap-super-admin").permitAll()
                .requestMatchers("/api/users/register").permitAll()
                .requestMatchers("/events").permitAll()
                .requestMatchers("/classes/live").permitAll()
                .requestMatchers("/facilities").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                
                // Admin-only endpoints
                .requestMatchers("/admin/create").hasRole("SUPER_ADMIN")
                .requestMatchers("/admin/list").hasRole("SUPER_ADMIN")
                .requestMatchers("/admin/delete/**").hasRole("SUPER_ADMIN")
                .requestMatchers("/admin/register").hasRole("SUPER_ADMIN")
                .requestMatchers("/admin/validate").hasAnyRole("ADMIN", "SUPER_ADMIN")
                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                
                // Protected endpoints
                .requestMatchers("/events/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                .requestMatchers("/classes/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                .requestMatchers("/facilities/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                
                .anyRequest().authenticated()
            )
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
