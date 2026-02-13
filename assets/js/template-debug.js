document.addEventListener("DOMContentLoaded", function () {
  const source = document.querySelector(".display-template");
  const target = document.getElementById("template-name");

  if (source && target) {
    target.textContent = source.textContent.trim();
  }
});