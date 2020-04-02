import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClientService } from '../../services/domain/client.service';
import { ClientDTO } from '../../models/client.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response
          this.getImageIfExists()
        },
        error => {})
    }
  }

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
        this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`
      },
      error => {})
  }
}
