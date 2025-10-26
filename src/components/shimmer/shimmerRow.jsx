const ShimmerRow = ({ columns = 6 }) => {
  return (
    <tr className="animate-pulse border-b bg-white">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="py-5 pl-8">
          {getShimmerStyle(index)}
        </td>
      ))}
    </tr>
  );
};

const getShimmerStyle = (index) => {
  // Special layout for column 1
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

  // Special layout for column 6
  if (index === 6) {
    return (
      <div className="flex gap-2">
        <div className="h-5 w-5 rounded bg-gray-200" />
        <div className="h-5 w-5 rounded bg-gray-200" />
        <div className="h-5 w-5 rounded bg-gray-200" />
      </div>
    );
  }

  // Default shimmer boxes for other columns
  const styles = [
    "h-5 w-5 rounded bg-gray-200",
    "", // skipped because index === 1 is handled above
    "h-4 w-20 rounded bg-gray-200",
    "h-6 w-24 rounded-lg bg-gray-200",
    "h-6 w-28 rounded-lg bg-gray-200",
    "h-4 w-32 rounded bg-gray-200",
    "", // index 6 handled above
  ];

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
