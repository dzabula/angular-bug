import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlogRoutingModule } from './create-blog-routing.module';
import { CreateBlogComponent } from './components/create/create.component';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    CreateBlogComponent
  ],
  imports: [
    CommonModule,
    CreateBlogRoutingModule,
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
export class CreateBlogModule { }
