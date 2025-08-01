import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "~/localize/en";
import { data, redirect, useLocation, useParams } from "react-router";
import { StateError } from "~/lib/error";
import { NavLink } from "react-router";
import { Link } from "react-router";
import type { NavLinkProps } from "react-router";
import type { LinkProps } from "react-router";
import type { To } from "react-router";
import fa from "~/localize/fa";

/* add new languages to the resources */
const lang_res = { en, fa };
const lang_default = "en";
const lang_key = "vite-lang";
export const lang_supported = Object.keys(lang_res);

export function iUseLocation(new_lang?: string) {
  const { lang } = useParams();
  const loc = useLocation();
  let { pathname } = loc;
  if (lang) pathname = pathname.slice(3);
  if (new_lang && new_lang !== lang_default) {
    pathname = `/${new_lang}${pathname}`;
  }
  return { ...loc, pathname };
}

function iaddr(to: To) {
  const { lang } = useParams();
  if (!lang || lang === lang_default) return to;
  if (typeof to === "object" && to.pathname?.startsWith("/")) {
    to.pathname = `/${lang}${to.pathname}`;
  } else if (typeof to === "string" && to.startsWith("/")) {
    to = `/${lang}${to}`;
  }
  return to;
}

function ILink(props: LinkProps) {
  const to = iaddr(props.to);
  return <Link {...props} to={to} />;
}

function INavLink(props: NavLinkProps) {
  const to = iaddr(props.to);
  return <NavLink {...props} to={to} />;
}

export function initI18n() {
  const { lang } = useParams();
  if (typeof window == "undefined") return;
  if (typeof lang === "undefined") {
    i18n.changeLanguage(lang_default);
    localStorage.setItem(lang_key, lang_default);
    return;
  }

  const current = localStorage.getItem("vite");
  if (lang == current) return;
  if (!Object.hasOwn(lang_res, lang)) {
    throw new StateError(404);
  }
  localStorage.setItem(lang_key, lang);
  i18n.changeLanguage(lang);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: lang_res,
    lng:
      typeof window == "undefined"
        ? lang_default
        : localStorage.getItem(lang_key) || lang_default,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { INavLink as NavLink, ILink as Link, iUseLocation as useLocation };
