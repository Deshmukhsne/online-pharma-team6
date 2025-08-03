package com.example.pharma.service;

import com.example.pharma.model.Drug;
import com.example.pharma.repository.DrugRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class DrugService {

    private final DrugRepository drugRepository;
    private final String uploadDir = "uploads/";

    public DrugService(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
        new File(uploadDir).mkdirs(); // ensure directory exists
    }

    public Drug saveDrug(Drug drug, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir + "images/");

            // Create directories if they don't exist
            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Set image URL without leading slash
            drug.setImageUrl("images/" + fileName); // Changed from "/images/" to "images/"
            System.out.println("Image saved to: " + filePath.toString());
            System.out.println("Image URL set to: " + drug.getImageUrl());
        }
        return drugRepository.save(drug);
    }

    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }

    public long getDrugCount() {
        return drugRepository.count();
    }
    public void deleteDrug(Long id) {  // Change parameter from String to Long
        drugRepository.deleteById(id);
    }

    // Add dedicated update method
    public Drug updateDrug(Drug drug) {
        // First check if drug exists
        Drug existingDrug = drugRepository.findById(drug.getId())
                .orElseThrow(() -> new RuntimeException("Drug not found with id: " + drug.getId()));

        // Update only the allowed fields
        existingDrug.setName(drug.getName());
        existingDrug.setCompany(drug.getCompany());
        existingDrug.setType(drug.getType());
        existingDrug.setPrice(drug.getPrice());
        existingDrug.setQuantity(drug.getQuantity());
        existingDrug.setRating(drug.getRating());
        existingDrug.setDescription(drug.getDescription());

        return drugRepository.save(existingDrug);
    }

}
