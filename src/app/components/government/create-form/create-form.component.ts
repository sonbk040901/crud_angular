import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Category } from "@services/category.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { NzTagComponent } from "ng-zorro-antd/tag";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzDividerComponent } from "ng-zorro-antd/divider";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-create-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzDatePickerComponent,
    NzTagComponent,
    NzButtonComponent,
    NzDividerComponent,
  ],
  templateUrl: "./create-form.component.html",
})
export class CreateFormComponent implements OnInit {
  @Input()
  isEdit = false;
  @Input()
  data: Category | null = null;
  @Output()
  create = new EventEmitter<Omit<Category, "id"> & { id?: number }>();
  searchForm = this.fb.group({
    code: [""],
    name: [""],
    organization: [""],
    status: [] as Category["status"][],
    expired: [""],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly messService: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...data } = this.data;
      this.searchForm.setValue(data);
    }
  }

  onSubmit() {
    if (this.searchForm.invalid) return;
    const value = this.searchForm.value;
    const { code, name, organization, status, expired } = value;
    if (!code || !name || !organization || !status || !expired) {
      this.messService.error("Vui lòng nhập đầy đủ thông tin", {
        nzAnimate: true,
        nzDuration: 900,
      });
      return;
    }
    this.create.emit({
      code,
      name,
      organization,
      status,
      expired,
      id: this.data?.id,
    });
  }
}
