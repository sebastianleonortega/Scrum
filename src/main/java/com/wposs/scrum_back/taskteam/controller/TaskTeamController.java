package com.wposs.scrum_back.taskteam.controller;

import com.wposs.scrum_back.taskteam.dto.TaskTeamDto;
import com.wposs.scrum_back.taskteam.entity.TaskTeam;
import com.wposs.scrum_back.taskteam.service.TaskTeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/taskteam")
public class TaskTeamController {
    private final TaskTeamService taskTeamService;

    private final ModelMapper modelMapper;

    public TaskTeamController(TaskTeamService taskTeamService, ModelMapper modelMapper) {
        this.taskTeamService = taskTeamService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/createtask")
    @Operation(summary = "Create task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "task created"),
            @ApiResponse(responseCode = "200",description = "task bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody TaskTeamDto taskTeamDto){
        TaskTeam taskTeam = taskTeamService.save(modelMapper.map(taskTeamDto, TaskTeam.class));
        return new ResponseEntity<>(modelMapper.map(taskTeam, TaskTeamDto.class), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all task")
    @ApiResponse(responseCode = "200",description = "success")
    public ResponseEntity<List<TaskTeamDto>> findAll(){
        List<TaskTeam> taskTeams = taskTeamService.getAll();
        return new ResponseEntity<>(taskTeams.stream().map(taskTeam -> modelMapper.map(taskTeam,TaskTeamDto.class))
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    @GetMapping("/{taskTeamId}")
    @Operation(summary = "Get task by UUID")
    @ApiResponse(responseCode = "200",description = "success")
    public ResponseEntity<TaskTeamDto> findById(@PathVariable UUID taskTeamId){
        return taskTeamService.getTaskTeam(taskTeamId).map(taskTeam -> new ResponseEntity<>(modelMapper.map(taskTeam, TaskTeamDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

//    @GetMapping("/team/{teamId}")
//    @ApiOperation("Get all task by team id")
//    @ApiResponses({@ApiResponse(code = 200, message = "success")})
//    public ResponseEntity<List<TaskTeamDto>> findByTeamId(@PathVariable UUID teamId){
//        List<TaskTeam> taskTeams = taskTeamService.getByTeam(teamId);
//        return new ResponseEntity<>(taskTeams.stream().map(taskTeam -> modelMapper.map(taskTeam,TaskTeamDto.class))
//                .collect(Collectors.toList()), HttpStatus.OK);
//    }

}
