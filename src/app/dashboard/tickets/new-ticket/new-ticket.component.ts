import { Component, inject, output, signal } from '@angular/core'; 
import { FormsModule } from '@angular/forms';

import { Material_Components } from '../../../utilities/material-components';
import { TicketsService } from '../tickets.service';


@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    Material_Components,
    FormsModule
  ],
  template: `
  
    <form (ngSubmit)="onSubmit()" #form>
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput name="title" id="title" [(ngModel)]="title">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Request</mat-label>
        <textarea matInput name="request" id="request" [(ngModel)]="request"></textarea>
      </mat-form-field>
      @if (formErrorMessage()) {
        <small>{{ formErrorMessage() }}</small>
      }
      <button mat-raised-button>Submit</button>
    </form>
  
  `,
  styles: `
    
    form {
        display: flex;
        flex-direction: column;
    }

    small {
        color: rgb(224, 64, 64);
        margin-bottom: 20px;
    }
      
  `
})
export class NewTicketComponent {

  title = signal<string>('');
  request = signal<string>('');
  formErrorMessage = signal <string | null> (null);
  closeForm = output<void>();
  
  private ticketsService = inject(TicketsService);

  onSubmit():void {

    //* Basic Form Validation (CBA TD / Reactive now).
    const title = this.title().trim() === '';
    const summary = this.request().trim() === '';
    if (title || summary) {
      this.formErrorMessage.set('Please, enter title and text!');
      return;
    }

    const newTicket = { title: this.title(), request: this.request() };
    
    this.ticketsService.addTicket(newTicket);

    this.closeForm.emit();

    this.formErrorMessage.set(null);
  }

}
