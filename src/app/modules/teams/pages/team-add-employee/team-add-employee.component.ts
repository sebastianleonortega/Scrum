import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "@app/modules/employees/pages/service/employees.service";
import {TeamsService} from "@app/modules/teams/pages/service/teams.service";
import {ActivatedRoute} from "@angular/router";


export interface TeamEmployee {
  employeeId: string,
  teamId: string | null
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './team-add-employee.component.html',
  styleUrls: ['./team-add-employee.component.css']
})
export class TeamAddEmployeeComponent implements OnInit {

  
  teamId: string | null = '';
  teamEmployee: string[] = [];

  employees: any;
  employeesAddTeam:any;


  constructor(
    private employeesService: EmployeesService,
    private teamService: TeamsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

    this.teamId = this.route.snapshot.paramMap.get('teamId');
  
    // this.getAllEmployeesAddToTeam(this.teamId);

    this.getAllEmployees();

  }


  getAllEmployees() {
    this.employeesService.getAllEmployee().subscribe(
      resp => { //Todos los empleados
      this.employees = resp;
      this.employees.map(r => {
        r.checked = false;
      })
    })

  }


  AddEmployeeTeam() {
    let employeesAdd = this.employees.filter(resp => resp.checked === true);
    employeesAdd.forEach((element) => {
      let item = element.employeeId
      
      
      this.teamEmployee.push(item);
      

      this.employees = this.employees.filter(resp => resp.checked === false)
      console.log(this.teamEmployee);

    });
    this.teamService.addEmployeeTeam(this.teamId, this.teamEmployee).subscribe(resp=>{
       this.getAllEmployeesAddToTeam(this.teamId);
    })
  }


  getAllEmployeesAddToTeam(teamId){
    this.employeesService.getEmployeesAddToTeam(teamId).subscribe(resp=>{ //empleados que pertenecen a un equipo
      this.employeesAddTeam=resp;
    })
  }

}




