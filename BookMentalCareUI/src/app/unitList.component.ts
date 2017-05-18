import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'unitList',
    template: `
    <div>
        <table class="table">
            <thead>
                <th>Unit ID</th>
                <th>Serial Number</th>
                <th>Ressource</th>
            </thead>
        <tbody>
        
            <tr *ngFor="let unit of _Units | filterBy : userFilter">
                <td>{{unit.Id}}</td>
                <td>{{unit.SerialNo}}</td>
                <td>{{unit.RessourceId}}</td>
                <button [routerLink]="['/editUnit',unit.Id]" class="btn btn-secondary">Redigér/Slet</button>
                <button [routerLink]="['/unitCreate',unit.RessourceId]" class="btn btn-secondary" >Create new</button>
            </tr>
            
        </tbody>
     </table>
     </div>
    `
})

export class UnitListComponent{

   @Input() _Units = [];
   resId;
 
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