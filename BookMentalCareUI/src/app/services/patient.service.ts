import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertService} from './alert.service';

@Injectable()
export class PatientService{
    @Output() _Patients = [];
    @Output() Patient;
    @Output() patEvent = new EventEmitter();

    constructor(private http: Http, private alertService:AlertService){

    }

    findPatient(id){
        this._Patients = [];
        this.http.get('http://localhost:2026/api/Patient/' + id)
        .map(response => response.json())
        .subscribe(data => this.Patient = data, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"),()=>{
            this.patEvent.emit(this.Patient);  
            console.log(this.Patient);
        })
    }

    findPatients(){
        this._Patients = [];
        this.http.get('http://localhost:2026/api/Patient')
        .map(response => response.json())
        .subscribe(data => {data.forEach(patient => this._Patients.push(patient))}, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))

        return this._Patients;
    }

    findAvailPatients(startTime, endTime){
        this._Patients= [];
        this.http.get('http://localhost:2026/api/Patient/GetPatients/?startTime='+ startTime +"&endTime=" + endTime)
        .map(response => response.json())
        .subscribe(data=> {data.forEach(patient => this._Patients.push(patient))},  err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))

        return this._Patients;
    }

    savePatient(tempPatient){
        this.http.post('http://localhost:2026/api/Patient',tempPatient).subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev gemt..", "success"));
    }

    deletePatient(id){
        this.http.delete('http://localhost:2026/api/Patient/'+ id).subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev slettet..", "success"));
    }
}