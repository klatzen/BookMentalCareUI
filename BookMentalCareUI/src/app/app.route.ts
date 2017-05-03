import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';

const routes = [{
    path: '',
    component: EmployeeListComponent
},{
    path:'employee/:initials',
    component: EmployeeComponent
}
]


export const routing = RouterModule.forRoot(routes);