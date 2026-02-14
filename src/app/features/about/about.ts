import { Component } from '@angular/core';
import { TeamMember } from './about.models';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'moviex-about',
  imports: [NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected teamMembers: TeamMember[] = [
    { fullName: 'Maria Parinova', githubUrl: 'https://github.com/mariaparinova' },
    { fullName: 'Dzmitry Aliakseyeu', githubUrl: 'https://github.com/DzmitryAliakseyeu' },
    { fullName: 'Glib Shemenkov', githubUrl: 'https://github.com/kravius' },
  ];
}
