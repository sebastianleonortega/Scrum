package com.wposs.scrum_back.userstory.controller;

import com.wposs.scrum_back.userstory.dto.UserStoryDto;
import com.wposs.scrum_back.userstory.entity.UserStory;
import com.wposs.scrum_back.userstory.service.UserStoryService;
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
@RequestMapping("/userstory")
public class UserStoryController {

    private final UserStoryService userStoryService;

    private final ModelMapper modelMapper;


    public UserStoryController(UserStoryService userStoryService, ModelMapper modelMapper) {
        this.userStoryService = userStoryService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{userStoryId}")
    @Operation(summary = "Get all User Story")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<UserStoryDto> finById(@PathVariable UUID userStoryId){
        return userStoryService.findById(userStoryId).map(userStory -> new ResponseEntity<>(modelMapper.map(userStory, UserStoryDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/userstory/all")
    @Operation(summary = "Get all User Stories")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<UserStoryDto>> findAll(){
        List<UserStory> userStories = userStoryService.getAll();
        return new ResponseEntity<>(userStories.stream().map(userStory  -> modelMapper.map(userStory,UserStoryDto.class))
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    @PostMapping("/save")
    @Operation(summary = "Create User Story")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "user story created"),
            @ApiResponse(responseCode = "400",description = "user story bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody UserStoryDto userStoryDto){
        UserStory userStory = userStoryService.save(modelMapper.map(userStoryDto, UserStory.class));
        return new ResponseEntity<>(modelMapper.map(userStory, UserStoryDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the userStory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "the updated User story"),
            @ApiResponse(responseCode = "404",description = "Story Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateUserStory(@RequestBody UserStoryDto userStoryDto, @PathVariable("id") UUID userStoryId){
        Map<String, Object> map = new HashMap<>();
        map.put("message","Datos invalidos");
        if(userStoryService.findById(userStoryId).isPresent()){
            map.put("message", modelMapper.map(userStoryService.updateUserStory(userStoryId, modelMapper.map(userStoryDto, UserStory.class)), UserStory.class));
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/subproject/{subprojectId}")
    @Operation(summary = "Get all user stories by subproject id")
    @ApiResponse(responseCode = "200",description = "successful search")
    public ResponseEntity<List<UserStoryDto>> findAllUserStoriesBySubProjectId(@PathVariable UUID subprojectId){
        List<UserStory> userStories = userStoryService.getUserStoriesBySubProjectId(subprojectId);
        return new ResponseEntity<>(userStories.stream().map(userStory -> modelMapper.map(userStory,UserStoryDto.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }
}
