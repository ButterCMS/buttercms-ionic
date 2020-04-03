import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';
import {CategoryComponent} from './category/category.component'
const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },{
    path:':slug',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
