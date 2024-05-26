import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Detail(props) {
  const { id } = useParams(); //destructure id from useParams
  const skuRef = useRef(); //create a ref for the select element

  const navigate = useNavigate(); //useNavigate hook to navigate programmatically
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />; //if product is not found, return null (nothing will be rendered
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" ref={skuRef} >
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.sku}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku= skuRef.current.value;
            if(!sku) return alert("Select size.");
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
