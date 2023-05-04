package com.wposs.scrum_back.sprint.controller;

import com.wposs.scrum_back.Exception.exceptions.MethodArgumentNotValidException;
import com.wposs.scrum_back.sprint.dto.SprintDto;
import com.wposs.scrum_back.sprint.service.SprintService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/sprint")
public class SprintController {
    @Autowired
    private SprintService sprintService;

    @GetMapping("/all")
    @Operation(description = "Get All Sprint")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Get All success"),
            @ApiResponse(responseCode = "404",description = "Not Found Sprint")
    })
    public ResponseEntity<List<SprintDto>> getAllSprint(){
        List<SprintDto> sprintDtos = sprintService.getAllSprint();
        if(!sprintDtos.isEmpty()){
            return new ResponseEntity<>(sprintDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/savesprint")
    @Operation(description = "")
    @ApiResponses(value = {
            @ApiResponse(),
            @ApiResponse()
    })
    public ResponseEntity<SprintDto> saveSprint(@Valid @RequestBody SprintDto sprintDto, BindingResult result){
        if (result.hasErrors()){
            throw new MethodArgumentNotValidException("error mal estructura en el JSON","400",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(sprintService.saveSprint(sprintDto),HttpStatus.CREATED);
    }
}
