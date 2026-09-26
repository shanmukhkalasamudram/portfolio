// "01 — About" label, the big serif title, and optional links on the right.
export default function SectionHeading({ eyebrow, title, description, children }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading">
        <div>
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {children}
      </div>
    </>
  );
}
