import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 px-1 text-sm sm:text-base text-[#ADB7BE] rounded-md hover:text-white hover:-translate-y-0.5 transition-all duration-200"
    >
      {title}
    </Link>
  );
};

export default NavLink;
