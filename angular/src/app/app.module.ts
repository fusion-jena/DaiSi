import {BrowserModule} from '@angular/platform-browser';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FiltersComponent} from './filters/filters.component';
import {OtherFiltersComponent} from './other-filters/other-filters.component';
import 'reflect-metadata';
import {FilterDatePickerComponent} from './filter-date-picker/filter-date-picker.component';

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
        FilterDatePickerComponent
      
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
        MatDialogModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    providers: [MatDatepickerModule, MatNativeDateModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
