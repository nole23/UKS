import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryMenuComponent } from './repository-menu.component';

describe('RepositoryMenuComponent', () => {
  let component: RepositoryMenuComponent;
  let fixture: ComponentFixture<RepositoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
