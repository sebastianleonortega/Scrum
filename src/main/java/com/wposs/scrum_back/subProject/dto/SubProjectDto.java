package com.wposs.scrum_back.subProject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wposs.scrum_back.project.dto.ProjectDto;
import com.wposs.scrum_back.project.entity.Project;


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

    private String projectName;

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
