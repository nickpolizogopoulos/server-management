import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  viewChild
} from '@angular/core';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

import { Material_Components } from '../../utilities/material-components';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { TicketsService } from './tickets.service';
import { type TicketStatus } from './ticket-types';
import { SubstringPipe } from '../../utilities/substring.pipe';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    Material_Components,
    NewTicketComponent,
    MatExpansionModule,
    SubstringPipe
],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {

  //* for closing all panels.
  private accordion = viewChild.required(MatAccordion);
  private closeAllPanels(): void {
    this.accordion().closeAll();
  }

  //* = Code to avoid calling this.closeAllPanels(); method in every other method. =============
  //* junior dev thought: I am doing a 13 line operation here just to avoid a "this.closeAllPanels();" at the end of each method. idk... w/e.
  private withPanelCloseMeth( fn: (...args: any[]) => void): (...args: any[]) => void {
    return (...args: any[]) => {
      fn.apply(this, args);
      this.closeAllPanels();
    };
  }
  ngOnInit(): void {
    this.onFilter = this.withPanelCloseMeth(this.onFilter.bind(this));
    this.onAddTicketOrCloseForm = this.withPanelCloseMeth(this.onAddTicketOrCloseForm.bind(this));
    this.deleteTicket = this.withPanelCloseMeth(this.deleteTicket.bind(this));
    this.markAsOpen = this.withPanelCloseMeth(this.markAsOpen.bind(this));
    this.markTicketClosed = this.withPanelCloseMeth(this.markTicketClosed.bind(this));
  }
  //* = Code to avoid calling this.closeAllPanels(); method in every other method. =============

  private ticketsService = inject(TicketsService);
  selectedFilter = signal<string>('all');

  ticketIdSubstring = signal<number>(4);

  tickets = computed(() => {

    //* I like ternary more than switch / case.
    return this.selectedFilter() === 'open'
      ? this.ticketsService
          .allTickets()
          .filter( task => task.status === 'open' )

      : this.selectedFilter() === 'closed'
      ? this.ticketsService
          .allTickets()
          .filter( task => task.status === 'closed' )
          
      : this.ticketsService.allTickets();
    
    //* But switch/case works as well.
    // switch (this.selectedFilter()) {
    //   case 'all':
    //     return this.ticketsService.getTickets();
    //   case 'open':
    //     return this.ticketsService
    //       .getTickets()
    //       .filter( task => task.status === 'open' );
    //   case 'closed':
    //     return this.ticketsService
    //       .getTickets()
    //       .filter( task => task.status === 'closed' );
    //   default:
    //     return this.ticketsService.getTickets();
    // }

  });
  
  formVisible = signal<boolean>(false);
  
  onFilter( filter: TicketStatus ): void {
    this.selectedFilter.set(filter);
  }

  onAddTicketOrCloseForm(): void {
    this.formVisible.set( !this.formVisible() );
  }

  deleteTicket( id: string ): void {
    this.ticketsService.deleteTicket(id);
  }

  markAsOpen( id: string ): void {
    this.ticketsService.markTicketOpen(id);
  }
  
  markTicketClosed( id: string ): void {
    this.ticketsService.markTicketClosed(id);
  }
}
