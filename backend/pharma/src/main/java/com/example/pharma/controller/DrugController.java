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
    public ResponseEntity<?> addDrug(
            @Valid @ModelAttribute Drug drug,
            BindingResult result,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors()); // <-- show validation errors
        }

        try {
            Drug savedDrug = drugService.saveDrug(drug, image);
            return ResponseEntity.ok(savedDrug);
        } catch (Exception e) {
            e.printStackTrace(); // Log for console
            return ResponseEntity.badRequest().body("Error saving drug: " + e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDrug(@PathVariable String id) {
        try {
            drugService.deleteDrug(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting drug: " + e.getMessage());
        }
    }
    // Add this new endpoint
    @GetMapping("/all")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugService.getAllDrugs();
        return ResponseEntity.ok(drugs);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDrug(
            @PathVariable String id,
            @Valid @ModelAttribute Drug drug,
            BindingResult result,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        System.out.println("Received update for drug: " + drug);
        if (image != null) {
            System.out.println("Received image size: " + image.getSize());
        }

        System.out.println("Received update request for ID: " + id);
        if (result.hasErrors()) {
            System.out.println("Validation errors: " + result.getAllErrors());
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        try {
            // Ensure the ID from path matches the drug ID
            if (!id.equals(drug.getId())) {
                System.out.println("ID mismatch: " + id + " vs " + drug.getId());
                return ResponseEntity.badRequest().body("ID mismatch");
            }

            System.out.println("Updating drug with data: " + drug.toString());
            if (image != null) {
                System.out.println("Including image in update");
            }

            Drug updatedDrug = drugService.saveDrug(drug, image);
            return ResponseEntity.ok(updatedDrug);
        } catch (Exception e) {
            System.out.println("Update error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error updating drug: " + e.getMessage());
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
    @GetMapping("/count")
    public ResponseEntity<Long> getDrugCount() {
        long count = drugService.getDrugCount();
        return ResponseEntity.ok(count);
    }

}
