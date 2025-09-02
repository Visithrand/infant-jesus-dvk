package com.infantjesus.config;

import com.infantjesus.interceptor.PerformanceInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PerformanceConfig implements WebMvcConfigurer {

    @Bean
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(performanceInterceptor())
                .addPathPatterns("/admin/**", "/events/**", "/facilities/**", "/classes/**");
    }
}
