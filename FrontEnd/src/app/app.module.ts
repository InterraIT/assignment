import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditUserPopupComponent } from './add-edit-user-popup/add-edit-user-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomHttpInterceptor } from './interceptors/custom-http.interceptor';
import { CustomToastrComponent } from './custom-toastr/custom-toastr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddEditUserPopupComponent,
    CustomToastrComponent,
    ConfirmPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
