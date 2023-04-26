package com.wposs.scrum_back.subProject.dto;

import  com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubProjectDto {

    @JsonProperty(value = "subProjectId", access = JsonProperty.Access.READ_ONLY)
    private UUID subProjectId;

    @JsonProperty(value = "subProjectName")
    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String subProjectName;

    @JsonProperty(value = "projectId")
    private UUID projectId;

    @JsonProperty(value = "idTeam")
    private UUID idTeam;
    @JsonProperty(value = "projectName",access = JsonProperty.Access.READ_ONLY)
    private String projectName;
    @JsonProperty(value = "teamName",access = JsonProperty.Access.READ_ONLY)
    private String teamName;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public UUID getIdTeam() {
        return idTeam;
    }

    public void setIdTeam(UUID idTeam) {
        this.idTeam = idTeam;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

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
}
