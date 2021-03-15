import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieListComponent } from './salarie-list.component';

describe('SalarieListComponent', () => {
  let component: SalarieListComponent;
  let fixture: ComponentFixture<SalarieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalarieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
