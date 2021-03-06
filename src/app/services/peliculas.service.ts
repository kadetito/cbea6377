import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CarteleraResponse, Movie } from "../interfaces/cartelera-response";
import { catchError, map, tap } from "rxjs/operators";
import { MovieResponse } from "../interfaces/movie-response";
import { CreditsResponse } from "../interfaces/credits-response";
@Injectable({
  providedIn: "root",
})
export class PeliculasService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = "https://api.themoviedb.org/3";
  private carteleraPage = 1;
  public cargando: boolean = false;
  get params() {
    return {
      api_key: "dfe967afcca2a19946ffc7890257e493",
      language: "es-ES",
      page: this.carteleraPage.toString(),
    };
  }

  //observable del tipo Cartelera response
  getcartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((respuesta) => respuesta.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: "1", query: texto };
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((respuesta) => respuesta.results));
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id: string) {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  getCast(id: string) {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        catchError((err) => of(null)),
        map((respuesta) => respuesta.cast)
      );
  }
}
