"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();

  console.log(currentPath);

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex gap-6 border-b px-5 h-14 items-center mb-5">
      <Link href="/" className="text-blue-800 text-xl">
        <AiFillBug />
      </Link>
      <ul className="flex gap-6">
        {links.map((link) => {
          const classes = classNames({
            "text-blue-800 border-b-2 border-yellow-500":
              link.href === currentPath,
            "text-blue-500": link.href !== currentPath,
            "font-medium transition-colors duration-200": true,
          });
          return (
            <li key={link.href} className={classes}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavBar;
