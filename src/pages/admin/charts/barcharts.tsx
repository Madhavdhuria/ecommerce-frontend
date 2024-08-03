import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { Skelton } from "../../../components/Loader";
import { useBarQuery } from "../../../redux/api/dashboardapi";
import { customerror } from "../../../types/api-types";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { getLastMonths } from "../../../utils/features";



const Barcharts = () => {
  const { last12Months, last6Months } = getLastMonths();

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { isLoading, data, isError, error } = useBarQuery(user?._id!);

  if (isError) {
    const err = error as customerror;
    toast.error(err.data.message);
  }

  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? (
          <Skelton length={20} />
        ) : (
          <>
            <section>
              <BarChart
                data_1={products}
                data_2={users}
                title_1="Products"
                title_2="Users"
                labels={last6Months}
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={orders}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
