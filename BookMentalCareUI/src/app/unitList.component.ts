import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'unitList',
    template: `
    <div *ngIf="_Units">
        <table>
            <thead>
                <td>Unit ID</td>
                <td>Serial Number</td>
            </thead>
        <tbody>
        
            <tr *ngFor="let unit of _Units">
                <td>{{unit.Id}}</td>
                <td>{{unit.SerialNo}}</td>
            </tr>
            
        </tbody>
     </table>
     </div>
    `
})

export class UnitListComponent{

   @Input() _Units = [];
   userFilter : any = {id: ''};
    constructor(private resService : RessourceService, private activatedRouter : ActivatedRoute ) {
    }

    ngOnInit() {
        this.activatedRouter.params.map(params => params['id']).subscribe(id => {
        this._Units  = this.resService.findUnits(id);
           console.log(this._Units);
        }) 
    }
    

}