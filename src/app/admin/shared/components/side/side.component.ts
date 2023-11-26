import { Component, OnInit } from '@angular/core';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit{
  constructor(private jwtHandler:JwtHandlerComponent){

  }
  ngOnInit(): void {
    this.user = this.jwtHandler.GetUser();
  }
  
  user:IApplicationUser;


}
