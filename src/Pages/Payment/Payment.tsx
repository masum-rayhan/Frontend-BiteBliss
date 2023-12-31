import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { PaymentForm } from "../../Components/Page/Payment";
import { OrderSummary } from "../../Components/Page/Order";

const Payment = () => {
  const { state : {apiResult, userInput}} = useLocation();

  const stripePromise = loadStripe(
    "pk_test_51NpIcuDQU4UPnjyg8xt6kbprus1esmopzjSDSbLUtS0Fi8HSv4IzzX0ucdCjPOGoskNDMI9h4EDaR7pZNuF6jZJ800oKe6dGdR"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <div className="container m-5 p-5">
          <div className="row">
            <div className="col-md-7">
              <OrderSummary data={apiResult} userInput={userInput} />
            </div>
            <div className="col-md-4 offset-md-1">
              <h3 className="text-success">Payment</h3>
              <div className="mt-5">
                <PaymentForm data={apiResult} userInput={userInput} />
              </div>
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
