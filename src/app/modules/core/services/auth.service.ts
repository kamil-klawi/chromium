import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import {
  GetUsersResponse,
  PostUser,
  PostUserResponse,
  User,
  UserLoginData,
} from '../models/user.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  isLogged() {
    return !!this.user.getValue();
  }

  signin(userData: UserLoginData): Observable<User[]> {
    return this.http.get<GetUsersResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArray) =>
        userArray.filter(
          (user) =>
            user.username === userData.username &&
            user.password === userData.password,
        ),
      ),
      map((userArray) =>
        userArray.map((user) => new User(user.email, user.username)),
      ),
      tap((userArray) => this.handleAuthentication(userArray)),
    );
  }

  signup(userData: PostUser): Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(`${this.apiUrl}/users`, userData);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/logowanie']);

    localStorage.removeItem('user');
  }

  autoLogin() {
    const userData: { email: string; username: string } = JSON.parse(
      localStorage.getItem('user') as string,
    );

    if (!userData) {
      return;
    }

    const user = new User(userData.email, userData.username);
    this.user.next(user);
  }

  private handleAuthentication(userArray: User[]) {
    if (userArray.length === 0) {
      return;
    }

    const user: User = userArray[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/']);
  }
}
