package com.wposs.scrum_back.sprint.entity;

import com.wposs.scrum_back.area.entity.Area;
import com.wposs.scrum_back.team.entity.Team;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "Sprint",schema = "wposs")
public class Sprint {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "sprint_id")
    private UUID sprintId;
    @Column(name = "fk_area_id",nullable = false,length = 40)
    private UUID areaId;
    @Column(name = "fk_team_id",nullable = false,length = 40)
    private UUID teamId;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_inicial")
    private Date fechaInical;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_final")
    private Date getFechaFinal;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numero_sprint")
    private Integer nuSprint;

    @ManyToOne
    @JoinColumn(name = "fk_area_id",insertable = false,updatable = false)
    private Area area;

    @ManyToOne
    @JoinColumn(name = "fk_team_id",insertable = false,updatable = false)
    private Team team;

    public UUID getSprintId() {
        return sprintId;
    }

    public void setSprintId(UUID sprintId) {
        this.sprintId = sprintId;
    }

    public UUID getAreaId() {
        return areaId;
    }

    public void setAreaId(UUID areaId) {
        this.areaId = areaId;
    }

    public UUID getTeamId() {
        return teamId;
    }

    public void setTeamId(UUID teamId) {
        this.teamId = teamId;
    }

    public Date getFechaInical() {
        return fechaInical;
    }

    public void setFechaInical(Date fechaInical) {
        this.fechaInical = fechaInical;
    }

    public Date getGetFechaFinal() {
        return getFechaFinal;
    }

    public void setGetFechaFinal(Date getFechaFinal) {
        this.getFechaFinal = getFechaFinal;
    }

    public Integer getNuSprint() {
        return nuSprint;
    }

    public void setNuSprint(Integer nuSprint) {
        this.nuSprint = nuSprint;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
