package com.infantjesus.service;

import com.infantjesus.dto.EventDto;
import com.infantjesus.entity.Event;
import com.infantjesus.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    private final String uploadDir = "uploads/events/";
    
    public EventService() {
        // Create upload directory if it doesn't exist
        try {
            Path path = Paths.get(uploadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }
    
    /**
     * Create a new event with DTO
     */
    public EventDto createEvent(EventDto eventDto) {
        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setEventDateTime(eventDto.getEventDateTime());
        event.setImageUrl(eventDto.getImageUrl());
        event.setCreatedAt(LocalDateTime.now());
        
        Event savedEvent = eventRepository.save(event);
        return convertToDto(savedEvent);
    }

    /**
     * Create a new event with optional image upload (multipart/form-data)
     */
    public EventDto createEvent(String title,
                                String description,
                                LocalDateTime eventDateTime,
                                MultipartFile imageFile) {
        try {
            Event event = new Event();
            event.setTitle(title);
            event.setDescription(description);
            event.setEventDateTime(eventDateTime != null ? eventDateTime : LocalDateTime.now());
            event.setCreatedAt(LocalDateTime.now());

            if (imageFile != null && !imageFile.isEmpty()) {
                String imageUrl = saveImage(imageFile);
                event.setImageUrl(imageUrl);
            }

            Event savedEvent = eventRepository.save(event);
            return convertToDto(savedEvent);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save event image", e);
        }
    }
    
    /**
     * Get all events ordered by creation date (latest first)
     */
    public List<EventDto> getAllEvents() {
        return eventRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get event by ID
     */
    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        return convertToDto(event);
    }
    
    /**
     * Update an existing event
     */
    public EventDto updateEvent(Long id, EventDto eventDto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        
        if (eventDto.getTitle() != null) {
            event.setTitle(eventDto.getTitle());
        }
        if (eventDto.getDescription() != null) {
            event.setDescription(eventDto.getDescription());
        }
        if (eventDto.getEventDateTime() != null) {
            event.setEventDateTime(eventDto.getEventDateTime());
        }
        if (eventDto.getImageUrl() != null) {
            event.setImageUrl(eventDto.getImageUrl());
        }
        
        Event updatedEvent = eventRepository.save(event);
        return convertToDto(updatedEvent);
    }
    
    /**
     * Delete an event
     */
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        
        // Delete image if exists
        if (event.getImageUrl() != null) {
            deleteImage(event.getImageUrl());
        }
        
        eventRepository.deleteById(id);
    }
    
    /**
     * Save uploaded image to local storage
     */
    private String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(imageFile.getInputStream(), filePath);
        return "/uploads/events/" + fileName;
    }
    
    /**
     * Delete image from local storage
     */
    private void deleteImage(String imageUrl) {
        try {
            if (imageUrl != null && imageUrl.startsWith("/api/uploads/")) {
                // Remove /api prefix for file system path
                String filePath = imageUrl.replace("/api", "");
                Path path = Paths.get("." + filePath);
                Files.deleteIfExists(path);
            }
        } catch (IOException e) {
            // Log error but don't throw exception
            System.err.println("Error deleting image: " + e.getMessage());
        }
    }
    
    /**
     * Convert Entity to DTO
     */
    private EventDto convertToDto(Event event) {
        return new EventDto(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getImageUrl(),
            event.getEventDateTime(),
            event.getCreatedAt()
        );
    }
}
