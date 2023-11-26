import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  name: string;
  
  constructor(
    private snackBar: MatSnackBar,        
    private categoryService:CategoryService,
  ){}

  ngOnInit(): void
  {
    
  }
  
  create()
  {
    
    let body = {
      name:this.name
    }

    console.log(body);
    let token = localStorage.getItem("token");
    this.categoryService.headers =  new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.categoryService.post(body).subscribe({
      next:repsonse=>{
        this.resetForm();
        this.snackBar.open("Uspenso ste kreirali Post!", "Zatvori", {
          duration: 2000
        })
      },
      error: xhr =>{
        if(xhr.status == 422){
          this.snackBar.open(xhr.error.errors[0].error, "Zatvori", {
            duration: 2000
          })
        }
        else if(xhr.status == 403){
          this.snackBar.open("Nemate privilegije da kreirate post", "Zatvori", {
            duration: 2000
          })
        }
        else{
          this.snackBar.open("Doslo je do greske na serveru, pokusajte kasnije!", "Zatvori", {
            duration: 2000
          })
        }
      }

    })
  }

  resetForm(){
    this.name= "";
  }
}
