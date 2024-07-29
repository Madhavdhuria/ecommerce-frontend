const Loader = () => {
  return <div>Loader</div>;
};

export default Loader;

interface SkeltonProps {
  width?: string;
  length?: number;
}

export const Skelton = ({ width = "unset", length = 3 }: SkeltonProps) => {
  let skeltons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skelton-shape"></div>
  ));
  return (
    <div
      className="skelton-loader"
      style={{
        width,
      }}
    >
      {skeltons}
    </div>
  );
};
