
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    admin: { name: 'Admin', picture: 'assets/images/kitten-cosmic.png' }
  };

  private userArray: any[];

  constructor(private http: HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }

  getUsersData(calbk: any) {
    this.http.get('/getusers').subscribe((result: any) => {
      const users = result.data.filter(el => el.role.toLowerCase() !== 'driver');
      calbk(users);
    });
  }

  getDriversData(calbk: any) {
    // this.http.get('/getusers').subscribe((result: any) => {
    //   const drivers = result.data.filter(el => el.role.toLowerCase() === 'driver');
    //   calbk(drivers);
    // });

    this.http.get('/drivers').subscribe((result: any) => calbk(result.data));
  }

  createUser(user: any): Observable<any> {
    return this.http.post('/adduser', user);
  }

  removeUser(user: any): Observable<any> {
    // const options = { params: new HttpParams().set('username', user.email) };
    return this.http.delete('/rmuser/' + user.email);
  }

  getNumberofDrivers(): Observable<any> {
    return this.http.get('/getnumberdrivers');
  }
}
