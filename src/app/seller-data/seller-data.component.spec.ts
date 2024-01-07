import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDataComponent } from './seller-data.component';

describe('SellerDataComponent', () => {
  let component: SellerDataComponent;
  let fixture: ComponentFixture<SellerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
