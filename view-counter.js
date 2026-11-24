/* Free shared page-view counter. Preview copies never request a count. */
(() => {
  "use strict";

  const publicHost = "d90019ij.github.io";
  const publicPath = "/zeros-world/";
  const badgeUrl = "https://hits.sh/d90019ij.github.io/zeros-world.svg?label=Views&color=745542&labelColor=745542";

  if (location.hostname !== publicHost || !location.pathname.startsWith(publicPath)) return;

  const footer = document.querySelector("footer");
  if (!footer || document.querySelector("[data-view-counter]")) return;

  const counter = document.createElement("div");
  counter.dataset.viewCounter = "";
  counter.title = "自 2026/11/24 起累積的全站瀏覽次數，包含重複造訪。由 Hits 提供計數。";
  counter.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 18px 28px;
    color: #745542;
    font-size: 12px;
    line-height: 1.8;
    text-align: center;
  `;

  const label = document.createElement("span");
  label.textContent = "全站累積瀏覽";
  label.style.fontSize = "12px";

  const status = document.createElement("span");
  status.textContent = "載入中…";
  status.style.fontSize = "12px";
  status.setAttribute("role", "status");

  const badge = new Image();
  badge.alt = "累積瀏覽次數（包含重複造訪）";
  badge.height = 20;
  badge.referrerPolicy = "no-referrer";
  badge.style.cssText = "display: block; width: auto; height: 20px; max-width: 100%; margin: 0;";
  badge.onload = () => status.replaceChildren(badge);
  badge.onerror = () => { status.textContent = "計數暫時無法載入"; };

  const privacyLink = document.createElement("a");
  privacyLink.href = publicPath + "privacy.html";
  privacyLink.textContent = "隱私與瀏覽統計";
  privacyLink.style.cssText = "font-size: 12px; text-decoration: underline; text-underline-offset: 3px;";

  counter.append(label, status, privacyLink);
  footer.insertAdjacentElement("afterend", counter);
  badge.src = badgeUrl;
})();
