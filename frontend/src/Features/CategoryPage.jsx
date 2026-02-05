import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Category ID: {id}</h1>
      <p>Show products for this category here.</p>
    </div>
  );
}
