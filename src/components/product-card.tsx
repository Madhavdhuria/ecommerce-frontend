import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { cartItem } from "../types/types";
type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: cartItem) => void;
};

const ProductCard = ({
  price,
  name,
  photo,
  handler,
  stock,
  productId,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          onClick={() =>
            handler({ name, photo, price, quantity: 1, stock, productId })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
