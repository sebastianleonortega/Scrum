package com.wposs.scrum_back.board.entity;

import com.wposs.scrum_back.employe.entity.Employee;
import com.wposs.scrum_back.taskteam.entity.TaskTeam;
import com.wposs.scrum_back.team.entity.Team;
import com.wposs.scrum_back.userstory.entity.UserStory;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "board",schema = "wposs")
public class Board {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_board")
    private UUID idBoard;
    @Column(name = "fk_team",nullable = false,length = 40)
    private UUID idTeam;
    @Column(name = "fk_user_story",nullable = false,length = 40)
    private UUID idUserStory;
    @Column(name = "fk_task_team",nullable = false,length = 40)
    private UUID idTaskTeam;
    @Column(name = "fk_employee",nullable = false,length = 40)
    private UUID idEmployee;
    @Column(name = "fecha_board",nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fechaBoard;

    @ManyToOne
    @JoinColumn(name = "fk_team",insertable = false,updatable = false)
    private Team teamBoard;
    @ManyToOne
    @JoinColumn(name = "fk_user_story",insertable = false,updatable = false)
    private UserStory userStory;

    @ManyToOne
    @JoinColumn(name = "fk_task_team",insertable = false,updatable = false)
    private TaskTeam taskTeam;

    @ManyToOne
    @JoinColumn(name = "fk_employee",insertable = false,updatable = false)
    private Employee employee;

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public TaskTeam getTaskTeam() {
        return taskTeam;
    }

    public void setTaskTeam(TaskTeam taskTeam) {
        this.taskTeam = taskTeam;
    }

    public UserStory getUserStory() {
        return userStory;
    }

    public void setUserStory(UserStory userStory) {
        this.userStory = userStory;
    }

    public UUID getIdBoard() {
        return idBoard;
    }

    public void setIdBoard(UUID idBoard) {
        this.idBoard = idBoard;
    }

    public UUID getIdTeam() {
        return idTeam;
    }

    public void setIdTeam(UUID idTeam) {
        this.idTeam = idTeam;
    }

    public UUID getIdUserStory() {
        return idUserStory;
    }

    public void setIdUserStory(UUID idUserStory) {
        this.idUserStory = idUserStory;
    }

    public UUID getIdTaskTeam() {
        return idTaskTeam;
    }

    public void setIdTaskTeam(UUID idTaskTeam) {
        this.idTaskTeam = idTaskTeam;
    }

    public UUID getIdEmployee() {
        return idEmployee;
    }

    public void setIdEmployee(UUID idEmployee) {
        this.idEmployee = idEmployee;
    }

    public Date getFechaBoard() {
        return fechaBoard;
    }

    public void setFechaBoard(Date fechaBoard) {
        this.fechaBoard = fechaBoard;
    }

    public Team getTeam() {
        return teamBoard;
    }

    public void setTeam(Team team) {
        this.teamBoard = team;
    }

    public Team getTeamBoard() {
        return teamBoard;
    }

    public void setTeamBoard(Team teamBoard) {
        this.teamBoard = teamBoard;
    }
}
