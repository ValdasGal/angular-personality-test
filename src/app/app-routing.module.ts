import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Even if the app is very small, lazy load it's modules.
const routes: Routes = [
  { path: '', loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule) },
  { path: 'survey', loadChildren: () => import('./survey/survey.module').then((m) => m.SurveyModule) },
  { path: 'complete', loadChildren: () => import('./complete/complete.module').then((m) => m.CompleteModule) },
  // Redirect to landing page if route is not found.
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
