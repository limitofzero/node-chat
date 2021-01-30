import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card/card.component";
import { CardContentComponent } from "./card-content/card-content.component";
import { CardTitleComponent } from "./card-title/card-title.component";

@NgModule({
  declarations: [CardComponent, CardContentComponent, CardTitleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardContentComponent,
    CardTitleComponent
  ]
})
export class CardModule {
}
