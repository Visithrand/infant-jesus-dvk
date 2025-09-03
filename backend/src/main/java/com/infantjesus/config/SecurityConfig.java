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
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authz -> authz
                // Public endpoints - explicitly allow login
                .requestMatchers("/admin/login").permitAll()
                .requestMatchers("/admin/test").permitAll()
                .requestMatchers("/admin/bootstrap-super-admin").permitAll()
                // Public API endpoints
                .requestMatchers("/events").permitAll()
                .requestMatchers("/events/{id}").permitAll()
                .requestMatchers("/classes").permitAll()
                .requestMatchers("/classes/live").permitAll()
                .requestMatchers("/classes/{id}").permitAll()
                .requestMatchers("/announcements").permitAll()
                .requestMatchers("/announcements/{id}").permitAll()
                .requestMatchers("/announcements/search").permitAll()
                .requestMatchers("/announcements/priority/{priority}").permitAll()
                .requestMatchers("/facilities").permitAll()
                .requestMatchers("/facilities/{id}").permitAll()
                // Admin endpoints - require authentication
                .requestMatchers("/events/admin/**").authenticated()
                .requestMatchers("/classes/admin/**").authenticated()
                .requestMatchers("/announcements/admin/**").authenticated()
                .requestMatchers("/facilities/admin/**").authenticated()
                .requestMatchers("/admin/**").authenticated()
                // Allow everything else for testing
                .anyRequest().permitAll()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
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
