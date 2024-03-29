import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { PlanoPage } from '../pages/plano/plano';
import { PerfilPage } from '../pages/perfil/perfil';
import { PerfilEditarPage } from '../pages/perfil-editar/perfil-editar';
import { MedidasPage } from '../pages/medidas/medidas';
import { MedidasAddPage } from '../pages/medidas-add/medidas-add';
import { RecomendacaoPage } from '../pages/recomendacao/recomendacao';

import { UploadImagePage } from '../pages/upload-image/upload-image';
import { AlterarSenhaPage } from '../pages/alterar-senha/alterar-senha';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

import { IonicStorageModule } from "@ionic/storage";

import { ConsultasProvider } from '../providers/consultas/consultas';
import { PacienteProvider } from '../providers/paciente/paciente';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { Session } from '../providers/session/session';

import { GooglePlus } from '@ionic-native/google-plus';

import { Db } from '../storage/db';

import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { Camera } from '@ionic-native/camera';

import { BrMaskerModule } from 'brmasker-ionic-3';

import { FilePath } from '@ionic-native/file-path';

import { IonicSwipeAllModule } from 'ionic-swipe-all';

import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { SwipeSegmentDirective } from '../directives/swipe-segment';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PlanoPage,
    PerfilPage,
    PerfilEditarPage,
    MedidasPage,
    RecomendacaoPage,
    MedidasAddPage,
    UploadImagePage,
    SwipeSegmentDirective,
    AlterarSenhaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrMaskerModule,
    AngularCropperjsModule,
    IonicSwipeAllModule,
  ],
  exports: [
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PlanoPage,
    PerfilPage,
    PerfilEditarPage,
    MedidasPage,
    RecomendacaoPage,
    MedidasAddPage,
    UploadImagePage,
    AlterarSenhaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ConsultasProvider,
    PacienteProvider,
    LocalNotifications,
    Session,
    Db,
    GooglePlus,
    FileTransfer,
    File,
    FilePath,
    Camera,
    NativePageTransitions,
    AdMobFree
  ]
})
export class AppModule {}
