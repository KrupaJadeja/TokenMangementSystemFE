import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterEditComponent } from './counter-edit.component';

describe('CounterEditComponent', () => {
  let component: CounterEditComponent;
  let fixture: ComponentFixture<CounterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
