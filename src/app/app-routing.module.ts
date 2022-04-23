import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificateComponent } from './verificate/verificate.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmpresasComponent } from './page/admin/content/empresas/empresas.component';
import { AdminComponent } from './page/admin/admin.component';
import { MainComponent } from './page/admin/content/main/main.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MainDashboardComponent } from './page/dashboard/content/main-dashboard/main-dashboard.component';
import { ProfileComponent } from './page/dashboard/content/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'verificate', component: VerificateComponent},
  {path: 'admin', redirectTo: 'admin/inicio', pathMatch: 'full'},
  {path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'landing', component:LandingComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin', component:AdminComponent, children: [
    {path: 'inicio', component:MainComponent},
    {path: 'empresas', component:EmpresasComponent}
  ]},
  {path: 'dashboard', component:DashboardComponent, children: [
    {path: 'inicio', component:MainDashboardComponent},
    {path: 'perfil', component:ProfileComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
