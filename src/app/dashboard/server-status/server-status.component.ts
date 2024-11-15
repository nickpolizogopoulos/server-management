import {
  Component,
  inject,
  signal
} from '@angular/core';

import { Material_Components } from '../../utilities/tools/material-components';
import {
  type Status,
  type Server,
  serverData
} from './servers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [
    Material_Components
  ],
  styleUrl: './server-status.component.scss',
  template: `
  
      <div class="status" [class]="{
        'status-online' : currentStatus() === 'Online',
        'status-offline' : currentStatus() === 'Offline',
        'status-unknown': currentStatus() === 'Unknown'
      }">
        @if (currentStatus() === 'Online') {
          <p>Server status: <span>online<mat-icon class="material-icons-outlined" fontIcon="task_alt" /></span></p>
          <p>All systems are operational.</p>
        } 
        @else if (currentStatus() === 'Offline') {
          <p>Server status: <span>offline<mat-icon class="material-icons-outlined" fontIcon="unpublished" /></span></p>
          <p>Functionality should be restored soon.</p>
        }
        @else {
          <p>Server status: <span>unknown<mat-icon class="material-icons-outlined" fontIcon="info" /></span></p>
          <p>Fetching server status failed.</p>
        }
        <mat-form-field>
          <mat-label>Manage State</mat-label>
          <mat-select>
            @for (option of allServerOptions(); track $index) {
              <mat-option (click)="setStatus(option)" value="offline">{{option}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        
        <mat-tree #tree [dataSource]="dataSource()" [childrenAccessor]="childrenAccessor" class="tree">
          <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding="1.5">{{node.name}}</mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let node; when: hasChild" class="child">
            <button mat-icon-button matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
              <mat-icon>
                {{tree.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
              </mat-icon>
            </button>
            {{node.name}}
          </mat-tree-node>
        </mat-tree>

      </div>
  
  `
})
export class ServerStatusComponent {
  
  private snackBar = inject(MatSnackBar);
  currentStatus = signal<Status>('Online');

  setStatus( data: Status ):void {
    this.currentStatus.set(data);

    this.snackBar.open(
      `Server status changed to ${data}.`,
      'close'
    );
  }

  private serverOptions = signal<Status[]>([
    'Online',
    'Offline',
    'Unknown'
  ]);

  allServerOptions = this.serverOptions.asReadonly();

  dataSource = signal<Server[]>(serverData);
  childrenAccessor = (node: Server) => node.children ?? [];
  hasChild = (_: number, node: Server) => !!node.children && node.children.length > 0;
  
}
