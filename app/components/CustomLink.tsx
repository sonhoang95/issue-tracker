import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

// https://nextjs.org/docs/messages/link-passhref (Ensure passHref is used with custom Link components)
/*
If the child of Link is a functional component, ensure to use passHref and legacyBehavior
*/
interface Props {
  href: string;
  children: string;
}
const CustomLink = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};
export default CustomLink;
