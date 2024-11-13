import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  type TicketData,
  type Ticket
} from './ticket-types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private snackBar = inject(MatSnackBar);

  addTicket( ticketData: TicketData ): void {

    const newTicket:Ticket = {
      ...ticketData,
      id: crypto.randomUUID(),
      status: 'open'
    }

    this.snackBar.open(
      `Ticket "${ticketData.title}" has been added!`,
      'close'
    );
    
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
      tickets.map(ticket => 
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

  allTickets = this.tickets.asReadonly();

}
