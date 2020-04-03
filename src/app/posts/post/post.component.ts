import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {butterService} from '../../../services/buttercms.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  constructor(protected route: ActivatedRoute) {
    }

    protected slug$: Observable<any>;
    public post = {
        meta: null,
        data: null
    };

    ngOnInit() {
        this.slug$ = this.route.paramMap
            .pipe(
                map(params => (params.get('slug')))
            );

        this.slug$.pipe(
            take(1))
            .subscribe(slug => {
                butterService.post.retrieve(slug)
                    .then((res) => {
                    console.log(res.data);
                        this.post = res.data.data;
                    }).catch((res) => {
                    console.log(res);
                });
            });
    }

}
