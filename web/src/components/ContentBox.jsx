import "./ContentBox.css";
export function ContentBox({ title, children }) {
  return (
    <section className="content-box">
      <p className="content-box__title">{title}</p>
      {children}
    </section>
  );
}
