import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skelton } from "../components/Loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addtocart } from "../redux/reducer/cartReducer";
import { cartItem } from "../types/types";
const Home = () => {
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 0) {
      toast.error("Out of Stock");
    } else {
      dispatch(addtocart(cartItem));
      toast.success("Added to cart")
    }
  };

  const { data, isError, isLoading } = useLatestProductsQuery("");
  if (isError) {
    toast.error("Error While Fetching Products");
  }
  return (
    <>
      <div className="home">
        <section></section>
        <h1>
          Latest Products
          <Link to={"/search"} className="findmore">
            More
          </Link>
        </h1>

        <main>
          {isLoading ? (
            <Skelton width="80vw" />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
