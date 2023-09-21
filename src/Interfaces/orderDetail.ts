import { menuItemModel } from ".";

export default interface orderDetail {
    orderDetailId?: number;
    orderHeaderId?: number;
    menuItemId?: number;
    menuItem?: menuItemModel;
    quantity?: number;
    itemName?: string;
    price?: number;
  
}