package com.pharma.backend.controller;

import com.pharma.backend.model.Medicine;
import com.pharma.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    
    @GetMapping("/available-count")
    public long getAvailableMedicinesCount() {
        return medicineService.getAvailableMedicinesCount();
    }

    
    @GetMapping("/cart-count")
    public long getItemsInCartCount() {
        return medicineService.getItemsInCartCount();
    }

    
    @GetMapping("/count")
    public ResponseEntity<Long> getMedicineCount() {
        long count = medicineService.getMedicineCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    
    @PostMapping("/add")
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine) {
        try {
            Medicine savedMedicine = medicineService.saveMedicine(medicine, null); 
            return ResponseEntity.ok(savedMedicine);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving medicine: " + e.getMessage());
        }
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedicine(@PathVariable Long id, @RequestBody Medicine updatedMedicine) {
        try {
            Medicine existing = medicineService.findById(id);
            if (existing == null) {
                return ResponseEntity.badRequest().body("Medicine with ID " + id + " not found.");
            }

          
            existing.setName(updatedMedicine.getName());
            existing.setCompany(updatedMedicine.getCompany());
            existing.setType(updatedMedicine.getType());
            existing.setPrice(updatedMedicine.getPrice());
            existing.setAvailableQuantity(updatedMedicine.getAvailableQuantity());
            existing.setRating(updatedMedicine.getRating());
            existing.setDescription(updatedMedicine.getDescription());
            existing.setBanned(updatedMedicine.isBanned());
            existing.setImageUrl(updatedMedicine.getImageUrl());

            Medicine saved = medicineService.saveMedicine(existing, null); // Skip image logic
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating medicine: " + e.getMessage());
        }
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id) {
        try {
            medicineService.deleteMedicine(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting medicine: " + e.getMessage());
        }
    }

    
    @GetMapping("/verify-image/{filename}")
    public ResponseEntity<String> verifyImage(@PathVariable String filename) {
        Path path = Paths.get("C:/Users/sneha/Downloads/pharma/uploads/images/" + filename);
        if (Files.exists(path)) {
            return ResponseEntity.ok("Image exists at: " + path.toString());
        }
        return ResponseEntity.status(404).body("Image not found at: " + path.toString());
    }
}
