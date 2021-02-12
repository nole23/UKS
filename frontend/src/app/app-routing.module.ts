import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistraionComponent } from './components/not-auth/registraion/registraion.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'registration', component: RegistraionComponent},
  { path: 'login', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
