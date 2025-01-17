import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import {
  useAllusersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { customerror } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skelton } from "../../components/Loader";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const Customers = () => {
  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };
  const [rows, setRows] = useState<DataType[]>([]);
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { isLoading, data, isError, error } = useAllusersQuery(user?._id!);

  if (isError) {
    const err = error as customerror;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          avatar: <img src={i.photo} />,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
          email: i.email,
          gender: i.gender,
          role: i.role,
          name: i.name,
        }))
      );
    }
  });

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skelton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
