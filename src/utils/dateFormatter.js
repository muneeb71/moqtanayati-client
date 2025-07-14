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

function formatJoinDate(isoString) {
  const date = new Date(isoString);

  const options = {
    month: "short",
    year: "numeric",
  };

  return `Joined ${date.toLocaleDateString("en-US", options).replace(" ", ", ")}`;
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const diff = Math.floor((now - createdAt) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

  const weeks = Math.floor(diff / 604800);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

export default { formatDateTime, formatDate, formatJoinDate, getTimeAgo };
