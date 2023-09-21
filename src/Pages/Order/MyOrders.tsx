import { useSelector } from "react-redux";
import { withAuth } from "../../HOC";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderAPI";
import { MainLoader } from "../../Components/Page/Common";
import { orderHeader } from "../../Interfaces";

const MyOrders = () => {
  const userId = useSelector((state: RootState) => state.userAuthStore.nameid);
  const { data, isLoading, isError } = useGetAllOrdersQuery(userId);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-3">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2"></div>
            </div>

            {data?.result?.orderDetails?.length ? (
              data.result.orderDetails.map((orderItem : orderHeader) => (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col-1">{data.result.orderHeaderId}</div>
                  <div className="col-3">{data.result.pickupName}</div>
                  <div className="col-2">{data.result.pickupPhoneNumber}</div>
                  <div className="col-1">${data.result.orderTotal.toFixed(2)}</div>
                  <div className="col-1">{data.result.totalItems}</div>
                  <div className="col-2">{new Date(data.result.orderDate!).toLocaleDateString()}</div>
                  <div className="col-2">
                    <button className="btn btn-success">Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No order details available</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MyOrders);
