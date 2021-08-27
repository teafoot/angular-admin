import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CredentialInterceptor} from "./interceptors/credential.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    // NavComponent,
    // MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecureModule,
    PublicModule,
    HttpClientModule,
    BrowserAnimationsModule, // to use animations from @angular/animations
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
