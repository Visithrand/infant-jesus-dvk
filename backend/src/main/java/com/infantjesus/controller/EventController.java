package com.infantjesus.controller;

import com.infantjesus.dto.EventDto;
import com.infantjesus.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);
    
    @Autowired
    private EventService eventService;
    
    /**
     * Get all events (public endpoint)
     */
    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get event by ID (public endpoint)
     */
    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        try {
            EventDto event = eventService.getEventById(id);
            return ResponseEntity.ok(event);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Create new event (public endpoint for frontend integration)
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventDto> createEventPublic(@RequestBody EventDto eventDto) {
        try {
            logger.info("Creating new event via public endpoint: title={}, description={}, eventDateTime={}", 
                       eventDto.getTitle(), eventDto.getDescription(), eventDto.getEventDateTime());
            
            EventDto createdEvent = eventService.createEvent(eventDto);
            logger.info("Event created successfully with ID: {}", createdEvent.getId());
            
            return ResponseEntity.ok(createdEvent);
        } catch (Exception e) {
            logger.error("Error creating event: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Create new event (admin only)
     */
    @PostMapping(value = "/admin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto) {
        try {
            logger.info("Creating new event via admin endpoint: title={}, description={}, eventDateTime={}", 
                       eventDto.getTitle(), eventDto.getDescription(), eventDto.getEventDateTime());
            
            // Set default eventDateTime if not provided
            if (eventDto.getEventDateTime() == null) {
                eventDto.setEventDateTime(java.time.LocalDateTime.now());
                logger.info("Set default eventDateTime to current time");
            }
            
            EventDto createdEvent = eventService.createEvent(eventDto);
            logger.info("Event created successfully with ID: {}", createdEvent.getId());
            
            return ResponseEntity.ok(createdEvent);
        } catch (Exception e) {
            logger.error("Error creating event: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Create new event with optional image upload (multipart/form-data)
     */
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventDto> createEventWithImage(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "eventDateTime", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) java.time.LocalDateTime eventDateTime,
            @RequestParam(value = "image", required = false) org.springframework.web.multipart.MultipartFile image
    ) {
        try {
            logger.info("Creating new event via multipart upload: title={}, eventDateTime={}", title, eventDateTime);
            EventDto created = eventService.createEvent(title, description, eventDateTime, image);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            logger.error("Error creating multipart event: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Update event (admin only)
     */
    @PutMapping("/admin/{id}")
    public ResponseEntity<EventDto> updateEvent(
            @PathVariable Long id,
            @RequestBody EventDto eventDto) {
        try {
            logger.info("Updating event with ID: {}", id);
            EventDto updatedEvent = eventService.updateEvent(id, eventDto);
            logger.info("Event updated successfully");
            return ResponseEntity.ok(updatedEvent);
        } catch (RuntimeException e) {
            logger.error("Event not found: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error updating event: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Delete event (admin only)
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            // If not found, treat as idempotent delete
            logger.warn("Delete event: ID {} not found, treating as success", id);
            return ResponseEntity.ok().build();
        }
    }
}
