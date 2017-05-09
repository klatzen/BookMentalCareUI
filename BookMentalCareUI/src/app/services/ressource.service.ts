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
            this._Ressources = [];
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
            this.http.delete('http://localhost:2026/api/ressource/' + id)
            .subscribe(()=>console.log("Done"),()=>console.log("error"));
        }

        findUnits(id:number) {

            this.http.get('http://localhost:2026/api/unit/units/' + id)
            .map(response => response.json())
            .subscribe(data => {data.forEach(unit => this._Units.push(unit))})
            return this._Units;
        }


        saveUnit(unit){
            this.http.post('http://localhost:2026/api/unit/',unit)
            .subscribe(()=>console.log("Done"),()=>console.log("Error"));
        }

        deleteUnit(id:number){
            this.http.delete('http://localhost:2026/api/unit/' + id)
            .subscribe(()=>console.log("Done"),()=>console.log("Error"));
        }

        findUnit(id:number){
            this.http.get('http://localhost:2026/api/unit/unit/' + id)
            .map(response =>  response.json())
            .subscribe(data => this.Unit = data,()=> console.log("error"),()=>{
                this.unitEvent.emit(this.Unit);
                console.log(this.Unit);
                return this.Unit;
            })
        }

        findAvailibleUnits(startDate:string, endDate:string) {
            this._Units = [];
            this.http.get('http://localhost:2026/api/ressource?startDate=' + startDate + '&endDate=' + endDate)
            .map(response => response.json())
            .subscribe(data => {data.forEach(unit => this._Units.push(unit))})
            return this._Units;
        }


        
    }