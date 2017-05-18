import {Http} from '@angular/http';
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {AlertService} from './alert.service';

@Injectable()
    export class RessourceService{
        @Output() _Ressources = [];
        @Output() Ressource;
        @Output() resEvent = new EventEmitter();
        
        @Output() _Units = [];
        @Output() Unit;
        @Output() unitEvent = new EventEmitter();

        constructor(private http: Http, private alertService:AlertService, private router:Router){

        }

        findRessources(){
            this._Ressources = [];
            this.http.get('http://localhost:2026/api/ressource')
            .map(response => response.json())
            .subscribe(data => {data.forEach(ressource => this._Ressources.push(ressource))
        this.resEvent.emit(this._Ressources);    
        },  err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))
            return this._Ressources;
        }

        findRessource(id:number){
            this.http.get('http://localhost:2026/api/ressource/' + id)
            .map(response => response.json())
            .subscribe(data => this.Ressource = data,err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"),()=>{
                this.resEvent.emit(this.Ressource);
            })
        }

        saveRessource(ressource){
            this.http.post('http://localhost:2026/api/ressource/',ressource)
            .subscribe( () => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => {this.alertService.showAlert(true,"Data er gemt..","success")
        this.router.navigate(['/ressources']);});
        }

        deleteRessource(id:number){
            this.http.delete('http://localhost:2026/api/ressource/' + id)
            .subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev slettet..", "success"));
        }

        findUnits(id:number) {
            this._Units = [];
            this.http.get('http://localhost:2026/api/unit/units/' + id)
            .map(response => response.json())
            .subscribe(data => {data.forEach(unit => this._Units.push(unit))}, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))
            return this._Units;
        }


        saveUnit(unit){
            this.http.post('http://localhost:2026/api/unit/',unit)
            .subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev gemt..", "success"));
        }

        deleteUnit(id:number){
            this.http.delete('http://localhost:2026/api/unit/' + id)
            .subscribe(() => "",err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"), () => this.alertService.showAlert(true, "Data blev slettet..", "success"));
        }

        findUnit(id:number){
            this.http.get('http://localhost:2026/api/unit/unit/' + id)
            .map(response =>  response.json())
            .subscribe(data => this.Unit = data,err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"),()=>{
                this.unitEvent.emit(this.Unit);
                return this.Unit;
            })
        }

        findAvailibleRessources(startDate:string, endDate:string) {
            this._Ressources = [];
            this.http.get('http://localhost:2026/api/ressource/?startDate=' + startDate + '&endDate=' + endDate)
            .map(response => response.json())
            .subscribe(data => {data.forEach(res => this._Ressources.push(res))
            this.resEvent.emit(this._Ressources)}, err => this.alertService.showAlert(true, "Der opstod en fejl - prøv igen", "danger"))
            return this._Ressources;
        }


        
    }