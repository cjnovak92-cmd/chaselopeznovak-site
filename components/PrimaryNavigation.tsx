import type { NavItem } from "@/lib/content";

type PrimaryNavigationProps = {
  items: NavItem[];
  label: string;
};

export function PrimaryNavigation({
  items,
  label,
}: PrimaryNavigationProps) {
  return (
    <nav
      aria-label={label}
      className="primary-navigation primary-navigation--masthead"
    >
      <ul className="primary-navigation__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="primary-navigation__link"
            >
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
