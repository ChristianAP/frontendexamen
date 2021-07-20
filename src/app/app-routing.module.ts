import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { CorreoComponent } from './correo/correo.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

const routesChildren: Routes = [
  {path:'', redirectTo:'',pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'archivo', component: ArchivosComponent},
  {path: 'correo', component: CorreoComponent}
];


const routes: Routes = [
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: routesChildren},
  {path: 'archivo', component: ArchivosComponent},
  {path: 'correo', component: CorreoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ArchivosComponent,
  LoginComponent,
  CorreoComponent
];