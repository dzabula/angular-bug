import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { RefreshTokenGuard } from './shared/middleware/refresh-token.guard';



const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate:[RefreshTokenGuard],
    children: [
      {
        path: "",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./home/home.module").then(x => x.HomeModule),
      },
      {
        path: "blog",
        loadChildren: () => import("./blog/blog.module").then(x => x.BlogModule),
      },
      {
        path: "blog-details",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./blog-details/blog-details.module").then(x => x.BlogDetailsModule),
      },
      {
        path: "post-details",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./post-details/post-details.module").then(x => x.PostDetailsModule),
      },
      {
        path: "login",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./login/login.module").then(x => x.LoginModule),
      },
      {
        path: "registration",
        canActivate:[RefreshTokenGuard],
        loadChildren: () => import("./registration/registration.module").then(x => x.RegistrationModule),
      },
      {
        path: "logout",
        loadChildren: () => import("./logout/logout.module").then(x => x.LogoutModule),
      },
      {
        path: "admin/create-moderator",
        loadChildren: () => import("./admin/create-moderator/create-moderator.module").then(x => x.CreateModeratorModule),
      },
      {
        path: "admin/create-tag",
        loadChildren: () => import("./admin/create-tag/create-tag.module").then(x => x.CreateTagModule),
      },
      {
        path: "admin/create-category",
        loadChildren: () => import("./admin/create-category/create-category.module").then(x => x.CreateCategoryModule),
      },
      {
        path: "moderator/create-blog",
        loadChildren: () => import("./admin/create-blog/create-blog.module").then(x => x.CreateBlogModule),
      },
      {
        path: "user/create-post",
        loadChildren: () => import("./admin/create-post/create-post.module").then(x => x.CreatePostModule),
      },
      {
        path: "fonts",
        loadChildren: () => import("./font/font.module").then(x=>x.FontModule)
      },
      {
        path: "admin/approve-post",
        loadChildren: () => import("./admin/approve-post/approve-post.module").then(x=>x.ApprovePostModule)
      },
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
