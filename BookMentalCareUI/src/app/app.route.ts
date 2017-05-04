import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';
import {NewEmployeeComponent} from './newEmployee.component';
import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';
import {NewRessourceComponent} from './newRessource.component';
import {PatientListComponent} from './patientList.component';
import {PatientComponent} from './patient.component';
import {NewPatientComponent} from './newPatient.component';
import {DepartmentListComponent} from './departmentList.component';
import {DepartmentComponent} from './department.component';
import {NewDepartmentComponent} from './newDepartment.component';


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
},{
    path:'employeeCreate',
    component: NewEmployeeComponent

},{
    path:'patient',
    component: PatientListComponent

},{
    path:'patient/:id',
    component: PatientComponent
}
,{
    path:'patientCreate',
    component: NewPatientComponent
}
,{
    path:'department',
    component: DepartmentListComponent
},{
    path:'department/:id',
    component: DepartmentComponent
},{
    path:'departmentCreate',
    component: NewDepartmentComponent
}
]


export const routing = RouterModule.forRoot(routes);