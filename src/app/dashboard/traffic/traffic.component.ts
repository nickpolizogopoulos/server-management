import { Component } from '@angular/core';

import { TooltipPosition } from '@angular/material/tooltip';
import { Material_Components } from '../../utilities/material-components';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [
    Material_Components
  ],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.scss'
})
export class TrafficComponent {

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  
  dummyTrafficData =
  [
    {
      id: 'd1',
      value: 433,
    },
    {
      id: 'd2',
      value: 260,
    },
    {
      id: 'd3',
      value: 290,
    },
    {
      id: 'd4',
      value: 410,
    },
    {
      id: 'd5',
      value: 397,
    },
    {
      id: 'd6',
      value: 488,
    },
    {
      id: 'd47',
      value: 589,
    },
  ];

  maxTraffic = Math.max( ...this.dummyTrafficData.map( data => data.value ) );
  
}
