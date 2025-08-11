package com.pharma.backend.controller;

import com.pharma.backend.model.Member;
import com.pharma.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping
    public List<Member> getAll() {
        return service.getAllMembers();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getMemberCount() {
        long count = service.getMemberCount();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Member member) {
        try {
            if (member.getName() == null || member.getEmail() == null ||
                member.getMobile() == null || member.getAddress() == null ||
                member.getPassword() == null || member.getDob() == null) {
                return ResponseEntity.badRequest().body("Missing required fields.");
            }

            member.setPassword(passwordEncoder.encode(member.getPassword()));
            member.setDisabled(true);  
            member.setRole("MEMBER");

            Member savedMember = service.addMember(member);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Member> add(@RequestBody Member member) {
        if (member.getName() == null || member.getEmail() == null ||
            member.getMobile() == null || member.getAddress() == null ||
            member.getPassword() == null || member.getDob() == null) {
            return ResponseEntity.badRequest().build();
        }

        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setDisabled(true);  
        member.setRole("MEMBER");

        return ResponseEntity.ok(service.addMember(member));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Member> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Member> optionalMember = service.findById(id);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();

            
            if (status.equalsIgnoreCase("Approved")) {
                member.setDisabled(false);  
            } else {
                member.setDisabled(true);   
            }

            return ResponseEntity.ok(service.addMember(member));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<Member> memberOptional = service.findByEmail(email);

        if (memberOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Member member = memberOptional.get();

        if (!passwordEncoder.matches(password, member.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        if (member.isDisabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Wait for approval");
        }

        return ResponseEntity.ok(member);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable Long id) {
        Optional<Member> member = service.findById(id);
        return member.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Member updatedData) {
        Optional<Member> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Member member = existing.get();
        if (updatedData.getName() != null) member.setName(updatedData.getName());
        if (updatedData.getEmail() != null) member.setEmail(updatedData.getEmail());
        if (updatedData.getMobile() != null) member.setMobile(updatedData.getMobile());
        if (updatedData.getAddress() != null) member.setAddress(updatedData.getAddress());
        if (updatedData.getDob() != null) member.setDob(updatedData.getDob());
        if (updatedData.getRole() != null) member.setRole(updatedData.getRole());

        Member updated = service.addMember(member);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String newPassword = payload.get("newPassword");

        Optional<Member> memberOptional = service.findByEmail(email);

        if (memberOptional.isEmpty()) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        Member member = memberOptional.get();
        member.setPassword(passwordEncoder.encode(newPassword));

        service.addMember(member); 

        return ResponseEntity.ok(Map.of("success", true));
}
}
