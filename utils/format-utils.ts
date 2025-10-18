export function formatFileNameAsTitle(fileName: string): string {
    // Remove file extension and replace special characters with space
    const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  
    // Add space between camelCase words
    const withSpaces = withoutExtension
      .replace(/[-_]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2");
  
    // Capitalize first letter of each word
    return withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim();
  }