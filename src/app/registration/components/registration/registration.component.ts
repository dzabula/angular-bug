import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../service/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { REGEX } from 'src/app/constants/regex';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  email:string = "";
  username: string = "";
  phone: string = "";
  password: string = "";
  rePassword: string = "";
  registrationError: string = "";

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,        
    private registrationService: RegistrationService,
    private router: Router) {}

  ngOnInit(): void {
   
  }


  registration()
  {
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

      this.registrationService.post(body).subscribe({
        next: repsonse =>{
          this.router.navigate(['/']);
          this.snackBar.open("Usepsna registracija!", "Zatvori", {
            duration: 2000
          })
        },
        error: xhr =>{
          console.log(xhr)
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
