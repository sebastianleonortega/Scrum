package com.wposs.scrum_back.team.controller;

import com.wposs.scrum_back.team.dto.TeamDto;
import com.wposs.scrum_back.team.entity.Team;
import com.wposs.scrum_back.team.service.TeamService;
import com.wposs.scrum_back.employee.dto.EmployeDto;
import com.wposs.scrum_back.employee.entity.Employee;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/team")
public class TeamController {

    private final TeamService teamService;

    private final ModelMapper modelMapper;

    public TeamController(TeamService teamService, ModelMapper modelMapper) {
        this.teamService = teamService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get team by UUID")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<TeamDto> findById(@PathVariable UUID id){
        return teamService.finById(id).map(team -> new ResponseEntity<>(modelMapper.map(team, TeamDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all teams")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<TeamDto>> findAll(){
        List<Team> teams = teamService.getAll();
        return new ResponseEntity<>(teams.stream().map(team -> modelMapper.map(team,TeamDto.class))
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    @PostMapping("/save")
    @Operation(summary = "Create team")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Team Create"),
            @ApiResponse(responseCode = "400",description = "team bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody TeamDto teamDto){
        HashMap<String, String> map = new HashMap<>();
        if (teamService.existProjectByName(teamDto.getTeamName())){
            map.put("message", "Este nombre de equipo ya existe");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        Team team = teamService.save(modelMapper.map(teamDto, Team.class));
        return new ResponseEntity<>(modelMapper.map(team, TeamDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the team")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated team"),
            @ApiResponse(responseCode = "404",description = "Project Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateTeam(@RequestBody TeamDto team, @PathVariable("id") UUID teamId){
        HashMap<String,Object> respuesta = new HashMap<>();
        respuesta.put("message","ERROR AL ACTUALIZAR EL TEAM");
        if (teamService.finById(teamId).isPresent()){
            Team team1 = modelMapper.map(team,Team.class);
            respuesta.put("message",modelMapper.map(teamService.updateTeam(teamId,team1),TeamDto.class));
            return new ResponseEntity<>(respuesta,HttpStatus.OK);
        }
        return new ResponseEntity<>(respuesta,HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/area/{areaId}")
    @Operation(summary = "Get all teams by area id")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<TeamDto>> findAllProjectsByAreaId(@PathVariable UUID areaId){
        List<Team> teams = teamService.getTeamsByAreaId(areaId);
        return new ResponseEntity<>(teams.stream().map(team -> modelMapper.map(team,TeamDto.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @PutMapping("/saveemployeeonteam/{id}")
    @Operation(summary = "Update the area")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "updated area success"),
            @ApiResponse(responseCode = "404",description = "Employe Not Found")
    })
    public ResponseEntity<TeamDto> updateTeamEmployeById(@Valid @RequestBody List<EmployeDto> employeeDtos, @PathVariable("id") UUID id){
        Team team = this.teamService.findByUuid(id);
        List<Employee> employeeList = employeeDtos.stream()
                .map(employeeDto -> modelMapper.map(employeeDto, Employee.class)).collect(Collectors.toList());
        team.setEmployees(employeeList);
        return  new ResponseEntity<>(modelMapper.map(teamService.save(team), TeamDto.class), HttpStatus.OK);
    }
}
