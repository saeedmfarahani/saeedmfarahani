import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [{ title: "My blog" }];
}

export default function _index() {
  return <div></div>;
}
