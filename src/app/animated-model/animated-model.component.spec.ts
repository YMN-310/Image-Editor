import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedModelComponent } from './animated-model.component';

describe('AnimatedModelComponent', () => {
  let component: AnimatedModelComponent;
  let fixture: ComponentFixture<AnimatedModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
