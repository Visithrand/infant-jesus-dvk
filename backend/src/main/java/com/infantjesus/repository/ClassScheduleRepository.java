package com.infantjesus.repository;

import com.infantjesus.entity.ClassSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {
    
    /**
     * Find all live classes
     */
    List<ClassSchedule> findByIsLiveTrue();
    
    /**
     * Find classes scheduled after a specific time
     */
    List<ClassSchedule> findByScheduleTimeAfter(LocalDateTime time);
    
    /**
     * Find live classes scheduled after a specific time
     */
    List<ClassSchedule> findByIsLiveTrueAndScheduleTimeAfter(LocalDateTime time);
    
    /**
     * Find classes by subject
     */
    List<ClassSchedule> findBySubjectContainingIgnoreCase(String subject);
}
