// ShimmerRow.jsx or .tsx
const ShimmerRow = ({ columns = 6 }) => {
  return (
    <tr className="animate-pulse border-b bg-white">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="py-5 pl-8">
          <div className={getShimmerStyle(index)} />
        </td>
      ))}
    </tr>
  );
};

// Function to return different shimmer sizes/styles based on column index
const getShimmerStyle = (index) => {
  const styles = [
    "h-5 w-5 rounded bg-gray-200",
    "flex items-center gap-2",
    "h-4 w-20 rounded bg-gray-200",
    "h-6 w-24 rounded-lg bg-gray-200",
    "h-6 w-28 rounded-lg bg-gray-200",
    "h-4 w-32 rounded bg-gray-200",
    "flex gap-2",
  ];

  // Add a fallback shimmer box if index exceeds the preset styles
  if (index === 1) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-[50px] w-[50px] rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-3 w-44 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (index === 6) {
    return (
      <div className="flex gap-2">
        <div className="h-5 w-5 rounded bg-gray-200" />
        <div className="h-5 w-5 rounded bg-gray-200" />
        <div className="h-5 w-5 rounded bg-gray-200" />
      </div>
    );
  }

  return <div className={styles[index] || "h-4 w-24 rounded bg-gray-200"} />;
};

export default ShimmerRow;

// const ShimmerRow = () => (
//   <tr className="animate-pulse border-b bg-white">
//     <td className="py-5 pl-8">
//       <div className="h-5 w-5 rounded bg-gray-200" />
//     </td>
//     <td className="py-5">
//       <div className="flex items-center gap-2">
//         <div className="h-[50px] w-[50px] rounded-full bg-gray-200" />
//         <div className="space-y-2">
//           <div className="h-4 w-28 rounded bg-gray-200" />
//           <div className="h-3 w-44 rounded bg-gray-200" />
//         </div>
//       </div>
//     </td>
//     <td className="py-5 pl-8">
//       <div className="h-4 w-20 rounded bg-gray-200" />
//     </td>
//     <td className="py-5 pl-8">
//       <div className="h-6 w-24 rounded-lg bg-gray-200" />
//     </td>
//     <td className="py-5 pl-8">
//       <div className="h-6 w-28 rounded-lg bg-gray-200" />
//     </td>
//     <td className="py-5 pl-8">
//       <div className="h-4 w-32 rounded bg-gray-200" />
//     </td>
//     <td className="py-5 pl-8">
//       <div className="flex gap-2">
//         <div className="h-5 w-5 rounded bg-gray-200" />
//         <div className="h-5 w-5 rounded bg-gray-200" />
//         <div className="h-5 w-5 rounded bg-gray-200" />
//       </div>
//     </td>
//   </tr>
// );

// export default ShimmerRow;
