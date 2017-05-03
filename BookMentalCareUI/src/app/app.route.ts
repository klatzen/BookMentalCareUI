import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';
<<<<<<< HEAD
import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';
=======
>>>>>>> origin/master

const routes = [{
    path: '',
    component: EmployeeListComponent
},{
<<<<<<< HEAD
    path:'employee/:id',
    component: EmployeeComponent
},{
    path:'ressource',
    component: RessourceComponent
},{
    path:'ressource/:id',
    component: RessourceListComponent
=======
    path:'employee/:initials',
    component: EmployeeComponent
>>>>>>> origin/master
}
]


export const routing = RouterModule.forRoot(routes);