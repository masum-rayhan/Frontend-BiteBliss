import orderDetail from "./orderDetail";

export default interface orderHeader {
    orderHeaderId?: number;
    pickupName?: string;
    pickupPhoneNumber?: string;
    pickupEmail?: string;
    applicationUserId?: string;
    user?: any;
    orderTotal?: number;
    orderDate?: string;
    stripePaymentIntentId?: string;
    paymentStatus?: string;
    totalItems?: number;
    orderDetails?: orderDetail[];
  }