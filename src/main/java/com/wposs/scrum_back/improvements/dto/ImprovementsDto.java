package com.wposs.scrum_back.improvements.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.UUID;

public class ImprovementsDto implements Serializable {
    @JsonProperty(value = "improvementsId",access = JsonProperty.Access.READ_ONLY)
    private UUID improvementsId;
    @JsonProperty(value = "areaIdImpro")
    @NotNull
    private UUID areaId;
    @JsonProperty(value = "teamId")
    @NotNull
    private UUID teamId;
    @JsonProperty(value = "userStoryId")
    @NotNull
    private UUID userStoryId;
    @JsonProperty(value = "taskId")
    @NotNull
    private UUID taskId;
    @JsonProperty(value = "observationId")
    @NotNull
    private UUID observationId;
    @JsonProperty(value = "observationn")
    @NotBlank
    private String observationn;

    public UUID getImprovementsId() {
        return improvementsId;
    }

    public void setImprovementsId(UUID improvementsId) {
        this.improvementsId = improvementsId;
    }

    public UUID getAreaIdImpro() {
        return areaId;
    }

    public void setAreaIdImpro(UUID areaIdImpro) {
        this.areaId = areaIdImpro;
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
