import { Footer, Header } from "../Components/Layout"
import { Routes, Route } from "react-router-dom";
import { Home, MenuItemDetails, NotFound, ShoppingCart } from "../Pages";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { useEffect } from "react";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { Login, Register } from "../Pages/Auth";


const App = () => {
  const dispatch = useDispatch();
  // const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetShoppingCartQuery(
    //userData.nameid
    "b8d7ebba-5744-47a6-b974-3ca8e0b31b0f"
  );


  // useEffect(() => {
  //   const localToken = localStorage.getItem("token");
  //   if (localToken) {
  //     const { unique_name, nameid, email, role }: userModel =
  //       jwt_decode(localToken);
  //     dispatch(setLoggedInUser({ unique_name, nameid, email, role }));
  //   }
  // }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          {/* <Route path="/authentication" element={<AuthTest />}></Route> */}
          {/* <Route path="/authorization" element={<AuthTestAdmin />}></Route> */}
          {/* <Route path="/accessDenied" element={<AccessDenied />}></Route> */}

          {/* <Route path="/payment" element={<Payment />}></Route> */}
          {/* <Route path="/order/orderConfirmed/:id" element={<OrderConfirmed />}></Route> */}

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

