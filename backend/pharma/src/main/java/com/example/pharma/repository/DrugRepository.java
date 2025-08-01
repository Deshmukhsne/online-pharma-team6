package com.example.pharma.repository;

import com.example.pharma.model.Drug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugRepository extends JpaRepository<Drug, String> {
}