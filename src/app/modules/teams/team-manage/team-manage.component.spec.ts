import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManageComponent } from './team-manage.component';

describe('ManageTeamsComponent', () => {
  let component: TeamManageComponent;
  let fixture: ComponentFixture<TeamManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
