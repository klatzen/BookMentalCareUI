import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class AlertMessage{
    public show: boolean;
    public message: string;
    public alertType: string;
}

@Injectable()
export class AlertService{
    public status: BehaviorSubject<AlertMessage> = new BehaviorSubject<AlertMessage>({show: false, message: null, alertType: null});

    showAlert(isShow: boolean, msg: string, type: string){
        let alertObj: AlertMessage = {show: isShow, message: msg, alertType: type};
        this.status.next(alertObj);
    }
}