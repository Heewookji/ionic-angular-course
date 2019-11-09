import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject, of } from "rxjs";
import { take, map, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
let PlacesService = class PlacesService {
    constructor(authService, http) {
        this.authService = authService;
        this.http = http;
        this._places = new BehaviorSubject([]);
    }
    fetchPlaces() {
        return this.http
            .get("https://ionic-project-fa922.firebaseio.com/offered-places.json")
            .pipe(map(resData => {
            const places = [];
            for (const key in resData) {
                if (resData.hasOwnProperty(key)) {
                    places.push(new Place(key, resData[key].title, resData[key].description, resData[key].imageUrl, resData[key].price, new Date(resData[key].availableFrom), new Date(resData[key].availableTo), resData[key].userId));
                }
            }
            return places;
        }), tap(places => {
            this._places.next(places);
        }));
    }
    get places() {
        return this._places.asObservable();
    }
    get offers() {
        return this._places.asObservable();
    }
    getPlace(id) {
        return this.http
            .get(`https://ionic-project-fa922.firebaseio.com/offered-places/${id}.json`)
            .pipe(map(placeData => {
            return new Place(id, placeData.title, placeData.description, placeData.imageUrl, placeData.price, new Date(placeData.availableFrom), new Date(placeData.availableTo), placeData.userId);
        }));
    }
    addPlace(title, description, price, dateFrom, dateTo) {
        let generatedId;
        const newPlace = new Place(Math.random().toString(), title, description, "https://www.jetstar.com/_/media/inspiration-hub/article-images/19apr/south-korea-best-of-seoul-by-subway/seoulherocrop.jpg?rev=9c1de2b0c9294d71a43d01a7118360bd&w=1050&rc=1&cw=1050&ch=590&cx=55&cy=0&hash=D4FF57A7F356187D34BF3E524904D495F3454ED0", price, dateFrom, dateTo, this.authService.userId);
        return this.http
            .post("https://ionic-project-fa922.firebaseio.com/offered-places.json", Object.assign({}, newPlace, { id: null }))
            .pipe(switchMap(resData => {
            generatedId = resData.name;
            return this.places;
        }), take(1), tap(places => {
            newPlace.id = generatedId;
            this._places.next(places.concat(newPlace));
        }));
    }
    updatePlace(placeId, title, description) {
        let updatedPlaces;
        return this.places.pipe(take(1), switchMap(places => {
            if (!places || places.length <= 0) {
                return this.fetchPlaces();
            }
            else {
                return of(places);
            }
        }), switchMap(places => {
            const updatedPlaceIndex = places.findIndex(pl => pl.id == placeId);
            updatedPlaces = [...places];
            const oldPlace = updatedPlaces[updatedPlaceIndex];
            updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
            return this.http.put(`https://ionic-project-fa922.firebaseio.com/offered-places/${placeId}.json`, Object.assign({}, updatedPlaces[updatedPlaceIndex], { id: null }));
        }), tap(() => {
            this._places.next(updatedPlaces);
        }));
    }
};
PlacesService = tslib_1.__decorate([
    Injectable({
        providedIn: "root"
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService, HttpClient])
], PlacesService);
export { PlacesService };
//# sourceMappingURL=places.service.js.map