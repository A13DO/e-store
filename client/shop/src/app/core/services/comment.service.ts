import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(productID: any) {
    return this.http.get<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}`
    );
  }

  getOneComment(productID: any, uid: any) {
    return this.http.get<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}/${uid}`
    );
  }

  saveComment(productID: string, body: any): Observable<any> {
    localStorage.setItem('commentExists', 'true');
    return this.http.post<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}`,
      body
    );
  }

  updateComment(productID: any, uid: any, body: any) {
    return this.http.put<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}/${uid}`,
      body
    );
  }
}
