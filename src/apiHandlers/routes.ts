import { Route } from ".";
import { getInstagramAuthAccounts } from "./auth/getAccounts";
import { loginRoute } from "./auth/login";

export const routes: Route[] = [loginRoute, getInstagramAuthAccounts];
