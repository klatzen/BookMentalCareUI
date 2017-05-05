import {Component, Input} from '@angular/core';
import {PatientService} from './services/patient.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'pat',
    template: ` 
     <div *ngIf="_Patient != null">
     <form>
     <div class="form-group">
        <label for="_Patient.FNAME"> Front Name</label>
        <input value="{{_Patient.FNAME}}" [(ngModel)]="_Patient.FNAME" name="first">
    </div>
    <div class="form-group">
        <label for="_Patient.LNAME">Last Name </label>
        <input value="{{_Patient.LNAME}}" [(ngModel)]="_Patient.LNAME" name="last">
        </div>
        <div class="form-group">
        <label for="_Patient.MEDREGNO"> Medical Reg. No </label>
        <input value="{{_Patient.MEDREGNO}}" [(ngModel)]="_Patient.MEDREGNO" name ="initials">
        
        </div>
        </form>
        <button (click)="updatePatient()">Update </button>
        <button (click)="deletePatient()">Delete</button>
    </div>
     `
})
export class PatientComponent{
        @Input() _Patient: any;
        constructor(private patientService : PatientService,private activatedRoute: ActivatedRoute){
            
        }
        ngOnInit(){
            this.activatedRoute.params.map(params => params['id']).subscribe(id => {
            this.patientService.findPatient(id);
            this.patientService.patEvent.subscribe(data => this._Patient = data,() => console.log("ERROR"),()=> console.log(this._Patient));
                
            })
        }

        deletePatient(){
            this.patientService.deletePatient(this._Patient.ID);
        }
        updatePatient(){
            this.patientService.savePatient(this._Patient);
        }

        
} 