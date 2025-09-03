package com.infantjesus.repository;

import com.infantjesus.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    
    /**
     * Find all active announcements ordered by creation date (latest first)
     */
    List<Announcement> findByIsActiveTrueOrderByCreatedAtDesc();
    
    /**
     * Find all announcements ordered by creation date (latest first)
     */
    List<Announcement> findAllByOrderByCreatedAtDesc();
    
    /**
     * Find announcements by priority
     */
    List<Announcement> findByPriorityOrderByCreatedAtDesc(String priority);
    
    /**
     * Find active announcements by priority
     */
    List<Announcement> findByIsActiveTrueAndPriorityOrderByCreatedAtDesc(String priority);
    
    /**
     * Find announcements by title containing the given keyword
     */
    List<Announcement> findByTitleContainingIgnoreCase(String keyword);
}
