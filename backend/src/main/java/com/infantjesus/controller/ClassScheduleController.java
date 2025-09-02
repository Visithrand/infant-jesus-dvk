package com.infantjesus.controller;

import com.infantjesus.dto.ClassScheduleDto;
import com.infantjesus.service.ClassScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/admin")
    public ResponseEntity<ClassScheduleDto> createClassSchedule(@RequestBody ClassScheduleDto classScheduleDto) {
        try {
            logger.info("Creating new class schedule: {}", classScheduleDto);
            
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
            return ResponseEntity.notFound().build();
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
