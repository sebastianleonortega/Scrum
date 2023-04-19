package com.wposs.scrum_back.area.controller;

import com.wposs.scrum_back.area.dto.AreaDto;
import com.wposs.scrum_back.area.service.AreaServiceImpl;
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
@RequestMapping("/area")
public class AreaController {

    @Autowired
    private AreaServiceImpl areaService;

    @GetMapping("/{id}")
    @Operation(summary = "Get Area to Id")
    @ApiResponse(responseCode = "200", description = "Area Success")
    public ResponseEntity<AreaDto> findById(@PathVariable UUID id) {
        return areaService.getAreaId(id).map(areaDto -> new ResponseEntity<>(areaDto, HttpStatus.OK)).orElse(null);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all areas")
    @ApiResponse(responseCode = "200", description = "Get All List Success")
    public ResponseEntity<List<AreaDto>> findAll() {
        List<AreaDto> areaDtos = areaService.getAllArea();
        if (!areaDtos.isEmpty()) {
            return new ResponseEntity<>(areaDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/save/")
    @Operation(summary = "Create Area")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created Area"),
            @ApiResponse(responseCode = "400", description = "Area Bad Request")
    })
    public ResponseEntity<AreaDto> create(@Valid @RequestBody AreaDto areaDto) {
        try {
            return new ResponseEntity<>(areaService.saveArea(areaDto), HttpStatus.CREATED);
        }catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the area")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Return the updated area"),
            @ApiResponse(responseCode = "404", description = "Area Not Found")
    })
    public ResponseEntity<AreaDto> updateArea(@RequestBody AreaDto areaDto, @PathVariable("id") UUID areaId) {
        return new ResponseEntity<>(areaService.updateArea(areaId, areaDto), HttpStatus.OK);
    }

/* @PutMapping("/saveemployeeonarea/{id}")
    @Operation(summary = "Update Area to Employe ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated area"),
            @ApiResponse(responseCode = "404",description = "Returns the data sent is invalid")
    })
   public ResponseEntity<AreaDto> updateAreaEmployeById(@Valid @RequestBody List<EmployeeDto> employeeDtos,@PathVariable("id") UUID id){
        Area area = this.areaService.finByUuid(id);
        List<Employee> employeeList = employeeDtos.stream()
                .map(employeeDto -> modelMapper.map(employeeDto, Employee.class)).collect(Collectors.toList());
        area.setEmployees(employeeList);
        Area areaUpdate = this.areaService.save(area);
        return  new ResponseEntity<>(modelMapper.map(areaUpdate, AreaDto.class), HttpStatus.OK);
    }*/

    @DeleteMapping("/deletearea/{id}")
    @Operation(description = "DELETE AREA TO ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "DELETE SUCCESS"),
            @ApiResponse(responseCode = "404",description = "AREA NOT FOUND")
    })
    public ResponseEntity deleteArea(@PathVariable("id")UUID idArea){
        if (areaService.deleteArea(idArea)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
