import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistraionComponent } from './components/not-auth/registraion/registraion.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/not-auth/login/login.component';
import { HomeComponent } from './components/auth/home/home.component';
import { NewComponent } from './components/auth/new/new.component';
import { RepositoryComponent } from './components/auth/repository/repository.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'registration', component: RegistraionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewComponent },
  { path: 'repo/:id/:type', component: RepositoryComponent },
  { path: 'repo/:id/:type/:idIssue', component: RepositoryComponent },
  { path: 'user/:id', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
