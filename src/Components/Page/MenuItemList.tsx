import { useEffect, useState } from "react";
import { menuItemModel } from "../../Interfaces";
import { MenuItemCard } from ".";

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  useEffect(() => {
    fetch("https://foodfancywebapi.azurewebsites.net/menuItem")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

//   const { data, isLoading } = useGetMenuItemsQuery(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isLoading) {
//       dispatch(setMenuItem(data.result));
//     }
//   }, [isLoading]);

//   if (isLoading) return <MainLoader />;

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
};

export default MenuItemList;
