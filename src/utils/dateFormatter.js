function formatDateTime(isoString) {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

function formatDate(isoString) {
  const date = new Date(isoString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export default { formatDateTime, formatDate };
