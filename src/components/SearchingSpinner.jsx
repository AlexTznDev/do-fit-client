import MoonLoader from "react-spinners/MoonLoader";

function SearchingSpinner() {
  return (
    <div style={{display: "flex", justifyContent: "center", padding: "20px", alignItems:"center", minHeight:"100vh" }}>
      <MoonLoader color="#ff3300" size={50} />
    </div>
  );
}

export default SearchingSpinner;
