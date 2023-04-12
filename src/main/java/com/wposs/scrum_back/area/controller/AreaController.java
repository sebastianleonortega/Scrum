package com.wposs.scrum_back.area.controller;

import com.wposs.scrum_back.area.dto.AreaDto;
import com.wposs.scrum_back.area.entity.Area;
import com.wposs.scrum_back.area.service.AreaService;
import com.wposs.scrum_back.employee.dto.EmployeeDto;
import com.wposs.scrum_back.employee.entity.Employee;
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
@RequestMapping("/area")
public class AreaController {

    private final AreaService areaService;


    private final ModelMapper modelMapper;


    public AreaController(AreaService areaService, ModelMapper modelMapper) {
        this.areaService = areaService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Area to Id")
    @ApiResponse(responseCode = "200",description = "Area Success")
    public ResponseEntity<AreaDto> findById(@PathVariable UUID id){
        return areaService.findById(id).map(area -> new ResponseEntity<>(modelMapper.map(area, AreaDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all areas")
    @ApiResponse(responseCode = "200",description = "Get All List Success")
    public ResponseEntity<List<AreaDto>> findAll(){
        List<Area> areas = areaService.getAll();
        //return new ResponseEntity<>(areas.stream().map(area -> modelMapper.map(areas,AreaDto.class)).collect(Collectors.toList()),HttpStatus.OK);
        return new ResponseEntity<>(areas.stream().map(area -> modelMapper.map(area,AreaDto.class))
              .collect(Collectors.toList()),HttpStatus.OK);
    }

    @PostMapping("/save/")
    @Operation(summary = "Create Area")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Created Area"),
            @ApiResponse(responseCode = "400",description = "Area Bad Request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody AreaDto areaDto){
        HashMap<String, String> map = new HashMap<>();
        if (areaService.existAreaByName(areaDto.getAreaName())){
            map.put("message", "Este nombre de area ya existe");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        Area area = areaService.save(modelMapper.map(areaDto, Area.class));
        return new ResponseEntity<>(modelMapper.map(area, AreaDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the area")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated area"),
            @ApiResponse(responseCode = "404", description = "Area Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateArea(@RequestBody AreaDto areaDto,@PathVariable("id") UUID areaId){
        Map<String, Object> map = new HashMap<>();
        map.put("message","Datos invalidos");
        if(areaService.findById(areaId).isPresent()){

                map.put("message", modelMapper.map(areaService.updateArea(areaId, modelMapper.map(areaDto, Area.class)), AreaDto.class));
                return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/saveemployeeonarea/{id}")
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
    }
    @DeleteMapping("/deletearea/{id}")
    @Operation(description = "DELETE AREA TO ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "DELETE SUCCESS"),
            @ApiResponse(responseCode = "404",description = "AREA NOT FOUND")
    })
    public ResponseEntity deleteArea(@PathVariable("id")UUID idArea){
        if (areaService.deleteArea(idArea)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
