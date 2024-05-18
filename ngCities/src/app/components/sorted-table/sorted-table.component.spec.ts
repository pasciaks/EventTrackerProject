import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedTableComponent } from './sorted-table.component';

describe('SortedTableComponent', () => {
  let component: SortedTableComponent;
  let fixture: ComponentFixture<SortedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortedTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
