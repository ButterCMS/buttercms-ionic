import { Component, OnInit } from '@angular/core';
import {butterService} from '../../../services/buttercms.service';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  posts:any=[];
  constructor(private route: ActivatedRoute) { }
  slug$: Observable<any>;

  ngOnInit() {
    this.slug$ = this.route.paramMap
    .pipe(
        map(params => (params.get('slug')))
    );

this.slug$.pipe(
    take(1))
    .subscribe(slug => {
        butterService.category.retrieve(slug, {
      include: 'recent_posts'
    }).then((res) => {
      console.log(res.data.data);
      this.posts = res.data.data;
    }).catch((res) => {
    console.log(res);
  });
}
    );
  }

}
