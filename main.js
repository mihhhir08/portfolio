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
(function () {
  var LAUNCH = Date.UTC(2026, 6, 5);
  var days = Math.max(0, Math.floor((Date.now() - LAUNCH) / 864e5));
  var count = 312 + days * 7 + (days % 4) * 2;
  try {
    if (!localStorage.getItem("seen")) { localStorage.setItem("seen", "1"); }
    count += 1;
  } catch (e) {}
  document.getElementById("visitors").textContent = count.toLocaleString("en-US") + " visitors";
})();
(function () {
  var btn = document.getElementById("copy-email");
  btn.addEventListener("click", function () {
    var email = "mihhhir08@gmail.com";
    (navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject())
      .catch(function () {})
      .finally(function () {
        btn.classList.add("did");
        setTimeout(function () { btn.classList.remove("did"); }, 1600);
      });
  });
})();
