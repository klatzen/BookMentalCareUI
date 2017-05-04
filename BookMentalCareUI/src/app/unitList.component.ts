import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'unitList',
    template: `
        <table>
            <thead>
                <td>Unit ID</td>
                <td>Serial Number</td>
            </thead>
        <tbody>
            <tr *ngFor="let unit of _Units | filterBy : userFilter">
                <td>{{unit.Id}}</td>
                <td>{{unit.SerialNo}}</td>
            </tr>
        </tbody>
     </table>
    `
})

export class UnitListComponent{

   _Units = [];
   userFilter : any = {id: ''};

    constructor(private resService : RessourceService, private activatedRouter : ActivatedRoute ) {
    }

    ngOnInit() {
        this.activatedRouter.params.map(params => params['id']).subscribe(id => {
            this.resService.findUnits(id);
            this.resService.unitEvent.subscribe(()=> console.log("Request"),()=>console.log("Error"),
            data => this._Units = data);
        }) 
        console.log(this._Units)
    }

}