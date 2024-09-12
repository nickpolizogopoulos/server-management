import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Material_Components } from '../utilities/material-components';

interface NavLink {
  name: string;
  link: string;
}

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [
    RouterModule,
    Material_Components
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  links:NavLink[] = [
    {
      name: 'Home',
      link: ''
    },
    {
      name: 'Management',
      link: '/management'
    }
  ];


}
