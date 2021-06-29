import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { UserRegistration } from 'src/app/models/user';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let notify: NotifierService


    beforeEach(() => {
        let store = {};
        const login = new UserRegistration()
        login.email = "nole@gmail.com"
        login.password = "1231"
        let authServiceMock = {
            login: jasmine.createSpy('login').and.returnValue([{}])
        };

        let notifyServiceMock = {
            notify: jasmine.createSpy('notify').and.returnValue([{}])
        };

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: NotifierService, useValue: notifyServiceMock }
            ],
            imports: [FormsModule, RouterTestingModule, HttpClientModule]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.get(AuthService);
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should ngLogin', fakeAsync(() => {
        const login = new UserRegistration()
        component.ngLogin();

        expect(authService.login)
    }));

    it('should _isCheckData false', fakeAsync(() => {
        const login = new UserRegistration()
        expect(component._isCheckData()).toBeFalse()
    }));

    it('should _isCheckData true', fakeAsync(() => {
        const login = new UserRegistration()
        login.email = "test@gmail.com"
        login.password = "123"
        expect(component._isCheckData()).toBeFalse()
    }));
});

