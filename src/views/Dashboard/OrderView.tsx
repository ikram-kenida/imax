import axiosClient from "@/axios";
import { SendOrder } from "@/components/Dashboard/Products/SendOrder";
import { PageTitle } from "@/components/Dashboard/ui/PageTitle";
import { Loading } from "@/components/ui/loading";
import { Order } from "@/types/Dashboard";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const OrderView = () => {
  const { id } = useParams();

  const link = "/dashboard/orders/" + id;

  const fetcher = async () => {
    const response = await axiosClient.get(link);
    return response.data;
  };

  const { data, isLoading, mutate } = useSWR(link, fetcher);
  const { order }: { order: Order } = data ?? {};

  if (isLoading && !order) {
    return <Loading />;
  }
  console.log(order.send);

  return (
    <section className="w-full">
      <div className="flex justify-between items-end">
        <PageTitle
          title="Order Details"
          array={[
            {
              path: "/dashboard/products",
              name: "Orders",
            },
            {
              name: "Order Details",
            },
          ]}
        />
        <SendOrder id={order.id} mutate={mutate} email={order.useremail} />
      </div>
      <div className="mt-5">
        <div className="p-6 bg-white shadow rounded-xl">
          <h4 className="text-neutral-500 text-base font-medium font-['Lato']">
            Details
          </h4>
          <div className="mt-6 flex gap-4">
            <img
              src={order.image}
              alt={order.title}
              className="w-36 h-44 object-contain"
            />
            <div className="flex-1">
              <h4 className="text-neutral-600 text-base font-medium font-['Lato']">
                {order.title}
              </h4>
              <p className="text-neutral-400 text-base font-['Lato']">
                Amount: <span className="text-neutral-600">{order.amount}</span>
              </p>
              <p className="text-neutral-400 text-base font-['Lato']">
                Currency:{" "}
                <span className="text-neutral-600">{order.currency}</span>
              </p>

              <p className="text-neutral-400 text-base font-['Lato']">
                Product Type:{" "}
                <span className="text-neutral-600">{order.type}</span>
              </p>
              {order.data.map((item) => (
                <p
                  className="text-neutral-400 text-base font-['Lato']"
                  key={item.key}
                >
                  {item.key}:{" "}
                  <span className="text-neutral-600">{item.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="p-6 bg-white shadow rounded-xl">
          <h4 className="text-neutral-500 text-base font-medium font-['Lato']">
            Order
          </h4>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <p className="text-neutral-400 text-base font-['Lato']">
              User name:{" "}
              <span className="text-neutral-600">{order.username}</span>
            </p>
            <p className="text-neutral-400 text-base font-['Lato']">
              Email: <span className="text-neutral-600">{order.useremail}</span>
            </p>
            <p className="text-neutral-400 text-base font-['Lato']">
              ID: <span className="text-neutral-600">{order.order_id}</span>
            </p>
            <p className="text-neutral-400 text-base font-['Lato']">
              Date: <span className="text-neutral-600">{order.date}</span>
            </p>
            <p className="text-neutral-400 text-base font-['Lato']">
              Payment Method:{" "}
              <span className="text-neutral-600">{order.payment_method}</span>
            </p>
            <p className="text-neutral-400 text-base font-['Lato']">
              Payment Status:{" "}
              <span className="text-neutral-600">{order.payment_status}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="p-6 bg-white shadow rounded-xl">
          <h4 className="text-neutral-500 text-base font-medium font-['Lato']">
            Status
          </h4>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {order.type == "automatic" ? (
              <p className="text-neutral-400 text-base font-['Lato']">
                {order.send
                  ? `The order has been sent and the sent code is: ${order.code}`
                  : "The order has not been sent due to the absence of codes"}
              </p>
            ) : (
              <>
                {order.send ? (
                  <>
                    <p className="text-neutral-600 font-semibold text-lg font-['Lato']">
                      Sent
                    </p>
                    <p className="text-neutral-4000 text-base font-['Lato']">
                      Admin:{" "}
                      <span className="text-neutral-600">
                        {order.send_admin}
                      </span>
                    </p>
                    <p className="text-neutral-4000 text-base font-['Lato']">
                      Date:{" "}
                      <span className="text-neutral-600">
                        {order.send_date}
                      </span>
                    </p>
                    <p className="text-neutral-4000 text-base font-['Lato']">
                      Message:{" "}
                      <span className="text-neutral-600 block">
                        {order.message}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-neutral-400 text-base font-['Lato']">
                    The client is waiting for the order
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderView;
