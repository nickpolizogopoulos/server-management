import { Component, signal } from '@angular/core';
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

  template: `
  
    <section
      routerLink="/"
      id="logo"
      matTooltip="Server - Management"
      [matTooltipPosition]="'above'"
    >
      <img src="server-management-logo.png" alt="Website logo" />
    </section>
    <nav>
      <ul>
        @for (item of links(); track $index) {
          <li>
            <a routerLink="{{ item.link }}" routerLinkActive="link-active">
              {{ item.name }}
            </a>
          </li>
        }
        <li>
          <button mat-raised-button>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  links = signal<NavLink[]>([
    {
      name: 'Home',
      link: ''
    },
    {
      name: 'Management',
      link: '/management'
    },
    {
      name: 'Settings',
      link: '/settings'
    }
  ]);

}
