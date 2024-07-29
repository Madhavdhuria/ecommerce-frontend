import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productApi";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null); // Allow null

  const [newProduct] = useNewProductMutation();

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !category || !photo) return;
  // Log photo object
  console.log("Photo object:", photo);
  console.log("Is photo a File object?", photo instanceof File);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("stock", stock.toString());
  formData.append("file", photo); // Ensure 'file' matches the field name in your multer setup
  formData.append("category", category);

  // Log FormData entries
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

    const res = await newProduct({ formData, id: user?._id! });
    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={SubmitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>
            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
