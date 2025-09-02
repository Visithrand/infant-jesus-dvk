package com.infantjesus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded images from the uploads directory with caching
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/")
                .setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).cachePublic());
    }
}
