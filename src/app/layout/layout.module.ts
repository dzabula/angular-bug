import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/Components/header/header.component';
import { FooterComponent } from './main/Components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogModule } from '../blog/blog.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers:[],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    BlogModule
    ]
})
export class LayoutModule { }
