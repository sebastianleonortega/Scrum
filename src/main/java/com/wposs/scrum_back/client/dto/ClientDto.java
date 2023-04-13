package com.wposs.scrum_back.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wposs.scrum_back.project.entity.Project;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientDto {
    @JsonProperty(value = "clientNit")
    @NotNull
    @NotEmpty
    @Size(max = 20)
    private String clientId;

    @JsonProperty(value = "client_name")
    @NotNull
    @NotEmpty
    @Size(max = 20)
    private String clientName;

    @JsonIgnore
    private List<Project> projects;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
