import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoggerService } from 'src/app/services/logger.service';
import { UserService } from 'src/app/services/user.service';
import { checkMatch  } from './edit-user.validators';
import { AuthService } from 'src/app/auth/auth.service';

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
  userName: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private authService: AuthService
  ) {
    this.user = new User();
   
  
  }

  ngOnInit() {
    if(this.authService.getUserName ){
      this.createFormGroup();
      this.userName =  this.authService.getUserName();
      if (this.userName) {
        this.userService.getUser(this.userName).subscribe(
          response => {
            this.user = response;
            this.userForm.patchValue(this.user, { emitEvent: false, onlySelf: false });
            this.logger.info(this.user);
          }
        );
      }
    }else{
      this.createFormGroup();
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
      'confirmPassword':['', Validators.required ],
      nif: [this.user.nif, Validators.required],
    },
    {
      validators: checkMatch
    });

  }

  notMatchPassword() {
    if(this.userForm.hasError('notMatch')){
      this.userForm.get('confirmPassword').setErrors([{'notMatch':true}])
    }else{
      this.userForm.get('confirmPassword').setErrors(null)
    }
    
  }

  save() {
    const newUser: User = Object.assign({}, this.userForm.value);
    if (newUser.id) {
      this.authService.getUserName().subscribe((response) =>{
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
