package com.wposs.scrum_back.taskteam.repository;

import com.wposs.scrum_back.taskteam.entity.TaskTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskTeamRepository extends JpaRepository<TaskTeam, UUID> {
    List<TaskTeam> getByIdTeam(UUID idTeam);
    Boolean existsByTaskTeamNameAndIdTeam(String taskTeamName,UUID idTeam);
}
