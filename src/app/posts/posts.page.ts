import { Component, OnInit } from '@angular/core';
import {butterService} from '../../services/buttercms.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  constructor() { }
  posts: any;
  ngOnInit() {
  	butterService.post.list({
                page: 1,
                page_size: 10
            })
            .then((res) => {
                console.log('Content from ButterCMS');
                console.log(res);
                this.posts = res.data.data;
            });
  }

}
