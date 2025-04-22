// export type Category = {
//   id: number;
//   name: string;
//   description: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type CategoryFormAgrs = {
//   id?: number;
//   name: string;
//   description: string;
// };

export type FetchCategoriesAgrs = {
  page?: number;
  limit?: number;
};

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInput {
  name: string;
}

export interface UpdateCategoryInput {
  name?: string;
}