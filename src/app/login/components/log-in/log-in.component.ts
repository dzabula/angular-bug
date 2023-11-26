import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../service/log-in.service';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LoginComponent implements OnInit{
  email: string = 'admin@gmail.com';
  password: string = 'NekaLozinka';

  constructor(private logInService: LogInService, private jwtHandler :JwtHandlerComponent,private snackBar: MatSnackBar,private router: Router )
  {
  }

  ngOnInit(): void {
    
  }

  logIn(){

    var body = {
      email:this.email,
      password: this.password
    }

    this.logInService.post(body).subscribe({
      next: response=>{
        this.jwtHandler.SetTokenAndUser(response.token);
        let role = this.jwtHandler.GetUser().Role;
        if(role == "Admin"){
          window.location.href = '/admin/approve-post';

        }else{
          window.location.href = '/';
        }
      },
      error: xhr=>{
        this.snackBar.open("Email ili lozinka nisu validni!", "Zatvori", {
          duration: 2000
        })
      }
    })
    
  }



  


}
