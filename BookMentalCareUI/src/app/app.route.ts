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
import {UnitListComponent} from './unitList.component';
import {EditUnitComponent} from'./editUnit.component';
import {RoomComponent} from './room.component';
import {RoomListComponent} from './roomList.component';
import {NewRoomComponent} from './newRoom.component';
import {DepartmentListComponent} from './departmentList.component';
import {DepartmentComponent} from './department.component';
import {SignInComponent} from './signIn.component';
import {NewBookingComponent} from './newBooking.component';
import {BookingListComponent} from './bookingList.component';
import {LoginGuard} from './services/LoginGuard.service';

const routes = [{
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [LoginGuard]
},{
    path:'ressources',
    component: RessourceListComponent,
    canActivate: [LoginGuard]
},{
    path:'ressource/:id',
    component: RessourceComponent,
    canActivate: [LoginGuard]
},{
    path:'employee/:initials',
    component: EmployeeComponent,
    canActivate: [LoginGuard]

},{
    path:'createRessource',
    component: NewRessourceComponent,
    canActivate: [LoginGuard]
},{
    path:'employeeCreate',
    component: NewEmployeeComponent,
    canActivate: [LoginGuard]

},{
    path:'patients',
    component: PatientListComponent,
    canActivate: [LoginGuard]

},{
    path:'patientCreate',
    component: NewPatientComponent,
    canActivate: [LoginGuard]
},
{
    path:'patient/:id',
    component: PatientComponent,
    canActivate: [LoginGuard]

},{
    path:'unit/:id',
    component: UnitListComponent,
    canActivate: [LoginGuard]

},{
    path:'rooms',
    component: RoomListComponent,
    canActivate: [LoginGuard]

},{
    path:'room/:id',
    component: RoomComponent,
    canActivate: [LoginGuard]

},
{
    path:'roomCreate',
    component: NewRoomComponent,
    canActivate: [LoginGuard]
},{
    path:'editUnit/:Id',
    component: EditUnitComponent,
    canActivate: [LoginGuard]
},
{
    path:'signIn',
    component: SignInComponent,
    canActivate: [LoginGuard]
},
{
    path:'departments',
    component:DepartmentListComponent,
    canActivate: [LoginGuard]
},
{
    path:'booking',
    component: NewBookingComponent,
    canActivate: [LoginGuard]
},
{
    path:'bookings',
    component: BookingListComponent,
    canActivate: [LoginGuard]
},
{
    path:'booking/:id',
    component: NewBookingComponent,
    canActivate: [LoginGuard]
},
{
    path:'department/:id',
    component: DepartmentComponent,
    canActivate: [LoginGuard]
}
]


export const routing = RouterModule.forRoot(routes);