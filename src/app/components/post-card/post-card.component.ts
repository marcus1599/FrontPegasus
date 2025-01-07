import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Post {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-post-card',
  standalone: true,
  template: `
    <div class="post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <div class="actions">
        <button (click)="onEdit()">Editar</button>
        <button (click)="onDelete()">Excluir</button>
      </div>
    </div>
  `,
  styles: [`
    .post-card {
      background: #f4f4f4;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .actions button {
      margin-right: 10px;
    }
  `],
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<Post>();

  onEdit() {
    this.edit.emit(this.post);
  }

  onDelete() {
    this.delete.emit(this.post);
  }
}
