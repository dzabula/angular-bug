import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { IPost } from '../../intefaces/i-post';
import { ReactionService } from 'src/app/home/services/reaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/home/services/comment.service';
import { HttpHeaders } from '@angular/common/http';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';
import { CONFIGURATION } from 'src/app/constants/config';
import { IComment } from '../../intefaces/i-comment';
import { IApplicationUser } from 'src/app/shared/interface/i-application-user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit {
  newComment: string;
  CONFIGURATION: any = CONFIGURATION;
  likes: number;
  dislikes: number;
  isLiked: boolean = false;
  isDisliked:boolean = false;
  user: IApplicationUser;

  @Input() post: IPost;
  comments: IComment[];

  constructor(private reactionService: ReactionService,
    private snackBar: MatSnackBar, 
    private commentService: CommentService,
    private jwtHandler: JwtHandlerComponent,
    private renderer: Renderer2,
     private el: ElementRef       
    ){}


  ngAfterViewInit(): void {
    this.likedOrDisliked();
  }

  ngOnInit(): void {
    this.user = this.jwtHandler.GetUser();
    this.comments = this.post.comments;
    this.likes = this.post.likes;
    this.dislikes = this.post.dislikes;
  }

  likedOrDisliked()
  {
    let res = this.post.userWhoReacted.filter(x=> x.userId == this.user.UserId)[0];
    const blok = this.el.nativeElement.querySelector('#a-'+this.post.postId);
    const srce = this.el.nativeElement.querySelector('#srce-'+this.post.postId);
    const content = this.el.nativeElement.querySelector('#broj-lajkova-'+this.post.postId);
    const dblok = this.el.nativeElement.querySelector('#dis-a-'+this.post.postId);
    const dsrce = this.el.nativeElement.querySelector('#dis-srce-'+this.post.postId);
    const dcontent = this.el.nativeElement.querySelector('#broj-dislajkova-'+this.post.postId);

    if(res){
      if(res.reactionId == 3){
        this.isLiked = true;
        this.isDisliked = false;
        this.renderer.addClass(blok, 'bg-blue');
        this.renderer.removeClass(srce, 'bi-heart');
        this.renderer.addClass(srce, 'bi-heart-fill');
        this.renderer.addClass(srce, 'color-white');
        this.renderer.addClass(content, 'color-white');
      }
      else{
        this.isLiked =false;
        this.isDisliked = true;
        this.renderer.addClass(dblok, 'bg-blue');
        this.renderer.removeClass(dsrce, 'bi-heart');
        this.renderer.addClass(dsrce, 'bi-heart-fill');
        this.renderer.addClass(dsrce, 'color-white');
        this.renderer.addClass(dcontent, 'color-white');
      }
    }
  }

  reactions(idReaction: number)
  {
    let body = {
      postId: this.post.postId,
      reactionId: idReaction
    }
    let token = localStorage.getItem("token");
    this.reactionService.headers = new HttpHeaders().set("Authorization", "Bearer "+token);
    this.reactionService.react(body,idReaction).subscribe({
      next: response=>{
        if(idReaction == 3) 
        {
          this.displayLike();

        }else this.displayDislike();
      },
      error: xhr=>{
        alert("Greska");
        console.log(xhr);
        if(xhr.status == 422){
          this.snackBar.open(xhr.error.errors[0].error, "Zatvori", {
            duration: 2000
          })
        }
        else if(xhr.status == 403){
          this.snackBar.open("Nemate privilegije da reagujete na post", "Zatvori", {
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

  sendComment(){
    let idAuthor = this.jwtHandler.GetUser().UserId;
    let body = {
      "postId": this.post.postId,
      "authorId": idAuthor,
      "text": this.newComment
    }
    let token = localStorage.getItem("token");
    this.commentService.headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.commentService.post(body).subscribe({
      next:response=>{
        this.displayComment();
        this.snackBar.open("Uspenso ste ostavili komentar", "Zatvori", {
          duration: 2000
        })
      },
      error:xhr=>{
        alert("Greska");
        console.log(xhr);
        if(xhr.status == 422){
          this.snackBar.open(xhr.error.errors[0].error, "Zatvori", {
            duration: 2000
          })
        }
        else if(xhr.status == 403){
          this.snackBar.open("Nemate privilegije da reagujete na post", "Zatvori", {
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

  displayLike(){
    const blok = this.el.nativeElement.querySelector('#a-'+this.post.postId);
    const srce = this.el.nativeElement.querySelector('#srce-'+this.post.postId);
    const content = this.el.nativeElement.querySelector('#broj-lajkova-'+this.post.postId);
    const dblok = this.el.nativeElement.querySelector('#dis-a-'+this.post.postId);
    const dsrce = this.el.nativeElement.querySelector('#dis-srce-'+this.post.postId);
    const dcontent = this.el.nativeElement.querySelector('#broj-dislajkova-'+this.post.postId);


    if(!this.isLiked)
    {
      this.isLiked = true;
      this.likes++;
      if(this.isDisliked) this.dislikes--;
      this.isDisliked = false;
      this.renderer.addClass(blok, 'bg-blue');
      this.renderer.removeClass(srce, 'bi-heart');
      this.renderer.addClass(srce, 'bi-heart-fill');
      this.renderer.addClass(srce, 'color-white');
      this.renderer.addClass(content, 'color-white');

      this.renderer.removeClass(dblok, 'bg-blue');
      this.renderer.addClass(dsrce, 'bi-heart');
      this.renderer.removeClass(dsrce, 'bi-heart-fill');
      this.renderer.removeClass(dsrce, 'color-white');
      this.renderer.removeClass(dcontent, 'color-white');
    }else
    {
      this.isLiked = false;
      this.likes--;
      this.renderer.removeClass(blok, 'bg-blue');
      this.renderer.addClass(srce, 'bi-heart');
      this.renderer.removeClass(srce, 'bi-heart-fill');
      this.renderer.removeClass(srce, 'color-white');
      this.renderer.removeClass(content, 'color-white');
    }
    

  }
  
  displayDislike(){
    const blok = this.el.nativeElement.querySelector('#a-'+this.post.postId);
    const srce = this.el.nativeElement.querySelector('#srce-'+this.post.postId);
    const content = this.el.nativeElement.querySelector('#broj-lajkova-'+this.post.postId);
    const dblok = this.el.nativeElement.querySelector('#dis-a-'+this.post.postId);
    const dsrce = this.el.nativeElement.querySelector('#dis-srce-'+this.post.postId);
    const dcontent = this.el.nativeElement.querySelector('#broj-dislajkova-'+this.post.postId);

    if(!this.isDisliked)
    {
      this.isDisliked = true;
      this.dislikes++;
      if(this.isLiked) this.likes--;
      this.isLiked = false;
      this.renderer.removeClass(blok, 'bg-blue');
      this.renderer.addClass(srce, 'bi-heart');
      this.renderer.removeClass(srce, 'bi-heart-fill');
      this.renderer.removeClass(srce, 'color-white');
      this.renderer.removeClass(content, 'color-white');

      this.renderer.addClass(dblok, 'bg-blue');
      this.renderer.removeClass(dsrce, 'bi-heart');
      this.renderer.addClass(dsrce, 'bi-heart-fill');
      this.renderer.addClass(dsrce, 'color-white');
      this.renderer.addClass(dcontent, 'color-white');
    }else
    {
      this.isDisliked = false;
      this.dislikes--;
      this.renderer.removeClass(dblok, 'bg-blue');
      this.renderer.addClass(dsrce, 'bi-heart');
      this.renderer.removeClass(dsrce, 'bi-heart-fill');
      this.renderer.removeClass(dsrce, 'color-white');
      this.renderer.removeClass(dcontent, 'color-white');
      
    }
    
  }

  displayComment(){
    let user = this.jwtHandler.GetUser()
    let obj = {
      author: user.FirstName + " " + user.LastName,
      createdAt: new Date().toISOString(),
      text: this.newComment
    }
    this.comments.push(obj as IComment);
    this.newComment = "";
 
  }

}
