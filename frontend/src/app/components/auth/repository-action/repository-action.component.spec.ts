import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryActionComponent } from './repository-action.component';

describe('RepositoryActionComponent', () => {
  let component: RepositoryActionComponent;
  let fixture: ComponentFixture<RepositoryActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryActionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
