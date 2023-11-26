import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateBlogService } from 'src/app/admin/services/create-blog.service';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { ICategory } from 'src/app/shared/interface/i-category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBlogComponent {
  authorId: number = 1;
  title: string = "";
  description:string = "";
  categoryId: number = 1;
  selectedCategory: number;
  categories: ICategory[];
  file:string;
  //CKEDITOR

  isLoadedCkEditor: boolean = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '300',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private snackBar: MatSnackBar,        
    private createBlogService: CreateBlogService,
    private categoryService: CategoryService,
    private jwtHandler: JwtHandlerComponent,
    private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void
  {
    this.categoryService.get().subscribe({
      next:response =>{
        this.categories = response;
      },
      error: xhr =>{
        this.snackBar.open("Doslo je do greske na serveru prilikom ucitavanja kategorija!", "Zatvori", {
          duration: 2000
        })
      }
    })
  }


  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      let base64String = e.target.result;
      base64String = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
      this.file = base64String;
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  }


  create()
  {
    const desc = this.el.nativeElement.querySelector('.angular-editor-textarea').innerHTML;
    const userId = this.jwtHandler.GetUser().UserId;
    let body = {
      title: this.title,
      description : desc,
      categoryId: this.selectedCategory,
      authorId : userId,
      imageToUpload: this.file

    }

    console.log(body);
    let token = localStorage.getItem("token");
    this.createBlogService.headers =  new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.createBlogService.post(body).subscribe({
      next:repsonse=>{
        this.resetForm();
        this.snackBar.open("Uspenso ste kreirali Blog post!", "Zatvori", {
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
          this.snackBar.open("Nemate privilegije da kreirate blog post", "Zatvori", {
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

  resetForm()
  {
    
    this.title= "";
    this.el.nativeElement.querySelector('.angular-editor-textarea').innerHTML = "";
    this.selectedCategory = 0;

  }
}
