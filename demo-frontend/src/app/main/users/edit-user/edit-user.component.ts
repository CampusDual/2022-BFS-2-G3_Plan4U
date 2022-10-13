import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoggerService } from 'src/app/services/logger.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  idUser: number;

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
    this.idUser = this.route.snapshot.params['id'];
    if (this.idUser) {
      this.userService.getUser(this.idUser).subscribe(
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
      login: [this.user.login],
      phone: [this.user.phone, [Validators.required, Validators.pattern("^[0-9]{9}$")]],
      email: [this.user.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: [this.user.password, [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      nif: [this.user.nif, Validators.required],
    });
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
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
