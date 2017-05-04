import {Component} from '@angular/core';
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
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Patient of _Patients | filterBy: userFilter">
        <a [routerLink]="[Patient.ID]">
            <td>{{Patient.ID}}</td>
            <td>{{Patient.FNAME}}</td>
            <td>{{Patient.LNAME}}</td>
            <td>{{Patient.MEDREGNO}}</td>
            </a>
        </tr>
    </tbody>
    </table>
    `
})
export class PatientListComponent{
        _Patients = [];
        userFilter: any = { FNAME: '' };

        constructor(private patientService : PatientService){
            this._Patients = patientService.findPatients();
        }      
}