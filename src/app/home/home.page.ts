import { Component, OnInit } from '@angular/core';
import {butterService} from '../../services/buttercms.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  page: any;
  constructor() { }

  ngOnInit() {
    butterService.page.retrieve('*', 'home-page')
      .then((res) => {
        console.log(res.data.data);
        this.page = res.data.data;
      }).catch((res) => {
      console.log(res);
    });
  }

}
