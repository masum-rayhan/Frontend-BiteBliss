import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../../Helper";
import { SD_OrderStatus } from "../../../Utils/SD";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import { orderSummaryProps } from "../Order/orderSummaryProps";
import { useCreateOrderMutation } from "../../../Apis/orderAPI";

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    console.log(result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occurred.", "error");

      setIsProcessing(false);
    } else {
      console.log(result);

      let grandTotal = 0;
      let totalItems = 0;

      const orderDetailsDTO: any[] = [];

      data.cartItems.forEach((item: cartItemModel) => {
        const tempOrderDetails: any = {};
        tempOrderDetails["menuItemId"] = item.menuItem?.id;
        tempOrderDetails["quantity"] = item.quantity;
        tempOrderDetails["itemName"] = item.menuItem?.name;
        tempOrderDetails["price"] = item.menuItem?.price;

        orderDetailsDTO.push(tempOrderDetails);

        grandTotal += item.menuItem?.price! * item.quantity!;
        totalItems += item.quantity!;
      });

      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        orderTotal: grandTotal,
        totalItems: totalItems,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentId: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:
          result.paymentIntent?.status === "succeeded"
            ? SD_OrderStatus.CONFIRMED
            : SD_OrderStatus.PENDING,
      });

      console.log(response);

      if (response) {
        if (response.data?.result.status == SD_OrderStatus.CONFIRMED) {
          navigate(
            `/order/orderConfirmed/${response.data.result.applicationUserId}`
          );
        } else {
          navigate("/failed");
        }
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="btn btn-success mt-5 w-100"
      >
        <span className="button-text">
          {isProcessing ? "Processing..." : "Submit Order"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
