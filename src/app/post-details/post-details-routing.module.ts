import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';



const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: PostDetailsComponent,
    data: { title: "Registracija" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostDetailsRoutingModule { }
