import { AfterViewInit, Component, ElementRef, output, viewChild } from '@angular/core'; 
import { FormsModule } from '@angular/forms';

import { Material_Components } from '../../../utilities/material-components';

export interface SubmittedTicket {
  title:string;
  request:string;
}

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    Material_Components,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent implements AfterViewInit {

  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  addTicket = output<SubmittedTicket>();
  onShowText = output<void>();
  

  ngAfterViewInit():void {
    console.log('AFTER VIEW INIT');
  }

  onSubmit( title:string, request:string ):void {

    this.addTicket.emit({
      title: title,
      request: request
    });

    this.onShowText.emit();

    this.form()?.nativeElement.reset();
  }

}
