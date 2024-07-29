import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/cart-item";
import {
  addtocart,
  calculatePrice,
  discountapplied,
  removeFromCart,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { cartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";
const Cart = () => {
  let dispatch = useDispatch();
  const [CouponCode, setCouponCode] = useState("");
  const [isvalidCouponCode, setisvalidCouponCode] = useState(false);

  const { cartItems, subtotal, tax, total, ShippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const incrementhandler = (cartItem: cartItem) => {
    if (cartItem.quantity > cartItem.stock) return;
    dispatch(addtocart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementhandler = (cartItem: cartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addtocart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removehandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const TimeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${CouponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          setisvalidCouponCode(true);
          dispatch(discountapplied(res.data.discount));
          dispatch(calculatePrice());
        })
        .catch(() => {
          setisvalidCouponCode(false);
          cancel();
          dispatch(discountapplied(0));
          dispatch(calculatePrice());
        });
    });
    return () => {
      clearTimeout(TimeOutId);
    };
  }, [CouponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => {
            return (
              <CartItem
                key={idx}
                incrementhandler={incrementhandler}
                decrementhandler={decrementhandler}
                removehandler={removehandler}
                cartitem={i}
              />
            );
          })
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal} </p>
        <p>Shipping: ₹{ShippingCharges}</p>
        <p>tax: ₹{tax} </p>
        <p>
          discount: <em className="red">-{discount}</em>
        </p>
        <p>
          Total: <b>₹{total}</b>
        </p>
        <input
          type="text"
          value={CouponCode}
          placeholder="coupon code"
          onChange={(e) => {
            setCouponCode(e.target.value);
          }}
        />
        {CouponCode &&
          (isvalidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code> {CouponCode} </code>
            </span>
          ) : (
            <span className="red">
              isvalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">CheckOut</Link>}
      </aside>
    </div>
  );
};

export default Cart;
