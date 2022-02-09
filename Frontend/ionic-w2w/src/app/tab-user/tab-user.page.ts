import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../core/list.service';
import { AuthService } from '../services/auth.service';
import { List } from './../shared/list';

@Component({
  selector: 'app-tab-user',
  templateUrl: './tab-user.page.html',
  styleUrls: ['./tab-user.page.scss'],
})
export class TabUserPage implements OnInit {
  lists: List[] = [];
  listById: List;
  username: string;
  constructor(
    private listService: ListService,
    private authService: AuthService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        //alert('Cuenta no validada');
        this.authService.logout();
        this.router.navigate(['login']);
      }
    });
    this.listService.getLists().subscribe((data: List[]) => {
      this.lists = data;
    });
    this.username = localStorage.getItem('u');
  }

  newList() {
    /*this.listService
      .getMaxListId()
      .subscribe((data) => (this.listId = data + 1));
    console.log('el id es: ' + this.listId);*/
    this.router.navigate(['/tabs/tab-user/lists/new']);
  }

  login() {
    this.router.navigate(['/login']);
  }
  loginOut() {
    this.authservice.logout();
    this.router.navigate(['']);
  }

  register() {
    this.router.navigate(['/register']);
  }
  userLogin() {
    this.authservice.isLoggedIn();
    this.username = localStorage.getItem('u');
    //console.log(this.authservice.isLoggedIn());
  }

  // ionViewDidEnter() {
  //   this.listService.getListById(1).subscribe((data: List) => {
  //     this.listById = data;
  //   });
  // }
}
