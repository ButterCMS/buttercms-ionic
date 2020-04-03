# buttercms-ionic 
Ionic starter project integrated with ButterCMS

## Install

Add [ButterCMS NPM module](https://www.npmjs.com/package/buttercms) as a dependency to your existing Ionic project.

If you plan to use this project directly, simply execute below commands to get going:
```bash
npm i
ionic serve
```
These commands will install the required dependencies for the project and start the project on your browser. You can also run the project directly in your mobile device connected to your system. 

For android, install the Java SDK, supporting Android SDKs and Emulator. Run the below command
``` bash
ionic cordova run android --device
```

## Quickstart
To integrate ButterCMS in your ongoing project, create a service file.
`services/buttercms.service.ts`
```typescript
import Butter from 'buttercms';

export const butterService = Butter('<your api token>');
```

Import ButterCMS client in your TS file:

```javascript
import {butterCMS} from './services/buttercms.service'
```

You can then test ButterCMS client by, for example, fetching all of your posts:
```typescript
butterService.post.list({
                page: 1,
                page_size: 10
            })
            .then((res) => {
                console.log('Content from ButterCMS');
                console.log(res);
                this.posts = res.data.data;
            });
```
This will fetch you upto 10 blog posts that you would have stored in your ButterCMS account

## Pages

### Get single page

With your homepage defined, the ButterCMS Pages API will return it in JSON format like this:
```json
{
  "data":{
    "slug": "home",
    "page_type": null,
    "fields": {
      "seo_title": "Marvellous Ionic page powered by ButterCMS",
      "headline": "Marvellous Ionic page powered by ButterCMS",
      "hero_image": "https://cdn.buttercms.com/WjJXN3B6ThWJpucfZM9P",
      "call_to_action": "Know more",
      "customer_logo": "https://cdn.buttercms.com/PTEqdDBReOq0X08W43sA"
    }
  }
}
```

To integrate this into your app, simply make a call to ButterCMS APIs using the ButterCMS service. Place this call in the `ngOnInit` hook:
`home/home.page.ts`
```typescript
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

```
To render the data, create the ionic page as below:
`home/home.page.html`
```html
<ion-header>
  <ion-toolbar>
    <ion-title>Home</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
<ion-card *ngIf="page">
  <ion-card-header >
  	<img src="{{page.fields.featured_image}}" height="200px"/>
    <ion-card-subtitle>{{page.fields.subtitle}}</ion-card-subtitle>
    <ion-card-title>{{page.fields.title}}</ion-card-title>
  </ion-card-header>

  <ion-card-content>
   <div [innerHTML]="page.fields.description"></div>
  </ion-card-content>
</ion-card>
<ion-button href="/posts">View Posts</ion-button> <ion-button href="/customers">View Customers</ion-button>
</ion-content>
```

##Get all page content of specific type. For instance, customers for the case study
`customers/customers.page.ts`
```typescript
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
```
The Ionic page to render the customer list can be written as below:
`customers/customers.page.html`
```html
<ion-header>
  <ion-toolbar>
    <ion-title>Customer Testimonials</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content *ngIf="customers">
<ion-card *ngFor="let customer of customers">
	<a href="/customers/{{customer.slug}}">
  <ion-card-header>
  	<img src="{{customer.fields.customer_logo}}" height="100px"/>
    <ion-card-title>{{customer.fields.seo_title}}</ion-card-title>
  </ion-card-header>

  <ion-card-content>
    <div [innerHTML]="customer.fields.headline"></div>
  </ion-card-content>
</a>
</ion-card>
<ion-button href="/home">Back</ion-button>
</ion-content>
```

##Viewing specific page of a specific type 
Below code create a customer component that displays the details of the customer. 

`customers/customer/customer.component.ts`
```typescript
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
```
To render the customer details, create Ionic page as shown below
`customers/customer/customer.component.html`
```typescript
<ion-header>
  <ion-toolbar>
    <ion-title *ngIf="customer">{{customer.fields.seo_title}}</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content  *ngIf="customer">

  	<ion-img [src]="customer.fields.customer_logo"></ion-img>
    <h1>{{customer.fields.seo_title}}</h1>
    <div [innerHTML]="customer.fields.testimonial"></div>
    
<ion-button href="/customers">Back</ion-button>
</ion-content>
```
## Blog Engine

### Display posts

To display posts we create a simple /blog route in our app and fetch blog posts from the Butter API. See our [API reference](https://buttercms.com/docs/api/) for additional options such as filtering by category or author. The response also includes some metadata we'll use for pagination.

To retrieve the blog posts using ButterCMS client, you can use the function `butter.post.list({})`

`posts/posts.page.ts`
```typescript
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
```
To display the posts in a card layout, create the ionic page as shown below:
`posts/posts.page.html`
```html
<ion-header>
  <ion-toolbar>
    <ion-title>Posts</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content *ngIf="posts">
<ion-card *ngFor="let post of posts">
  <ion-card-header >
  	<img src="{{post.featured_image}}" height="100px"/>
    <ion-card-title>{{post.title}}</ion-card-title>
    <ion-card-subtitle>Published on: {{post.created|date:'MM/dd/yyyy'}}</ion-card-subtitle>

  </ion-card-header>

  <ion-card-content>
    {{post.summary}}<br>
    <ion-button href="/posts/{{post.url}}">Read more</ion-button>
  </ion-card-content>

</ion-card>
<ion-button href="/home">Back</ion-button>
</ion-content>
```

To display a complete post, you can use the `butter.post.retrieve(<url>)` method. See a full list of available post properties in our [API reference](https://buttercms.com/docs/api/). 

`posts/post/post.component.ts`

```typescript
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
```
To render the single post, create the Ionic page as shown below:
`posts/post/post.component.html`
```html
<ion-header>
  <ion-toolbar>
    <ion-title *ngIf="post">{{post.title}}</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content >

  	<ion-img [src]="post.featured_image"></ion-img>
    <h1>{{post.title}}</h1>
    <span>Published on: {{post.created|date:'MM/dd/yyyy'}}</span>

    <div [innerHTML]="post.body"></div>
    
<ion-button href="/posts">Back</ion-button>
</ion-content>
```
### Categories, Tags, and Authors

Use Butter's APIs for categories, tags, and authors to feature and filter content on your blog:

### Categories


`categories/categories.page.ts`
```typescript
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
```
###Get posts by category
`categories/category/category.component.ts`
```typescript
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

```