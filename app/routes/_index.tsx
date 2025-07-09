import Navbar from "~/components/navigation-bar";
import type { Route } from "./+types/_index";
import Hero from "~/components/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saeed M Farahani" },
    { name: "description", content: "Welcome to my website" },
  ];
}

export default function about() {
  return (
    <div >
      <Hero />
    </div>
  );
}
