import {Component, Output, Input, EventEmitter, SimpleChanges} from '@angular/core';
import {PatientService} from './services/patient.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'patList',
    template: `
    <form class="form-inline">
    <div class="form-group">
        <label>Search</label>
        <input class="form-control" type="text" [(ngModel)]="userFilter.FNAME" placeholder="name" name="search">
    </div>
    
    </form>

    <table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Front Name</th>
            <th>Last Name</th>
            <th>Medical Reg. No.</th>
            <th>Department</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let Patient of _Patients | filterBy: userFilter">
            <td>{{Patient.ID}}</td>
            <td>{{Patient.FNAME}}</td>
            <td>{{Patient.LNAME}}</td>
            <td>{{Patient.MEDREGNO}}</td>
            <td *ngIf="Patient.DEPARTMENT">{{Patient.DEPARTMENT.NAME}}</td>
            <button *ngIf="route == '/patients' && signedIn.TITLE === 'Leder'" [routerLink]="['/patient',Patient.ID]" class="btn btn-secondary">Edit</button>
            <button *ngIf="route != '/patients'" (click)="OnClick(Patient)" class="btn btn-secondary">Add</button>
        </tr>
    </tbody>
    </table>
    <button  *ngIf="signedIn.TITLE === 'Leder'" [routerLink]="['/patientCreate']" class="btn btn-secondary" >Create new</button>
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
        signedIn : any;

        constructor(private patientService : PatientService, private cookieService : CookieService){
        }

        ngOnInit(){
            this.signedIn = this.cookieService.getObject('login');
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