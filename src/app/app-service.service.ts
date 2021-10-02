import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppSettings } from './AppConstant';
import { Observable } from 'rxjs';
import { IFlickrSearchResult } from './models/general.interface';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  public searchFlickerBytag(searchTag: string): Observable<IFlickrSearchResult> {
    const searchParamString: string = `?method=flickr.photos.search&api_key=6ad82343b5f33d55812dc2208820cc2c&tags=${searchTag}&sort=interestingness-desc&extras=date_upload%2C+date_taken%2C+owner_name%2C+views%2C+url_q&per_page=1&format=json&nojsoncallback=1`;    
    return this.http.get<IFlickrSearchResult>(`${AppSettings.baseApIURL}${searchParamString}`);
  }

}
