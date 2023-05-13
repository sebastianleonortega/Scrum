import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementsSeeComponent } from './improvements-see.component';

describe('ImprovementsSeeComponent', () => {
  let component: ImprovementsSeeComponent;
  let fixture: ComponentFixture<ImprovementsSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprovementsSeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprovementsSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
