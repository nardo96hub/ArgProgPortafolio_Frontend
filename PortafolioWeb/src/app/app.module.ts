import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InfoComponent } from './componentes/info/info.component';
import { AcercaComponent } from './componentes/acerca/acerca.component';
import { ExpComponent } from './componentes/exp/exp.component';
import { EduComponent } from './componentes/edu/edu.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyComponent } from './componentes/proy/proy.component';
import { FooterComponent } from './componentes/footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {NgCircleProgressModule} from 'ng-circle-progress';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorService } from './servicio/interceptor/jwt-interceptor.service';
import { ErrorService } from './servicio/interceptor/error.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    AcercaComponent,
    ExpComponent,
    EduComponent,
    SkillsComponent,
    ProyComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   NgCircleProgressModule.forRoot({}),
   AppRoutingModule,
   ReactiveFormsModule
 
  ],
  providers: [{useClass:JwtInterceptorService,provide:HTTP_INTERCEPTORS,multi:true},{useClass:ErrorService,provide:HTTP_INTERCEPTORS,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
