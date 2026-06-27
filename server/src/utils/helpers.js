export function formatDate(date) {
  if (!date) return "-";

  return new Date(date)
    .toLocaleDateString();
}

export function truncate(
  text,
  length = 50
) {
  if (!text) return "";

  if (text.length <= length)
    return text;

  return (
    text.slice(0, length) + "..."
  );
}

export function capitalize(text) {
  if (!text) return "";

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
}

export function getStatusColor(
  status
) {
  switch (status) {
    case "Active":
    case "Completed":
    case "Done":
      return "green";

    case "Planning":
    case "Todo":
      return "blue";

    case "Review":
      return "yellow";

    case "On Hold":
    case "Inactive":
      return "gray";

    default:
      return "red";
  }
}

export function getPriorityColor(
  priority
) {
  switch (priority) {
    case "Low":
      return "green";

    case "Medium":
      return "yellow";

    case "High":
      return "red";

    default:
      return "gray";
  }
}