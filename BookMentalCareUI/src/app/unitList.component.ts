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
   userFilter : any = {Id: ''};

    constructor(private resService : RessourceService, private activatedRouter : ActivatedRoute ) {
    }

    ngOnInit() {
        this.activatedRouter.params.map(params => params['Id']).subscribe(Id => {
            this.resService.findUnits(Id);
            this.resService.unitEvent.subscribe(data => this._Units = data);
        }) 
        console.log(this._Units)
    }

}