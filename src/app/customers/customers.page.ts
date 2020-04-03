import { Component, OnInit } from '@angular/core';
import {butterService} from '../../services/buttercms.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
	customers: any;
  constructor() { }

  ngOnInit() {
  butterService.page.list('customer_case_study')
      .then((res) => {
        console.log(res.data.data);
        this.customers = res.data.data;
      }).catch((res) => {
      console.log(res);
    });
  }

}
