import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SearchListComponent } from './search-list/search-list.component';

const routes: Routes = [
  {
    path: '',
    component: SearchListComponent
  },
  {
    path: ':id',
    component: SearchDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
