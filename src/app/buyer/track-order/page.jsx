import { Suspense } from "react";
import TrackOrder from "@/components/sections/landing/track-order/page"

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackOrder />
    </Suspense>
  )
}

export default page