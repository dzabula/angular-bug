import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateModeratorService } from 'src/app/admin/services/create-moderator.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  firstName: string = "";
  lastName: string = "";
  email:string = "";
  username: string = "";
  phone: string = "";
  password: string = "Visokaict1";
  rePassword: string = "Visokaict1";
  registrationError: string = "";


  constructor(
    private snackBar: MatSnackBar,        
    private createModeratorService: CreateModeratorService) {}

  ngOnInit(): void {
   
  }
  

  create(){
    if(this.passwordMatchValidator(this.password, this.rePassword))
    {
      let body = {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        username : this.username,
        phone  : this.phone,
        password : this.password,
      }

      let token = localStorage.getItem("token");
      console.log("token",token)
      this.createModeratorService.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      this.createModeratorService.post(body).subscribe({
        next: response =>{
          this.snackBar.open("Uspesno ste kreirali moderatora!", "Zatvori", {
            duration: 2000
          })
          this.resetForm();
        },
        error: xhr => {
          console.log(xhr)
          alert("NIje uspelo");
          if(xhr.status == 422)
          {
            this.snackBar.open(xhr.error.errors[0].error, "Zatvori", {
              duration: 2000
            })
          }
          else
          {
            this.snackBar.open("Uneti podaci nisu u ispravnom formatu. Pokusajte ponovo!", "Zatvori", {
              duration: 2000
            })
          }
        }
      })
    }
  }

  resetForm(){
    this.username= "";
    this.firstName= "";
    this.lastName= "";
    this.email= "";
    this.password= "";
    this.phone= "";
    this.rePassword= "";
  }
  passwordMatchValidator(password: string, confirmPassword: string): boolean{

    if (password == confirmPassword) {
      this.registrationError = "";
      return true;
    } else {
      this.registrationError = "Lozinke se ne podudaraju !!!";
      this.snackBar.open("Lozinke se ne podudaraju", "Zatvvori", {
        duration: 2000
      });
      return false ;
    }
  }

}
