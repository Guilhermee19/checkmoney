import { inject, Injectable } from '@angular/core';
import { IUser } from '@app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cookieService = inject(CookieService);

  private UserSubject = new Subject<void>();
  private myUser = {} as IUser;

  public get myself() {
    return this.myUser;
  }

  public set myself(user: IUser) {
    this.myUser = user;
  }

  public watchUser() {
    return this.UserSubject.asObservable();
  }

  public changeUser(): void {
    this.UserSubject.next();
  }

  public get token() {
    if (this.cookies) {
      return this.cookieService.get('token');
    } else {
      return sessionStorage.getItem('token');
    }
  }

  public get cookies() {
    return localStorage.getItem('cookies') === 'true';
  }

  public set cookies(value: boolean) {
    localStorage.setItem('cookies', value.toString());
  }
}
