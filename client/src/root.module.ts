import {NgModule} from "@angular/core";
import {RootComponent} from "./root.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  {
    path: 'app',
    loadChildren: () => import('./app/app.module').then(m => m.AppModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [RootComponent],
  exports: [RouterModule]
})
export class RootModule {}
