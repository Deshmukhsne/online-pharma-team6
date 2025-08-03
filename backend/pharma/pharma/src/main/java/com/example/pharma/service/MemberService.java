package com.example.pharma.service;

import com.example.pharma.model.Member;
import com.example.pharma.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }
    public long getMemberCount() {
        return repository.count();
    }
    public List<Member> getAllMembers() {
        return repository.findAll();
    }

    public Member addMember(Member member) {
        member.setStatus("Pending");
        return repository.save(member);
    }

    public void deleteMember(Long id) {
        repository.deleteById(id);
    }

    public Member updateStatus(Long id, String status) {
        Member m = repository.findById(id).orElseThrow();
        m.setStatus(status);
        return repository.save(m);
    }


}
