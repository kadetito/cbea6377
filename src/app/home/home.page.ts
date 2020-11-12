import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { PeliculasService } from "../services/peliculas.service";
import { Movie } from "../interfaces/cartelera-response";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  // styleUrls: ['./home.component.css'],
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  public movies: Movie[] = [];
  public moviesslideshow: Movie[] = [];

  // //infinite scroll
  @HostListener("window:scroll", ["$event"])
  onScroll() {
    const posicion =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const posicionmax =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    console.log(posicion);
    if (posicion > posicionmax) {
      if (this.peliculasService.cargando) {
        return;
      }
      this.peliculasService.getcartelera().subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) {}
  ngOnInit(): void {
    this.peliculasService.getcartelera().subscribe((movies) => {
      this.movies = movies;
      this.moviesslideshow = movies;
      console.log(this.moviesslideshow);
    });
  }
  ngOnDestroy() {
    //   this.peliculasService.resetCarteleraPage();
  }
  ngAfterViewInit() {}
}
