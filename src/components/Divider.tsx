/** Divider component to be used between sections within the main body */
export default function Divider() {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--color-gray)',
        margin: 'var(--margin) auto',
        maxWidth: '320px',
        width: '100%',
      }}
    />
  );
}
