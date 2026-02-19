import { Component, DOCUMENT, inject, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { PeopleService } from '../../core/services/people-service/people-service';

@Component({
  selector: 'moviex-modal',
  standalone: true,
  imports: [MatIcon, MatAnchor],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private peopleService = inject(PeopleService);

  ngOnInit() {
    this.renderer.setStyle(this.document.documentElement, 'overflow', 'hidden');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.document.documentElement, 'overflow');
  }

  closeModal() {
    if (this.peopleService.activePerson()) {
      this.peopleService.removePersonDetail();
    }
  }
}
