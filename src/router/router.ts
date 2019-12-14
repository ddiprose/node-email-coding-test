import { IRoute } from '../types/types';
const KoaRouter = require('koa-router');

export class Router {
  private _router: any;

  constructor(
    private _routes: IRoute[] 
  ) {
    this._router = new KoaRouter();
  }

  bootstrap() {
    for(const route of this._routes) {
      this._router[route.type](route.uri, route.handler);
    }
  }

  // for setting up middleware, return the router instance
  get instance() {
    return this._router;
  }
}
