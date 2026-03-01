/** Divider component to be used between sections within the main body */
export default function Divider() {
  return (
    <div
      style={{
        position: 'relative',
        margin: 'var(--margin) auto',
        maxWidth: '320px',
        width: '100%',
      }}
    >
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--color-gray)',
          margin: 0,
          width: '100%',
        }}
      />
      {/* purely decorative element */}
      <span role="presentation" className="divider-glyphs" />
    </div>
  );
}
