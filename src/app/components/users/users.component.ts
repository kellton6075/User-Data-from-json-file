import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  searchData = '';
  totalUsers = [];
  paginatedUsers = [];
  users;
  sortFields = {};
  constructor(public userService: UserService, private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  /**
   * @method getUserData()
   * @desc used to get user data from json file.
   */
  getUserData(): void {
    this.userService.getUserJSON().subscribe(res => {
      this.totalUsers = res;
      this.searchUsers();
    }, err => {
      //
    });
  }

  /**
   * @method searchUsers()
   * @desc used to get filtered user data.
   * @param page: number- the current page data.
   */
  searchUsers(page?: number): void {
    page = page || 0;
    this.paginatedUsers = this.totalUsers.filter(user =>
      user.name.toLowerCase().indexOf(this.searchData.toLowerCase()) > -1);
    if (page) {
        this.users = this.paginatedUsers.slice(10 * (page - 1), 10 * page);
      } else {
        this.users = this.paginatedUsers.slice(0, 10);
      }
  }

  /**
   * @method onInput()
   * @desc used to get data on search operation.
   */
  onInput(): void {
    this.paginatedUsers = [];
    this.searchUsers();
  }

  /**
   * @method sortUsers()
   * @desc used to sort table using table headers.
   * @param field: string- contains table related info table header.
   */
  sortUsers(field): void {
    if (Object.keys(this.sortFields).indexOf(field) > -1) {
      this.sortFields[field] === 'ASC' ? this.sortFields[field] = 'DESC' :
        this.sortFields[field] = 'ASC';
    } else {
      this.sortFields = {};
      this.sortFields[field] = 'ASC';
    }
    this.totalUsers.sort((a, b) => {
      if (field === 'name' || field === 'city') {
        return this.sortFields[field] === 'ASC' ? a[field].localeCompare(b[field]) :
          b[field].localeCompare(a[field]);
      } else {
        return this.sortFields[field] === 'ASC' ?
          typeof (a[field]) !== 'number' ? Number(a[field].substring(1, a[field].length).split(',').join('')) -
            Number(b[field].substring(1, b[field].length).split(',').join('')) : a[field] - b[field]
          :
          typeof (a[field]) !== 'number' ? Number(b[field].substring(1, b[field].length).split(',').join('')) -
            Number(a[field].substring(1, a[field].length).split(',').join('')) : b[field] - a[field];
      }
    }
    );
    this.paginatedUsers = [];
    this.ref.detectChanges();
    this.searchUsers();
  }

  /**
   * @method goPrev()
   * @desc used to get data of previous page.
   * @param page: number- contains table related info like page number.
   */
  goPrev(page): void {
    if (page <= this.paginatedUsers.length) {
      this.searchUsers(page);
    }
  }

  /**
   * @method goNext()
   * @desc used to get data of next page.
   * @param page: number- contains table related info like page number.
   */
  goNext(page): void {
    if (page >= 1) {
      this.searchUsers(page);
    }
  }

  /**
   * @method goToPage()
   * @desc used to get data of current page.
   * @param page: number- contains table related info like page number.
   */
  goToPage(page): void {
    if (page >= 1 && page <= this.paginatedUsers.length) {
      this.searchUsers(page);
    }
  }
}
