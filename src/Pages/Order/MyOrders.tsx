import { useSelector } from "react-redux";
import { withAuth } from "../../HOC";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderAPI";
import { MainLoader } from "../../Components/Page/Common";
import { orderHeader } from "../../Interfaces";

// const MyOrders = () => {
//   // const nameId = 'b8d7ebba-5744-47a6-b974-3ca8e0b31b0f';
//   const userId = useSelector((state: RootState) => state.userAuthStore.nameid);
//   const { data, isLoading } = useGetAllOrdersQuery(userId);
//   console.log(data);
//   return (
//     <>
//       {isLoading && <MainLoader />}
//       {!isLoading && (
//         <div className="table p-5">
//           <h1 className="text-success">Orders List</h1>
//           <div className="p-2">
//             <div className="row border">
//               <div className="col-1">ID</div>
//               <div className="col-3">Name</div>
//               <div className="col-2">Phone</div>
//               <div className="col-1">Total</div>
//               <div className="col-1">Items</div>
//               <div className="col-2">Date</div>
//               <div className="col-2"></div>
//             </div>
//             {/* {data.result.map((order: orderHeader) => {return(<div>{order.applicationUserId}</div>)})} */}
//             {/* {data.result.map((orderItem: orderHeader) => {return(<div>{order.applicationUserId}</div>)})}
//             {Array.isArray(data) ? (
//               data.map((order: orderHeader) => (
//                 <div key={order.orderHeaderId}>
//                   {order.applicationUserId}
//                 </div>
//               ))
//             ) : (
//               <div>No orders available</div>
//             )} */}
//             {/* {data.result.map((orderItem: orderHeader) => {
//               return (
//                 <div className="row border">
//                   <div className="col-1">ID</div>
//                   <div className="col-3">NAME</div>
//                   <div className="col-2">PHONE</div>
//                   <div className="col-1">$ TOTAL</div>
//                   <div className="col-1"># ITEMS</div>
//                   <div className="col-2">DATE</div>
//                   <div className="col-2">
//                     <button className="btn btn-success">Details</button>
//                   </div>
//                 </div>
//               );
//             })} */}
//             {/* {Array.isArray(data.result.orderHeader) ? (
//               data.result.orderHeader.map((orderItem : orderHeader) => (
//                 <div className="row border">
//                   <div className="col-1">ID</div>
//                   <div className="col-3">NAME</div>
//                   <div className="col-2">PHONE</div>
//                   <div className="col-1">$ TOTAL</div>
//                   <div className="col-1"># ITEMS</div>
//                   <div className="col-2">DATE</div>
//                   <div className="col-2">
//                     <button className="btn btn-success">Details</button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div>No order details available</div>
//             )} */}
//             {data.result.orderHeader ? (
//               data.result.orderHeader.map((orderItem: orderHeader) => (
//                 <div className="row border">
//                   <div className="col-1">ID</div>
//                   <div className="col-3">NAME</div>
//                   <div className="col-2">PHONE</div>
//                   <div className="col-1">$ TOTAL</div>
//                   <div className="col-1"># ITEMS</div>
//                   <div className="col-2">DATE</div>
//                   <div className="col-2">
//                     <button className="btn btn-success">Details</button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div>No order details available</div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default withAuth(MyOrders);

const MyOrders = () => {
  const userId = useSelector((state: RootState) => state.userAuthStore.nameid);
  const { data, isLoading, isError } = useGetAllOrdersQuery(userId);
  // console.log("data:", data);
  // console.log("isLoading:", isLoading);
  // console.log("isError:", isError);

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
