import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';
@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ [name: string]: Post }>(
        'https://angular-http-requests-ada55-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
            observe: 'response'
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData.body);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
      return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-requests-ada55-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({
                'Custom-Header': 'Hello'
            }),
            params: new HttpParams().set('print', 'pretty')
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }

          return postsArray;
        }),
        catchError((errorResponse) => {
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://angular-http-requests-ada55-default-rtdb.firebaseio.com/posts.json',
      {
          observe: 'events',
          responseType: 'json'
      }
    ).pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {

        }
        if (event.type === HttpEventType.Response) {
            console.log(event.body);
        }
    }));
  }
}
