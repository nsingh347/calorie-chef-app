export function saveTextFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
