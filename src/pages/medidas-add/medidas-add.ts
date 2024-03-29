import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MedidasPage } from '../medidas/medidas';

import { AuthProvider } from './../../providers/auth/auth';

import { CONSTANTS } from '../../configs/constants/constants';

import { HomePage } from '../home/home';

import { Db } from '../../storage/db';

/**
 * Generated class for the MedidasAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medidas-add',
  templateUrl: 'medidas-add.html',
})
export class MedidasAddPage {

  private medida: any;
  public data = new Date().toISOString();
  public tipo = 1;

  private loading: Loading;

  constructor(public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alertCtrl: AlertController,
    private db: Db,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  goback() {
     this.navCtrl.setRoot(MedidasPage);
  }

  public storeMedida() {

      let postData = {
        tipo: this.tipo,
        medida: this.medida,
        data: new Date(this.data).toISOString(),
      }

      if(!this.tipo) {
          this.showError('Informe o tipo de medida.');
      } else if(!this.medida) {
          this.showError('Informe o valor da medida.');
      } else if(!this.data) {
          this.showError('Informe uma data.');
      } else {

        this.presentConfirmarAdicao(postData);

      }


  }

  public getMedidas() {

      let authKey = this.auth.getToken();

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: authKey,
          Accept: 'application/json;odata=verbose',
        })
      };

      return new Promise(resolve => {
        this.http.get(CONSTANTS.API_ENDPOINT_MEDIDAS+'?token='+authKey, httpOptions)
          .subscribe(
            data => {

              if(!data) {
                  return "Erro ao tentar se conectar com o servidor, ";
              } else {
                resolve(data);
              }
            },
            err =>  {
              return "Erro ao tentar se conectar com o servidor, " + err.message;
            }
        );
      });

  }

  public post(postData){

    let authKey = this.auth.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authKey,
        Accept: 'application/json;odata=verbose',
      })
    };

    return new Promise(resolve => {
      this.http.post(CONSTANTS.API_ENDPOINT_MEDIDAS_STORE, JSON.stringify(postData), httpOptions)
        .subscribe(
          data => {

            if(!data) {
                return "Erro ao tentar se conectar com o servidor, ";
            } else {

              resolve(data);

            }
          },
          err =>  {
            return "Erro ao tentar se conectar com o servidor, " + err.message;
          }
      );
    });

  }

  presentConfirmarAdicao(postData) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Inclusão',
      message: 'Deseja mesmo adicionar esta nova medida?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {

            this.showLoading();

            this.post(postData).then(data => {
                this.presentToast('Medida adicionada com sucesso.');
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });

            this.db.remove('medidas');

            this.getMedidas()
            .then(data => {
                  this.db.create('medidas', data);
            });

            this.navCtrl.setRoot(MedidasPage);

          }
        }
      ]
    });
    alert.present();

  }

  presentToast(text) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Salvando dados...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Importante',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
