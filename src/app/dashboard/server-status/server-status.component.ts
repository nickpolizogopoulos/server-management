import { 
  Component,
  OnInit,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { Material_Components } from '../../utilities/material-components';

type Status = 'online' | 'offline' | 'unknown'

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [
    Material_Components
  ],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss'
})
export class ServerStatusComponent implements OnInit {
  
  currentStatus = signal<Status>('online');
  
  // private destroyRef = inject(DestroyRef);
  
  ngOnInit():void {
    // const interval = setInterval(
    //   () => {
    //     const randomNumber = Math.random();
    //     return this.currentStatus.set( 
    //     randomNumber < .5
    //     ? 'online'
    //     : randomNumber < .9
    //     ? 'offline'
    //     : 'unknown');  
    //   },
    //   2000
    // );
    // this.destroyRef.onDestroy( () => clearInterval(interval) );
  }

  setStatus( data: Status ):void {
    this.currentStatus.set(data);
  }

}
