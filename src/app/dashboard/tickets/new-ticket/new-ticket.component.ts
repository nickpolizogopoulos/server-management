import { Component, inject, Input, input, output, signal, SimpleChanges, viewChild } from '@angular/core'; 
import { FormsModule, NgForm } from '@angular/forms';

import { Material_Components } from '../../../utilities/material-components';
import { TicketsService } from '../tickets.service';
import { TicketData } from '../ticket-types';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    Material_Components,
    FormsModule
  ],
  template: `

    <section class="form-close-test">
      <mat-icon (click)="onClose()" fontIcon="close" class="form-close-icon" matTooltip="Close Form" [matTooltipPosition]="'right'"  />
      <mat-icon (click)="onTestPopulate()" fontIcon="edit_note" class="form-test-icon" matTooltip="Populate with test information" [matTooltipPosition]="'left'"  /> 
    </section>
  
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
  styleUrl: './new-ticket.scss'
})
export class NewTicketComponent {

  private ticketsService = inject(TicketsService);
  private form = viewChild.required<NgForm>('form');

  formErrorMessage = signal <string | null> (null);
  fieldErrorMessage = signal <string | null> ('This field is required');
  closeForm = output<void>();

  onSubmit( formData: NgForm ): void {

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
    
    //* typical reset - optional because the component dismounts on submit.
    formData.form.reset();
  }
  
  onClose(): void {
    this.closeForm.emit();
  }

  onTestPopulate(): void {
    const testValue: TicketData = {
      title: 'Backup Failed',
      request: 'Please reboot System B.'
    };
    this.form().setValue(testValue);
  }

}
