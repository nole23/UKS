import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryStatisticComponent } from './repository-statistic.component';

describe('RepositoryStatisticComponent', () => {
  let component: RepositoryStatisticComponent;
  let fixture: ComponentFixture<RepositoryStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryStatisticComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
