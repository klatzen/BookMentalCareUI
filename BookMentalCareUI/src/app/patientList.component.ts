import {Component, Output, Input, EventEmitter, SimpleChanges} from '@angular/core';
import {PatientService} from './services/patient.service';

@Component({
    selector: 'patList',
    template: `
    <input type="text" [(ngModel)]="userFilter.FNAME" placeholder="name">
    <table>
    <thead>
        <tr>
            <td>ID</td>
            <td>Front Name</td>
            <td>Last Name</td>
            <td>Medical Reg. No.</td>
            <td>Department</td>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Patient of _Patients | filterBy: userFilter">
        <a [routerLink]="[Patient.ID]">
            <td>{{Patient.ID}}</td>
            <td>{{Patient.FNAME}}</td>
            <td>{{Patient.LNAME}}</td>
            <td>{{Patient.MEDREGNO}}</td>
            <td *ngIf="Patient.DEPARTMENT">{{Patient.DEPARTMENT.NAME}}</td></a>
            <button *ngIf="route != '/patients'" (click)="OnClick(Patient)">Add</button>
        </tr>
    </tbody>
    </table>
    `
})
export class PatientListComponent{
        @Input() _Patients = [];
        userFilter: any = { FNAME: '' };
        @Output() Patient;
        @Output() sendPatient : EventEmitter<any> = new EventEmitter();
        @Input() startTime;
        @Input() endTime;
        route: any;

        constructor(private patientService : PatientService){
        }

        ngOnInit(){
            this.route = window.location.pathname;
            if(this.route != "/patients"){
                this._Patients = this.patientService.findAvailPatients(this.startTime,this.endTime);
            }
            else{
                this._Patients = this.patientService.findPatients();
            }
        }

        OnClick(Patient) {
            this.sendPatient.emit(Patient);
        }     
}