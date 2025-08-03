package com.pharma.backend.controller;

import com.pharma.backend.model.Member;
import com.pharma.backend.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerMember(
            @Valid @RequestBody Member member,
            BindingResult bindingResult) {
        
       
        System.out.println("Registration request received: " + member.toString());

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
                System.out.println("Validation error: " + error.getField() + " - " + error.getDefaultMessage());
            }
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errors);
        }
        
       
        if (member.getAddress() == null || member.getAddress().trim().isEmpty()) {
            System.out.println("Address validation failed: address is null or empty");
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("address", "Address is required"));
        }

        try {
            Member registeredMember = memberService.registerMember(member);
            System.out.println("Registration successful for: " + registeredMember.getEmail());
            return ResponseEntity.ok(registeredMember);
        } catch (RuntimeException e) {
            System.out.println("Registration failed: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}