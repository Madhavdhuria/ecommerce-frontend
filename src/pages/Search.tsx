import { useState } from "react";
import toast from "react-hot-toast";
import { Skelton } from "../components/Loader";
import ProductCard from "../components/product-card";
import {
  useAllCategoriesQuery,
  useSearchproductsQuery,
} from "../redux/api/productApi";
import { customerror } from "../types/api-types";
import { cartItem } from "../types/types";
import { addtocart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
const Search = () => {
  let dispatch=useDispatch();
  const {
    data: CategoriesResponse,
    isLoading: isLoadingCategories,
    isError,
    error,
  } = useAllCategoriesQuery("");

  if (isError) {
    const err = error as customerror;
    toast.error(err.data.message);
  }

  const [Search, setSearch] = useState("");
  const [Sort, setSort] = useState("");
  const [maxPrice, setmaxPrice] = useState(10000);
  const [category, setcategory] = useState("");
  const [page, setpage] = useState(1);

  const {
    data: Searcheddata,
    isLoading: ProductLoading,
    isError: ProductIsError,
    error: ProductError,
  } = useSearchproductsQuery({
    search: Search,
    sort: Sort,
    page,
    price: maxPrice,
    category,
  });
  if (ProductIsError) {
    toast.error((ProductError as customerror).data.message);
  }

  const addTocartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 0) {
      toast.error("Out of Stock");
    } else {
      dispatch(addtocart(cartItem));
      toast.success("Added to cart");
    }
  };

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
            <option value="">All</option>
            {!isLoadingCategories &&
              CategoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
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
          {ProductLoading ? (
            <Skelton length={10} />
          ) : (
            Searcheddata?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addTocartHandler}
                photo={i.photo}
              />
            ))
          )}
        </div>
        {Searcheddata && Searcheddata.totalPages > 1 && (
          <article>
            <button
              disabled={!isPreviousPage}
              onClick={() => setpage((prev) => prev - 1)}
            >
              previous
            </button>
            <span>
              {page} of {Searcheddata.totalPages}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setpage((prev) => prev + 1)}
            >
              next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
