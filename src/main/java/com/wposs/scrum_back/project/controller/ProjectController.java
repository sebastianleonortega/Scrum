package com.wposs.scrum_back.project.controller;

import com.wposs.scrum_back.project.dto.ProjectDto;
import com.wposs.scrum_back.project.entity.Project;
import com.wposs.scrum_back.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    private final ModelMapper modelMapper;

    public ProjectController(ProjectService projectService, ModelMapper modelMapper) {
        this.projectService = projectService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project by UUID")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<ProjectDto> findById(@PathVariable UUID id){
        return projectService.finById(id).map(project -> new ResponseEntity<>(modelMapper.map(project, ProjectDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all projects")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<ProjectDto>> findAll(){
        List<Project> projects = projectService.getAll();
        return new ResponseEntity<>(projects.stream().map(project -> modelMapper.map(project,ProjectDto.class))
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    @PostMapping("/save")
    @Operation(summary = "Create project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "project created"),
            @ApiResponse(responseCode = "400",description = "project bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody ProjectDto projectDto){
        HashMap<String, String> map = new HashMap<>();
        if (projectService.existProjectByName(projectDto.getProjectName())){
            map.put("message", "Este nombre de proyecto ya existe");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        Project project = projectService.save(modelMapper.map(projectDto, Project.class));
        return new ResponseEntity<>(modelMapper.map(project, ProjectDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated project"),
            @ApiResponse(responseCode = "404",description = "Project Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateProject(@Valid @RequestBody ProjectDto projectDto, @PathVariable("id") UUID projectId){
        Map<String, Object> map = new HashMap<>();
        map.put("message","Datos invalidos");
        ProjectDto projectDto1 = modelMapper.map(projectService.updateProject(projectId,projectDto),ProjectDto.class);
        if(projectDto1!=null){
            map.put("message",projectDto1);
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/area/{areaId}")
    @Operation(summary = "Get all projects by area id")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<ProjectDto>> findAllProjectsByAreaId(@PathVariable UUID areaId){
        List<Project> projects = projectService.getProjectsByAreaId(areaId);
        return new ResponseEntity<>(projects.stream().map(project -> modelMapper.map(project,ProjectDto.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }
}
