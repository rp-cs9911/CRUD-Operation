import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos!: any;
  email!: any;
  password!: any;
  oldEmail!: any;
  oldPassWord!: any;
  appState = "default";
  form!: FormGroup;

  constructor(private crudSvc: CrudService) {}

  ngOnInit() {
    this.initForm();
    this.todos = this.crudSvc.getusers();
    console.log(this.todos)
  }

  initForm(){
    this.form = new FormGroup({
      email :  new FormControl('', [Validators.required]),
      password :  new FormControl('', [Validators.required]),
    });
  }

  addTodo() {
    const value = this.form.value;
    let user = {
      email: value.email,
      password: value.password
    };
    this.todos.push(user);

    this.crudSvc.adduser(user);
    this.form.reset();

  }

  deleteUser(email: any) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].email == email) {
        this.todos.splice(i, 1);
      }
    }

    this.crudSvc.deleteuser(email);
  }

  edituser(todo: any) {
    console.log(todo);
    console.log(todo.email);
    console.log(todo.password);
    this.appState = "edit";
    this.oldEmail = todo.email;
    this.oldPassWord = todo.password; 
    this.form.get('email')?.setValue(todo.email);
    this.form.get('password')?.setValue(todo.password);
  }

  updateuser() {
    const value = this.form.value;
    console.log(value);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].email == this.oldEmail || this.todos[i].password == this.oldPassWord) {
        this.todos[i].email = value.email;
        this.todos[i].password = value.password;
      }
    }

    this.crudSvc.updateuser(this.oldEmail, value.email, value.password );
    this.form.reset();
    this.appState = 'default';
  }
}
