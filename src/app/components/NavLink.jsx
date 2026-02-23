import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 text-sm sm:text-base text-[#ADB7BE] rounded-md hover:text-white transition-colors"
    >
      {title}
    </Link>
  );
};

export default NavLink;
