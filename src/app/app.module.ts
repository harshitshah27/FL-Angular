import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent }  from '@azure/msal-angular';
import { InteractionType, PublicClientApplication }  from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './services/custom-route-reuse-strategy';
import { MainModule } from './modules/main/main.module';
import { AuthModule } from './modules/auth/auth.module';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication (
      {
        auth :{
          clientId: 'd437e73b-3619-4e28-af07-692896f9822c',
          redirectUri: 'http://localhost:4200',
          authority: 'http://login.microsoftonline.com/f14e6c85-8db4-4f8f-91de-b4c481f01edb/'
        },
        cache :{
          cacheLocation: 'localStorage',
          storeAuthStateInCookie : false,
        }
      }
    ),
    {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    },{
      interactionType : InteractionType.Redirect,
      protectedResourceMap: new Map(
        [
          ['https://grapht.microsoft.com/v1.0/me', ['user.Read']]
        ]
      )
    })
  ],
  providers: [
    {
      provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }, MsalGuard, 
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
