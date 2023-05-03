package com.wposs.scrum_back.board.repository;

import com.wposs.scrum_back.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BoardRepository extends JpaRepository<Board, UUID> {
   // @Query(value = "SELECT te.team_id,te.team_name,tt.task_team_id,tt.task_team_name,e.employee_name,e.employee_id,sp.sub_project_id,sp.sub_project_name,us.user_story_id,us.user_story_name FROM wposs.team te INNER JOIN wposs.task_team tt ON te.team_id = tt.fk_team INNER JOIN wposs.team_employee em ON te.team_id = em.team_id INNER JOIN wposs.employee e ON em.employee_id = e.employee_id INNER JOIN wposs.sub_project sp ON te.team_id = sp.team_id INNER JOIN wposs.user_story us ON sp.sub_project_id = us.sub_project_id WHERE te.team_id=?1",nativeQuery = true)
    //List<?> getAllBoard(UUID idTeam);
}
