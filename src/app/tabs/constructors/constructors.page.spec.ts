import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstructorsPage } from './constructors.page';

describe('ConstructorsPage', () => {
  let component: ConstructorsPage;
  let fixture: ComponentFixture<ConstructorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
