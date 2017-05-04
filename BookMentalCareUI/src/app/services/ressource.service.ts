import {Http} from '@angular/http';
import {Injectable, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
    export class RessourceService{
        @Output() _Ressources = [];
        @Output() Ressource;
        @Output() resEvent = new EventEmitter();
        
        @Output() _Units = [];
        @Output() Unit;
        @Output() unitEvent = new EventEmitter();

        constructor(private http: Http){

        }

        findRessources(){
            this.http.get('http://localhost:2026/api/ressource')
            .map(response => response.json())
            .subscribe(data => {data.forEach(ressource => this._Ressources.push(ressource))})
            return this._Ressources;
        }

        findRessource(id:number){
            this.http.get('http://localhost:2026/api/ressource/' + id)
            .map(response => response.json())
            .subscribe(data => this.Ressource = data,()=> console.log("error"),()=>{
                this.resEvent.emit(this.Ressource);
            })
        }

        saveRessource(ressource){
            this.http.post('http://localhost:2026/api/ressource/',ressource)
            .subscribe(()=>console.log("Done"),()=>console.log("error"));
        }

        deleteRessource(id:number){
            this.http.delete('http://localhost:2026/api/ressource' + id)
            .subscribe(()=>console.log("Done"),()=>console.log("error"));
        }

        findUnits(Id : number) {
            this.http.get('http://localhost:2026/api/unit/units/' + Id)
            .map(response => response.json())
            .subscribe(data => {data.forEach(unit => this._Units.push(unit))})
            return this._Units;
        }

        
    }