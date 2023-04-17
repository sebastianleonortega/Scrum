package com.wposs.scrum_back.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wposs.scrum_back.area.dto.AreaDto;
import com.wposs.scrum_back.area.entity.Area;
import com.wposs.scrum_back.client.dto.ClientDto;
import com.wposs.scrum_back.client.entity.Client;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto {

    @JsonProperty(value ="projectId", access = JsonProperty.Access.READ_ONLY)
    private UUID projectId;

    @JsonProperty(value = "projectName")
    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String projectName;

    @JsonProperty(value = "areaId")
    private UUID areaId;

    @JsonProperty(value = "clientId")
    private String clientId;




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
