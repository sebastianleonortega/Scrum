package com.wposs.scrum_back.userstorystatus.controller;

import com.wposs.scrum_back.Exception.BadRequestException;
import com.wposs.scrum_back.userstorystatus.dto.UserStoryStatusDto;
import com.wposs.scrum_back.userstorystatus.service.UserStoryStatusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.Valid;
import java.util.HashMap;
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

    @PostMapping("/savestatus")
    @Operation(description = "SAVE STATUS")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "STATUS CREATE"),
            @ApiResponse(responseCode = "400",description = "FAIL STRUCT JSON")
    })
    public ResponseEntity<HashMap<String,Object>> saveStatus(@Valid @RequestBody UserStoryStatusDto userStoryStatusDto){
        HashMap<String,Object> respuesta = new HashMap<>();
        respuesta.put("message","Surjio un Error al intertar registrar el Stado Posiblemente mas estructurado el JSON");
        try {
            respuesta.put("message",userStoryStatusService.saveStatus(userStoryStatusDto));
            return new ResponseEntity<>(respuesta,HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(respuesta,HttpStatus.BAD_REQUEST);
        }
    }
}
