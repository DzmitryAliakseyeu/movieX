import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Poster } from './poster';
import { ActivatedRoute } from '@angular/router';

describe('Poster', () => {
  let component: Poster;
  let fixture: ComponentFixture<Poster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Poster, { provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(Poster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
