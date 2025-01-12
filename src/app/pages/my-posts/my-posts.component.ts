import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgFor, PostCardComponent],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  posts: Post[] = [
   
  ];
  paginatedPosts: Post[] = [];
  currentPage = 1;
  postsPerPage = 5;
  totalPages = Math.ceil(this.posts.length / this.postsPerPage);
  isModalOpen = false;
  editPost: Post | null = null;
  currentPost: Post = { id_postagem: 0, nome: '', descricao: '', data_criacao: new Date().toISOString() };



  ngOnInit() {
    this.loadPosts();
    
  }

  loadPosts() {
    this.postService.findAll().subscribe({
      next: (data) => {
        this.posts = data;
      
      },
      error: (err) => console.error("Erro ao carregar posts", err)
    });
  }


  constructor(private router: Router, private postService: PostService) {
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedPosts();
  }

  onCreateNewPost() {
    this.currentPost = { id_postagem: 0, nome: '', descricao: '', data_criacao: new Date().toISOString() };
    this.editPost = null;
    this.router.navigate(['/new']);
  }

  onEditPost(post: Post) {
    this.currentPost = { ...post };
    this.isModalOpen = true;
    this.editPost = post;
  }

  onDeletePost(post: Post) {
    this.posts = this.posts.filter((p) => p.id_postagem !== post.id_postagem);
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePaginatedPosts();
  }

  onSubmitPost() {
    if (this.editPost) {
      const index = this.posts.findIndex((p) => p.id_postagem === this.editPost?.id_postagem);
      this.posts[index] = { ...this.currentPost };
    } else {
      const newId = Math.max(...this.posts.map((p) => p.id_postagem ?? 0), 0) + 1;
      this.posts.push({ ...this.currentPost, id_postagem: newId });
    }
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    this.updatePaginatedPosts();
    this.onCloseModal();
  }

  onCloseModal() {
    this.isModalOpen = false;
  }
}
