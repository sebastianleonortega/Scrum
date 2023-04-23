package com.wposs.scrum_back.taskteam.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskTeamDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UUID taskTeamId;

    private String taskTeamName;

    private UUID idTeam;
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

    public UUID getTaskTeamId() {
        return taskTeamId;
    }

    public void setTaskTeamId(UUID taskTeamId) {
        this.taskTeamId = taskTeamId;
    }

    public String getTaskTeamName() {
        return taskTeamName;
    }

    public void setTaskTeamName(String taskTeamName) {
        this.taskTeamName = taskTeamName;
    }

}
