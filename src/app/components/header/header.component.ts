import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  language = 'English';
  title = 'app';

  constructor() {
     console.log(this.language);
  }

  changeLang() {
    console.log();
  }
}
