import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const CartItem = ({ cartitem }: { cartitem: any }) => {
  const { photo, productid, name, price, quantity } = cartitem;
  return (
    <div className="cart-item">
      <img src={photo} alt="" />
      <article>
        <Link to={`/product/${productid}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button>
        <FaTrash />{" "}
      </button>
    </div>
  );
};

export default CartItem;
