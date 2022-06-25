import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor() {
    console.log('userService Works');
    this.load();
  }

  load() {
    console.log(localStorage.getItem('users'),'!!!!!!!')
    if (
      localStorage.getItem('users') === null ||
      localStorage.getItem('users') == undefined
    ) {
      console.log('No users Found... Creating...');
      let users = [
        {
          email: 'test@test.com',
          password: 'Rahul',
        },
        {
          email: 'test1@test1.com',
          password: 'Rahul1',
        },
        {
          email: 'test2@test2.com',
          password: 'Rahul2',
        },
      ];

      localStorage.setItem('users', JSON.stringify(users));
      return;
    } else {
      console.log('Found users...');
    }
  }

  getusers() {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    return users;
  }

  adduser(newuser: any) {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    users.push(newuser);
    localStorage.setItem('users', JSON.stringify(users) || '{}');
  }

  deleteuser(email: any) {
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        users.splice(i, 1);
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
  }

  updateuser(oldEmail: any, email: any, password: any, ) {
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    for (let i = 0; i < users.length; i++) {
      if (users[i].email == oldEmail) {
        users[i].email = email;
        users[i].password = password;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
  }
}
