import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page';
import { GamePageComponent } from './pages/game-page';
import { AccountPageComponent } from './pages/account-page';
import { LoginPageComponent } from './pages/login-page';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPageComponent } from './pages/forgot-page/forgot-page.component';
import { WatchlistPageComponent } from './pages/watchlist-page/watchlist-page.component';
import { FreeGamesPageComponent } from './pages/free-games-page/free-games-page.component';
import { AuthGuard, NotAuthGuard } from './_helpers';
import { UnsubscribePageComponent } from './pages/unsubscribe-page/unsubscribe-page.component';
import { ValidatePageComponent } from './pages/validate-page';
import { ResetPageComponent } from './pages/reset-page/reset-page.component';
import { DealsPageComponent } from './pages/deals-page';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'game/:game',
    component: GamePageComponent,
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'forgot',
    component: ForgotPageComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'reset/:token',
    component: ResetPageComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'watchlist',
    component: WatchlistPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'free',
    component: FreeGamesPageComponent,
  },
  {
    path: 'deals/:value',
    component: DealsPageComponent,
  },
  {
    path: 'unsubscribe/:token',
    component: UnsubscribePageComponent,
  },
  {
    path: 'validate/:token',
    component: ValidatePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
