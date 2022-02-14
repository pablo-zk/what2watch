import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListService } from 'src/app/core/list.service';
import { List } from 'src/app/shared/list';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.page.html',
  styleUrls: ['./list-add.page.scss'],
})
export class ListAddPage implements OnInit {
  errorMessage: string;
  listFrm: FormGroup;

  listId: number = 0;
  //Porque hay que inicializarlo todo el rato??
  list: List = {
    id: 0,
    title: '',
    icon: '',
    films: '',
  };
  title: string;
  icon: string;

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getState().subscribe(data=>{
      if(data != 1){
        alert("Cuenta no validada");
        this.authService.logout()
        this.router.navigate(['login'])
      }
  });
    // this.listFrm = this.fb.group({
    //   title: '',
    //   icon: '',
    //   films: '',
    // });
    //this.listId = parseInt(this.activatedroute.snapshot.params['id']);
    //console.log(this.listId);
  }

  saveList(): void {
    this.list.title = this.title;
    this.list.icon = this.icon;
    this.list.films = '';

    this.listService.createList(this.list).subscribe((data) => {
      //No hace este if. Muestra por cada lista la alerta.
      if (data.message.startsWith('ERROR')) {
        this.onSaveComplete(data.message);
      } else{
        this.router.navigateByUrl('/tabs/tab-user');
      }
    });
  }
  addIcon($event): void{
    this.icon = $event.target.value;
  }
  onSaveComplete(message): void {
    this.alertCtrl
      .create({
        header: message.startsWith('ERROR:') ? 'ERROR' : 'CORRECTO',
        message: message,
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
  }
  
}
