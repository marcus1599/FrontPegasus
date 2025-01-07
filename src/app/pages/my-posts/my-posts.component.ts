import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostCardComponent } from "../../components/post-card/post-card.component";
import { Router, RouterLink } from '@angular/router';

interface Post {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgFor, PostCardComponent],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  posts: Post[] = [
    { id: 1, title: 'Primeiro Post', content: 'Conteúdo do primeiro post' },
    { id: 2, title: 'Segundo Post', content: 'Conteúdo do segundo post' },
    // Adicione mais posts para testar a paginação
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 3,
      title: `Post #${i + 3}`,
      content: `Conteúdo do post #${i + 3}`,
    })),
  ];
  paginatedPosts: Post[] = [];
  currentPage = 1;
  postsPerPage = 5;
  totalPages = Math.ceil(this.posts.length / this.postsPerPage);
  isModalOpen = false;
  editPost: Post | null = null;
  currentPost: Post = { id: 0, title: '', content: '' };

  constructor(private router: Router) {
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
    this.currentPost = { id: 0, title: '', content: '' };
    this.editPost = null;
    this.router.navigate(['/myposts']);
  }

  onEditPost(post: Post) {
    this.currentPost = { ...post };
    this.isModalOpen = true;
    this.editPost = post;
  }

  onDeletePost(post: Post) {
    this.posts = this.posts.filter((p) => p.id !== post.id);
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePaginatedPosts();
  }

  onSubmitPost() {
    if (this.editPost) {
      const index = this.posts.findIndex((p) => p.id === this.editPost?.id);
      this.posts[index] = { ...this.currentPost };
    } else {
      const newId = Math.max(...this.posts.map((p) => p.id), 0) + 1;
      this.posts.push({ ...this.currentPost, id: newId });
    }
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    this.updatePaginatedPosts();
    this.onCloseModal();
  }

  onCloseModal() {
    this.isModalOpen = false;
  }
}
