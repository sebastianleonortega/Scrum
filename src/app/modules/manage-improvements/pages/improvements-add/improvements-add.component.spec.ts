import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementsAddComponent } from './improvements-add.component';

describe('ImprovementsAddComponent', () => {
  let component: ImprovementsAddComponent;
  let fixture: ComponentFixture<ImprovementsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprovementsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprovementsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
