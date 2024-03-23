import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navitem({ to, children, click, props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  // console.log(resolvedPath);
  return (
    <li onClick={click}>
      <Link to={to} className={`nav-link ${isActive ? "nav-active" : ""}`}>
        {children}
      </Link>
    </li>
  );
}
