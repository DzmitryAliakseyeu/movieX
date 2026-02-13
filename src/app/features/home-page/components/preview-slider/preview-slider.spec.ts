import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSlider } from './preview-slider';

describe('Catalog', () => {
  let component: PreviewSlider;
  let fixture: ComponentFixture<PreviewSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
