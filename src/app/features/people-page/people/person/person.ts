import { Component, input } from '@angular/core';
import { PersonI } from '../../../../core/store/store';


@Component({
  selector: 'moviex-person',
  standalone: true,
  imports: [],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  host: {
    '[attr.id]': 'person()?.id'
  }
})
export class Person {
  person = input<PersonI>();

}
