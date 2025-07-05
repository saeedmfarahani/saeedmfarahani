import Hero from "~/components/custom/hero";
import type { Route } from "./+types/_index";
import NavBar from "~/components/custom/navigation-bar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saeed M Farahani" },
    { name: "description", content: "Welcome my portfolio!" },
  ];
}

export default function _index() {
  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
}
