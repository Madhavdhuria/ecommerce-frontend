import { ReactElement } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useState } from "react";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};
const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DISCOUNT",
    accessor: "discount",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "ACTION",
    accessor: "action",
  },
];

const Orders = () => {
  const [rows] = useState<DataType[]>([
    {
      _id: "string",
      amount: 2322342,
      quantity: 2,
      discount: 23,
      status: <span className="red">Processing</span>,
      action: <Link to={"/orders/adasdfds"}>View</Link>,
    },
  ]);
  const table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "orders",
    rows.length > 6
  );
  return (
    <div className="container">
      <h1>My Orders</h1>
      {table()}
    </div>
  );
};

export default Orders;
