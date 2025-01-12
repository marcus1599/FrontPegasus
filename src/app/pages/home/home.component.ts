import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { NgFor, CommonModule } from '@angular/common';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { RecomendedComponent } from '../../components/recomended/recomended.component';
import { PostService } from '../../services/post.service';

import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent, 
    NgFor, 
    CommonModule, 
    AvisoComponent, 
    RecomendedComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  recomends: any[] = [];
  filteredPosts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchQuery: string = '';
  sortField: string = 'data_criacao';
  sortOrder: string = 'asc';

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
    
  }

  loadPosts() {
    this.postService.findAll().subscribe({
      next: (data) => {
        this.posts = data;
        this.applyFilters();
      },
      error: (err) => console.error("Erro ao carregar posts", err)
    });
  }

  

  applyFilters() {
    let filtered = this.posts;

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(post => 
        post.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.descricao.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let fieldA = a[this.sortField];
      let fieldB = b[this.sortField];
      if (this.sortOrder === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredPosts = filtered.slice(startIndex, endIndex);
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.applyFilters();
  }

  onSort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }
}
