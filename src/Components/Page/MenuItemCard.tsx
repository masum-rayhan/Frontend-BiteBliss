import { useState } from "react";
import { apiResponse, menuItemModel } from "../../Interfaces";
import { Link } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../../Apis/shoppingCartApi";
import { MiniLoader } from "./Common";


interface Props {
  menuItem: menuItemModel;
}

const MenuItemCard = (props : Props) => {
//   const navigate = useNavigate();
  //const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleAddToCart = async (menuItemId: number) => {
    // if (!userData.nameid) {
    //   navigate("/login");
    //   return;
    // }
    setIsAddingToCart(true);

    const response : apiResponse = await updateShoppingCart({
      userId: 'b8d7ebba-5744-47a6-b974-3ca8e0b31b0f',
      menuItemId: menuItemId,
      updateQuantityBy: 1
    });

    console.log(response);
    // if(response.data && response.data.isSuccess) {
    //   toastNotify("Item added to cart successfully");
    // }
    setIsAddingToCart(false);
  };

  
  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
          {props.menuItem.specialTag &&
            props.menuItem.specialTag.length > 0 && (
              <i
                className="bi bi-star btn btn-success"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  outline: "none !important",
                  cursor: "pointer",
                }}
              >
                &nbsp; {props.menuItem.specialTag}
              </i>
            )}

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleAddToCart(props.menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/menuItemDetails/${props.menuItem.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
