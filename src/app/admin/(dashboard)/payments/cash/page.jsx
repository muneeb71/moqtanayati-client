export default function CashPayments() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Cash Payments</h1>
          <p className="mt-2 text-lg text-gray-600">Coming Soon</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-6">
          <p className="text-gray-700">
            We're working hard to bring you a comprehensive cash payment
            management system.
            <br />
            This feature will be available soon!
          </p>
        </div>
      </div>
    </div>
  );
}
