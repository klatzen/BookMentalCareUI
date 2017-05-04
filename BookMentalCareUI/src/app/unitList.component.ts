import {Component} from '@angular/core';
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
            <tr *ngFor="let unit of _Units">
                <td>{{unit.Id}}</td>
                <td>{{unit.SerialNo}}</td>
            </tr>
        </tbody>
     </table>
    `
})

export class UnitListComponent{

    _Units = [];

    constructor(private resService : RessourceService, private activatedRouter : ActivatedRoute ) {
    }

    ngOnInit() {
        this.activatedRouter.params.map(params => params['resId']).subscribe(resId => {
            this.resService.findUnits(resId);
            this.resService.unitEvent.subscribe(data => this._Units = data);
        })
    }

}