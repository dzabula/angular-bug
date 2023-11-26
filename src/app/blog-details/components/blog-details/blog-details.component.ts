import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBlogDetails } from '../../interfaces/i-blog-details';
import { BlogDetailsService } from '../../services/blog-details.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog: IBlogDetails;
  id: number = 0;

  constructor(private route: ActivatedRoute, private blogService: BlogDetailsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDetails(this.id);
    });
  }

  getDetails(id: number): void {
    this.blogService.getOne(id).subscribe(
      (data: IBlogDetails) => {
        this.blog = data;
        console.log(this.blog);
      }
    );
  }
}
