import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTagComponent } from './components/create-tag/create-tag.component';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CreateTagRoutingModule } from './create-tag-routing.module';


@NgModule({
  declarations: [
    CreateTagComponent
  ],
  imports: [
    CommonModule,
    CreateTagRoutingModule,
    AdminSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularEditorModule
  ]
})
export class CreateTagModule { }
