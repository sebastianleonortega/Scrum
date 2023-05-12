package com.wposs.scrum_back.sprintemployee.entity;

import com.wposs.scrum_back.employe.entity.Employee;
import com.wposs.scrum_back.sprint.entity.Sprint;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "sprints_employee",schema = "wposs")
public class SprintEmployee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sprintsEmployeeId;
    @Column(name = "fk_employee_id",nullable = false)
    private UUID employeeId;
    @Column(name = "fk_Sprint_id")
    private UUID sprintId;
    @Column(name = "percentage",nullable = false)
    private Double percentage;
    @Column(name = "daysLeave",nullable = false)
    private Integer daysLeave;
    @Column(name = "Observations",nullable = false)
    private String Observations;

    @ManyToOne
    @JoinColumn(name = "fk_Sprint_id",insertable = false,updatable = false)
    private Sprint sprint;
    @ManyToOne
    @JoinColumn(name = "fk_employee_id",insertable = false,updatable = false)
    private Employee employee;

    public Long getSprintsEmployeeId() {
        return sprintsEmployeeId;
    }

    public void setSprintsEmployeeId(Long sprintsEmployeeId) {
        this.sprintsEmployeeId = sprintsEmployeeId;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public Integer getDaysLeave() {
        return daysLeave;
    }

    public void setDaysLeave(Integer daysLeave) {
        this.daysLeave = daysLeave;
    }

    public String getObservations() {
        return Observations;
    }

    public void setObservations(String observations) {
        Observations = observations;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }

    public UUID getSprintId() {
        return sprintId;
    }

    public void setSprintId(UUID sprintId) {
        this.sprintId = sprintId;
    }
}
