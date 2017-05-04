import {Component} from '@angular/core';
import {PatientService} from './services/patient.service';

@Component({
  selector: 'patient',
  template: 
  `
  <form>
     <div class="form-group">
        <label for="_Patient.FNAME"> Front Name</label>
        <input  [(ngModel)]="_Patient.FNAME" name="first">
    </div>

    <div class="form-group">
    <label for="_Patient.LNAME">Last Name </label>
        <input  [(ngModel)]="_Patient.LNAME" name="last">
        </div>

        <div class="form-group">
        <label for="_Patient.MEDREGNO"> Medical Record No. </label>
        <input [(ngModel)]="_Patient.MEDREGNO" name="medRegNo">
        </div>

        </form>
        <button (click)="createPatient()">Create Patient </button>
  `

})
export class NewPatientComponent {
  _Patient:Patient = {FNAME:'',LNAME:'', MEDREGNO:''};
        constructor(private patientService:PatientService){
            
        }

        createPatient(){
          this.patientService.savePatient(this._Patient);
        }
}
interface Patient{
  FNAME,
  LNAME,
  MEDREGNO
}
