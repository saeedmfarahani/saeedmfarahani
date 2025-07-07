import Navbar from "~/components/navigation-bar";
import type { Route } from "./+types/_index";
import { t } from "i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New app" },
    { name: "description", content: "Welcome new app!" },
  ];
}

export default function _index() {
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
}
