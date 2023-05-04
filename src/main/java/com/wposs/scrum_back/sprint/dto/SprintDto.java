package com.wposs.scrum_back.sprint.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

public class SprintDto {
    @JsonProperty(value = "sprintgId",access = JsonProperty.Access.READ_ONLY)
    private UUID sprintgId;
    @JsonProperty(value = "areaId")
    @NotNull
    private UUID areaId;
    @JsonProperty(value = "teamId")
    @NotNull
    private UUID teamId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date fechaInical;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date getFechaFinal;
    @JsonProperty(value = "nuSprint",access = JsonProperty.Access.READ_ONLY)
    private Integer nuSprint;

    public UUID getSprintgId() {
        return sprintgId;
    }

    public void setSprintgId(UUID sprintgId) {
        this.sprintgId = sprintgId;
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
}
