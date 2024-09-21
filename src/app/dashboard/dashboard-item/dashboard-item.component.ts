import { Component, input } from '@angular/core';

import { Material_Components } from '../../utilities/material-components';

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
  styleUrl: './dashboard-item.component.scss'
})
export class DashboardItemComponent {

  icon = input.required<string>();
  title = input.required<string>();

}
