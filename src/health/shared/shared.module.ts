
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { RouterModule } from "@angular/router";

import { MealsService } from "./services/meals/meals.service";
import { ListItemComponent } from "./components/list-item/list-item.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireDatabaseModule,
    ],
    declarations: [ ListItemComponent ],
    exports: [ ListItemComponent ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService
            ]
        }
    }
}