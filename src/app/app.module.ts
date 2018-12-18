import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
