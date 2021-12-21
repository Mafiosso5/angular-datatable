import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule, ToastService, MDBModalService, MDBBootstrapModulesPro, SelectModule, WavesModule, DatepickerModule } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainService } from './main.service';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    SelectModule,
    WavesModule,
    DatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),

  ],
  providers: [MainService, MDBModalService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
