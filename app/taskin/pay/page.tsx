import { Suspense } from "react";
import PaymentClient from "../../../components/PaymentClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentClient />
    </Suspense>
  );
}