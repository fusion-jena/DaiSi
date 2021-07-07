import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { GfbioComponent } from './gfbio/gfbio.component';
import {HttpClientModule} from '@angular/common/http';
import {SearchInputComponent} from './search-input/search-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchResultComponent} from './search-result/search-result.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PaginationComponent} from './pagination/pagination.component';
import {SuggestionWindowComponent} from './suggestion-window/suggestion-window.component';
import {FilterBoxComponent} from './filter-box/filter-box.component';
import {JwPaginationModule} from 'jw-angular-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CitationComponent} from './citation/citation.component';
import {FiltersComponent} from './filters/filters.component';
import {OtherFiltersComponent} from './other-filters/other-filters.component';
import 'reflect-metadata';
import {FilterDatePickerComponent} from './filter-date-picker/filter-date-picker.component';
import {MaterialModule} from './material-module';
import { BasketDialogComponent } from './basket-dialog/basket-dialog.component';
import { ResultItemComponent } from './search-result/result-item/result-item.component';
import { DescriptionComponent } from './search-result/description/description.component';
import { MapComponent } from './map/map.component';
@NgModule({
    declarations: [
        AppComponent,
        GfbioComponent,
        SearchInputComponent,
        SearchResultComponent,
        PaginationComponent,
        SuggestionWindowComponent,
        FilterBoxComponent,
        CitationComponent,
        FiltersComponent,
        OtherFiltersComponent,
        FilterDatePickerComponent,
        BasketDialogComponent,
        ResultItemComponent,
        DescriptionComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        FontAwesomeModule,
        JwPaginationModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule {
}
