import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, MenuController, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { PlanoPage } from '../pages/plano/plano';
import { PerfilPage } from '../pages/perfil/perfil';
import { MedidasPage } from '../pages/medidas/medidas';
import { RecomendacaoPage } from '../pages/recomendacao/recomendacao';

import { Paciente } from '../models/paciente/paciente';

import { Session } from '../providers/session/session';

import {Storage} from "@ionic/storage";

import {AuthProvider} from "../providers/auth/auth";
import {PacienteProvider} from "../providers/paciente/paciente";

import { Db } from '../storage/db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  private user: any;
  private nome: any;
  private avatar: any;
  private paciente: Paciente;

  pages: Array<{title: string, component: any, icon: String}>;

  constructor(public platform: Platform,
    public app: App,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    public pacienteProvider: PacienteProvider,
    public menuCtrl: MenuController,
    private session: Session,
    public alertCtrl: AlertController,
    private db: Db,
    public events: Events,
    private readonly storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Início', component: HomePage, icon: 'menu' },
      { title: 'Meus Dados', component: PerfilPage, icon: 'person' },
      { title: 'Plano Alimentar', component: PlanoPage, icon: 'restaurant' },
      { title: 'Medidas', component: MedidasPage, icon: 'speedometer' },
      { title: 'Recomendações', component: RecomendacaoPage, icon: 'heart' },

    ];

    events.subscribe('user:logged', (paciente, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`

      paciente.then(resultado=> {

          if(resultado) {
              this.nome = resultado.nome;
              this.avatar = resultado.avatar;
          }

        });

        //console.log('Welcome', paciente, 'at', time);
    });

  }

  getPaciente() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();

      this.splashScreen.hide();

      this.db.exist('paciente').then(response=>{

        this.db.get('paciente')
          .then(resultado=> {

            if(resultado) {
                this.nome = resultado.nome;
                this.avatar = resultado.avatar;
            }

          });

        this.rootPage = response
                      ? HomePage
                      : LoginPage;
      })

    });

    this.platform.registerBackButtonAction(() => {
        // Catches the active view
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        // Checks if can go back before show up the alert
        if(activeView.name === 'HomePage') {
            if (nav.canGoBack()){
                nav.pop();
            } else {
                const alert = this.alertCtrl.create({
                    title: 'Sair do app',
                    message: 'Você tem certeza?',
                    buttons: [{
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => {
                          this.nav.setRoot(HomePage);
                        }
                    },{
                        text: 'Sim',
                        handler: () => {
                          this.platform.exitApp();
                        }
                    }]
                });
                alert.present();
            }
        } else {
          if(activeView.name != 'LoginPage') {
              this.nav.setRoot(HomePage);
          }
        }
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);


  }

  logoutClicked() {
    this.auth.logout();
    this.db.remove('paciente');
    this.db.remove('token');
    this.db.remove('user');

    this.db.remove('alimentos');
    this.db.remove('atividades');
    this.db.remove('consultas');
    this.db.remove('medidas');
    this.db.remove('planos');
    this.db.remove('injestao');
    this.db.remove('recomendacoes');

    this.menuCtrl.close();
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }
}
