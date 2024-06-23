import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "./layouts/layout.module";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'lottery',
        loadChildren: () => import('./pages/lottery/lottery.module').then(m => m.LotteryModule)
      },
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterOutlet,LayoutModule, RouterModule.forChild(routes)],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
