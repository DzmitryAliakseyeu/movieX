import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Catalog } from './catalog';
import { provideRouter } from '@angular/router';
import { CatalogService } from './services/catalog-service';
import { signal } from '@angular/core';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;

  const catalogServiceMock = {
    catalogCards: signal([{ id: 1, title: 'Test Movie', date: '2024', imageUrl: 'http://img' }]),
    catalogResource: {
      isLoading: signal(false),
      value: signal({ results: [] }),
    },
    genres: signal([{ id: 1, name: 'Action' }]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Catalog,
        { provide: CatalogService, useValue: catalogServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
