import {Component, Input} from '@angular/core';
import {RessourceService} from './services/ressource.service';
import {ActivatedRoute} from '@angular/router';
@Component({
    selector: 'ressource',
    template: `
    <div ngIf="_ressource != null">
    <form>
    <div class="form-group">
    <label for="_ressource.Id">Id</label>
    {{_ressource.Id}}
    </div>
    <div class="form-group">
    <label for="_ressource.Name">Name</label>
    {{_ressource.Name}}
    </div>
    <div class="form-group">
    <label for="_ressource.Type">Type</label>
    {{_ressource.Type}}
    </div>
    </form>
    </div>
    `
})

export class RessourceComponent{

     @Input() _ressource : any;
    
    constructor(private resService:RessourceService, private activatedRoute: ActivatedRoute){
    }

    ngOnInit(){
            this.activatedRoute.params.map(params => params['id']).subscribe(id => {
            this.resService.findRessource(id);
            this.resService.resEvent.subscribe(data => this._ressource = data);
        })
    }




}