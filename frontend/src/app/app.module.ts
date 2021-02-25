import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeadersComponent } from './components/headers/headers.component';
import { RegistraionComponent } from './components/not-auth/registraion/registraion.component';
import { IndexComponent } from './components/index/index.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/not-auth/login/login.component';
import { HomeComponent } from './components/auth/home/home.component';
import { GenerigTableComponent } from './components/auth/generig-table/generig-table.component';
import { AddRepositoryComponent } from './components/auth/add-repository/add-repository.component';
import { NewComponent } from './components/auth/new/new.component';
import { RepositoryComponent } from './components/auth/repository/repository.component';
import { RepositoryMenuComponent } from './components/auth/repository-menu/repository-menu.component';
import { RepositoryCodeComponent } from './components/auth/repository-code/repository-code.component';
import { RepositoryIssuesComponent } from './components/auth/repository-issues/repository-issues.component';
import { RepositoryActionComponent } from './components/auth/repository-action/repository-action.component';
import { RepositoryStatisticComponent } from './components/auth/repository-statistic/repository-statistic.component';
import { RepositorySettingComponent } from './components/auth/repository-setting/repository-setting.component';
import { AddIssueComponent } from './components/auth/add-issue/add-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistraionComponent,
    HeadersComponent,
    IndexComponent,
    ErrorComponent,
    LoginComponent,
    HomeComponent,
    GenerigTableComponent,
    AddRepositoryComponent,
    NewComponent,
    RepositoryComponent,
    RepositoryMenuComponent,
    RepositoryCodeComponent,
    RepositoryIssuesComponent,
    RepositoryActionComponent,
    RepositoryStatisticComponent,
    RepositorySettingComponent,
    AddIssueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
