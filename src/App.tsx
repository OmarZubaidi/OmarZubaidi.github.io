const APPS = [
  {
    name: 'Job COLumn',
    description: 'A job board that considers the cost of living',
    image: require('./images/JobColumn.png'),
    link: 'https://OmarZubaidi.github.io/Job-COLumn',
  },
];

const LINKS = [
  {
    name: 'GitHub',
    link: 'https://github.com/OmarZubaidi',
    icon: require('./images/GitHub.png'),
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/OmarZubaidi',
    icon: require('./images/LinkedIn.png'),
  },
];

export default function App() {
  return (
    <div className="bg-gray-dark flex-column min-h-screen">
      {/* Header */}
      <div className="bg-gray-dark font-bold font-sans pb-5 pt-10 px-10 text-3xl text-center text-rose">
        Omar Zubaidi's Apps
      </div>
      {/* Grid */}
      <div
        className={`auto-rows-fr bg-gray-light grid gap-4 grid-cols-${Math.ceil(
          Math.sqrt(APPS.length)
        )} px-10 py-5 text-gray-dark`}
      >
        {APPS.map((app) => {
          const { name, description, image, link } = app;
          return (
            // Putting the border on the container instead means the container and image radii don't match.
            // It would use the same radius instead of n for the image and n + 2 for the container.
            <a key={name} href={link} rel="noopener noreferrer" className="flex-column items-center rounded-xl">
              <img src={image} alt={name + ' screenshot'} className="border-rose border-t-2 border-x-2 rounded-t-xl" />
              <p className="border-rose border-x-2 font-bold pb-2 pt-5 text-xl text-center text-rose">{name}</p>
              <p className="border-rose border-b-2 border-x-2 rounded-b-xl pb-5 text-center">{description}</p>
            </a>
          );
        })}
      </div>
      {/* Footer */}
      <div className="bg-gray-dark flex justify-center justify-evenly self-end pt-5 pb-10 px-10 text-white">
        {LINKS.map((linkObject) => {
          const { name, link, icon } = linkObject;
          return (
            <a key={name} href={link} rel="noopener noreferrer" className="flex space-x-1.5">
              <img src={icon} height="24" width="24" alt={name + 'icon'} />
              <p>{name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
