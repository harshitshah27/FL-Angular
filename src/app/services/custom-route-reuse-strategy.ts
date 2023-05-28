import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';


export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['shouldReuse'] || false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.data['shouldReuse']) {
      this.storedRoutes[route?.routeConfig?.path || 0] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path || 0];
  }

  retrieve(route: ActivatedRouteSnapshot): any {
    if (!route.routeConfig) return null;
    const handle :any = this.storedRoutes[route.routeConfig.path || 0];    
    const componentRef = handle.componentRef;
    if (componentRef && componentRef.instance && typeof componentRef.instance.onAttach === 'function') {
      componentRef.instance.onAttach();
    }
    return handle;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data['shouldReuse'] || false;
  }
}