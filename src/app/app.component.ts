import { Component } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { Title } from "@angular/platform-browser";
import { NzTableModule } from "ng-zorro-antd/table";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isCollapsed = false;
  title = "CRUD-APP";

  constructor(private readonly _title: Title) {
    this._title.setTitle(this.title);
  }
}
