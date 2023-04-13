package com.wposs.scrum_back.client.entity;

import com.wposs.scrum_back.project.entity.Project;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "client", schema = "wposs")
public class Client {

    @Id
    @Column(name = "client_id")
    private String clientId;

    @Column(name = "client_name", nullable = false, length = 100)
    private String clientName;

    @OneToMany(mappedBy = "client")
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