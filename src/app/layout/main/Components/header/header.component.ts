import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role:string;
  links:any[];

  constructor(private jwtHandler: JwtHandlerComponent){}

  ngOnInit(): void {

    if(this.jwtHandler.IsValidToken()){
      this.role = this.jwtHandler.GetUser().Role;
      if(this.role == "Admin")
      {
        this.links = this.adminLinks;
      }else if(this.role == "Moderator")
      {
        this.links = this.moderatorLinks;
      }
      else if(this.role == "Regular")
      {
        this.links = this.userLinks;
      }
    }
    else
    {
      this.links = this.anonimo;
    }
  }
  adminLinks: any = [
    {
      name: "Креирај Модератора",
      link: "admin/create-moderator/"
    },
    {
      name: "Креирај Таг",
      link: "admin/create-tag"
    },
    {
      name: "Креирај Категорију",
      link: "admin/create-category"
    },
    {
      name: "Одобри постове",
      link: "admin/approve-post"
    },
    {
      name: "Одјави се",
      link: "logout"
    }
  ];
  
  moderatorLinks: any = [
    {
      name: "Креирај Пост",
      link: "moderator/create-post"
    },
    {
      name: "Фонтови",
      link: "fonts"
    },
    {
      name: "Одјави се",
      link: "logout"
    }
  ];
  
  userLinks: any = [
    {
      name: "Почетна",
      link: ""
    },
    {
      name: "Блог",
      link: "blog"
    },
    {
      name: "Креирај пост",
      link: "user/create-post"
    },
    {
      name: "Фонтови",
      link: "/fonts"
    },
    {
      name: "Одјави се",
      link: "logout"
    }
  ];
  
  anonimo: any = [
    {
      name: "Почетна",
      link: ""
    },
    {
      name: "Блог",
      link: "blog"
    },
    {
      name: "Фонтови",
      link: "/fonts"
    },
    {
      name: "Регистрацију се",
      link: "registration"
    },
    {
      name: "Пријави се",
      link: "login"
    }
  ];


}
