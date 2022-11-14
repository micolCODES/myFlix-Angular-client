import { Injectable } from '@angular/core'
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://micolsmovieapp.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get one movie
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
    .get(`${apiUrl}movies/${title}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get director
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
    .get(`${apiUrl}movies/director/${director}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get genre
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
    .get(`${apiUrl}movies/Genre/${genre}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get user and get favorite movies of a user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Add a movie to favorite Movies
  addFavoriteMovies(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
    .put(
      `${apiUrl}users/${user}/movies/${movieID}`,
      { FavoriteMovie: movieID },
      {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      }
    )
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Edit user
  editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
    .put(`${apiUrl}users/${user}`, updateDetails, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
    .pipe(map(this.extractResponseData), catchError(this.handleError));  
  }

  //get favorite movie
  getFavoriteMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const user = localStorage.getItem('User');
    return this.http
    .get(`${apiUrl}users/${user}/movies`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Delete a movie from the favorite movies list
  removeFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
    .delete(`${apiUrl}users/${user}/movies/${movieID}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //delete user

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
    .delete(`${apiUrl}users/${user}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
      console.table(error);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}