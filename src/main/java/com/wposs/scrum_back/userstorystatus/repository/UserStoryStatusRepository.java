package com.wposs.scrum_back.userstorystatus.repository;

import com.wposs.scrum_back.userstorystatus.entity.UserStoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStoryStatusRepository extends JpaRepository<UserStoryStatus,Long> {
}
