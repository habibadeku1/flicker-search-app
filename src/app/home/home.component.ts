import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { catchError, skipWhile, take, takeUntil } from 'rxjs/operators';
import { IFlickrPhoto, IFlickrSearchResult } from '../models/general.interface';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchFormGroup!: FormGroup;
  public searchResult: IFlickrSearchResult | undefined;
  public searchError!: string;
  public searchRun = false;
  public photoLocalStore!: IFlickrPhoto[];

  constructor(private appService: AppServiceService, private formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
			searchTag: new FormControl('', [Validators.required, Validators.minLength(2)])
		});

    const photosFromLocalStore = localStorage.getItem('photoStore');

    this.photoLocalStore = photosFromLocalStore? JSON.parse(photosFromLocalStore) : null;
  }

  public sortValueChanged(event: any): void {
  }

  public clearForm(): void {
    this.searchFormGroup.reset();
    this.searchResult = undefined;
    this.searchRun = false;
  }

  public submitSearch(): void {
    const searchTag = this.searchFormGroup.get('searchTag')?.value;

    this.appService.searchFlickerBytag(searchTag)
    .pipe(
      take(1),
      catchError((error)=> {
        this.searchError = "There was an error fetching results!"
        return EMPTY;
      })
    ).subscribe((searchResultResponse: IFlickrSearchResult)=>{
      this.searchResult = searchResultResponse;
      this.searchRun = true;

      // save array object to local storage 
      const getLocalStore = localStorage.getItem('photoStore');
      const storeItems: IFlickrPhoto[] = getLocalStore ? JSON.parse(getLocalStore) : [];

      storeItems.push(this.searchResult.photos.photo[0]);

      localStorage.setItem('photoStore', JSON.stringify(storeItems));

      const photosFromLocalStore = localStorage.getItem('photoStore');

      this.photoLocalStore = photosFromLocalStore? JSON.parse(photosFromLocalStore) : null;

    });
  }

  public openDetails(): void {
    this.router.navigate(['/details']);
  }

}
