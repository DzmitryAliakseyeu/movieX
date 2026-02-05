import { Component } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { NavItem } from './header.models';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'moviex-header',
  standalone: true,
  imports: [MatAnchor, MatButton, RouterLink, MatToolbar, NgOptimizedImage, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected navItems: NavItem[] = [
    { id: 'movie', title: 'Movie', url: '/movies' },
    { id: 'tv', title: 'TV Shows', url: '/tv' },
    { id: 'person', title: 'People', url: '/people' },
  ];
}
