import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/core/list.service';
import { List } from 'src/app/shared/list';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.page.html',
  styleUrls: ['./list-edit.page.scss'],
})
export class ListEditPage implements OnInit {
  errorMessage: string = '';
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: '',
  };
  listId: number = 0;
  listTitle = '';

  // Probando el NavController. No se puede poner ngModel en etiqueta ion-input
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.authService.getState().subscribe((data) => {
      if (data != 1) {
        alert('Cuenta no validada');
        this.authService.logout();
        this.route.navigate(['login']);
      }
    });
    this.listId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.listService.getListById(this.listId).subscribe((data) => {
      this.list = data[0];
    });
    this.listTitle = this.list.title;
  }

  // deleteList(): void {
  //   if (this.list.id === 0) {
  //     this.onSaveComplete();
  //   } else {
  //     if (confirm(`Really delete the list: ${this.list.title}?`)) {
  //       this.listService.deleteList(this.list.id).subscribe(
  //         () => this.onSaveComplete(),
  //         (error: any) => (this.errorMessage = <any>error)
  //       );
  //     }
  //   }
  // }

  saveList() {
    this.list.id = this.listId;
    this.list.title = this.listTitle;

    this.listService.updateList(this.list).subscribe(
      () => this.onSaveComplete(),
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onSaveComplete(): void {
    //this.listForm.reset();
    this.route.navigate(['/tabs/tab-user']);
  }
}
