import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojetcSeeComponent } from './subprojetc-see.component';

describe('SubprojetcSeeComponent', () => {
  let component: SubprojetcSeeComponent;
  let fixture: ComponentFixture<SubprojetcSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprojetcSeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubprojetcSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
