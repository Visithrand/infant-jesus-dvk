package com.infantjesus.service;

import com.infantjesus.dto.ClassScheduleDto;
import com.infantjesus.entity.ClassSchedule;
import com.infantjesus.repository.ClassScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassScheduleService {
    
    @Autowired
    private ClassScheduleRepository classScheduleRepository;
    
    /**
     * Create a new class schedule
     */
    public ClassScheduleDto createClassSchedule(ClassScheduleDto classScheduleDto) {
        ClassSchedule classSchedule = new ClassSchedule();
        classSchedule.setSubject(classScheduleDto.getSubject());
        classSchedule.setTeacher(classScheduleDto.getTeacher());
        classSchedule.setDescription(classScheduleDto.getDescription());
        classSchedule.setScheduleTime(classScheduleDto.getScheduleTime());
        classSchedule.setIsLive(classScheduleDto.getIsLive());
        classSchedule.setCreatedAt(LocalDateTime.now());
        
        ClassSchedule savedClass = classScheduleRepository.save(classSchedule);
        return convertToDto(savedClass);
    }
    
    /**
     * Get all class schedules
     */
    public List<ClassScheduleDto> getAllClassSchedules() {
        return classScheduleRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all live classes
     */
    public List<ClassScheduleDto> getLiveClasses() {
        return classScheduleRepository.findByIsLiveTrue()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get class schedule by ID
     */
    public ClassScheduleDto getClassScheduleById(Long id) {
        ClassSchedule classSchedule = classScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class schedule not found with id: " + id));
        return convertToDto(classSchedule);
    }
    
    /**
     * Update an existing class schedule
     */
    public ClassScheduleDto updateClassSchedule(Long id, ClassScheduleDto classScheduleDto) {
        ClassSchedule classSchedule = classScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class schedule not found with id: " + id));
        
        if (classScheduleDto.getSubject() != null) {
            classSchedule.setSubject(classScheduleDto.getSubject());
        }
        if (classScheduleDto.getTeacher() != null) {
            classSchedule.setTeacher(classScheduleDto.getTeacher());
        }
        if (classScheduleDto.getScheduleTime() != null) {
            classSchedule.setScheduleTime(classScheduleDto.getScheduleTime());
        }
        if (classScheduleDto.getDescription() != null) {
            classSchedule.setDescription(classScheduleDto.getDescription());
        }
        if (classScheduleDto.getIsLive() != null) {
            classSchedule.setIsLive(classScheduleDto.getIsLive());
        }
        
        ClassSchedule updatedClass = classScheduleRepository.save(classSchedule);
        return convertToDto(updatedClass);
    }
    
    /**
     * Delete a class schedule
     */
    public void deleteClassSchedule(Long id) {
        if (!classScheduleRepository.existsById(id)) {
            throw new RuntimeException("Class schedule not found with id: " + id);
        }
        classScheduleRepository.deleteById(id);
    }
    
    /**
     * Toggle live status of a class
     */
    public ClassScheduleDto toggleLiveStatus(Long id) {
        ClassSchedule classSchedule = classScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class schedule not found with id: " + id));
        
        classSchedule.setIsLive(!classSchedule.getIsLive());
        ClassSchedule updatedClass = classScheduleRepository.save(classSchedule);
        return convertToDto(updatedClass);
    }
    
    /**
     * Get upcoming classes (scheduled after current time)
     */
    public List<ClassScheduleDto> getUpcomingClasses() {
        LocalDateTime now = LocalDateTime.now();
        return classScheduleRepository.findByScheduleTimeAfter(now)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Entity to DTO
     */
    private ClassScheduleDto convertToDto(ClassSchedule classSchedule) {
        return new ClassScheduleDto(
            classSchedule.getId(),
            classSchedule.getSubject(),
            classSchedule.getTeacher(),
            classSchedule.getDescription(),
            classSchedule.getScheduleTime(),
            classSchedule.getIsLive(),
            classSchedule.getCreatedAt()
        );
    }
}
