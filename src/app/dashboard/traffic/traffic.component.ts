import { Component, signal } from '@angular/core';

import { Material_Components } from '../../utilities/material-components';
import { FormsModule } from '@angular/forms';

type TrafficData = {
  id: string;
  value: number;
}

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [
    Material_Components,
    FormsModule
  ],
  template: `
  
    @if (days() === 1) {
      <p>Yesterday</p>
    }
    @else if (days() === 7) {
      <p>Last week</p>
    }
    @else {
      <p>Last {{ days() }} days</p>
    }
    <mat-slider (change)="onSliderMove($event)" min="1" max="10" step="1" showTickMarks discrete>
      <input matSliderThumb [value]="days()">
    </mat-slider>
    <div id="chart">
      @for (dataPoint of getVisibleItems(); track dataPoint.id) {
        <div 
        matTooltip="Traffic: {{dataPoint.value}}"
        [matTooltipPosition]="'above'" 
        [style.height]="(dataPoint.value / maxTraffic) * 100 + '%'"
        ></div>
      }
    </div>
  
  `,
  styleUrl: './traffic.component.scss'
})
export class TrafficComponent {

  days = signal<number>(8);

  onSliderMove(event: any): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.days.set(value);
  }

  getVisibleItems(): TrafficData[] {
    const currentDays = this.days();
    return this.dummyTrafficData().slice(0, currentDays);
  }
  
  private dummyTrafficData = signal<TrafficData[]>([
    {
      id: 'd1',
      value: 433
    },
    {
      id: 'd2',
      value: 260
    },
    {
      id: 'd3',
      value: 290
    },
    {
      id: 'd4',
      value: 410
    },
    {
      id: 'd5',
      value: 320
    },
    {
      id: 'd6',
      value: 488
    },
    {
      id: 'd7',
      value: 260
    },
    {
      id: 'd8',
      value: 367
    },
    {
      id: 'd9',
      value: 210
    },
    {
      id: 'd10',
      value: 460
    }
  ]);

  maxTraffic = Math.max( ...this.dummyTrafficData().map( data => data.value ) );
  
}
