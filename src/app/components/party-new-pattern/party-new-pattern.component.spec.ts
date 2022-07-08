import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyNewPatternComponent } from './party-new-pattern.component';

describe('PartyNewPatternComponent', () => {
  let component: PartyNewPatternComponent;
  let fixture: ComponentFixture<PartyNewPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyNewPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyNewPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
