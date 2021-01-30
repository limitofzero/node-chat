import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card/card.component";
import { CardContentComponent } from "./card-content/card-content.component";

@NgModule({
  declarations: [CardComponent, CardContentComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardContentComponent
  ]
})
export class CardModule {
}
