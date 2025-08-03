package com.example.pharma.controller;

import com.example.pharma.model.Member;
import com.example.pharma.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173") // Update based on your frontend port
public class MemberController {

    private final MemberService service;

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
    @PostMapping
    public Member add(@RequestBody Member member) {
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

//    @PostMapping("/login")
//    public Optional<Member> login(@RequestParam String email) {
//        return service.loginIfAccepted(email);
//    }
}
