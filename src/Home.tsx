export interface HomeProps {
  /** CSS class */
  className?: string;
}

/** Home page component */
export default function Home({ className }: HomeProps) {
  return <h1 className={className}>Home</h1>;
}
