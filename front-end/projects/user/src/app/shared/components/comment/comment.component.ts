import { Component, Input } from '@angular/core';
import { Comment } from '../../../core/interfaces/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() commenttt!: Comment;

}
