import { createBrowserHistory } from "history";
export const isMobile = (name) =>window.matchMedia("(max-width: 600px)").matches;
export const history = createBrowserHistory();
