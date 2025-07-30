package com.pharma.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "drugs")
public class Drug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String company;
    private String type;
    private double price;
    private int quantity;
    
    
    public Drug() {}
    
    
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCompany() { return company; }
    public String getType() { return type; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
}