package com.infantjesus.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class EventDto {
    
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be less than 255 characters")
    private String title;
    
    private String description;
    
    private String imageUrl;
    
    @NotNull(message = "Event date and time is required")
    private LocalDateTime eventDateTime;
    
    private LocalDateTime createdAt;
    
    // Default constructor
    public EventDto() {}
    
    // Constructor with fields
    public EventDto(Long id, String title, String description, String imageUrl, LocalDateTime eventDateTime, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.eventDateTime = eventDateTime;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public LocalDateTime getEventDateTime() {
        return eventDateTime;
    }
    
    public void setEventDateTime(LocalDateTime eventDateTime) {
        this.eventDateTime = eventDateTime;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
