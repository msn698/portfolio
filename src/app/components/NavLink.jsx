import Link from "next/link";

const NavLink = ({ href, title, active }) => {
  return (
    <Link
      href={href}
      className={`relative block py-2 px-1 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        active ? "text-white" : "text-[#ADB7BE] hover:text-white"
      }`}
    >
      {title}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" />
      )}
    </Link>
  );
};

export default NavLink;
