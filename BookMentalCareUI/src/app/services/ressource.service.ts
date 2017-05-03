import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
    export class RessourceService{
        _Ressource = [];

        constructor(private http: Http){

        }

        findRessources(){
            this.http.get('http://localhost:2026/api/ressource')
            .map(response => response.json())
            .subscribe(data => {data.forEach(ressource => this._Ressource.push(ressource))})
            console.log(this._Ressource);
            return this._Ressource;
        }

        findRessource(id:number){
            this.http.get('http://localhost:2026/api/ressource/')
            .map(response => response.json())
            .subscribe(data=>{this._Ressource = data})

            return this._Ressource;
        }

        
    }