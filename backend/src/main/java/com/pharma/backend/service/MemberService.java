package com.pharma.backend.service;

import com.pharma.backend.model.Member;

import java.util.List;
import java.util.Optional;

public interface MemberService {

    Member registerMember(Member member);

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long id);

    List<Member> getAllMembers();

    long getMemberCount();

    Member addMember(Member member);

    void deleteMember(Long id);

    Member updateStatus(Long id, String status);

}
