import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";


// new Place(
//   "p1",
//   "seoul",
//   "seoul place",
//   "https://www.jetstar.com/_/media/inspiration-hub/article-images/19apr/south-korea-best-of-seoul-by-subway/seoulherocrop.jpg?rev=9c1de2b0c9294d71a43d01a7118360bd&w=1050&rc=1&cw=1050&ch=590&cx=55&cy=0&hash=D4FF57A7F356187D34BF3E524904D495F3454ED0",
//   15,
//   new Date("2019-01-01"),
//   new Date("2019-12-31"),
//   "abc"
// ),
// new Place(
//   "p2",
//   "dangsan",
//   "dangsan place",
//   "http://smart80.kr/images/folk/folk_/folk4_1_1.png",
//   20,
//   new Date("2019-01-01"),
//   new Date("2019-12-31"),
//   "xyz"
// ),
// new Place(
//   "p3",
//   "busan",
//   "busan place",
//   "https://www.blockmedia.co.kr/wp-content/uploads/2019/04/%EB%B6%80%EC%82%B0%EC%8B%9C.jpg",
//   20,
//   new Date("2019-01-01"),
//   new Date("2019-12-31"),
//   "abc1"
// )


interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        "https://ionic-project-fa922.firebaseio.com/offered-places.json"
      )
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap( places => {
          this._places.next(places);
        })
      );
  }

  get offers() {
    return this._places.asObservable();
  }

  getOffer(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id == id) };
      })
    );
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id == id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;

    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://www.jetstar.com/_/media/inspiration-hub/article-images/19apr/south-korea-best-of-seoul-by-subway/seoulherocrop.jpg?rev=9c1de2b0c9294d71a43d01a7118360bd&w=1050&rc=1&cw=1050&ch=590&cx=55&cy=0&hash=D4FF57A7F356187D34BF3E524904D495F3454ED0",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.http
      .post<{ name: string }>(
        "https://ionic-project-fa922.firebaseio.com/offered-places.json",
        {
          ...newPlace,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id == placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];

        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }

  constructor(private authService: AuthService, private http: HttpClient) {}
}
