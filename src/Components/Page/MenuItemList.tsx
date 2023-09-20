import { useEffect } from "react";
import { menuItemModel } from "../../Interfaces";
import { MenuItemCard } from ".";
import { useGetMenuItemsQuery } from "../../Apis/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../Storage/Redux/menuItemSlice";
import { MainLoader } from "./Common";

const MenuItemList = () => {
  //const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) return <MainLoader/>;

  console.log(data);
  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
};

export default MenuItemList;
