import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteComponent } from './complete.component';

const routes: Routes = [
  { path: ':personality', component: CompleteComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteRoutingModule {}
