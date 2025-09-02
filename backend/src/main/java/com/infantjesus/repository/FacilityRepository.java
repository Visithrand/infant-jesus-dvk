package com.infantjesus.repository;

import com.infantjesus.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
    
    /**
     * Find all facilities ordered by creation date (latest first)
     */
    List<Facility> findAllByOrderByCreatedAtDesc();
    
    /**
     * Find facilities by name containing the given keyword
     */
    List<Facility> findByNameContainingIgnoreCase(String keyword);
    
    /**
     * Find facilities by description containing the given keyword
     */
    List<Facility> findByDescriptionContainingIgnoreCase(String keyword);
}
