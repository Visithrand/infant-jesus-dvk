package com.infantjesus.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class PerformanceInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(PerformanceInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        long startTime = (Long) request.getAttribute("startTime");
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        
        String method = request.getMethod();
        String uri = request.getRequestURI();
        
        if (duration > 1000) { // Log slow requests (>1 second)
            logger.warn("SLOW REQUEST: {} {} took {}ms", method, uri, duration);
        } else if (duration > 500) { // Log medium requests (>500ms)
            logger.info("MEDIUM REQUEST: {} {} took {}ms", method, uri, duration);
        } else {
            logger.debug("FAST REQUEST: {} {} took {}ms", method, uri, duration);
        }
    }
}
