package com.wposs.scrum_back.project.service;

import com.wposs.scrum_back.project.dto.ProjectDto;
import com.wposs.scrum_back.project.entity.Project;
import com.wposs.scrum_back.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAll(){
        return projectRepository.findAll();
    }

    public Project save(Project project){
        return projectRepository.save(project);
    }

    public Optional<Project> finById(UUID projectId){
        return projectRepository.findById(projectId);
    }

    public Project updateProject(UUID projectId, ProjectDto projectDto){
        return projectRepository.findById(projectId).map(project1 -> {
            project1.setProjectName((projectDto.getProjectName()!=null)? projectDto.getProjectName() : project1.getProjectName());
            project1.setAreaId((projectDto.getAreaId()!=null)?projectDto.getAreaId():project1.getAreaId());
            project1.setClientId((projectDto.getClientId()!=null)?projectDto.getClientId():project1.getClientId());
            return projectRepository.save(project1);
        }).orElse(null);
    }

    public Boolean existProjectByName(String projectName){
        return projectRepository.existsByProjectName(projectName);
    }

    public List<Project> getProjectsByAreaId(UUID areaId){
        return projectRepository.getByAreaId(areaId);
    }
}
