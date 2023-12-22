import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/categories" },
  {
    path: "categories",
    loadChildren: () =>
      import("@pages/welcome/welcome.routes").then((m) => m.WELCOME_ROUTES),
  },
];
