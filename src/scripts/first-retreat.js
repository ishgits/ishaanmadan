const root = document.querySelector('.experience-first-retreat');
if (root) {

    (function () {
      var progress = root.querySelector("#" + "progress");
      function updateProgress() {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0) + ")";
      }
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }());
  
}
