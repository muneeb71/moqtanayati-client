import { Suspense } from "react";
import OrderDetailsPageClient from "./OrderDetailsPageClient";

const OrderDetailsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailsPageClient />
    </Suspense>
  );
};

export default OrderDetailsPage;