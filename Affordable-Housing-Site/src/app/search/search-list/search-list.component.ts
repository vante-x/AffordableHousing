import { Component, OnInit } from '@angular/core';
import { productsDB } from '../../shared/data/products';
import { FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Routes } from '@angular/router';
import { ProductDetailsComponent } from '../../product/product-details/product-details.component';
import { markersDB } from 'src/app/shared/data/markers';
import { COMMA, TAB, SPACE, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';

export const routes: Routes = [
  { path: './products/:id', component: ProductDetailsComponent}
];

export interface SearchItem {
  name: string;
}

// export interface Product {
//   name: String,
//   address: String,
//   rent: number,
//   rating: number
// }
@Component({
  selector: 'll-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})



export class SearchListComponent implements OnInit {

  // ARCGIS MAP

    // Set our map properties
    mapCenter = [ -81.379234, 28.538336];
    basemapType = 'streets-navigation-vector';
    mapZoomLevel = 11;

    //variable for search by 'address' or 'neighborhood'
    searchPreference: String = '';

    myControl = new FormControl();
    options: string[] = ['33rd Street Industrial','Airport North','Audubon Park','Azalea Park','BalBay','Baldwin Park','Bel Air','Beltway Commerce','Boggy Creek','Bryn Mawr','Callahan','Camellia Gardens','Carver Shores','Catalina','Central Business District','Clear Lake','College Park','Colonialtown Center','Colonialtown North','Colonialtown South','Conway','Countryside','Coytown','Crescent Park','Delaney Park','Dixie Belle','Dover Estates','Dover Manor','Dover Shores East','Dover Shores West','Eagles Nest','East Park','Engelwood Park','Florida Center','Florida Center North','Florida Central North','Haralson Estates','Hibiscus','Holden Heights','Holden Parramore','Johnson Village','Kirkman North','Kirkman South','Lake Cherokee','Lake Como','Lake Copeland','Lake Davis Greenwood','Lake Dot','Lake Eola Heights','Lake Fairview','Lake Formosa','Lake Fredrica','Lake Holden','Lake Mann Estates','Lake Mann Gardens','Lake Nona Central','Lake Nona Estates','Lake Nona South','Lake Richmond','Lake Shore Village','Lake Sunset','Lake Terrace','Lake Underhill','Lake Weldona','Lake Whippoorwill','Lancaster Park','LaVina','Lawsona Fern Creek','Lorna Doone','Malibu Groves','Mariners Village','Mercy Drive','Meridian Park','Metro West','Milk District','Millenia','Monterey','New Malibu','North Lake Park At Lake Nona','North Orange','North Quarter','Orlando Executive Airport','Orlando International Airport','Orwin Manor','Palomar','Park Central','Park Lake Highland','Pershing','Pineloch','Princeton/Silver Star','Randal Park','Richmond Estates','Richmond Heights','Rio Grande Park','Rock Lake','Roosevelt Park','Rose Isle','Rosemont','Rosemont North','Rowena Gardens','Seaboard Industrial','Signal Hill','South Division','Southeastern Oaks','South Eola','South Orange','South Semoran','Southern Oaks','Southport','Spring Lake','Storey Park','The Dovers','The Willows','Thornton Park','Timberleaf','Ventura','Vista East','Vista Park','Wadeview Park','Washington Shores','Wedgewood Groves','West Colonial','Westfield','Windhover' ];
    filteredOptions!: Observable<string[]>;
    displayedColumns: string[] = ['name', 'address', 'rent', 'rating'];
    dataSource = productsDB;
  

    //variable for products db
    products: any[] = [];

    
    markers: any[] = [];
    isLoaded: boolean = false;

    //--- FILTERING TABLE: variables for filtering table by searchbar entry ---//
    positionFilter = new FormControl();
    nameFilter = new FormControl();
    private filterValues = { address: '' }
    dataSource2 = new MatTableDataSource(productsDB.Product)

    filteredValues = {
      name: '', address: '',
      rent: '', rating: ''
    };

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [COMMA, TAB, ENTER];
    searchItems: SearchItem[] = [];
  

    
  ngOnInit(): void {

    //SEARCH BY FEATURE: sets the default searchPreference set to 'address' ---//
    this.searchPreference = '1';

    //--- AUTOCOMPLETE: this controls the filtered options and autocomplete of the searchbar ---//
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    //--- FILTERING TABLE: filters the table based on input into the searchbar ---//
    this.myControl.valueChanges
    .subscribe(value => {
      this.filterValues['address'] = value
      this.dataSource2.filter = JSON.stringify(this.filterValues)
    });
  this.dataSource2.filterPredicate = this.createFilter();    

  //this assigns values to variables
    setTimeout(() => {
      this.products = productsDB.Product;
      this.markers = markersDB.Markers;
      this.isLoaded = true
    }, 500)

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  //--- The functions below are used for filtering table results based on search bar input ---//

  remove(item: SearchItem): void {
    const index = this.searchItems.indexOf(item);

    if (index >= 0) {
      this.searchItems.splice(index, 1);
    }
  }

  applyFilter(filterValue: string) {
    let filter = {
      address: filterValue.trim().toLowerCase(),
    }
    this.dataSource2.filter = JSON.stringify(filter)
  }
  

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter)
      let nameSearch = () => {
        let found = false;
        searchTerms.address.trim().toLowerCase().split(' ').forEach((word: any) => {
          if (data.address.toLowerCase().indexOf(word) != -1) { found = true }
        });
        return found
      }
      return nameSearch()
    }
    return filterFunction
  }
  //--- End of search bar input functions ---//

}


