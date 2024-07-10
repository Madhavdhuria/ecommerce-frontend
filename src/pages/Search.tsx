import { useState } from "react";
import ProductCard from "../components/product-card";
const Search = () => {
  const [Search, setSearch] = useState("");
  const [Sort, setSort] = useState("");
  const [maxPrice, setmaxPrice] = useState(10000);
  const [category, setcategory] = useState("");
  const [page, setpage] = useState(1);
  const addTocartHandler = () => {};

  const isNextPage = page < 4;
  const isPreviousPage = page > 1;

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={Sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price(Low To High)</option>
            <option value="desc">Price(High To Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""} </h4>
          <input
            type="range"
            max={100000}
            min={100}
            value={maxPrice}
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          ></input>
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Game">Game</option>
            <option value="Laptop">Laptop</option>
            <option value="camera">Camera</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name ..."
        />
        <div className="search-product-list">
          <ProductCard
            productId="123"
            name="macbook"
            price={244324}
            stock={32}
            handler={addTocartHandler}
            photo="https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg"
          />
        </div>
        <article>
          <button
            disabled={!isPreviousPage}
            onClick={() => setpage((prev) => prev - 1)}
          >
            previous
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setpage((prev) => prev + 1)}
          >
            next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
