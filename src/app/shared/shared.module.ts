import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component'
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
  exports: [
    FooterComponent,
    NavComponent,
  ]
})
export class SharedModule { }
