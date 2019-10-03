import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { OffersPage } from "./offers/offers.page";
import { Offer } from "./offers/offer.model";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private _offers: Offer[] = [
    new Offer(
      "p1",
      "seoul",
      "seoul place",
      "https://www.jetstar.com/_/media/inspiration-hub/article-images/19apr/south-korea-best-of-seoul-by-subway/seoulherocrop.jpg?rev=9c1de2b0c9294d71a43d01a7118360bd&w=1050&rc=1&cw=1050&ch=590&cx=55&cy=0&hash=D4FF57A7F356187D34BF3E524904D495F3454ED0",
      15
    ),
    new Offer(
      "p2",
      "dangsan",
      "dangsan place",
      "http://smart80.kr/images/folk/folk_/folk4_1_1.png",
      20
    ),
    new Offer(
      "p3",
      "busan",
      "busan place",
      "https://www.blockmedia.co.kr/wp-content/uploads/2019/04/%EB%B6%80%EC%82%B0%EC%8B%9C.jpg",
      20
    )
  ];

  private _places: Place[] = [
    new Place(
      "p1",
      "seoul",
      "seoul place",
      "https://www.jetstar.com/_/media/inspiration-hub/article-images/19apr/south-korea-best-of-seoul-by-subway/seoulherocrop.jpg?rev=9c1de2b0c9294d71a43d01a7118360bd&w=1050&rc=1&cw=1050&ch=590&cx=55&cy=0&hash=D4FF57A7F356187D34BF3E524904D495F3454ED0",
      15,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      "p2",
      "dangsan",
      "dangsan place",
      "http://smart80.kr/images/folk/folk_/folk4_1_1.png",
      20,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      "p3",
      "busan",
      "busan place",
      "https://www.blockmedia.co.kr/wp-content/uploads/2019/04/%EB%B6%80%EC%82%B0%EC%8B%9C.jpg",
      20,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )
  ];

  get places() {
    return [...this._places];
  }

  get offers() {
    return [...this._offers];
  }

  getOffer(id: string) {
    return {
      ...this._offers.find(offer => {
        return offer.id == id;
      })
    };
  }
   
  getPlace(id: string) {
    return {
      ...this._places.find(place => {
        return place.id == id;
      })
    };
  }

  constructor() {}
}
