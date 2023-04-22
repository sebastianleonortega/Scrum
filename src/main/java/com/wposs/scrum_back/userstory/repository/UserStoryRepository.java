package com.wposs.scrum_back.userstory.repository;

import com.wposs.scrum_back.userstory.entity.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserStoryRepository extends JpaRepository<UserStory, UUID> {
        List<UserStory> findBySubProjectId(UUID subProjectId);
        Boolean existsByUserStoryNameAndSubProjectId(String userStoryName,UUID idSubProject);
}
