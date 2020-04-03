import { Component, OnInit } from '@angular/core';
import {butterService} from '../../../services/buttercms.service';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
	customer: any;
	slug$: Observable<any>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
this.slug$ = this.route.paramMap
            .pipe(
                map(params => (params.get('id')))
            );

        this.slug$.pipe(
            take(1))
            .subscribe(slug => {
                butterService.page.retrieve('customer_case_study', slug)
			      .then((res) => {
			        console.log(res.data.data);
			        this.customer = res.data.data;
			      }).catch((res) => {
			      console.log(res);
			    });
			  }
            );
    	}
}
