import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "~/localize/en";
import { data, useParams } from "react-router";
import { StateError } from "~/lib/error";
import { NavLink } from "react-router";
import { Link } from "react-router";
import type { NavLinkProps } from "react-router";
import type { LinkProps } from "react-router";
import type { To } from "react-router";

/* add new languages to the resources */
const resources = { en };
const lang_key = "vite-lang";
const lang_default = "en";

function iaddress(to: To) {
  const { lang } = useParams();
  if (!lang) return to;
  if (typeof to === "object" && to.pathname?.startsWith("/")) {
    to.pathname = `${lang}${to.pathname}`;
  } else if (typeof to === "string" && to.startsWith("/")) {
    to = `/${lang}${to}`;
  }
  return to;
}

function ILink(props: LinkProps) {
  const to = iaddress(props.to);
  return <Link {...props} to={to} />;
}

function INavLink(props: NavLinkProps) {
  const to = iaddress(props.to);
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
  if (!Object.hasOwn(resources, lang)) {
    throw new StateError(404);
  }
  localStorage.setItem(lang_key, lang);
  i18n.changeLanguage(lang);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng:
      typeof window == "undefined"
        ? lang_default
        : localStorage.getItem(lang_key) || lang_default,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { INavLink as NavLink, ILink as Link };
