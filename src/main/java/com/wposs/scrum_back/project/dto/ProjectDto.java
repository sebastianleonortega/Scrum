package com.wposs.scrum_back.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wposs.scrum_back.area.dto.AreaDto;
import com.wposs.scrum_back.area.entity.Area;
import com.wposs.scrum_back.client.dto.ClientDto;
import com.wposs.scrum_back.client.entity.Client;

import javax.validation.constraints.*;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto {

    @JsonProperty(value ="projectId", access = JsonProperty.Access.READ_ONLY)
    private UUID projectId;

    @JsonProperty(value = "projectName")
    @NotNull(message = "el nombre del proyecto no puede ser null")
    @NotEmpty
    @Size(max = 100,message = "el nombre del proyecto no puede sobre pasar los 100 caracter")
    @Pattern(regexp = "^[a-zA-Z ]+$",message = "El campo projectName solo admite letras")
    private String projectName;

    @JsonProperty(value = "areaId")
    @NotNull(message = "El area no puede ser null")
    private UUID areaId;

    @JsonProperty(value = "clientId")
    @NotNull(message = "el cliente no puede ser null")
    @NotEmpty
    @Pattern(regexp = "\\d+",message = "El campo cliente solo se admiten numeros")
    private String clientId;

    @JsonProperty(value = "archive")
    @NotNull
    private Byte[] archive;

    public Byte[] getArchive() {
        return archive;
    }

    public void setArchive(Byte[] archive) {
        this.archive = archive;
    }

    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public UUID getAreaId() {
        return areaId;
    }

    public void setAreaId(UUID areaId) {
        this.areaId = areaId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
