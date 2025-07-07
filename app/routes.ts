import { prefix, type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
export default prefix("/:lang?/",(await flatRoutes())) satisfies RouteConfig;
