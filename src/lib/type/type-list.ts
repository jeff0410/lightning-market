export interface TypeList {
  size: number;
  totalPages: number;
  totalElements: number;
  sort: string;
  after: number[];
  data: Datum[];
  hasAppliedFilters: boolean;
}

export interface Datum {
  ad?: boolean;
  adult?: boolean;
  brandId?: number;
  buntalkCount?: number;
  care?: boolean;
  category?: Category;
  commentCount?: number;
  condition?: Condition;
  createdAt?: Date;
  faved?: boolean;
  favoriteCount?: number;
  freeShipping?: boolean;
  hidden?: boolean;
  inspection?: Inspection;
  keywords?: string[];
  modifiedAt?: Date;
  name: string;
  nameEng?: string;
  nearBy?: boolean;
  payload?: Payload;
  pid?: number;
  popularScore?: number;
  price: number;
  productImage?: string;
  shippingFee?: number;
  status?: Status;
  tracking: Tracking;
  type: Type;
  updatedAt?: Date;
  user?: User;
  video?: boolean;
  viewCount?: number;
  createdBefore?: string;
  modifiedBefore?: string;
  updatedBefore?: string;
  location?: string;
  appUrl?: string;
  imageUrl?: string;
  webUrl?: string;
  storeName?: string;
  adText?: string;
  careType?: CareType;
  options?: Options;
  catalog?: Catalog;
}

export enum CareType {
  Normal = "NORMAL",
}

export interface Catalog {
  modelId: number;
}

export interface Category {
  id: string;
  name: string;
}

export enum Condition {
  HeavilyUsed = "HEAVILY_USED",
  LightlyUsed = "LIGHTLY_USED",
  LikeNew = "LIKE_NEW",
  New = "NEW",
  Used = "USED",
}

export enum Inspection {
  NonTarget = "NON_TARGET",
  OptIn = "OPT_IN",
  OptOut = "OPT_OUT",
}

export interface Options {
  shoeSize: string;
}

export enum Payload {
  Query나이키 = '{"query":"나이키"}',
}

export enum Status {
  Selling = "SELLING",
}

export interface Tracking {
  imp_id: string;
  ref_source?: string;
  ref_content?: string;
}

export enum Type {
  EXTAd = "EXT_AD",
  Product = "PRODUCT",
}

export interface User {
  uid: number;
  name: string;
  proshop: boolean;
  image?: string;
}
