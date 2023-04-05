package com.wposs.scrum_back.employee.controller;

import com.wposs.scrum_back.employee.dto.EmployeeDto;
import com.wposs.scrum_back.employee.entity.Employee;
import com.wposs.scrum_back.employee.service.EmployeeService;
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
@RequestMapping("/employee")
public class EmployeeController {

    private final EmployeeService employeeService;


    private final ModelMapper modelMapper;

    public EmployeeController(EmployeeService employeeService, ModelMapper modelMapper) {
        this.employeeService = employeeService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by UUID")
    @ApiResponse(responseCode = "200",description = "success")
    public ResponseEntity<EmployeeDto> findById(@PathVariable UUID id) {
        return employeeService.findById(id).map(employee -> new ResponseEntity<>(modelMapper.map(employee, EmployeeDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    @Operation(summary = "Get all employees")
    @ApiResponse(responseCode = "200",description = "success")
    public ResponseEntity<List<EmployeeDto>> findAll() {
        List<Employee> employees = employeeService.getAll();
        return new ResponseEntity<>(employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/save/")
    @Operation(summary = "Create employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "employee created"),
            @ApiResponse(responseCode = "400",description = "employee bad request")
    })
    public ResponseEntity<?> create(@Valid @RequestBody EmployeeDto employeeDto) {
        Employee employee = employeeService.save(modelMapper.map(employeeDto, Employee.class));
        return new ResponseEntity<>(modelMapper.map(employee, EmployeeDto.class), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update the employee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Return the updated employee"),
            @ApiResponse(responseCode = "404",description = "Employe Not Found")
    })
    public ResponseEntity<Map<String, Object>> updateEmployee(@PathVariable("id") UUID employeeId,@RequestBody @Valid EmployeeDto employee) {
        HashMap<String,Object> respuesta = new HashMap<>();
        respuesta.put("message","NO SE PUDO ACTUALIZAR EL EMLEADO");
        if(employeeService.findById(employeeId).isPresent()){
            Employee employee1 = modelMapper.map(employee,Employee.class);
            respuesta.put("message",employeeService.updateEmployee(employeeId,employee1));
            return new ResponseEntity<>(respuesta,HttpStatus.OK);
            }
        return new ResponseEntity<>(respuesta,HttpStatus.BAD_REQUEST);
    }

//    @PutMapping("/savetaskonemployee/{employeeId}")
//    public ResponseEntity<EmployeeDto> updateTaskEmployee(@Valid @RequestBody List<TaskDto> taskDtos, @PathVariable("employeeId") UUID employeeId){
//        Employee employee = this.employeeService.findByEmployeeId(employeeId);
//        List<TaskTeam> tasks = taskDtos.stream()
//                .map(taskDto -> modelMapper.map(taskDto, Task.class)).collect(Collectors.toList());
//        employee.setTasks(tasks);
//        Employee employeeUpdate = this.employeeService.save(employee);
//        return  new ResponseEntity<>(modelMapper.map(employeeUpdate, EmployeeDto.class), HttpStatus.OK);
//    }

}
