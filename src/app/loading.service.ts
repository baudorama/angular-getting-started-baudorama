import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  loadingStatus: Boolean;
  private loadingSubscription = new Subject<Boolean>();

  constructor() {}

  getLoadingStatus() {
    return this.loadingStatus;
  }

  setLoadingStatus(value: Boolean){
    this.loadingStatus = value;
    this.loadingSubscription.next(value);
  }

  getLoadingSubscription() {
    return this.loadingSubscription;
  }
}