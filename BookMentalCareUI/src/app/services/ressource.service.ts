import {Http} from '@angular/http';
import {Injectable, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
    export class RessourceService{
        @Output() _Ressource = [];
        @Output() Ressource;
        @Output() resEvent = new EventEmitter();

        constructor(private http: Http){

        }

        findRessources(){
            this.http.get('http://localhost:2026/api/ressource')
            .map(response => response.json())
            .subscribe(data => {data.forEach(ressource => this._Ressource.push(ressource))})
            return this._Ressource;
        }

        findRessource(id:number){
            this.http.get('http://localhost:2026/api/ressource/' + id)
            .map(response => response.json())
            .subscribe(data => this._Ressource = data,()=> console.log("error"),()=>{
                this.resEvent.emit(this.Ressource);
            })
        }

        
    }