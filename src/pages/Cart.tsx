import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";
const subtotal = 4000;
const cartitems = [
  {
    Productid: "saadsdfsd",
    photo: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg",
    name: "macbook",
    price: 323432421,
    quantity: 10,
    stock: 20,
  },
];
const tax = Math.round(subtotal * 0.18);
const shippingcharges = 200;
const discount = 400;
const total = subtotal + shippingcharges + tax - discount;

const Cart = () => {
  const [CouponCode, setCouponCode] = useState("");
  const [isvalidCouponCode, setisvalidCouponCode] = useState(false);

  useEffect(() => {
    const TimeOutId = setTimeout(() => {
      if (Math.random() * 0.5) setisvalidCouponCode(true);
      else setisvalidCouponCode(false);
    }, 1000);
    return () => {
      clearTimeout(TimeOutId);
      setisvalidCouponCode(false);
    };
  }, [CouponCode]);
  return (
    <div className="cart">
      <main>
        {cartitems.length > 0 ? (
          cartitems.map((i, idx) => {
            return <CartItem key={idx} cartitem={i} />;
          })
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal} </p>
        <p>Shipping: ₹{shippingcharges}</p>
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
      {cartitems.length > 0 && <Link to="/shipping">CheckOut</Link>}
      </aside>
    </div>
  );
};

export default Cart;
