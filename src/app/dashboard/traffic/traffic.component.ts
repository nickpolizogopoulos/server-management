import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Material_Components } from '../../utilities/material-components';
import { type TrafficData,  dummyTrafficData } from './dummy-traffic-data';

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

  days = signal<number>(7);

  onSliderMove(event: any): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.days.set(value);
  }

  getVisibleItems(): TrafficData[] {
    const currentDays = this.days();
    return this.dummyTrafficData().slice(0, currentDays);
  }
  
  private dummyTrafficData = signal<TrafficData[]>(dummyTrafficData);

  maxTraffic = Math.max( ...this.dummyTrafficData().map( data => data.value ) );
  
}
