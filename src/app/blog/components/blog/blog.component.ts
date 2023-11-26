import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ICategory } from 'src/app/shared/interface/i-category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { IBlog } from '../../interfaces/i-blog';
import { IBlogResponse } from '../../interfaces/i-blogRespone';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  choosenCategory : ICategory[];
  blogs: IBlogResponse;
  filteredBlogs: IBlog[];
  categories: ICategory[] = [];
  keyword = '';
  blogArray : IBlog[];

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadBlogs();
    this.categoryService.get().subscribe({
      next: response => {
        this.categories = response;
        console.log(this.categories);
      },
      error: xhr => {
        console.error(xhr);
      }
    });
  }

  loadBlogs() {
    // Initial loading of blogs (without filtering)
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
      this.blogArray = blogs.data
      this.filteredBlogs = blogs.data;
      console.log(blogs);
    });
  }

  filterResults() {

    const checkedCategory = this.categories.filter(type => type.checked).map(type => type.name);
    

     const filterKeyword = this.keyword ? this.keyword.trim() : null;

     const hasAnyFilter = filterKeyword ||  checkedCategory.length > 0;
 
     if (!hasAnyFilter) {
       this.filteredBlogs = this.blogArray.slice(); 
       return;
     }
 
     this.filteredBlogs = this.blogArray.filter(blog => {
       const matchesCategory = checkedCategory.length === 0 || checkedCategory.includes(blog.category);
       const matchesKeyword = !filterKeyword || blog.title.toLowerCase().includes(filterKeyword.toLowerCase());
 
       return matchesKeyword && matchesCategory;
     });
 
  }
}
