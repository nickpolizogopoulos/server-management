import { Component, input } from '@angular/core';

import { Material_Components } from '../../utilities/material-components';

interface Image {
  source:string;
  alt:string;
}

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [
    Material_Components
  ],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss'
})
export class DashboardItemComponent {

  image = input.required<Image>();
  title = input.required<string>();

}
