import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../core/list.service';
import { AuthService } from '../services/auth.service';
import { List } from '../shared/list';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.page.html',
  styleUrls: ['./admin-control.page.scss'],
})
export class AdminControlPage implements OnInit {
  lists: List[] = [];
  constructor(
    private listService: ListService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        //alert('Cuenta no validada');
        this.authService.logout();
        this.router.navigate(['login']);
      } else {
        if (localStorage.getItem('r') == 'ROLE_ADMIN') {
          this.listService.getAllLists().subscribe((data: List[]) => {
            this.lists = data;
          });
          console.log('getAllLists: ' + this.lists);
        } else {
          this.router.navigate(['']);
        }
      }
    });
  }

  loginOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
