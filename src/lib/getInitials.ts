export const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  const first = parts[0] || "";
  const last = parts[1] || "";

  return (
    (first?.charAt(0).toUpperCase() || "") +
    (first?.charAt(1).toUpperCase() || "") +
    (last?.charAt(0).toUpperCase() || "")
  );
};
