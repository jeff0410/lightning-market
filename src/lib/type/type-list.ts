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

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toTypeList(json: string): TypeList {
    return cast(JSON.parse(json), r("TypeList"));
  }

  public static typeListToJson(value: TypeList): string {
    return JSON.stringify(uncast(value, r("TypeList")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`,
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = "",
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props")
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  TypeList: o(
    [
      { json: "size", js: "size", typ: 0 },
      { json: "totalPages", js: "totalPages", typ: 0 },
      { json: "totalElements", js: "totalElements", typ: 0 },
      { json: "sort", js: "sort", typ: "" },
      { json: "after", js: "after", typ: a(0) },
      { json: "data", js: "data", typ: a(r("Datum")) },
      { json: "hasAppliedFilters", js: "hasAppliedFilters", typ: true },
    ],
    false,
  ),
  Datum: o(
    [
      { json: "ad", js: "ad", typ: u(undefined, true) },
      { json: "adult", js: "adult", typ: u(undefined, true) },
      { json: "brandId", js: "brandId", typ: u(undefined, 0) },
      { json: "buntalkCount", js: "buntalkCount", typ: u(undefined, 0) },
      { json: "care", js: "care", typ: u(undefined, true) },
      { json: "category", js: "category", typ: u(undefined, r("Category")) },
      { json: "commentCount", js: "commentCount", typ: u(undefined, 0) },
      { json: "condition", js: "condition", typ: u(undefined, r("Condition")) },
      { json: "createdAt", js: "createdAt", typ: u(undefined, Date) },
      { json: "faved", js: "faved", typ: u(undefined, true) },
      { json: "favoriteCount", js: "favoriteCount", typ: u(undefined, 0) },
      { json: "freeShipping", js: "freeShipping", typ: u(undefined, true) },
      { json: "hidden", js: "hidden", typ: u(undefined, true) },
      {
        json: "inspection",
        js: "inspection",
        typ: u(undefined, r("Inspection")),
      },
      { json: "keywords", js: "keywords", typ: u(undefined, a("")) },
      { json: "modifiedAt", js: "modifiedAt", typ: u(undefined, Date) },
      { json: "name", js: "name", typ: "" },
      { json: "nameEng", js: "nameEng", typ: u(undefined, "") },
      { json: "nearBy", js: "nearBy", typ: u(undefined, true) },
      { json: "payload", js: "payload", typ: u(undefined, r("Payload")) },
      { json: "pid", js: "pid", typ: u(undefined, 0) },
      { json: "popularScore", js: "popularScore", typ: u(undefined, 3.14) },
      { json: "price", js: "price", typ: 0 },
      { json: "productImage", js: "productImage", typ: u(undefined, "") },
      { json: "shippingFee", js: "shippingFee", typ: u(undefined, 0) },
      { json: "status", js: "status", typ: u(undefined, r("Status")) },
      { json: "tracking", js: "tracking", typ: r("Tracking") },
      { json: "type", js: "type", typ: r("Type") },
      { json: "updatedAt", js: "updatedAt", typ: u(undefined, Date) },
      { json: "user", js: "user", typ: u(undefined, r("User")) },
      { json: "video", js: "video", typ: u(undefined, true) },
      { json: "viewCount", js: "viewCount", typ: u(undefined, 0) },
      { json: "createdBefore", js: "createdBefore", typ: u(undefined, "") },
      { json: "modifiedBefore", js: "modifiedBefore", typ: u(undefined, "") },
      { json: "updatedBefore", js: "updatedBefore", typ: u(undefined, "") },
      { json: "location", js: "location", typ: u(undefined, "") },
      { json: "appUrl", js: "appUrl", typ: u(undefined, "") },
      { json: "imageUrl", js: "imageUrl", typ: u(undefined, "") },
      { json: "webUrl", js: "webUrl", typ: u(undefined, "") },
      { json: "storeName", js: "storeName", typ: u(undefined, "") },
      { json: "adText", js: "adText", typ: u(undefined, "") },
      { json: "careType", js: "careType", typ: u(undefined, r("CareType")) },
      { json: "options", js: "options", typ: u(undefined, r("Options")) },
      { json: "catalog", js: "catalog", typ: u(undefined, r("Catalog")) },
    ],
    false,
  ),
  Catalog: o([{ json: "modelId", js: "modelId", typ: 0 }], false),
  Category: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "name", js: "name", typ: "" },
    ],
    false,
  ),
  Options: o([{ json: "shoeSize", js: "shoeSize", typ: "" }], false),
  Tracking: o(
    [
      { json: "imp_id", js: "imp_id", typ: "" },
      { json: "ref_source", js: "ref_source", typ: u(undefined, "") },
      { json: "ref_content", js: "ref_content", typ: u(undefined, "") },
    ],
    false,
  ),
  User: o(
    [
      { json: "uid", js: "uid", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "proshop", js: "proshop", typ: true },
      { json: "image", js: "image", typ: u(undefined, "") },
    ],
    false,
  ),
  CareType: ["NORMAL"],
  Condition: ["HEAVILY_USED", "LIGHTLY_USED", "LIKE_NEW", "NEW", "USED"],
  Inspection: ["NON_TARGET", "OPT_IN", "OPT_OUT"],
  Payload: ['{"query":"나이키"}'],
  Status: ["SELLING"],
  Type: ["EXT_AD", "PRODUCT"],
};
