import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';
const routes = [
    { path: "", redirectTo: "places", pathMatch: "full" },
    { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
    { path: 'places', loadChildren: './places/places.module#PlacesPageModule', canLoad: [AuthGuard] },
    { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule', canLoad: [AuthGuard] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map