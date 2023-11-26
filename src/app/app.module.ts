import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBlogModule } from './admin/create-blog/create-blog.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CreateBlogModule,

  ],
  // providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
