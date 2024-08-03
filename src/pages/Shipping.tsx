import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../types/reducer-types";
import { useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/OrderApi";
import { responseToast } from "../utils/features";

const shipping = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  if (cartItems.length <= 0) {
    navigate("/cart");
  }
  const [shippingInfo, setshippingInfo] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const Changehandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setshippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const data = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [newOrder] = useNewOrderMutation();
  console.log(data);
  
  const {
    cartItems:orderItems,
    discount,
    ShippingCharges,
    subtotal,
    tax,
    total,
  } = data;

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(ShippingCharges);
    const order = {
      shippingInfo,
      orderItems,
      subtotal,
      tax,
      ShippingCharges,
      discount,
      total,
      user: user?._id!,
    };
    
    const res = await newOrder(order);
    responseToast(res, navigate, "/");
  };
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form action="" onSubmit={HandleSubmit}>
        <h1>Shipping Adress</h1>

        <input
          type="text"
          value={shippingInfo.address}
          onChange={Changehandler}
          placeholder="Enter address"
          name="address"
        />
        <input
          type="text"
          value={shippingInfo.city}
          onChange={Changehandler}
          placeholder="Enter city"
          name="city"
        />
        <input
          type="text"
          value={shippingInfo.state}
          onChange={Changehandler}
          placeholder="Enter state"
          name="state"
        />
        <select
          name="country"
          value={shippingInfo.country}
          onChange={Changehandler}
          required
        >
          <option value="">Choose a Country</option>
          <option value="india">india</option>
        </select>

        <input
          type="number"
          value={shippingInfo.pinCode}
          onChange={Changehandler}
          placeholder="Enter pinCode"
          name="pinCode"
        />
        <button type="submit">PayNow</button>
      </form>
    </div>
  );
};

export default shipping;
// Order validation failed: shippingInfo.state: Path `shippingInfo.state` is required., shippingCharges: Path `shippingCharges` is required.