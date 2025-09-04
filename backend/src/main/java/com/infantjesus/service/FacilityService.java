package com.infantjesus.service;

import com.infantjesus.dto.FacilityDto;
import com.infantjesus.entity.Facility;
import com.infantjesus.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FacilityService {
    
    @Autowired
    private FacilityRepository facilityRepository;
    
    private final String uploadDir = "uploads/facilities/";
    
    public FacilityService() {
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
     * Create a new facility with optional image upload
     */
    public FacilityDto createFacility(String name, String description, MultipartFile imageFile) throws IOException {
        String imageUrl = null;
        
        if (imageFile != null && !imageFile.isEmpty()) {
            imageUrl = saveImage(imageFile);
        }
        
        Facility facility = new Facility(name, description, imageUrl);
        Facility savedFacility = facilityRepository.save(facility);
        
        return convertToDto(savedFacility);
    }
    
    /**
     * Get all facilities ordered by creation date (latest first)
     */
    public List<FacilityDto> getAllFacilities() {
        return facilityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get facility by ID
     */
    public FacilityDto getFacilityById(Long id) {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));
        return convertToDto(facility);
    }
    
    /**
     * Update an existing facility
     */
    public FacilityDto updateFacility(Long id, String name, String description, MultipartFile imageFile) throws IOException {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));
        
        if (name != null) {
            facility.setName(name);
        }
        if (description != null) {
            facility.setDescription(description);
        }
        if (imageFile != null && !imageFile.isEmpty()) {
            // Delete old image if exists
            if (facility.getImageUrl() != null) {
                deleteImage(facility.getImageUrl());
            }
            facility.setImageUrl(saveImage(imageFile));
        }
        
        Facility updatedFacility = facilityRepository.save(facility);
        return convertToDto(updatedFacility);
    }
    
    /**
     * Delete a facility
     */
    public void deleteFacility(Long id) {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));
        
        // Delete image if exists
        if (facility.getImageUrl() != null) {
            deleteImage(facility.getImageUrl());
        }
        
        facilityRepository.deleteById(id);
    }
    
    /**
     * Search facilities by name or description
     */
    public List<FacilityDto> searchFacilities(String keyword) {
        List<Facility> nameResults = facilityRepository.findByNameContainingIgnoreCase(keyword);
        List<Facility> descResults = facilityRepository.findByDescriptionContainingIgnoreCase(keyword);
        
        // Combine and remove duplicates
        nameResults.addAll(descResults);
        return nameResults.stream()
                .distinct()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Save uploaded image to local storage
     */
    private String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(imageFile.getInputStream(), filePath);
        return "/uploads/facilities/" + fileName;
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
    private FacilityDto convertToDto(Facility facility) {
        return new FacilityDto(
            facility.getId(),
            facility.getName(),
            facility.getDescription(),
            facility.getImageUrl(),
            facility.getCreatedAt()
        );
    }
}
