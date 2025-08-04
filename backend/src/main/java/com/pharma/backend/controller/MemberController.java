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
            member.setPassword(passwordEncoder.encode(member.getPassword()));
            Member savedMember = service.addMember(member);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping
    public Member add(@RequestBody Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        return service.addMember(member);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteMember(id);
    }

    @PutMapping("/{id}/status")
    public Member updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
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

        if (!member.isApproved()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not approved");
        }

        if (member.isDisabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User account is disabled");
        }

        return ResponseEntity.ok(member);
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable Long id) {
        Optional<Member> member = service.findById(id);
        return member.map(ResponseEntity::ok)
                     .orElseThrow();
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Member updatedData) {
        Optional<Member> existing = service.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Member member = existing.get();
        member.setName(updatedData.getName());
        member.setEmail(updatedData.getEmail());
        member.setMobile(updatedData.getMobile());
        member.setAddress(updatedData.getAddress());

        Member updated = service.addMember(member);
        return ResponseEntity.ok(updated);
    }
}
