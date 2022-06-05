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
import { UsersComponent } from './page/dashboard/content/administration/users/users.component';
import { VentasComponent } from './page/dashboard/content/ventas/ventas.component';
import { ComprasComponent } from './page/dashboard/content/compras/compras.component';
import { InformesComponent } from './page/dashboard/content/contaduria/informes/informes.component';
import { LandingGuard } from './guards/landing/landing.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'verificate', pathMatch: 'full'},
  {path: 'verificate', component: VerificateComponent, canActivate: [LandingGuard]},
  {path: 'admin', redirectTo: 'admin/inicio', pathMatch: 'full'},
  {path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'landing', component:LandingComponent, },
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin', component:AdminComponent, canActivate: [AdminGuard], children: [
    {path: 'inicio', component:MainComponent},
    {path: 'empresas', component:EmpresasComponent}
  ]},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard], children: [
    {path: 'inicio', component:MainDashboardComponent},
    {path: 'perfil', component:ProfileComponent},
    {path: 'administration/users', component:UsersComponent},
    {path: 'ventas', component:VentasComponent},
    {path: 'compras', component:ComprasComponent},
    {path: 'contaduria', children: [
      {path: 'reportes',  component:InformesComponent},
    ]},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
