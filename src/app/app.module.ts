import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar';
import { GameComponent } from './components/game';
import { GamePageComponent } from './pages/game-page';
import { TitleBarComponent } from './components/title-bar';
import { HomePageComponent } from './pages/home-page';
import { ImgBoxComponent } from './components/img-box';
import { AccountPageComponent } from './pages/account-page';
import { LoginPageComponent } from './pages/login-page';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WatchlistPageComponent } from './pages/watchlist-page/watchlist-page.component';
import { FreeGamesPageComponent } from './pages/free-games-page/free-games-page.component';
import { ForgotPageComponent } from './pages/forgot-page/forgot-page.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { PageSpinnerComponent } from './components/page-spinner/page-spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiscountBoxComponent } from './components/discount-box/discount-box.component';
import { WatchlistFormComponent } from './components/watchlist-form/watchlist-form.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { EmailAlertComponent } from './components/email-alert/email-alert.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RetryComponent } from './components/retry/retry.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ForgotFormComponent } from './components/forgot-form/forgot-form.component';
import { AccountDeleteComponent } from './components/account-delete/account-delete.component';
import { UnsubscribePageComponent } from './pages/unsubscribe-page/unsubscribe-page.component';
import { ValidatePageComponent } from './pages/validate-page/validate-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { RedditWidgetComponent } from './components/reddit-widget/reddit-widget.component';
import { WidgetRowComponent } from './components/widget-row/widget-row.component';
import { WidgetRedditRowComponent } from './components/widget-reddit-row/widget-reddit-row.component';
import { DealsWidgetComponent } from './components/deals-widget/deals-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    GameComponent,
    GamePageComponent,
    TitleBarComponent,
    HomePageComponent,
    ImgBoxComponent,
    AccountPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    WatchlistPageComponent,
    FreeGamesPageComponent,
    ForgotPageComponent,
    WatchlistComponent,
    PageSpinnerComponent,
    DiscountBoxComponent,
    WatchlistFormComponent,
    GameFormComponent,
    AccountFormComponent,
    LoginFormComponent,
    EmailAlertComponent,
    ErrorMessageComponent,
    PageTitleComponent,
    RetryComponent,
    RegisterFormComponent,
    ForgotFormComponent,
    AccountDeleteComponent,
    UnsubscribePageComponent,
    ValidatePageComponent,
    FooterComponent,
    RedditWidgetComponent,
    WidgetRowComponent,
    WidgetRedditRowComponent,
    DealsWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  exports: [
    GamePageComponent,
    TitleBarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
