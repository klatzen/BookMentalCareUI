import {Component, Output, EventEmitter} from '@angular/core';
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
            <button (click)="OnClick(Patient)">Add</button>
        </tr>
    </tbody>
    </table>
    `
})
export class PatientListComponent{
        _Patients = [];
        userFilter: any = { FNAME: '' };
        @Output() Patient;
         @Output() sendPatient : EventEmitter<any> = new EventEmitter();

        constructor(private patientService : PatientService){
            this._Patients = patientService.findPatients();
            console.log(this._Patients);
        } 

        OnClick(Patient) {
            this.sendPatient.emit(Patient);
        }     
}