import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome/dist';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {UsersService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularFontAwesomeModule,
        AuthModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [UsersService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
