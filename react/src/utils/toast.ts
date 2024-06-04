export const toast = (values: {
  message: string;
  severity: "error" | "info" | "success" | "warning";
}) => {
  const event = new CustomEvent("toast", { detail: values });
  window.dispatchEvent(event);
};
