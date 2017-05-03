import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';

import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';


const routes = [{
    path: '',
    component: EmployeeListComponent
},{
    path:'ressource',
    component: RessourceComponent
},{
    path:'ressource/:id',
    component: RessourceListComponent},
    {
    path:'employee/:initials',
    component: EmployeeComponent

}
]


export const routing = RouterModule.forRoot(routes);