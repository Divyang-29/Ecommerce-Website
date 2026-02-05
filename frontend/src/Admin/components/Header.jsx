import "./Header.css";

export default function Header({ title, subtitle, right }) {
  return (
    <div className="admin-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {right && <div className="admin-header-right">{right}</div>}
    </div>
  );
}
