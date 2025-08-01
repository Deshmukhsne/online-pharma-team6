package com.pharma.backend.controller;

import com.pharma.backend.model.Medicine;
import com.pharma.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }
}
