import { Contact, Menu } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { NavLink } from "~/lib/i18n";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

function Navbar({
  logo = {
    url: "http://saeedmfarahni.ir",
    alt: "logo",
    title: "Saeed M Farahani - (🚧 wip)",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog" },
    { title: "About me", url: "/about" },
  ],
}: NavbarProps) {
  return (
    <section className="py-4 container mx-auto">
      {/* Desktop Menu */}
      <nav className="hidden justify-between lg:flex">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <NavLink to={logo.url} className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </NavLink>
          <div className="flex items-center justify-center grow shrink">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="block px-4 lg:hidden">
        <div className="flex gap-4">
          {/* Logo */}
          <NavLink to={logo.url} className="flex items-center gap-2">
            {logo.title}
          </NavLink>
          <div className="grow" />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <NavLink to={logo.url} className="flex items-center gap-2">
                    {logo.title}
                  </NavLink>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}

function renderMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-sm">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <NavLink key={item.title} to={item.url} className="text-md font-semibold">
      {item.title}
    </NavLink>
  );
}

function SubMenuLink({ item }: { item: MenuItem }) {
  return (
    <NavLink
      className="flex w-sm flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      to={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </NavLink>
  );
}

export default Navbar;
