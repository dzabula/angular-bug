import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { INotApprovePost } from '../i-notapproved-post.interface';
import { ApprovePostService } from '../../services/approve-post.service';

@Component({
  selector: 'app-noapprove-post',
  templateUrl: './noapprove-post.component.html',
  styleUrls: ['./noapprove-post.component.css']
})
export class NoapprovePostComponent {
  notApprovePosts: INotApprovePost[] = [];

  constructor(private approvePostService: ApprovePostService) {}

  ngOnInit(): void {
    this.loadNotApprovePosts();
  }

  loadNotApprovePosts() {
    let token = localStorage.getItem('token')

    this.approvePostService.headers =  new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.approvePostService.get().subscribe(
      data => {
        this.notApprovePosts = data;
        console.log(data)
      },
      error => {
        console.error('Greška prilikom dohvatanja neodobrenih postova:', error);
      }
    );
  }

  approve(postId: number) {
    let token = localStorage.getItem('token');
  
    // Postavi token u header
    this.approvePostService.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Pozovi sendPutRequest metodu
    this.approvePostService.sendPutRequest(postId).subscribe(
      response => {
        console.log('Post ažuriran!', response);
        this.loadNotApprovePosts();
      },
      error => {
        console.error('Greška prilikom ažuriranja posta:', error);
      }
    );
  }
  
}
