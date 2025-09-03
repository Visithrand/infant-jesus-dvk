package com.infantjesus.controller;

import com.infantjesus.dto.EventDto;
import com.infantjesus.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
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
    @PostMapping
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
    @PostMapping("/admin")
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto) {
        try {
            logger.info("Creating new event via admin endpoint: title={}, description={}, eventDateTime={}", 
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
            return ResponseEntity.notFound().build();
        }
    }
}
