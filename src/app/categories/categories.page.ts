import { Component, OnInit } from '@angular/core';
import {butterService} from '../../services/buttercms.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
	categories:any=[];
  constructor() { }

  ngOnInit() {
butterService.category.list()
      .then((res) => {
        console.log(res.data.data)
        this.categories = res.data.data;
      })
  }

}
