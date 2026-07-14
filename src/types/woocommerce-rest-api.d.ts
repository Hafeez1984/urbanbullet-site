declare module "@woocommerce/woocommerce-rest-api" {
  interface WooCommerceRestApiOptions {
    url: string;
    consumerKey: string;
    consumerSecret: string;
    wpAPIPrefix?: string;
    version?: string;
    encoding?: string;
    queryStringAuth?: boolean;
    port?: number;
    timeout?: number;
    classVersion?: string;
  }

  class WooCommerceRestApi {
    constructor(opt: WooCommerceRestApiOptions);
    get(endpoint: string, params?: Record<string, any>): Promise<any>;
    post(endpoint: string, data: Record<string, any>, params?: Record<string, any>): Promise<any>;
    put(endpoint: string, data: Record<string, any>, params?: Record<string, any>): Promise<any>;
    delete(endpoint: string, params?: Record<string, any>): Promise<any>;
    options(endpoint: string, params?: Record<string, any>): Promise<any>;
  }

  export default WooCommerceRestApi;
}
