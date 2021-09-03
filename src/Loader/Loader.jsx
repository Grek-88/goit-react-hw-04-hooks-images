import Loader from "react-loader-spinner";
export default function LoaderMore() {
  return (
    <div style={{ margin: "auto" }}>
      <Loader
        type="ThreeDots"
        color="red"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
}
