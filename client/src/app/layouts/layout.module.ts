import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {CommonModule} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {ProfileRightComponent} from "./profile-right/profile-right.component";

@NgModule({
  imports: [CommonModule, ButtonDirective],
  declarations: [HeaderComponent, FooterComponent, ProfileRightComponent],
  exports: [HeaderComponent, FooterComponent, ProfileRightComponent]
})
export class LayoutModule {}
