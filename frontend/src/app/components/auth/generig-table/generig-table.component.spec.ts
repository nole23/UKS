import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerigTableComponent } from './generig-table.component';

describe('GenerigTableComponent', () => {
  let component: GenerigTableComponent;
  let fixture: ComponentFixture<GenerigTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerigTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerigTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
