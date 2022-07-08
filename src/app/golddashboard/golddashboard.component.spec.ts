import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolddashboardComponent } from './golddashboard.component';

describe('GolddashboardComponent', () => {
  let component: GolddashboardComponent;
  let fixture: ComponentFixture<GolddashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolddashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
