import { Component, inject, output, signal, ViewEncapsulation } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms';

import { Material_Components } from '../../../utilities/material-components';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    Material_Components,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
  
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput name="title" id="title" ngModel required #title="ngModel">
        @if (title.touched && title.invalid) {
          <small>{{ fieldErrorMessage() }}</small>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Request</mat-label>
        <textarea matInput name="request" id="request" ngModel required #request="ngModel"></textarea>
        @if (request.touched && request.invalid) {
          <small>{{ fieldErrorMessage() }}</small>
        }
      </mat-form-field>

      @if (form.form.invalid) {
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

  private ticketsService = inject(TicketsService);

  formErrorMessage = signal <string | null> (null);
  fieldErrorMessage = signal <string | null> ('This field is required');
  closeForm = output<void>();

  onSubmit( formData: NgForm ):void {

    if (formData.form.invalid) {
      this.formErrorMessage.set('Please fill the form fields and try again.');
      return;
    }

    const title = formData.form.value.title;
    const request = formData.form.value.request;
    const newTicket = { title: title, request: request };

    this.ticketsService.addTicket(newTicket);
    this.closeForm.emit();
    this.formErrorMessage.set(null);
  }

}
