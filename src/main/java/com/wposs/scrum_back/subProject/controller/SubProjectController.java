package com.wposs.scrum_back.subProject.controller;

import com.wposs.scrum_back.project.dto.ProjectDto;
import com.wposs.scrum_back.subProject.dto.SubProjectDto;
import com.wposs.scrum_back.subProject.entity.SubProject;
import com.wposs.scrum_back.subProject.service.SubProjectService;
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
@RequestMapping("/subproject")
public class SubProjectController {

    private final SubProjectService subProjectService;

    private final ModelMapper modelMapper;

    public SubProjectController(SubProjectService subProjectService, ModelMapper modelMapper) {
        this.subProjectService = subProjectService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get subproject by UUID")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<SubProjectDto> findById(@PathVariable UUID id){
        return subProjectService.finById(id).map(subProject -> new ResponseEntity<>(modelMapper.map(subProject, SubProjectDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all subprojects")
    @ApiResponse(responseCode = "200",description = "success")
    public ResponseEntity<List<SubProjectDto>> findAll(){
        List<SubProject> subProjects = subProjectService.getAll();
        return new ResponseEntity<>(subProjects.stream().map(subProject  -> modelMapper.map(subProject,SubProjectDto.class))
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    @PostMapping("/save")
    @Operation(summary = "Create subproject")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "subproject created"),
            @ApiResponse(responseCode = "400",description = "subproject bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody SubProjectDto subProjectDto){
        HashMap<String, String> map = new HashMap<>();
        if (subProjectService.existSubProjectByName(subProjectDto.getSubProjectName())){
            map.put("message", "Este nombre de subproyecto ya existe");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        SubProject subProject = subProjectService.save(modelMapper.map(subProjectDto, SubProject.class));
        return new ResponseEntity<>(modelMapper.map(subProject, ProjectDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the subproject")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated subproject"),
            @ApiResponse(responseCode = "404",description = "Project Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateSubProject(@RequestBody SubProject subProject, @PathVariable("id") UUID subProjectId){
        Map<String, Object> map = new HashMap<>();
        map.put("message","Datos invalidos");
        if(subProjectService.finById(subProjectId).isPresent()){
            map.put("message", modelMapper.map(subProjectService.updateSubProject(subProjectId, subProject), SubProjectDto.class));
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Get all subprojects by project id")
    @ApiResponse(responseCode = "200",description = "success")
    public ResponseEntity<List<SubProjectDto>> findAllSubProjectsByProjectId(@PathVariable UUID projectId){
        List<SubProject> subProjects = subProjectService.getSubProjectByProjectId(projectId);
        return new ResponseEntity<>(subProjects.stream().map(subProject -> modelMapper.map(subProject,SubProjectDto.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

}
