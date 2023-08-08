
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [AuthFormComponent],
    exports: [AuthFormComponent]
})
export class SharedModule {}