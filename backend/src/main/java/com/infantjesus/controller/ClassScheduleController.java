package com.infantjesus.controller;

import com.infantjesus.dto.ClassScheduleDto;
import com.infantjesus.service.ClassScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/classes")
@CrossOrigin(origins = "*")
public class ClassScheduleController {
    
    private static final Logger logger = LoggerFactory.getLogger(ClassScheduleController.class);
    
    @Autowired
    private ClassScheduleService classScheduleService;
    
    /**
     * Get all live classes (public endpoint)
     */
    @GetMapping("/live")
    public ResponseEntity<List<ClassScheduleDto>> getLiveClasses() {
        List<ClassScheduleDto> liveClasses = classScheduleService.getLiveClasses();
        return ResponseEntity.ok(liveClasses);
    }
    
    /**
     * Create new class schedule (public endpoint for frontend integration)
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ClassScheduleDto> createClassSchedulePublic(@RequestBody ClassScheduleDto classScheduleDto) {
        try {
            logger.info("Creating new class schedule via public endpoint: subject={}, teacher={}", 
                       classScheduleDto.getSubject(), classScheduleDto.getTeacher());
            
            ClassScheduleDto createdClass = classScheduleService.createClassSchedule(classScheduleDto);
            logger.info("Class schedule created successfully with ID: {}", createdClass.getId());
            
            return ResponseEntity.ok(createdClass);
        } catch (Exception e) {
            logger.error("Error creating class schedule: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Get all class schedules (admin only)
     */
    @GetMapping("/admin")
    public ResponseEntity<List<ClassScheduleDto>> getAllClassSchedules() {
        List<ClassScheduleDto> classes = classScheduleService.getAllClassSchedules();
        return ResponseEntity.ok(classes);
    }
    
    /**
     * Get class schedule by ID (admin only)
     */
    @GetMapping("/admin/{id}")
    public ResponseEntity<ClassScheduleDto> getClassScheduleById(@PathVariable Long id) {
        try {
            ClassScheduleDto classSchedule = classScheduleService.getClassScheduleById(id);
            return ResponseEntity.ok(classSchedule);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Create new class schedule (admin only)
     */
    @PostMapping(value = "/admin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ClassScheduleDto> createClassSchedule(@RequestBody ClassScheduleDto classScheduleDto) {
        try {
            logger.info("Creating new class schedule via admin endpoint: subject={}, teacher={}", 
                       classScheduleDto.getSubject(), classScheduleDto.getTeacher());
            
            // Set default scheduleTime if not provided
            if (classScheduleDto.getScheduleTime() == null) {
                classScheduleDto.setScheduleTime(java.time.LocalDateTime.now());
                logger.info("Set default scheduleTime to current time");
            }
            
            ClassScheduleDto createdClass = classScheduleService.createClassSchedule(classScheduleDto);
            logger.info("Class schedule created successfully with ID: {}", createdClass.getId());
            
            return ResponseEntity.ok(createdClass);
        } catch (Exception e) {
            logger.error("Error creating class schedule: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Update class schedule (admin only)
     */
    @PutMapping("/admin/{id}")
    public ResponseEntity<ClassScheduleDto> updateClassSchedule(
            @PathVariable Long id, 
            @RequestBody ClassScheduleDto classScheduleDto) {
        try {
            ClassScheduleDto updatedClass = classScheduleService.updateClassSchedule(id, classScheduleDto);
            return ResponseEntity.ok(updatedClass);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Delete class schedule (admin only)
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteClassSchedule(@PathVariable Long id) {
        try {
            classScheduleService.deleteClassSchedule(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            // Idempotent delete semantics
            logger.warn("Delete class: ID {} not found, treating as success", id);
            return ResponseEntity.ok().build();
        }
    }
    
    /**
     * Toggle live status of a class (admin only)
     */
    @PutMapping("/admin/{id}/toggle-live")
    public ResponseEntity<ClassScheduleDto> toggleLiveStatus(@PathVariable Long id) {
        try {
            ClassScheduleDto updatedClass = classScheduleService.toggleLiveStatus(id);
            return ResponseEntity.ok(updatedClass);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Get upcoming classes (admin only)
     */
    @GetMapping("/admin/upcoming")
    public ResponseEntity<List<ClassScheduleDto>> getUpcomingClasses() {
        List<ClassScheduleDto> upcomingClasses = classScheduleService.getUpcomingClasses();
        return ResponseEntity.ok(upcomingClasses);
    }
}
