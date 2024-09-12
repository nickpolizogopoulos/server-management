import { Component, signal, viewChild } from '@angular/core';

import { Ticket } from './ticket.model';
import { Material_Components } from '../../utilities/material-components';
import { NewTicketComponent, SubmittedTicket } from "./new-ticket/new-ticket.component";

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    Material_Components,
    NewTicketComponent,
    MatExpansionModule
],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {

  //* to close all the panels 
  private accordion = viewChild.required(MatAccordion);
  private closeAll = (): void => this.accordion().closeAll();

  formVisible = signal<boolean>(false);
  addTicketButtonVisible = signal<boolean>(true);

  onAddTicketOrCloseForm():void {
    this.formVisible.update( state => !state );
    this.addTicketButtonVisible.update( state => !state );
    this.closeAll();
  }

  // deleteTicket( id:string ):void {
  //   const ticket = this.tickets.find( t => t.id === id );
  //   const index = this.tickets.indexOf(ticket!);
  //   this.tickets.splice(index, 1); 
  //   this.closeAll();
  // }
  
  markTicketClosed( id:string ):void {
    const ticket = this.tickets.find( t => t.id === id );
    const index = this.tickets.indexOf(ticket!);
    this.tickets[index].status = 'closed';
    this.closeAll();
  }

  addTicket( ticketData:SubmittedTicket ):void {

    this.closeAll();

    const ticket:Ticket = {
      title: ticketData.title,
      request: ticketData.request,
      id: Math.floor(Date.now() % 500).toString(), //* random number generator
      status: 'open'
    }

    this.tickets.push(ticket);
    
  }

  tickets:Ticket[] = [
    {
      title: 'Computer broken',
      request: 'My computer is not working, please help me fix that!',
      id: '500',
      status: 'closed'
    },
    {
      title: 'Software update',
      request: 'Please assist me in updating my computer.',
      id: '200',
      status: 'open'
    }
  ];

}
