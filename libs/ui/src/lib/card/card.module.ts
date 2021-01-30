import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card/card.component";
import { CardContentComponent } from "./card-content/card-content.component";
import { CardTitleComponent } from "./card-title/card-title.component";
import { CardTitleTextComponent } from "./card-title-text/card-title-text.component";

@NgModule({
  declarations: [CardComponent, CardContentComponent, CardTitleComponent, CardTitleTextComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardContentComponent,
    CardTitleComponent,
    CardTitleTextComponent
  ]
})
export class CardModule {
}
