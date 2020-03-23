import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterAddComponent } from './counter-add.component';

describe('CounterAddComponent', () => {
  let component: CounterAddComponent;
  let fixture: ComponentFixture<CounterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
