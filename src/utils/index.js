export const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  // Get today's and yesterday's start
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format time
  const timeString = date
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
  // Determine output format
  if (date >= today) {
    return `Today at ${timeString}`;
  } else if (date >= yesterday) {
    return `Yesterday at ${timeString}`;
  } else {
    return (
      date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + ` at ${timeString}`
    );
  }
};
