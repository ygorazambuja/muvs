export interface IHttp {
  get(url: string): Promise<any>;
  post(url: string, data?: any): Promise<any>;
}
