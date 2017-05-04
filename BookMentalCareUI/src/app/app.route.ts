import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';
import {NewEmployeeComponent} from './newEmployee.component';
import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';
<<<<<<< HEAD
import {NewRessourceComponent} from './newRessource.component';
=======
import {PatientListComponent} from './patientList.component';
import {PatientComponent} from './patient.component';
>>>>>>> origin/master


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
<<<<<<< HEAD
},{
    path:'createRessource',
    component: NewRessourceComponent
=======

},{
    path:'employeeCreate',
    component: NewEmployeeComponent

},{
    path:'patient',
    component: PatientListComponent

},{
    path:'patient/:id',
    component: PatientComponent

>>>>>>> origin/master
}
]


export const routing = RouterModule.forRoot(routes);