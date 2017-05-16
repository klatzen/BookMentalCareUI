import {Component, Input} from '@angular/core';
import {PatientService} from './services/patient.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'pat',
    template: ` 
     <div *ngIf="_Patient != null">
     <form class="form-horizontal">
     <div class="form-group">
        <div class="col-xs-3"> 
        <label for="_Patient.FNAME"> Front Name</label>
        <input class="form-control" value="{{_Patient.FNAME}}" [(ngModel)]="_Patient.FNAME" name="first">
        </div>
    
        <div class="col-xs-3"> 
        <label for="_Patient.LNAME">Last Name </label>
        <input class="form-control" value="{{_Patient.LNAME}}" [(ngModel)]="_Patient.LNAME" name="last">
        </div>

        <div class="col-xs-3"> 
        <label for="_Patient.MEDREGNO"> Medical Rec. No </label>
        <input class="form-control" value="{{_Patient.MEDREGNO}}" readonly>
        </div>

        </div>
        <div class="input-group">
        <div class="col-sm-offset-2 col-sm-10">
            <span class="input-group-btn input-space">
            <button (click)="updatePatient()" class="btn btn-secondary">Update</button>
            <button (click)="deletePatient()" class="btn btn-secondary" id="delete-btn">Delete</button>
            </span>
        </div>
    </div>
        </form>
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