import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporizadorComponent } from './temporizador.component';

describe('TemporizadorComponent', () => {
  let component: TemporizadorComponent;
  let fixture: ComponentFixture<TemporizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
