import {Component, OnInit} from '@angular/core';
import {SprintsService} from "@app/data/services/sprints/sprints.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "@app/modules/teams/shared/teams.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-calculate-sprint-points',
  templateUrl: './calculate-sprint-points.component.html',
  styleUrls: ['./calculate-sprint-points.component.css']
})
export class CalculateSprintPointsComponent implements OnInit {
  calculateSprintForm: FormGroup = new FormGroup({})
  teamId: string | null = '';
  employees: any;
  sprintId: string | null = '';
  sprintDays: any;
  employeeName: string | null = '';
  sprintEmployeePercentage: any
  finalCalculation: any;
  teamName: string | null = '';
  sprintEmployeeDay: any;
  employeeListFinal: any;
  employeePercentageFinal: any;


  constructor(
    public teamService: TeamsService,
    public formBuilder: FormBuilder,
    public sprintService: SprintsService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.sprintId = this.route.snapshot.paramMap.get('sprintId');

    this.calculateSprintForm = this.formBuilder.group({
      employeeId: new FormControl(null, [Validators.required]),
      sprintEmployeePercentage: new FormControl(null, [Validators.required]),
      sprintEmployeeDescription: new FormControl(null, [Validators.required]),
      sprintEmployeeDay: new FormControl(null, [Validators.required])

    })
    this.getAllCalculationPercentageEmployee();
    this.getEmployeeByTeam();
    this.getBySprintId();
    this.getTeamNameById();
  }

  getBySprintId() {
    this.sprintService.getSprintById(this.sprintId).subscribe(
      {
        next: (resp) => {
          this.sprintDays = resp.sprintDay
        }
      })
  }

  getTeamNameById() {
    this.teamService.getTeamById(this.teamId).subscribe({
      next: (resp) => {
        this.teamName = resp.teamName;
      }
    })
  }

  getEmployeeByTeam() {
    this.sprintService.getAllEmployeesNoExistOnTeamBySprintId(this.sprintId).subscribe({
      next: (resp) => {
        this.employees = resp;
      }
    })
  }

  getAllCalculationPercentageEmployee() {
    this.sprintService.getAllEmployeesExistOnTeamBySprintId(this.sprintId).subscribe({
      next: (resp) => {
        this.employeeListFinal = resp;

      }
    })
  }


  saveSprintPoints() {
    if (this.calculateSprintForm.valid) {
      this.sprintEmployeeDay = this.calculateSprintForm.get('sprintEmployeeDay')?.value
      this.sprintEmployeePercentage=this.calculateSprintForm.get('sprintEmployeePercentage')?.value
      const data = {
        employeeId: this.calculateSprintForm.get('employeeId')?.value,
        sprintEmployeeDescription: this.calculateSprintForm.get('sprintEmployeeDescription')?.value,
        sprintEmployeePercentage: this.sprintEmployeePercentage,
        sprintId: this.sprintId,
        sprintEmployeeDay: this.sprintEmployeeDay,
        employeePercentageFinal: ((this.sprintEmployeePercentage) * ((this.sprintDays) - (this.sprintEmployeeDay))) / 100
      }
      this.sprintService.saveCalculationSprintPoints(data).subscribe({
          next:() => {
            this.calculateSprintForm.reset();
            this.getAllCalculationPercentageEmployee();
            this.getEmployeeByTeam();

            Swal.fire(
              'Empleado Añadido Correctamente!',
              'Presione el Boton (OK) para Continuar',
              'success'
            )
          }
        }
      )
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Invalido',
        text: 'Porfavor verifique que todos los campos se llenen correctamente'
      })
      this.calculateSprintForm.markAllAsTouched();
    }
  }

  calculateSprintPoints() {
    this.finalCalculation = 0;
    this.employeeListFinal.forEach(employeesFinalPoints => {
      this.finalCalculation = this.finalCalculation + employeesFinalPoints.employeePercentageFinal;
    });
    const data={
      sprintScore:this.finalCalculation
    }
    this.sprintService.saveScoreSprintFinal(this.sprintId,data).subscribe({
        next:() => {
          Swal.fire(
            'Puntos Establecidos!',
            'Presione el Boton (OK) para Continuar',
            'success'
          )
        }
      }
    )
  }
}
