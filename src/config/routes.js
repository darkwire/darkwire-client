const routes = [
  {
    key: 'root',
    path: '/',
    authenticated: false,
  }
]

export default routes

const doGetAuthenticatedRoutes = () => routes.filter(route => route.authenticated)
const doGetPublicRoutes = () => routes.filter(route => !route.authenticated)
const preventIfAuthenticatedRoutes = () => routes.filter(route => route.preventIfAuthenticated)

export const getAuthenticatedRoutes = () => doGetAuthenticatedRoutes()
export const getAuthenticatedRoutePaths = () => doGetAuthenticatedRoutes().map(route => route.path)

export const getPublicRoutes = () => doGetPublicRoutes()
export const getPublicRoutePaths = () => doGetPublicRoutes().map(route => route.path)

export const getPreventIfAuthenticatedPaths = () => preventIfAuthenticatedRoutes().map(route => route.path)
export const getPreventIfAuthenticatedRoutes = () => preventIfAuthenticatedRoutes()

export const getRoute = (key) => routes.find(route => route.key === key)