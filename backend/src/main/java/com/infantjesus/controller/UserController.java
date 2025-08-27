package com.infantjesus.controller;

import com.infantjesus.dto.UserRegistrationDto;
import com.infantjesus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * User registration endpoint - always creates USER role accounts
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody UserRegistrationDto registrationDto) {
        Map<String, Object> result = userService.registerUser(registrationDto);
        return (Boolean) result.get("success") ? ResponseEntity.ok(result) : ResponseEntity.badRequest().body(result);
    }
}
