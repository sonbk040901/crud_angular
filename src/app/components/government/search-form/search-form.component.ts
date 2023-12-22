import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { NzTagComponent } from "ng-zorro-antd/tag";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { Category } from "@services/category.service";

@Component({
  selector: "app-government-search-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzDatePickerComponent,
    NzTagComponent,
    NzButtonComponent,
  ],
  templateUrl: "./search-form.component.html",
})
export class SearchFormComponent {
  searchForm = this.fb.group({
    code: [""],
    name: [""],
    organization: [""],
    status: [] as Category["status"][],
    expired: [""],
  });

  @Output()
  search = new EventEmitter<
    Partial<{ [key in keyof Category]: Category[key] | null }>
  >();

  constructor(private readonly fb: FormBuilder) {}

  onSubmit() {
    this.search.emit(this.searchForm.value);
  }
}
