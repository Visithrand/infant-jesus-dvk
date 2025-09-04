package com.infantjesus.controller;

import com.infantjesus.dto.AnnouncementDto;
import com.infantjesus.service.AnnouncementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/announcements")
@CrossOrigin(origins = "*")
public class AnnouncementController {
    
    private static final Logger logger = LoggerFactory.getLogger(AnnouncementController.class);
    
    @Autowired
    private AnnouncementService announcementService;
    
    /**
     * Get all active announcements (public endpoint)
     */
    @GetMapping
    public ResponseEntity<List<AnnouncementDto>> getActiveAnnouncements() {
        List<AnnouncementDto> announcements = announcementService.getActiveAnnouncements();
        return ResponseEntity.ok(announcements);
    }
    
    /**
     * Get announcement by ID (public endpoint)
     */
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDto> getAnnouncementById(@PathVariable Long id) {
        try {
            AnnouncementDto announcement = announcementService.getAnnouncementById(id);
            return ResponseEntity.ok(announcement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Create new announcement (public endpoint for frontend integration)
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AnnouncementDto> createAnnouncementPublic(@RequestBody AnnouncementDto announcementDto) {
        try {
            logger.info("Creating new announcement via public endpoint: title={}, priority={}", 
                       announcementDto.getTitle(), announcementDto.getPriority());
            
            // Set default dates if not provided
            if (announcementDto.getCreatedAt() == null) {
                announcementDto.setCreatedAt(java.time.LocalDateTime.now());
                logger.info("Set default createdAt to current time");
            }
            if (announcementDto.getUpdatedAt() == null) {
                announcementDto.setUpdatedAt(java.time.LocalDateTime.now());
                logger.info("Set default updatedAt to current time");
            }
            
            AnnouncementDto createdAnnouncement = announcementService.createAnnouncement(announcementDto);
            logger.info("Announcement created successfully with ID: {}", createdAnnouncement.getId());
            
            return ResponseEntity.ok(createdAnnouncement);
        } catch (Exception e) {
            logger.error("Error creating announcement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Get all announcements including inactive ones (admin only)
     */
    @GetMapping("/admin")
    public ResponseEntity<List<AnnouncementDto>> getAllAnnouncements() {
        List<AnnouncementDto> announcements = announcementService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }
    
    /**
     * Create new announcement (admin only)
     */
    @PostMapping(value = "/admin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AnnouncementDto> createAnnouncement(@RequestBody AnnouncementDto announcementDto) {
        try {
            logger.info("Creating new announcement via admin endpoint: title={}, priority={}", 
                       announcementDto.getTitle(), announcementDto.getPriority());
            
            // Set default dates if not provided
            if (announcementDto.getCreatedAt() == null) {
                announcementDto.setCreatedAt(java.time.LocalDateTime.now());
                logger.info("Set default createdAt to current time");
            }
            if (announcementDto.getUpdatedAt() == null) {
                announcementDto.setUpdatedAt(java.time.LocalDateTime.now());
                logger.info("Set default updatedAt to current time");
            }
            
            AnnouncementDto createdAnnouncement = announcementService.createAnnouncement(announcementDto);
            logger.info("Announcement created successfully with ID: {}", createdAnnouncement.getId());
            
            return ResponseEntity.ok(createdAnnouncement);
        } catch (Exception e) {
            logger.error("Error creating announcement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Update announcement (admin only)
     */
    @PutMapping("/admin/{id}")
    public ResponseEntity<AnnouncementDto> updateAnnouncement(
            @PathVariable Long id,
            @RequestBody AnnouncementDto announcementDto) {
        try {
            logger.info("Updating announcement with ID: {}", id);
            AnnouncementDto updatedAnnouncement = announcementService.updateAnnouncement(id, announcementDto);
            logger.info("Announcement updated successfully");
            return ResponseEntity.ok(updatedAnnouncement);
        } catch (RuntimeException e) {
            logger.error("Announcement not found: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error updating announcement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Delete announcement (admin only)
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        try {
            announcementService.deleteAnnouncement(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            // Idempotent delete semantics
            logger.warn("Delete announcement: ID {} not found, treating as success", id);
            return ResponseEntity.ok().build();
        }
    }
    
    /**
     * Toggle active status of announcement (admin only)
     */
    @PutMapping("/admin/{id}/toggle-active")
    public ResponseEntity<AnnouncementDto> toggleActiveStatus(@PathVariable Long id) {
        try {
            AnnouncementDto updatedAnnouncement = announcementService.toggleActiveStatus(id);
            return ResponseEntity.ok(updatedAnnouncement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Search announcements by keyword (public endpoint)
     */
    @GetMapping("/search")
    public ResponseEntity<List<AnnouncementDto>> searchAnnouncements(@RequestParam String keyword) {
        List<AnnouncementDto> announcements = announcementService.searchAnnouncements(keyword);
        return ResponseEntity.ok(announcements);
    }
    
    /**
     * Get announcements by priority (public endpoint)
     */
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<AnnouncementDto>> getAnnouncementsByPriority(@PathVariable String priority) {
        List<AnnouncementDto> announcements = announcementService.getAnnouncementsByPriority(priority);
        return ResponseEntity.ok(announcements);
    }
}
