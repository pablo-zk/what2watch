import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-avatar',
  templateUrl: './modal-avatar.page.html',
  styleUrls: ['./modal-avatar.page.scss'],
})
export class ModalAvatarPage implements OnInit {
  url;
  avatars: any = [
    {
      name: 'CocaFridge',
      url: 'https://sdk.bitmoji.com/render/panel/c3e11e16-4432-4483-a0f9-548dbe0d5586-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'CookMaster',
      url: 'https://sdk.bitmoji.com/render/panel/4180ffdb-770a-474e-a273-cc9d568adc22-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Ice-Teen-Age-Cream',
      url: 'https://sdk.bitmoji.com/render/panel/c648e4fb-744d-450a-af0e-c08083c786e5-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'I am busy',
      url: 'https://sdk.bitmoji.com/render/panel/721844a2-524c-49b4-ab66-c693ad098cd5-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Clowntastic',
      url: 'https://sdk.bitmoji.com/render/panel/37064d68-1c25-4c5d-8c6c-6da6b23876fd-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Peeling off',
      url: 'https://sdk.bitmoji.com/render/panel/0424dcbb-39cf-4a88-8703-1e58e0d3a306-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Wuss',
      url: 'https://sdk.bitmoji.com/render/panel/b0e37ab4-70e5-4334-b538-0d6868585ea3-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Shaundible',
      url: 'https://sdk.bitmoji.com/render/panel/81173d34-fe99-4aae-bfcb-63da7602ff01-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Superpony',
      url: 'https://sdk.bitmoji.com/render/panel/66d5fd71-7794-46a1-896b-1d3503529f94-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Banana Split',
      url: 'https://sdk.bitmoji.com/render/panel/ea2dae2b-416f-4717-b074-3566ca68441d-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'In Love',
      url: 'https://sdk.bitmoji.com/render/panel/d7246fe4-8562-4a48-b309-d9ffd2f7ccb1-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
    {
      name: 'Cat Cat Cat',
      url: 'https://sdk.bitmoji.com/render/panel/645d7eb0-1570-4a35-9b45-a8783cfe681a-6e65a05a-8d73-448a-a526-1d188bcf5d20-v1.png?transparent=1&palette=1',
    },
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.url);
  }

  selectAvatar(avatar) {
    this.url = avatar.url;
    console.log(this.url);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      url: this.url,
    });
  }
}
