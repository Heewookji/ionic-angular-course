import * as tslib_1 from "tslib";
import { Booking } from "./booking.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, map, switchMap } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
let BookingService = class BookingService {
    constructor(authService, http) {
        this.authService = authService;
        this.http = http;
        this._bookings = new BehaviorSubject([]);
    }
    get bookings() {
        return this._bookings.asObservable();
    }
    fetchBookings() {
        return this.http
            .get(`https://ionic-project-fa922.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
            .pipe(map(resData => {
            const bookings = [];
            for (const key in resData) {
                if (resData.hasOwnProperty(key)) {
                    bookings.push(new Booking(key, resData[key].placeId, resData[key].userId, resData[key].placeTitle, resData[key].placeImage, resData[key].firstName, resData[key].lastName, resData[key].guestNumber, new Date(resData[key].bookedFrom), new Date(resData[key].bookedTo)));
                }
            }
            return bookings;
        }), tap(bookings => {
            this._bookings.next(bookings);
        }));
    }
    getBooking(id) {
        return this.bookings.pipe(take(1), map(bookings => {
            return Object.assign({}, bookings.find(b => b.id == id));
        }));
    }
    cancelBooking(id) {
        return this.http.delete(`https://ionic-project-fa922.firebaseio.com/bookings/${id}.json`).pipe(switchMap(() => {
            return this.bookings;
        }), take(1), tap(bookings => {
            this._bookings.next(bookings.filter(b => b.id != id));
        }));
    }
    addBooking(placeId, placeTitle, placeImage, firstName, lastName, guestNumber, dateFrom, dateTo) {
        let id;
        const newBooking = new Booking(Math.random().toString(), placeId, this.authService.userId, placeTitle, placeImage, firstName, lastName, guestNumber, dateFrom, dateTo);
        return this.http
            .post("https://ionic-project-fa922.firebaseio.com/bookings.json", Object.assign({}, newBooking, { id: null }))
            .pipe(switchMap(resData => {
            id = resData.name;
            return this.bookings;
        }), take(1), tap(bookings => {
            newBooking.id = id;
            this._bookings.next(bookings.concat(newBooking));
        }));
    }
};
BookingService = tslib_1.__decorate([
    Injectable({ providedIn: "root" }),
    tslib_1.__metadata("design:paramtypes", [AuthService, HttpClient])
], BookingService);
export { BookingService };
//# sourceMappingURL=booking.service.js.map