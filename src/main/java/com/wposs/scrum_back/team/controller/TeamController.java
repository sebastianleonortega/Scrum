package com.wposs.scrum_back.team.controller;

import com.wposs.scrum_back.team.dto.TeamDto;
import com.wposs.scrum_back.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/team")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @GetMapping("/{id}")
    @Operation(summary = "Get team by UUID")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<TeamDto> findById(@PathVariable("id") UUID idTeam){
        return teamService.getTeamByiId(idTeam).map(teamDto -> new ResponseEntity<>(teamDto,HttpStatus.OK)).orElse(null);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all teams")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "successful search"),
            @ApiResponse(responseCode = "404",description = "Not Found")
    })
    public ResponseEntity<List<TeamDto>> findAll(){
        List<TeamDto> teamDtos = teamService.getAllTeam();
        if(!teamDtos.isEmpty()){
            return new ResponseEntity<>(teamDtos,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping("/save")
    @Operation(summary = "Create team")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Team Create"),
            @ApiResponse(responseCode = "400",description = "team bad request")
    })
    public ResponseEntity<TeamDto> create(@Valid @RequestBody TeamDto teamDto){
        return new ResponseEntity<>(teamService.saveTeam(teamDto),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the team")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated team"),
            @ApiResponse(responseCode = "404",description = "Project Not Found")
    })
    public ResponseEntity<TeamDto> updateTeam(@Valid @RequestBody TeamDto team, @PathVariable("id") UUID teamId){
        return new ResponseEntity<>(teamService.updateTeam(teamId,team),HttpStatus.OK);
    }

    @GetMapping("/area/{areaId}")
    @Operation(summary = "Get all teams by area id")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<TeamDto>> findAllProjectsByAreaId(@PathVariable UUID areaId){
        List<TeamDto> teamDtos = teamService.getTeamToArea(areaId);
        if ((!teamDtos.isEmpty())){
            return new ResponseEntity<>(teamDtos,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
/*
    @PutMapping("/saveemployeeonteam/{id}")
    @Operation(summary = "Update the area")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "updated area success"),
            @ApiResponse(responseCode = "404",description = "Employe Not Found")
    })
    public ResponseEntity<TeamEmployeDto> updateTeamEmployeById(@Valid @RequestBody List<EmployeDto> employeeDtos, @PathVariable("id") UUID id){
        Team team = this.teamService.findByUuid(id);
        List<Employee> employeeList = employeeDtos.stream()
                .map(employeeDto -> modelMapper.map(employeeDto, Employee.class)).collect(Collectors.toList());
        team.setEmployees(employeeList);
        return  new ResponseEntity<>(modelMapper.map(teamService.save(team), TeamEmployeDto.class), HttpStatus.OK);
    }*/
}