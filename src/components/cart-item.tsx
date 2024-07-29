import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { cartItem } from "../types/types";

type cartItemsProps = {
  cartitem: cartItem;
  incrementhandler: (cartItem: cartItem) => void;
  decrementhandler: (cartItem: cartItem) => void;
  removehandler: (id: string) => void;
};
const CartItem = ({
  cartitem,
  incrementhandler,
  decrementhandler,
  removehandler,
}: cartItemsProps) => {
  const { photo, productId, name, price, quantity } = cartitem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt="" />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementhandler(cartitem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementhandler(cartitem)}>+</button>
      </div>
      <button>
        <FaTrash onClick={() => removehandler(productId)} />{" "}
      </button>
    </div>
  );
};

export default CartItem;
