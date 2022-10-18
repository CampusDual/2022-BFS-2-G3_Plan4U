import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoggerService } from 'src/app/services/logger.service';
import { UserService } from 'src/app/services/user.service';
import { validarQueSeanIguales } from './edit-user.validators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
 loginUser: string;

  userForm: FormGroup;
  user: User;
  errores: string[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.createFormGroup();
    this.loginUser = this.route.snapshot.params['login'];
    if (this.loginUser) {
      this.userService.getUser(this.loginUser).subscribe(
        response => {
          this.user = response;
          this.userForm.patchValue(this.user, { emitEvent: false, onlySelf: false });
          this.logger.info(this.user);
        }
      );
    }
  }



  onFormChanges() {
    this.userForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.userForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      surname: [this.user.surname],
      login: [this.user.login, Validators.required],
      phone: [this.user.phone, [Validators.required, Validators.pattern("^[0-9]{9}$")]],
      email: [this.user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: [this.user.password, [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      'confirmPassword':['', Validators.required],
      nif: [this.user.nif, Validators.required],
    },
    {
      validators: validarQueSeanIguales
    });

  }

  checarSiSonIguales(): boolean {

    return this.userForm.hasError('noSonIguales') &&

      this.userForm.get('password').dirty &&

      this.userForm.get('confirmPassword').dirty;

  }

  save() {
    const newUser: User = Object.assign({}, this.userForm.value);
    if (newUser.id) {
      this.userService.editUser(newUser).subscribe((response) =>{
        this.redirectList(response);
      });
    } else {
      this.userService.createUser(newUser).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }
  

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/login']);
    }else{
      console.log(response);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.login === o2.login;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
