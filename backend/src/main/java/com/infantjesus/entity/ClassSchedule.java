package com.infantjesus.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "classes")
public class ClassSchedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Subject is required")
    @Size(max = 255, message = "Subject must be less than 255 characters")
    @Column(nullable = false)
    private String subject;
    
    @NotBlank(message = "Teacher is required")
    @Size(max = 255, message = "Teacher must be less than 255 characters")
    @Column(nullable = false)
    private String teacher;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Schedule time is required")
    @Column(name = "schedule_time", nullable = false)
    private LocalDateTime scheduleTime;
    
    @Column(name = "is_live", nullable = false)
    private Boolean isLive = false;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    // Default constructor
    public ClassSchedule() {
        this.createdAt = LocalDateTime.now();
        this.isLive = false;
    }
    
    // Constructor with fields
    public ClassSchedule(String subject, String teacher, LocalDateTime scheduleTime, Boolean isLive) {
        this.subject = subject;
        this.teacher = teacher;
        this.description = "";
        this.scheduleTime = scheduleTime;
        this.isLive = isLive;
        this.createdAt = LocalDateTime.now();
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
