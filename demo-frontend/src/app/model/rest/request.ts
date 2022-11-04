import { Contact } from '../contact';
import { Publication } from '../publication';
import { User } from '../user';

export class QuerySortPaginationRequest {
  query: string;
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortColumn: string;

  constructor(query: string, pageIndex: number, pageSize: number, sortDirection: string, sortColumn: string) {
    this.query = query;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortDirection = sortDirection;
    this.sortColumn = sortColumn;
  }
}

export class CreateContactRequest {
  name: string;
  surname1: string;
  surname2: string;
  phone: number;
  email: string;

  constructor(contact: Contact) {
    this.name = contact.name;
    this.surname1 = contact.surname1;
    this.surname2 = contact.surname2;
    this.phone = contact.phone;
    this.email = contact.email;
  }
}

export class EditContactRequest extends CreateContactRequest {
  id: number;

  constructor(contact: Contact) {
    super(contact);
    this.id = contact.id;
  }
}

export class CreateUserRequest {
    name: string;
    surname: string;
    nif: string;
    phone: number;
    email: string;
    login: string;
    password: string;
    profiles: string [];

  constructor(user: User) {

    this.name = user.name;
    this.nif = user.nif;
    this.phone = user.phone;
    this.email = user.email;
    this.login = user.login;
    this.surname = user.surname;
    this.password = user.password;
    this.profiles = ["2"];
  }

}
  export class EditUserRequest extends CreateUserRequest {
    id: number;

    constructor(user: User) {
      super(user);
      this.id = user.id;
    }
}

export class CreatePublicationRequest {
  title: string;
  content: string;
  createDate: string;
  userLogin: string;
  categoryName: string;
  provinceName: string;
  eventDate: Date;

  constructor(publication: Publication) {
    this.title = publication.title;
    this.content = publication.content;
    this.createDate = publication.createDate;
    this.userLogin = publication.userLogin;
    this.categoryName= publication.categoryName;
    this.provinceName= publication.provinceName;
    this.eventDate= publication.eventDate;
  }
}

export class EditPublicationRequest extends CreatePublicationRequest {
  id : number;

  constructor(publication: Publication) {
    super(publication);
    this.id = publication.id;
  }
}

