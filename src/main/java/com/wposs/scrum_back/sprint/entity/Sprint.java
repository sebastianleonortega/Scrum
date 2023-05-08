package com.wposs.scrum_back.sprint.entity;

import com.wposs.scrum_back.area.entity.Area;
import com.wposs.scrum_back.team.entity.Team;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serial;
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
    private Date sprintStart;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_final")
    private Date sprintEnd;
    @Column(name = "numero_sprint")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "numero_sprint_seq")
    @SequenceGenerator(name = "numero_sprint_seq", sequenceName = "numero_sprint_seq", allocationSize = 1)
    private Long sprintCount;

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

    public Date getSprintStart() {
        return sprintStart;
    }

    public void setSprintStart(Date sprintStart) {
        this.sprintStart = sprintStart;
    }

    public Date getSprintEnd() {
        return sprintEnd;
    }

    public void setSprintEnd(Date sprintEnd) {
        this.sprintEnd = sprintEnd;
    }

    public Long getSprintCount() {
        return sprintCount;
    }

    public void setSprintCount(Long sprintCount) {
        this.sprintCount = sprintCount;
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
