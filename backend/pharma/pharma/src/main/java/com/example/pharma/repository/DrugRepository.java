package com.example.pharma.repository;

import com.example.pharma.model.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DrugRepository extends JpaRepository<Drug, Long> {

}