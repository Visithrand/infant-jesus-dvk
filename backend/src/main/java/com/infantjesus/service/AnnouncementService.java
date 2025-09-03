package com.infantjesus.service;

import com.infantjesus.dto.AnnouncementDto;
import com.infantjesus.entity.Announcement;
import com.infantjesus.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {
    
    @Autowired
    private AnnouncementRepository announcementRepository;
    
    /**
     * Create a new announcement
     */
    public AnnouncementDto createAnnouncement(AnnouncementDto announcementDto) {
        Announcement announcement = new Announcement();
        announcement.setTitle(announcementDto.getTitle());
        announcement.setMessage(announcementDto.getMessage());
        announcement.setPriority(announcementDto.getPriority());
        announcement.setIsActive(announcementDto.getIsActive() != null ? announcementDto.getIsActive() : true);
        announcement.setCreatedAt(LocalDateTime.now());
        announcement.setUpdatedAt(LocalDateTime.now());
        
        Announcement savedAnnouncement = announcementRepository.save(announcement);
        return convertToDto(savedAnnouncement);
    }
    
    /**
     * Get all active announcements ordered by creation date (latest first)
     */
    public List<AnnouncementDto> getActiveAnnouncements() {
        return announcementRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all announcements ordered by creation date (latest first)
     */
    public List<AnnouncementDto> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get announcement by ID
     */
    public AnnouncementDto getAnnouncementById(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        return convertToDto(announcement);
    }
    
    /**
     * Update an existing announcement
     */
    public AnnouncementDto updateAnnouncement(Long id, AnnouncementDto announcementDto) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        
        if (announcementDto.getTitle() != null) {
            announcement.setTitle(announcementDto.getTitle());
        }
        if (announcementDto.getMessage() != null) {
            announcement.setMessage(announcementDto.getMessage());
        }
        if (announcementDto.getPriority() != null) {
            announcement.setPriority(announcementDto.getPriority());
        }
        if (announcementDto.getIsActive() != null) {
            announcement.setIsActive(announcementDto.getIsActive());
        }
        
        announcement.setUpdatedAt(LocalDateTime.now());
        Announcement updatedAnnouncement = announcementRepository.save(announcement);
        return convertToDto(updatedAnnouncement);
    }
    
    /**
     * Delete an announcement
     */
    public void deleteAnnouncement(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        announcementRepository.deleteById(id);
    }
    
    /**
     * Toggle active status of an announcement
     */
    public AnnouncementDto toggleActiveStatus(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found with id: " + id));
        
        announcement.setIsActive(!announcement.getIsActive());
        announcement.setUpdatedAt(LocalDateTime.now());
        
        Announcement updatedAnnouncement = announcementRepository.save(announcement);
        return convertToDto(updatedAnnouncement);
    }
    
    /**
     * Get announcements by priority
     */
    public List<AnnouncementDto> getAnnouncementsByPriority(String priority) {
        return announcementRepository.findByPriorityOrderByCreatedAtDesc(priority)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Search announcements by title
     */
    public List<AnnouncementDto> searchAnnouncements(String keyword) {
        return announcementRepository.findByTitleContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Entity to DTO
     */
    private AnnouncementDto convertToDto(Announcement announcement) {
        return new AnnouncementDto(
            announcement.getId(),
            announcement.getTitle(),
            announcement.getMessage(),
            announcement.getIsActive(),
            announcement.getPriority(),
            announcement.getCreatedAt(),
            announcement.getUpdatedAt()
        );
    }
}
