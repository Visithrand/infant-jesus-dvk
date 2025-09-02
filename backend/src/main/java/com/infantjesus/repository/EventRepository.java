package com.infantjesus.repository;

import com.infantjesus.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    /**
     * Find all events ordered by creation date (latest first)
     */
    List<Event> findAllByOrderByCreatedAtDesc();
    
    /**
     * Find events by title containing the given keyword
     */
    List<Event> findByTitleContainingIgnoreCase(String keyword);
}
