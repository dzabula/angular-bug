import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsService } from 'src/app/admin/services/tags.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent {
  name: string;
  
  constructor(
    private snackBar: MatSnackBar,        
    private tagService: TagsService,
  ){}

  ngOnInit(): void
  {
    
  }
  
  create()
  {
    
    let body = {
      name:this.name
    }


    let token = localStorage.getItem("token");
    this.tagService.headers =  new HttpHeaders().set('Authorization', `Bearer ${token}`)
    console.log(this.tagService)
    this.tagService.post(body).subscribe({
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
