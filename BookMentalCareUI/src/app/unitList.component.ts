import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'unitList',
    template: `
    <div>
        <table>
            <thead>
                <td>Unit ID</td>
                <td>Serial Number</td>
            </thead>
        <tbody>
        
            <tr *ngFor="let unit of _Units | filterBy : userFilter">
                <td>{{unit.Id}}</td>
                <td>{{unit.SerialNo}}</td>
                <button [routerLink]="['/editUnit',unit.Id]">Redigér/Slet</button>
            </tr>
            
        </tbody>
     </table>
     </div>
    `
})

export class UnitListComponent{

   @Input() _Units = [];
   userFilter : any = {Id: ''};
    constructor(private resService : RessourceService, private activatedRouter : ActivatedRoute ) {
    }

    ngOnInit() {
        this.activatedRouter.params.map(params => params['id']).subscribe(id => {
        this._Units  = this.resService.findUnits(id);
           console.log(this._Units);
        }) 
    }
    

}