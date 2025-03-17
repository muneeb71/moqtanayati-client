export function slugify(title) {
  return title
    .toString() // Convert to string (in case it's not already)
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from the beginning and end
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Remove multiple consecutive dashes
}

export function unslugify(slug) {
  return slug
    .toString() // Ensure it's a string
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}
