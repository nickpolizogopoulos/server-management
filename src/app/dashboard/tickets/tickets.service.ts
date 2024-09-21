import { Injectable, signal } from '@angular/core';

import { type TicketData, type Ticket } from './types';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  addTicket( ticketData: TicketData ): void {

    const newTicket:Ticket = {
      ...ticketData,
      id: crypto.randomUUID().substring(0, 4), //* random number generator (4 characters)
      status: 'open'
    }
    
    this.tickets.update( tickets => [...tickets, newTicket] );
  }

  markTicketClosed( id: string ): void {
    this.tickets.update( tickets => 
      tickets.map( ticket => 
        ticket.id === id 
        ? { ...ticket, status: 'closed' }
        : ticket
      )
    );
  }

  deleteTicket(id: string): void {
    this.tickets.update(
      tickets => tickets.filter(
        ticket => ticket.id !== id
      )
    );
  }

  markTicketOpen(id: string): void {
    this.tickets.update( tickets => 
      tickets.map( ticket => 
        ticket.id === id 
        ? { ...ticket, status: 'open' }
        : ticket
      )
    );
  }

  private tickets = signal<Ticket[]>([
    {
      title: 'Broken computer',
      request: 'My laptop screen does not work, please help me fix that!',
      id: 't001',
      status: 'closed'
    },
    {
      title: 'Software update',
      request: 'Please assist me in updating my computer.',
      id: 't002',
      status: 'open'
    },
    {
      title: 'Web Connection',
      request: 'My computer fails to establish a connection via Wi-Fi. Can you help me?',
      id: 't003',
      status: 'open'
    }
  ]);

  getTickets = this.tickets.asReadonly();

}
