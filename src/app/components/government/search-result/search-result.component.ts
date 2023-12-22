import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { Category } from "@services/category.service";
import { DatePipe, NgForOf, NgSwitch, NgSwitchCase } from "@angular/common";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzTagComponent } from "ng-zorro-antd/tag";

@Component({
  selector: "app-government-search-result",
  standalone: true,
  templateUrl: "./search-result.component.html",
  imports: [
    NzTableModule,
    NzIconDirective,
    NgForOf,
    NzButtonComponent,
    NgSwitchCase,
    NgSwitch,
    DatePipe,
    NzTagComponent,
  ],
})
export class SearchResultComponent {
  @Input()
  data: Category[] = [];
  @Input() loading = false;
  @Input() total = 17;
  @Input() currentPage = 1;
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() selectItem = new EventEmitter<number>();
  @Output() selectItemDelete = new EventEmitter<number>();

  constructor() {}

  onCurrentPageChange(page: number) {
    this.currentPageChange.emit(page);
  }

  onSelectItem(id: number) {
    this.selectItem.emit(id);
  }

  onSelectItemDelete(id: number) {
    this.selectItemDelete.emit(id);
  }
}
