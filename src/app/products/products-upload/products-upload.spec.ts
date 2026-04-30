import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsUpload } from './products-upload';

describe('ProductsUpload', () => {
  let component: ProductsUpload;
  let fixture: ComponentFixture<ProductsUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
