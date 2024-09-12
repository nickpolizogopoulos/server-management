import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

type Status = 'online' | 'offline' | 'unknown'

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss'
})
export class ServerStatusComponent implements OnInit {
  
  currentStatus = signal<Status>('online');
  
  private destroyRef = inject(DestroyRef);
  
  ngOnInit():void {

    const interval = setInterval( () =>
      {
        const randomNumber = Math.random();
        return this.currentStatus.set( 
        randomNumber < .5
        ? 'online'
        : randomNumber < .9
        ? 'offline'
        : 'unknown');  
      },
      2500
    );

    this.destroyRef.onDestroy( () => clearInterval(interval) );

  }



}
