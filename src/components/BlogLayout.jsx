export default function BlogLayout({ sidebar, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        height: "100vh",
      }}
    >
      <aside
        style={{
          borderRight: "1px solid #ddd",
          padding: "16px",
          overflowY: "auto",
        }}
      >
        {sidebar}
      </aside>

      <main
        style={{
          padding: "24px",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
