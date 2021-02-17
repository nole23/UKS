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
    NewComponent
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
