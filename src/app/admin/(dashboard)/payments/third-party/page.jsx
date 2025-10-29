export default function ThirdPartyPayments() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Third Party Payments
          </h1>
          <p className="mt-2 text-lg text-gray-600">Coming Soon</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-6">
          <p className="text-gray-700">
            We're developing an advanced third-party payment integration system.
            <br />
            This feature will be available soon!
          </p>
        </div>
      </div>
    </div>
  );
}
