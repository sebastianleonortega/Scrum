package com.wposs.scrum_back.subProject.entity;

import com.wposs.scrum_back.project.entity.Project;
import com.wposs.scrum_back.team.entity.Team;
import com.wposs.scrum_back.userstory.entity.UserStory;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "sub_project", schema = "wposs")
public class SubProject {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "sub_project_id")
    @Type(type="pg-uuid")
    private UUID subProjectId;

    @Column(name = "sub_project_name", length = 30)
    private String subProjectName;

    @Column(name="project_id")
    @Type(type="pg-uuid")
    private UUID projectId;
    @Column(name = "team_id")
    private UUID idTeam;


    @ManyToOne
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private Project project;

    @OneToMany(mappedBy = "subProject")
    private List<UserStory> userStories;
    @ManyToOne
    @JoinColumn(name = "team_id",updatable = false,insertable = false)
    private Team team;


    public UUID getSubProjectId() {
        return subProjectId;
    }

    public void setSubProjectId(UUID subProjectId) {
        this.subProjectId = subProjectId;
    }

    public String getSubProjectName() {
        return subProjectName;
    }

    public void setSubProjectName(String subProjectName) {
        this.subProjectName = subProjectName;
    }

    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<UserStory> getUserStories() {
        return userStories;
    }

    public void setUserStories(List<UserStory> userStories) {
        this.userStories = userStories;
    }

    public UUID getIdTeam() {
        return idTeam;
    }

    public void setIdTeam(UUID idTeam) {
        this.idTeam = idTeam;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
