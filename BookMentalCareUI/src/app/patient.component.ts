import {Component, Input, ViewContainerRef} from '@angular/core';
import {PatientService} from './services/patient.service';
import {ActivatedRoute} from '@angular/router';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
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
            <button (click)="updatePatient()" class="btn btn-secondary">Save changes</button>
            <button (click)="onClick()" class="btn btn-secondary" id="delete-btn">Delete</button>
            </span>
        </div>
        </div>
        </form>
    </div>
     `
})
export class PatientComponent{
        @Input() _Patient: any;
        constructor(private patientService : PatientService,private activatedRoute: ActivatedRoute, private modal:Modal, overlay: Overlay, vcRef: ViewContainerRef) { 
             overlay.defaultViewContainer = vcRef; 
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
        onClick() {
    this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Confirm deletion of patient')
        .body(`
            <p>Are you sure?</p>
            `).okBtn('Delete')
            .okBtnClass('btn btn-info')
        .open().then((dialogRef) => dialogRef.result /* this is the promise of the result */) 
            .then(result => this.deletePatient())
            .catch(err => alert("CANCELED"));
  }

        
} 