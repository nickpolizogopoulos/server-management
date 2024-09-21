import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { ServerStatusComponent } from './dashboard/server-status/server-status.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { DashboardItemComponent } from "./dashboard/dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ServerStatusComponent,
    TrafficComponent,
    TicketsComponent,
    DashboardItemComponent
  ],
  template: `
  
    <header appHeader></header>
    <main>

        <app-dashboard-item [title]="'Server Status'" icon="dvr">
          <app-server-status />
        </app-dashboard-item>

        <app-dashboard-item [title]="'Traffic'" icon="group">
          <app-traffic />
        </app-dashboard-item>

        <app-dashboard-item [title]="'Support Tickets'" icon="edit">
          <app-tickets />
        </app-dashboard-item>

    </main>

  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private title = inject(Title);

  ngOnInit():void {  
    this.title.setTitle('Server Management');
  }

}