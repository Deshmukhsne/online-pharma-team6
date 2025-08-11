package com.pharma.backend.repository;

import com.pharma.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT COUNT(c) FROM CartItem c")
    long countItemsInCart();
    
    long count(); 
}
