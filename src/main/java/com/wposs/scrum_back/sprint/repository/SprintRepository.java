package com.wposs.scrum_back.sprint.repository;

import com.wposs.scrum_back.sprint.entity.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SprintRepository extends JpaRepository<Sprint, UUID> {
}
