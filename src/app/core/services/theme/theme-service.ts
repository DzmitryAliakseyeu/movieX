import {
  DOCUMENT,
  effect,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSignal = signal(localStorage.getItem('theme') || 'light');
  readonly theme = this.themeSignal.asReadonly();
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    // Effect applies theme to DOM (side-effect only, no reactive loop)
    // theme() is readonly, only updateTheme() mutates it -> no circular dependency
    effect(() => {
      this.renderer.setStyle(this.document.body, 'color-scheme', this.theme());
    });
  }

  updateTheme() {
    let newTheme = this.theme();
    if (this.theme() === 'dark') {
      newTheme = 'light';
    } else {
      newTheme = 'dark';
    }
    localStorage.setItem('theme', newTheme);
    this.themeSignal.set(newTheme);
  }
}
