import { Component, inject } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { Modal } from '../shared/modal/modal';
import { DatePipe } from '@angular/common';
import { PeopleService } from '../core/services/people-service/people-service';

@Component({
  selector: 'moviex-layout',
  standalone: true,
  imports: [Header, Footer, RouterOutlet, Modal, DatePipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  public peopleService = inject(PeopleService);
}
