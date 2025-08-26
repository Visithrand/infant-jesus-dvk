package com.infantjesus.controller;

import com.infantjesus.dto.FacilityDto;
import com.infantjesus.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/facilities")
@CrossOrigin(origins = "*")
public class FacilityController {
    
    @Autowired
    private FacilityService facilityService;
    
    /**
     * Get all facilities (public endpoint)
     */
    @GetMapping
    public ResponseEntity<List<FacilityDto>> getAllFacilities() {
        List<FacilityDto> facilities = facilityService.getAllFacilities();
        return ResponseEntity.ok(facilities);
    }
    
    /**
     * Get facility by ID (public endpoint)
     */
    @GetMapping("/{id}")
    public ResponseEntity<FacilityDto> getFacilityById(@PathVariable Long id) {
        try {
            FacilityDto facility = facilityService.getFacilityById(id);
            return ResponseEntity.ok(facility);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Search facilities (public endpoint)
     */
    @GetMapping("/search")
    public ResponseEntity<List<FacilityDto>> searchFacilities(@RequestParam String keyword) {
        List<FacilityDto> facilities = facilityService.searchFacilities(keyword);
        return ResponseEntity.ok(facilities);
    }
    
    /**
     * Create new facility (admin only)
     */
    @PostMapping("/admin")
    public ResponseEntity<FacilityDto> createFacility(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            FacilityDto createdFacility = facilityService.createFacility(name, description, imageFile);
            return ResponseEntity.ok(createdFacility);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Update facility (admin only)
     */
    @PutMapping("/admin/{id}")
    public ResponseEntity<FacilityDto> updateFacility(
            @PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            FacilityDto updatedFacility = facilityService.updateFacility(id, name, description, imageFile);
            return ResponseEntity.ok(updatedFacility);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Delete facility (admin only)
     */
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteFacility(@PathVariable Long id) {
        try {
            facilityService.deleteFacility(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
