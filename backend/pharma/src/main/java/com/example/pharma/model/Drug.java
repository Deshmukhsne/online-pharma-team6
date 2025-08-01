package com.example.pharma.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Drug {

    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String company;

    @NotBlank
    private String type;

    @Positive
    private double price;

    @Min(0)
    private int quantity;

    @Min(1)
    @Max(5)
    private int rating;

    @NotBlank
    private String banned;

    @Lob
    @NotBlank
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

}
