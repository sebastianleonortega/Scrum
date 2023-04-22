package com.wposs.scrum_back.employe.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmployeDto {

    @JsonProperty(value ="employeeId")
    private UUID employeeId;

    @JsonProperty(value = "employeeName")
    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String employeeName;

    @JsonProperty(value = "employeeCharge")
    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String employeeCharge;

    @JsonProperty(value = "employeeEmail")
    @NotNull
    @NotEmpty
    @Size(max = 100)
    private String employeeEmail;

    @JsonProperty(value = "employeeKnowledge")
    @NotNull
    @NotEmpty
    @Size(max = 200)
    private String employeeKnowledge;


    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeCharge() {
        return employeeCharge;
    }

    public void setEmployeeCharge(String employeeCharge) {
        this.employeeCharge = employeeCharge;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public String getEmployeeKnowledge() {
        return employeeKnowledge;
    }

    public void setEmployeeKnowledge(String employeeKnowledge) {
        this.employeeKnowledge = employeeKnowledge;
    }

}
