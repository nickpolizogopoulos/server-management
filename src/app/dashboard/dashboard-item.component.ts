import {
  Component,
  input
} from '@angular/core';

import { Material_Components } from '../utilities/tools/material-components';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [
    Material_Components
  ],
  template: `

    <header>
      <mat-icon class="material-icons-outlined" fontIcon="{{ icon() }}" />
      <h2>{{ title() }}</h2>
    </header>
    <mat-divider />
    <ng-content />

  `,
  styles: `

    @import '../utilities/styles/utilities.scss';
  
    :host {
      display: block;
      border: 1px solid #f4f4f4;
      border-radius: 9px;
      background-color: rgb(250, 249, 253);
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
      min-width: 370px;
      padding: 2rem;
      min-height: 420px;
      margin: 0 15px;
      max-width: 350px;

      @media (max-width: 1312px) {
        margin: 0;
        min-height: auto;
      }

      header {
        @include flex-layout(row, left, center, .75rem);
        padding: 0;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }

      h2 {
        font-size: 0.9rem;
        text-transform: uppercase;
        color: #504e50;
        }
      }

    }

    mat-divider {
      margin: 15px auto 25px auto;
    }
  
  `
})
export class DashboardItemComponent {

  icon = input.required<string>();
  title = input.required<string>();

}
