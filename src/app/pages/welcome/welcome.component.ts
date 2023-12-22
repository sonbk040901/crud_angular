import { Component, OnInit } from "@angular/core";
import { SearchFormComponent } from "@components/government/search-form/search-form.component";
import { SearchResultComponent } from "@components/government/search-result/search-result.component";
import { Category, CategoryService } from "@services/category.service";
import { NzDividerComponent } from "ng-zorro-antd/divider";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalService,
  NzModalTitleDirective,
} from "ng-zorro-antd/modal";
import { CreateFormComponent } from "@components/government/create-form/create-form.component";

@Component({
  selector: "app-welcome",
  standalone: true,
  templateUrl: "./welcome.component.html",
  imports: [
    SearchFormComponent,
    SearchResultComponent,
    NzDividerComponent,
    NzButtonComponent,
    NzIconDirective,
    NzModalComponent,
    NzModalContentDirective,
    CreateFormComponent,
    NzModalTitleDirective,
  ],
  providers: [NzModalService],
})
export class WelcomeComponent implements OnInit {
  loading = true;
  data: Category[] = [];
  total = 702;
  filter: Partial<{ [key in keyof Category]: Category[key] | null }> = {};
  currentPage = 1;
  pageSize = 10;
  totalPage = 1;
  isModalVisible = false;
  mode: "create" | "edit" = "create";
  selectedItem: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onSearch(value: typeof this.filter) {
    this.filter = value;
    this.currentPage = 1;
    this.loadData();
  }

  onCurrentPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  onSelectItem(id: number) {
    this.selectedItem = this.data.find((item) => item.id === id) || null;
    console.log(this.data);
    this.mode = "edit";
    this.showModal();
  }

  onSelectItemDelete(id: number) {
    this.categoryService.delete(id).subscribe(() => this.loadData());
  }

  loadData() {
    this.loading = true;
    this.categoryService
      .getAll({
        filter: this.filter,
        page: this.currentPage,
        pageSize: this.pageSize,
      })
      .subscribe((data) => {
        this.data = data.data;
        this.total = data.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.loading = false;
        console.log(data);
      });
  }

  createCategory(value: Omit<Category, "id"> & { id?: number }) {
    this.categoryService.create(value).subscribe((data) => {
      console.log(data);
      this.loadData();
      this.hideModal();
    });
  }

  showCreateModal() {
    this.selectedItem = null;
    this.mode = "create";
    this.showModal();
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  hideModal(): void {
    this.isModalVisible = false;
  }
}
