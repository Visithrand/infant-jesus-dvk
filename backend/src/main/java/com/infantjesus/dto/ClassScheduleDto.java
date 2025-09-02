package com.infantjesus.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class ClassScheduleDto {
    
    private Long id;
    
    @NotBlank(message = "Subject is required")
    @Size(max = 255, message = "Subject must be less than 255 characters")
    private String subject;
    
    @NotBlank(message = "Teacher is required")
    @Size(max = 255, message = "Teacher must be less than 255 characters")
    private String teacher;
    
    private String description;
    
    @NotNull(message = "Schedule time is required")
    private LocalDateTime scheduleTime;
    
    private Boolean isLive = false;
    
    private LocalDateTime createdAt;
    
    // Default constructor
    public ClassScheduleDto() {}
    
    // Constructor with fields
    public ClassScheduleDto(Long id, String subject, String teacher, String description, LocalDateTime scheduleTime, Boolean isLive, LocalDateTime createdAt) {
        this.id = id;
        this.subject = subject;
        this.teacher = teacher;
        this.description = description;
        this.scheduleTime = scheduleTime;
        this.isLive = isLive;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getTeacher() {
        return teacher;
    }
    
    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDateTime getScheduleTime() {
        return scheduleTime;
    }
    
    public void setScheduleTime(LocalDateTime scheduleTime) {
        this.scheduleTime = scheduleTime;
    }
    
    public Boolean getIsLive() {
        return isLive;
    }
    
    public void setIsLive(Boolean isLive) {
        this.isLive = isLive;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
