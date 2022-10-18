import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userName: string;

  //dataSource: ContactDataSource;
  displayedColumns = [
    'select',
    'name',
    'surname',
    'nif',
    'phone',
    'email',
    'login',
    'password',

  ];
  fields = ['name', 'surname', 'nif', 'phone', 'email', 'login', 'password'];

  selection = new SelectionModel<User>(true, []);
  error = false;

  @ViewChild('edit') editTemplate: any;
  highlightedRow: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.userName = authService.getUserName();
  }


  ngOnInit(): void {
  }


  onAdd() {
    this.router.navigate(['/users/add']);
  }

  onEdit() {
    this.router.navigate(['/users/edit/' + this.authService.getUserName]);
  }


}


