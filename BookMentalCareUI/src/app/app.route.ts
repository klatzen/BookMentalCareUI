import {RouterModule} from '@angular/router';

import {EmployeeListComponent} from './employeeList.component';
import {EmployeeComponent} from './employee.component';
import {NewEmployeeComponent} from './newEmployee.component';
import {RessourceListComponent} from './ressourceList.component';
import {RessourceComponent} from './ressource.component';
import {NewRessourceComponent} from './newRessource.component';
import {PatientListComponent} from './patientList.component';
import {PatientComponent} from './patient.component';
import {UnitListComponent} from './unitList.component';
import {EditUnitComponent} from'./editUnit.component';
import {RoomComponent} from './room.component';
import {RoomListComponent} from './roomList.component';
import {NewRoomComponent} from './newRoom.component';
import {DepartmentListComponent} from './departmentList.component';
import {SignInComponent} from './signIn.component';
import {NewBookingComponent} from './newBooking.component';



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

},{
    path:'unit/:id',
    component: UnitListComponent

},{
    path:'room',
    component: RoomListComponent

},{
    path:'room/:id',
    component: RoomComponent

},
{
    path:'roomCreate',
    component: NewRoomComponent
},{
    path:'editUnit/:Id',
    component: EditUnitComponent
},
{
    path:'signIn',
    component: SignInComponent
},
{
    path:'departmentList',
    component:DepartmentListComponent
},{
    path:'newBooking',
    component: NewBookingComponent

}
]


export const routing = RouterModule.forRoot(routes);