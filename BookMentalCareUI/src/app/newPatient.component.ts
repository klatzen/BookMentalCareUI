import {Component} from '@angular/core';
import {PatientService} from './services/patient.service';

@Component({
  selector: 'patient',
  template: 
  `
  <form class="form-horizontal">
     <div class="form-group">
        <label for="_Patient.FNAME"> Front Name</label>
        <input  [(ngModel)]="_Patient.FNAME" name="first">
    
        <div class="col-xs-3">
        <label for="_Patient.LNAME">Last Name </label>
        <input  [(ngModel)]="_Patient.LNAME" name="last">
        </div>

        <div class="col-xs-3">
        <label for="_Patient.MEDREGNO"> Medical Record No. </label>
        <input [(ngModel)]="_Patient.MEDREGNO" name="medRegNo">
        </div>
        
        <div class="col-xs-3">
        <label for="_Patient.DEPARTMENT.NAME"> Department </label>
        <input [(ngModel)]="_Patient.DEPARTMENT.NAME" name="department" placeholder="choose a department from list" readonly>
        </div>
      </div>

        <depList (sendDepartment)="getDepartment($event)"></depList>

        </form>
        
        <div class="input-group">
        <div class="col-xs-3">
        <span class="input-group-btn input-space">
        <button (click)="createPatient()" class="btn btn-secondary">Create Patient </button>
        </span>
        </div>
    </div>
  `

})
export class NewPatientComponent {
  _Patient:Patient = {FNAME:'',LNAME:'', MEDREGNO:'',DEPARTMENT:''};
        constructor(private patientService:PatientService){
            
        }

        createPatient(){
          this.patientService.savePatient(this._Patient);
        }

        getDepartment(event){
          this._Patient.DEPARTMENT =  event;
        }
}
interface Patient{
  FNAME,
  LNAME,
  MEDREGNO,
  DEPARTMENT
}
