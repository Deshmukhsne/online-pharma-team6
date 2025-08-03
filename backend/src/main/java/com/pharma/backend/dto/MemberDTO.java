package com.pharma.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MemberDTO {
    private String name;
    private LocalDate dob;
    private String email;
    private String password;
    private String mobile;
    private String address;
}