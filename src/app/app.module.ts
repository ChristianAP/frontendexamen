import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { CorreoComponent } from './correo/correo.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { CargarScriptService } from './Service/cargar-script.service';
import { TokenInterceptorService } from './Service/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArchivosComponent,
    CorreoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService,
      multi: true
    },
    CargarScriptService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
