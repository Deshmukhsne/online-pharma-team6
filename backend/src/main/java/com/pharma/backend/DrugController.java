package com.pharma.backend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {
    private final DrugRepository drugRepository;

    public DrugController(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @GetMapping
    public List<Drug> getAllDrugs() {
        return drugRepository.findAllByOrderByNameAsc();
    }
}