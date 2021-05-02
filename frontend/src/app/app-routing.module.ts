import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthNav } from 'src/app/guard/auth-nav';
import { NotAuthNav } from 'src/app/guard/not-auth-nav'

import { RegistraionComponent } from './components/not-auth/registraion/registraion.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/not-auth/login/login.component';
import { HomeComponent } from './components/auth/home/home.component';
import { NewComponent } from './components/auth/new/new.component';
import { RepositoryComponent } from './components/auth/repository/repository.component';
import { AddFilesComponent } from './components/auth/add-files/add-files.component';
import { UploadFilesComponent } from './components/auth/upload-files/upload-files.component';
import { BlobComponent } from './components/auth/blob/blob.component';
import { UserProfileComponent } from './components/auth/user-profile/user-profile.component';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [NotAuthNav] },
  { path: 'registration', component: RegistraionComponent, canActivate: [NotAuthNav] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthNav] },
  { path: 'home', component: HomeComponent, canActivate: [AuthNav] },
  { path: 'new', component: NewComponent, canActivate: [AuthNav] },
  { path: 'repo/:id/:type', component: RepositoryComponent, canActivate: [AuthNav] },
  { path: 'repo/:id/:type/folder/:folderName', component: RepositoryComponent, canActivate: [AuthNav] },
  { path: 'repo/:id/blob/:folderName/:fileName', component: BlobComponent, canActivate: [AuthNav] },
  { path: 'repo/:id/:type/:idIssue', component: RepositoryComponent, canActivate: [AuthNav] },
  { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthNav] },
  { path: 'add-files', component: AddFilesComponent },
  { path: 'upload-files', component: UploadFilesComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
