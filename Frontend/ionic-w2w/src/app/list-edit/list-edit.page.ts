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

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.page.html',
  styleUrls: ['./list-edit.page.scss'],
})
export class ListEditPage implements OnInit {
  listForm: any;
  errorMessage: string = '';
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: [],
  };
  listId: number = 0;

  list_title: string = '';
  // Probando el NavController. No se puede poner ngModel en etiqueta ion-input
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.listForm = this.fb.group({
      id: 0,
      title: '',
      icon: '',
      films: [''],
    });
    // this.listService
    //   .getListById(this.listId)
    //   .subscribe((data: List) => (this.list = data));
    this.listId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getList(this.listId);
  }

  getList(id: number): void {
    this.listService
      .getListById(id)
      .subscribe((list: List) => this.displayList(list));
    (error: any) => (this.errorMessage = <any>error);
  }

  displayList(list: List): void {
    if (this.listForm) {
      this.listForm.reset();
    }

    this.list = list;
    this.list_title = list.title;

    // Update los datos en el from

    this.listForm.patchValue({
      title: this.list.title,
      icon: this.list.icon,
      films: this.list.films,
    });
  }

  deleteList(): void {
    if (this.list.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the list: ${this.list.title}?`)) {
        this.listService.deleteList(this.list.id).subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
      }
    }
  }

  goEdit(): void {
    this.route.navigate(['lists/edit/', this.listId]);
  }

  myVal = '';
  myVal2 = 'hola';

  saveName() {
    this.list = this.listForm.value;
    this.list.id = this.listId;
    this.list.title = this.myVal;

    this.listService.updateList(this.list).subscribe(
      () => this.onSaveComplete(),
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onSaveComplete(): void {
    this.listForm.reset();
    this.route.navigate(['/tabs/tab-user']);
  }
}
