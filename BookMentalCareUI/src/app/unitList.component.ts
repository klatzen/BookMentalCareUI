import {Component, Input, EventEmitter, Output} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

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
            </tr>
            
        </tbody>
     </table>
     <button [routerLink]="['/unitCreate',resId]" (click)="createNew()" class="btn btn-secondary" >Create new</button>
     </div>
    `
})

export class UnitListComponent{

   _Units = [];
   resId : any = '';
   userFilter : any = {Id: ''};

    constructor(private resService : RessourceService, private activatedRouter : ActivatedRoute, private cookieService : CookieService) {
    }

    ngOnInit() {
        this.activatedRouter.params.map(params => params['id']).subscribe(id => {
        this._Units  = this.resService.findUnits(id);
        this.resId = id;
        }) 
    }

    createNew(resId){
        this.cookieService.remove('resId');
        this.cookieService.put('resId',this.resId);
    }

    

}