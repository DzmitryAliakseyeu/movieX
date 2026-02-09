import { Component, DOCUMENT, inject, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Store } from '../../core/store/store';

@Component({
  selector: 'moviex-modal',
  standalone: true,
  imports: [MatIcon, MatAnchor],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnDestroy {
  store = inject(Store);

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  ngOnInit() {
    this.renderer.setStyle(this.document.documentElement, 'overflow', 'hidden');
  }

  ngOnDestroy() {
    // Возвращаем как было
    this.renderer.removeStyle(this.document.documentElement, 'overflow');
  }

  closeModal() {
    if (this.store.activePerson()) {
      this.store.removePersonDetail();
    }
  }
}
