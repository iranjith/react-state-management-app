import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const { id } = useParams(); //destructure id from useParams
  const navigate = useNavigate(); //useNavigate hook to navigate programmatically
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if(!product) return <PageNotFound />; //if product is not found, return null (nothing will be rendered
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <p>
        <button className="btn btn-primary" onClick={()=> navigate('/cart')}>Add to Cart</button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
