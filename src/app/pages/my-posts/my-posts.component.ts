import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = [];
  paginatedPosts: Post[] = [];
  currentPage = 1;
  postsPerPage = 5;
  totalPages = 0;
  isModalOpen = false;
  editPost: Post | null = null;
  currentPost: Post = { id_postagem: 0, nome: '', descricao: '', usuario_id_usuario: 0, data_criacao: new Date().toISOString() };
  post: Post = {
    nome: '',
    descricao: '',
    data_criacao: '',
    usuario_id_usuario: 0,
    imagems: null 
  };

  constructor(private postService: PostService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    
    const user = JSON.parse(localStorage.getItem('userinfo') || '{}');
    const userId = user.id_usuario; 
    if (userId) {
      this.postService.findByUserID(userId).subscribe({
        next: (data) => {
          this.posts = data;
          this.currentPost.usuario_id_usuario = userId;
          this.post.usuario_id_usuario = userId;
          this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
          this.applyFilters();
          this.cdr.markForCheck();
        },
        error: (err) => console.error("Erro ao carregar posts", err)
      });
    } else {
      console.error("User ID not found in local storage",userId);
    }
  }


  applyFilters() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
    this.cdr.markForCheck();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  onCreateNewPost() {
    this.currentPost = { id_postagem: undefined, nome: '', descricao: '', usuario_id_usuario: this.currentPost.usuario_id_usuario, data_criacao: new Date().toISOString() };
    this.isModalOpen = true;
    this.editPost = null;
    this.cdr.markForCheck();
  }

  onEditPost(post: Post) {
    this.currentPost = { ...post };
    this.isModalOpen = true;
    this.editPost = post;
    this.cdr.markForCheck();
  }

  onDeletePost(post: Post) {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      if (post.id_postagem !== undefined) {
        this.deletePost(post.id_postagem);
      } else {
        console.error("Post ID is undefined");
      }
    }
  }

  savePost() {
    if (this.editPost) {
      this.postService.updatePost(this.currentPost).subscribe({
        next: () => {
          this.loadPosts();
          this.isModalOpen = false;
          this.cdr.markForCheck();
        },
        error: (err) => console.error("Erro ao atualizar post", err)
      });
    } else {
      this.postService.save(this.currentPost,this.currentPost.usuario_id_usuario).subscribe({
        next: () => {
          this.loadPosts();
          this.isModalOpen = false;
          this.cdr.markForCheck();
          
        },
        error: (err) => console.error("Erro ao criar post", err, this.currentPost)
      });
    }
  }

  onSubmitPost() {
    this.savePost();
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.currentPost = { id_postagem: 0, nome: '', descricao: '', usuario_id_usuario: 0, data_criacao: new Date().toISOString() };
    this.cdr.markForCheck();
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.loadPosts();
        this.cdr.markForCheck();
      },
      error: (err) => console.error("Erro ao excluir post", err)
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.currentPost.imagems = input.files[0];
      this.cdr.markForCheck();
    }
  }
}
