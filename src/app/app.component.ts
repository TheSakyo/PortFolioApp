import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IoniconsUtils } from './utils/ionicons.utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule
  ]
})
export class AppComponent {

  /********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /********************************************************/
  
  constructor() { IoniconsUtils.loadIcons(); }
}
