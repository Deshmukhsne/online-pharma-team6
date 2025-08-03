package com.example.pharma.controller;

import com.example.pharma.model.Drug;
import com.example.pharma.service.DrugService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/drugs")
@CrossOrigin(origins = "http://localhost:5173")
public class DrugController {

    private final DrugService drugService;

    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addDrugJson(@RequestBody Drug drug) {
        try {
            Drug savedDrug = drugService.saveDrug(drug, null); // No image passed
            return ResponseEntity.ok(savedDrug);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving drug: " + e.getMessage());
        }
    }


    // Add this new endpoint
    @GetMapping("/all")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugService.getAllDrugs();
        return ResponseEntity.ok(drugs);
    }



    @GetMapping("/verify-image/{filename}")
    public ResponseEntity<String> verifyImage(@PathVariable String filename) {
        Path path = Paths.get("C:/Users/sneha/Downloads/pharma/uploads/images/" + filename);
        if (Files.exists(path)) {
            return ResponseEntity.ok("Image exists at: " + path.toString());
        }
        return ResponseEntity.status(404).body("Image not found at: " + path.toString());
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getDrugCount() {
        long count = drugService.getDrugCount();
        return ResponseEntity.ok(count);
    }
    // Change from String to Long for delete endpoint
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDrug(@PathVariable Long id) {  // Change from String to Long
        try {
            drugService.deleteDrug(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting drug: " + e.getMessage());
        }
    }

    // Ensure consistent Long type for update endpoint
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDrug(@PathVariable Long id, @RequestBody Drug drug) {
        try {
            if (!id.equals(drug.getId())) {
                return ResponseEntity.badRequest().body("ID mismatch");
            }
            Drug updatedDrug = drugService.updateDrug(drug);
            return ResponseEntity.ok(updatedDrug);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating drug: " + e.getMessage());
        }
    }
}
