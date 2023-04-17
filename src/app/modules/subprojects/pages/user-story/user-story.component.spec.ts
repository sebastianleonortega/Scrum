import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryComponent } from './user-story.component';

describe('SubprojectsComponent', () => {
  let component: UserStoryComponent;
  let fixture: ComponentFixture<UserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
