import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const shipping = () => {
  const [shippingInfo, setshippingInfo] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const navigate = useNavigate();
  const Changehandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setshippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form action="">
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
        <button>PayNow</button>
      </form>
    </div>
  );
};

export default shipping;
