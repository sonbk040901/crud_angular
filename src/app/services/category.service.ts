import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Category {
  id: number;
  code: string;
  name: string;
  organization: string;
  expired: string;
  status: 1 | 2 | 3;
}

interface CategoryOptions {
  page?: number;
  pageSize?: number;
  filter?: Partial<{ [key in keyof Category]?: Category[key] | null }>;
}

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  getAll(options?: CategoryOptions) {
    return new Observable<
      { data: Category[]; total: number } & CategoryOptions
    >((observer) => {
      setTimeout(() => {
        const { page = 1, pageSize = 10, filter } = options || {};
        const data = mockData.filter((item) => {
            if (filter?.code && !item.code.includes(filter.code)) {
              return false;
            }
            if (filter?.name && !item.name.includes(filter.name)) {
              return false;
            }
            if (
              filter?.organization &&
              !item.organization.includes(filter.organization)
            ) {
              return false;
            }
            if (filter?.status && item.status !== filter.status) {
              return false;
            }
            return !(
              filter?.expired &&
              new Date(item.expired).getTime() !==
                new Date(filter.expired).getTime()
            );
          }),
          total = data.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        observer.next({
          data: data.slice(start, end),
          total,
          ...options,
        });
      }, 300);
    });
  }

  create(value: Omit<Category, "id"> & { id?: number }) {
    const id = randomId();
    return new Observable<Category>((observer) => {
      setTimeout(() => {
        if (value.id) {
          const item = mockData.find((item) => item.id === value.id);
          if (!item) {
            observer.error("Not found");
            return;
          }
          Object.assign(item, value);
          observer.next(item);
          return;
        }
        const item = { ...value, id };
        mockData.push(item);
        observer.next(item);
      }, 300);
    });
  }

  delete(id: number) {
    return new Observable<number>((observable) => {
      setTimeout(() => {
        const i = mockData.findIndex((item) => item.id == id);
        mockData.splice(i, 1);
        observable.next(id);
      }, 300);
    });
  }
}

function randomId() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const id = Math.floor(Math.random() * 1000000);
    if (!mockData.find((item) => item.id === id)) {
      return id;
    }
  }
}

const mockData: Category[] = [
  {
    id: 1,
    code: "KG.G21.000001",
    name: "Kế hoạch sản xuất năm 2021",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-31",
    status: 1,
  },
  {
    id: 2,
    code: "KG.G21.000002",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 2,
  },
  {
    id: 3,
    code: "KG.G21.000003",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 3,
  },
  {
    id: 4,
    code: "KG.G21.000004",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 1,
  },
  {
    id: 5,
    code: "KG.G21.000005",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 2,
  },
  {
    id: 6,
    code: "KG.G21.000006",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 3,
  },
  {
    id: 7,
    code: "KG.G21.000007",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 1,
  },
  {
    id: 8,
    code: "KG.G21.000008",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 2,
  },
  {
    id: 9,
    code: "KG.G21.000009",
    name: "Kế hoạch sản xuất năm 2022",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-30",
    status: 3,
  },
  {
    id: 10,
    code: "KG.G21.000010",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 1,
  },
  {
    id: 11,
    code: "KG.G21.000011",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 2,
  },
  {
    id: 12,
    code: "KG.G21.000012",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 3,
  },
  {
    id: 13,
    code: "KG.G21.000013",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 1,
  },
  {
    id: 14,
    code: "KG.G21.000014",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 2,
  },
  {
    id: 15,
    code: "KG.G21.000015",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 3,
  },
  {
    id: 16,
    code: "KG.G21.000016",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 1,
  },
  {
    id: 17,
    code: "KG.G21.000017",
    name: "Kế hoạch sản xuất năm 2023",
    organization: "Văn phòng chính phủ",
    expired: "2021-12-29",
    status: 2,
  },
];
