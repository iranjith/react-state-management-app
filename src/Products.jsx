import React, { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function Products() {
  const [size, setSize] = useState("");
  const {
    data: products,
    loading,
    error,
  } = useFetch("products?category=shoes");

  const onSizeChange = (e) => {
    setSize(e.target.value);
  };

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select id="size" value={size} onChange={onSizeChange}>
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      {size && <h2>Found {filteredProducts.length} items</h2>}
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
