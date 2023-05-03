package com.wposs.scrum_back.board.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

public class BoardDto implements Serializable {
    @JsonProperty(value = "idBoard",access = JsonProperty.Access.READ_ONLY)
    private UUID idBoard;
    @NotNull
    @NotEmpty
    @JsonProperty(value = "idTeam")
    private UUID idTeam;
    @NotNull
    @NotEmpty
    @JsonProperty(value = "idUserStory")
    private UUID idUserStory;
    @NotNull
    @NotEmpty
    @JsonProperty(value = "idTaskTeam")
    private UUID idTaskTeam;
    @NotNull
    @NotEmpty
    @JsonProperty(value = "idEmployee")
    private UUID idEmployee;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date fechaBoard;

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
}
