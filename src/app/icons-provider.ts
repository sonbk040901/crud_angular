import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import {
  DashboardOutline,
  FormOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  PlusOutline,
} from "@ant-design/icons-angular/icons";
import { NzIconModule } from "ng-zorro-antd/icon";

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  PlusOutline,
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
