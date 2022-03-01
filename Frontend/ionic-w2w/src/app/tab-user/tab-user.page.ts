import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ListService } from '../core/list.service';
import { ActionsService } from '../services/actions.service';
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
  url: any =
    'https://sdk.bitmoji.com/render/panel/c3e11e16-4432-4483-a0f9-548dbe0d5586-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1';

  constructor(
    private listService: ListService,
    private authService: AuthService,
    private router: Router,
    private authservice: AuthService,
    private action: ActionsService
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
          this.router.navigate(['/tabs/tab-user/admin-control']);
        } else {
          this.listService.getLists().subscribe((data: List[]) => {
            this.lists = data;
          });
          console.log('getLists: ' + this.lists);
        }
      }
    });

    this.username = localStorage.getItem('u');
  }

  showAvatars() {
    this.action.showAvatars(this.url);
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
