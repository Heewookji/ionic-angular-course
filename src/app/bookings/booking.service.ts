import { Booking } from "./booking.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, map, switchMap } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

interface BookingData {
  userId: string;
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
}

@Injectable({ providedIn: "root" })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get bookings() {
    return this._bookings.asObservable();
  }

  fetchBookings() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error("User not found!");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: BookingData }>(
          `https://ionic-project-fa922.firebaseio.com/bookings.json?auth=${token}&orderBy="userId"&equalTo="${fetchedUserId}"`
        );
      }),
      map(resData => {
        const bookings = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            bookings.push(
              new Booking(
                key,
                resData[key].placeId,
                resData[key].userId,
                resData[key].placeTitle,
                resData[key].placeImage,
                resData[key].firstName,
                resData[key].lastName,
                resData[key].guestNumber,
                new Date(resData[key].bookedFrom),
                new Date(resData[key].bookedTo)
              )
            );
          }
        }
        return bookings;
      }),
      tap(bookings => {
        this._bookings.next(bookings);
      })
    );
  }

  cancelBooking(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.delete(
          `https://ionic-project-fa922.firebaseio.com/bookings/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.bookings;
      }),
      take(1),
      tap(bookings => {
        this._bookings.next(bookings.filter(b => b.id != id));
      })
    );
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let id: string;
    let newBooking: Booking;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error("No user id found!");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newBooking = new Booking(
          Math.random().toString(),
          placeId,
          fetchedUserId,
          placeTitle,
          placeImage,
          firstName,
          lastName,
          guestNumber,
          dateFrom,
          dateTo
        );
        return this.http.post<{ name: string }>(
          `https://ionic-project-fa922.firebaseio.com/bookings.json?auth=${token}`,
          {
            ...newBooking,
            id: null
          }
        );
      }),
      switchMap(resData => {
        id = resData.name;
        return this.bookings;
      }),
      take(1),
      tap(bookings => {
        newBooking.id = id;
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }
}
