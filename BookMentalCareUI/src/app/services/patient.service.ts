import {Http,RequestOptions} from '@angular/http';
import {Injectable, Output,EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PatientService{
    @Output() _Patients = [];
    @Output() Patient;
    @Output() patEvent = new EventEmitter();

    constructor(private http: Http){

    }

    findPatient(id){
        this.http.get('http://localhost:2026/api/Patient/' + id)
        .map(response => response.json())
        .subscribe(data => this.Patient = data,()=> console.log("error"),()=>{
            this.patEvent.emit(this.Patient);  
            console.log(this.Patient);
        })
    }

    findPatients(){
        this.http.get('http://localhost:2026/api/Patient')
        .map(response => response.json())
        .subscribe(data => {data.forEach(patient => this._Patients.push(patient))})

        return this._Patients;
    }

    savePatient(tempPatient){
        this.http.post('http://localhost:2026/api/Patient',tempPatient).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }

    deletePatient(id){
        this.http.delete('http://localhost:2026/api/Patient/'+ id).subscribe(()=>console.log("Done"),()=> console.log('Error'));
    }
}