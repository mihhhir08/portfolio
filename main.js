(function () {
  var root = document.documentElement;
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var box = document.getElementById("cursor-preview");
  var img = box.querySelector("img");
  var tx = 0, ty = 0, x = 0, y = 0, raf = null;
  function loop() {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    box.style.transform = "translate(" + x + "px," + y + "px)";
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(loop);
    else raf = null;
  }
  document.querySelectorAll(".row").forEach(function (row) {
    row.addEventListener("mouseenter", function () {
      img.src = row.dataset.preview;
      box.classList.add("on");
    });
    row.addEventListener("mousemove", function (e) {
      tx = Math.min(e.clientX + 24, innerWidth - 380); ty = Math.min(e.clientY + 24, innerHeight - 245);
      if (!raf) raf = requestAnimationFrame(loop);
    });
    row.addEventListener("mouseleave", function () { box.classList.remove("on"); });
  });
})();
(function () {
  document.querySelectorAll(".sub-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      location.href = el.dataset.href;
    });
  });
})();
