import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject, of } from "rxjs";
import { take, map, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { PlaceLocation } from './location.model';

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
  location: PlaceLocation
}


@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);
  
  constructor(private authService: AuthService, private http: HttpClient) {}

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
                  resData[key].userId,
                  resData[key].location
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  get places() {
    return this._places.asObservable();
  }

  get offers() {
    return this._places.asObservable();
  }


  getPlace(id: string) {
    return this.http
      .get<PlaceData>(
        `https://ionic-project-fa922.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
            return new Place(
              id,
              placeData.title,
              placeData.description,
              placeData.imageUrl,
              placeData.price,
              new Date(placeData.availableFrom),
              new Date(placeData.availableTo),
              placeData.userId,
              placeData.location
            );
        })
      );
  }

  uploadImage(image:File){
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http.post<{imageUrl: string, imagePath: string}>('https://us-central1-ionic-project-fa922.cloudfunctions.net/storeImage', 
    uploadData);
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    imageUrl: string
  ) {
    let generatedId: string;
    let newPlace: Place;
    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if(!userId){
        throw new Error('No user found');
      }
      newPlace = new Place(
        Math.random().toString(),
        title,
        description,
        imageUrl,
        price,
        dateFrom,
        dateTo,
        userId,
        location
      );
      return this.http
      .post<{ name: string }>(
        "https://ionic-project-fa922.firebaseio.com/offered-places.json",
        {
          ...newPlace,
          id: null
        }
      )
    }), switchMap(resData => {
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
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if(!places || places.length <= 0){
          return this.fetchPlaces();
        } else{
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id == placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];

        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        return this.http.put(
          `https://ionic-project-fa922.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }

  
}
