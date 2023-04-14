package com.wposs.scrum_back.userstorystatus.controller;

import com.wposs.scrum_back.userstorystatus.dto.UserStoryStatusDto;
import com.wposs.scrum_back.userstorystatus.service.UserStoryStatusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userstorystatus")
public class UserStoryStatusController {
    @Autowired
    private UserStoryStatusService userStoryStatusService;

    @GetMapping("/statusall")
    @Operation(description = "GET ALL STATUS")
    @ApiResponse(responseCode = "200",description = "ALL USER STORY STATUS")
    public ResponseEntity<List<UserStoryStatusDto>> getAllStatus(){
        return new ResponseEntity<>(userStoryStatusService.gatAll(), HttpStatus.OK);
    }
}
