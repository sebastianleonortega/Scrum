package com.wposs.scrum_back.improvements.entity;

import com.wposs.scrum_back.area.entity.Area;
import com.wposs.scrum_back.observation.entity.Observation;
import com.wposs.scrum_back.task.entity.Task;
import com.wposs.scrum_back.team.entity.Team;
import com.wposs.scrum_back.userstory.entity.UserStory;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "improvements",schema = "wposs")
public class Improvements {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "improvements_id")
    private UUID improvementsId;
    @Column(name = "fk_area_improvements",nullable = false,length = 40)
    private UUID areaIdImpro;
    @Column(name = "fk_team_improvements",nullable = false,length = 40)
    private UUID teamId;
    @Column(name = "fk_userStory_improvements",nullable = false,length = 40)
    private UUID userStoryId;
    @Column(name = "fk_task_id",nullable = false,length = 40)
    private UUID taskId;
    @Column(name = "fk_observation_id",nullable = false,length = 40)
    private UUID observationId;
    @Column(name = "observation",nullable = false,length = 200)
    private String observationn;

    @ManyToOne
    @JoinColumn(name = "fk_area_improvements",insertable = false,updatable = false)
    private Area area;
    @ManyToOne
    @JoinColumn(name = "fk_task_id",insertable = false,updatable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "fk_observation_id",insertable = false,updatable = false)
    private Observation observation;
    @ManyToOne
    @JoinColumn(name = "fk_team_improvements",insertable = false,updatable = false)
    private Team team;
    @ManyToOne
    @JoinColumn(name = "fk_userStory_improvements",insertable = false,updatable = false)
    private UserStory userStory;

    public UUID getImprovementsId() {
        return improvementsId;
    }

    public void setImprovementsId(UUID improvementsId) {
        this.improvementsId = improvementsId;
    }

    public UUID getAreaIdImpro() {
        return areaIdImpro;
    }

    public void setAreaIdImpro(UUID areaIdImpro) {
        this.areaIdImpro = areaIdImpro;
    }

    public UUID getTeamId() {
        return teamId;
    }

    public void setTeamId(UUID teamId) {
        this.teamId = teamId;
    }

    public UUID getUserStoryId() {
        return userStoryId;
    }

    public void setUserStoryId(UUID userStoryId) {
        this.userStoryId = userStoryId;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public UUID getObservationId() {
        return observationId;
    }

    public void setObservationId(UUID observationId) {
        this.observationId = observationId;
    }

    public String getObservationn() {
        return observationn;
    }

    public void setObservationn(String observationn) {
        this.observationn = observationn;
    }
}
