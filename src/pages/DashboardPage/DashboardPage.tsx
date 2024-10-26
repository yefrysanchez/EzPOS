import { useNavigate } from "react-router-dom";
import MostSold from "../../components/Dashboards/MostSold";
import OrdersChart from "../../components/Dashboards/OrdersChart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { EmployeeType } from "../../types/types";
import { clockin } from "../../store/authSlice";

const DashboardPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // for protected route purpose
    const storedClockedEmployee = localStorage.getItem("clocked");
    if (storedClockedEmployee) {
      const clockedEmployeeData: EmployeeType = JSON.parse(
        storedClockedEmployee
      );
      dispatch(clockin(clockedEmployeeData));
    } else {
      navigate("/clockin");
    }
  }, [dispatch, navigate]);


  return (
    <section className="h-svh lg:h-screen w-full bg-black text-white p-2  overflow-y-scroll lg:overflow-y-auto lg:flex flex-col">
      <div className="">
        <h2 className="text-5xl font-bold text-white tracking-tighter">Dashboard</h2>
      </div>
      <div className="h-1/2 lg:max-h-[300px] xl:h-full lg:flex-1 mt-4 grid grid-cols-2 gap-3 text-center lg:grid-cols-4">
        {orders.map((order) => (
          <div
            key={order.title}
            className="bg-darkGray rounded-xl flex items-center justify-center"
          >
            <div className="flex flex-col p-4 gap-2">
              <span>{order.title}</span>
              <span className="text-2xl font-bold xl:text-[1.5vw]">
                {order.title === "Revenue" || order.title === "Tip amount"
                  ? `$${order.value} `
                  : order.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <MostSold />
        </div>
        <div className="border border-gray mt-4 rounded-xl p-4 col-span-4">
          <OrdersChart />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage

const orders = [
  { title: "Revenue", value: 1200.56 },
  { title: "Orders", value: 198 },
  { title: "Tip amount", value: 186.72 },
  { title: "Products Sold", value: 227 },
];
