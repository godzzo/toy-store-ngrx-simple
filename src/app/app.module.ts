import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { storeImports } from '../store/toy.imports';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, ...storeImports],
  declarations: [AppComponent, HelloComponent, ButtonComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
