import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificateComponent } from './verificate.component';

describe('VerificateComponent', () => {
  let component: VerificateComponent;
  let fixture: ComponentFixture<VerificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
