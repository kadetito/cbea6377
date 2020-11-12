import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { SlideshowComponent } from "./slideshow/slideshow.component";
import { PeliculasPosterGridComponent } from "../components/peliculas-poster-grid/peliculas-poster-grid.component";
import { RatingModule } from "ng-starrating";
import { PipesModule } from "../pipes/pipes.module";
// import { CastslideshowComponent } from './castslideshow/castslideshow.component';
@NgModule({
  declarations: [
    SlideshowComponent,
    PeliculasPosterGridComponent,
    // CastslideshowComponent,
  ],
  imports: [RatingModule, CommonModule, RouterModule, PipesModule],
  exports: [
    RatingModule,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    // CastslideshowComponent,
  ],
})
export class ComponentsModule {}
