import { Component } from '@angular/core';
import { TeamMember } from './footer.models';

@Component({
  selector: 'moviex-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected teamMembers: TeamMember[] = [
    { fullName: 'Maria Parinova', githubUrl: 'https://github.com/mariaparinova' },
    { fullName: 'Dzmitry Aliakseyeu', githubUrl: 'https://github.com/DzmitryAliakseyeu' },
    { fullName: 'Glib Shemenkov', githubUrl: 'https://github.com/kravius' },
  ];
}
