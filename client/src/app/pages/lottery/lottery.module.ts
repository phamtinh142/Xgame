import {NgModule} from "@angular/core";
import {LotteryComponent} from "./lottery.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
  path: '',
  component: LotteryComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [LotteryComponent]
})
export class LotteryModule {}
