import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';
import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';

const routes = [{
    path: '',
    component: EmployeeListComponent
},{
    path:'employee/:id',
    component: EmployeeComponent
},{
    path:'ressource',
    component: RessourceComponent
},{
    path:'ressource/:id',
    component: RessourceListComponent
}
]


export const routing = RouterModule.forRoot(routes);