/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Cart {
  /** Id of the cart */
  id: number;
}

export interface AddItem {
  /** User ID of the cart */
  userId: number;
  /** @format date */
  date: string;
  products: CartItem[];
}

export interface CartResult {
  /** ID of the relevant cart */
  id: number;
  /** User ID of the cart */
  userId: number;
  /** @format date */
  date: string;
  products: CartItem[];
}

export interface CartItem {
  /** Id of product in cart */
  productId: number;
  /** How many of this product are in cart */
  quantity: number;
}

export interface Product {
  /** ID of product */
  id: number;
  /** Name of the product */
  title: string;
  /** Price of the product */
  price: number;
  /** Description of the product */
  description: string;
  /** Category to which the product belongs */
  category: string;
  /** URL of the product image */
  image: string;
  /** Rating of the product */
  rate: Rate;
}

export interface Rate {
  /** How well is the product rated */
  rate: number;
  /** How many users have rated this product */
  count: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Conrads e-shop swagger
 * @version 0.0.1
 * @license MIT (https://opensource.org/licenses/MIT)
 * @termsOfService https://opensource.org/licenses/MIT
 * @contact Jan Jindráček <jindra12.underdark@gmail.com> (https://www.linkedin.com/in/jan-jindr%C3%A1%C4%8Dek-0617b9224)
 *
 * Conrad swagger shop test
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  products = {
    /**
     * @description Lists all products
     *
     * @name GetProducts
     * @request GET:/products
     */
    getProducts: (
      query?: {
        limit?: number;
        sort?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<Product[], any>({
        path: `/products`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get single product
     *
     * @name GetProduct
     * @request GET:/products/{productId}
     */
    getProduct: (productId: number, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/products/${productId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get all categories of products
     *
     * @name GetCategories
     * @request GET:/products/categories
     */
    getCategories: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/products/categories`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get products in a single category
     *
     * @name GetProductsInCategory
     * @request GET:/products/categories/{category}
     */
    getProductsInCategory: (
      category: string,
      query?: {
        category?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Product[], any>({
        path: `/products/categories/${category}`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  carts = {
    /**
     * @description Get all products in user cart
     *
     * @name GetProductsInCart
     * @request GET:/carts/user/{userId}
     */
    getProductsInCart: (userId: number, params: RequestParams = {}) =>
      this.request<CartResult[], any>({
        path: `/carts/user/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Create a new cart for user
     *
     * @name CreateCart
     * @request POST:/carts
     */
    createCart: (body: AddItem, params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/carts`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Update a cart
     *
     * @name UpdateCart
     * @request PUT:/carts/{cartId}
     */
    updateCart: (cartId: number, body: AddItem, params: RequestParams = {}) =>
      this.request<Cart, any>({
        path: `/carts/${cartId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),
  };
}
