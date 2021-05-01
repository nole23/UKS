import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { TimeagoModule } from 'ngx-timeago';
import { ChartsModule } from 'ng2-charts';

import { AuthNav } from 'src/app/guard/auth-nav';
import { TokenInterceptor } from 'src/app/guard/token-interceptor';
import { TokenService } from 'src/app/guard/token-service';
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
import { IssueComponent } from './components/auth/issue/issue.component';
import { AddFilesComponent } from './components/auth/add-files/add-files.component';
import { UploadFilesComponent } from './components/auth/upload-files/upload-files.component';
import { BlobComponent } from './components/auth/blob/blob.component';
import { UserProfileComponent } from './components/auth/user-profile/user-profile.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    AddIssueComponent,
    IssueComponent,
    AddFilesComponent,
    UploadFilesComponent,
    BlobComponent,
    UserProfileComponent
  ],
  imports: [
    NotifierModule.withConfig(customNotifierOptions),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    ChartsModule
  ],
  providers: [
    AuthNav,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
