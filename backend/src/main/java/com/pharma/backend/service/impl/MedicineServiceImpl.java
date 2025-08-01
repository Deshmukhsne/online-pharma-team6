package com.pharma.backend.service.impl;

import com.pharma.backend.model.Medicine;
import com.pharma.backend.repository.CartRepository;
import com.pharma.backend.repository.MedicineRepository;
import com.pharma.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public long getAvailableMedicinesCount() {
        return medicineRepository.countAvailableMedicines();
    }

    @Override
    public long getItemsInCartCount() {
        return cartRepository.countItemsInCart();
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }
    
    
}
