package com.pharma.backend.service;

import com.pharma.backend.model.Medicine;
import java.util.List;

public interface MedicineService {
    long getAvailableMedicinesCount();
    long getItemsInCartCount();
    List<Medicine> getAllMedicines();
}
