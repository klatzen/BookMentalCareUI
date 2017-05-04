import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';

import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';
import {NewRessourceComponent} from './newRessource.component';


const routes = [{
    path: '',
    component: EmployeeListComponent
},{
    path:'ressource',
    component: RessourceListComponent
},{
    path:'ressource/:id',
    component: RessourceComponent
},{
    path:'employee/:initials',
    component: EmployeeComponent
},{
    path:'createRessource',
    component: NewRessourceComponent
}
]


export const routing = RouterModule.forRoot(routes);