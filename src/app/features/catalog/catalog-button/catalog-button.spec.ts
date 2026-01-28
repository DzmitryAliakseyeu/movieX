import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogButton } from './catalog-button';

describe('CatalogButton', () => {
  let component: CatalogButton;
  let fixture: ComponentFixture<CatalogButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
