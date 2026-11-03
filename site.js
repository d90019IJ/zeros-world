/* HTML 本身可閱讀；此檔僅連接公開設定，不收集或傳送填答資料。 */
(() => {
  "use strict";
  const config = window.ZERO_CONFIG;
  if (!config) return;
  const httpsUrl = value => {
    if (!value) return null;
    try { const parsed = new URL(value); return parsed.protocol === "https:" ? parsed.href : null; }
    catch { return null; }
  };
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const link = (url, label) => {
    const node = element("a", "text-link", label + " ↗");
    node.href = url; node.target = "_blank"; node.rel = "noopener noreferrer";
    node.setAttribute("aria-label", label + "（在新分頁開啟）");
    return node;
  };
  const socialRoot = document.querySelector("[data-social-links]");
  if (socialRoot && Array.isArray(config.socials)) {
    socialRoot.replaceChildren(...config.socials.map(social => {
      const node = element("div", "social-item");
      const mark = element("span", "social-mark" + (social.name === "LINE" ? " small" : ""), social.mark);
      mark.setAttribute("aria-hidden", "true");
      const copy = element("div");
      copy.append(element("h3", "", social.name), element("p", "", social.note));
      node.append(mark, copy);
      const url = httpsUrl(social.url);
      node.append(url ? link(url, "前往 " + social.name) : element("span", "status", "連結待補"));
      return node;
    }));
    const note = document.querySelector("[data-social-note]");
    if (note && config.socials.some(s => httpsUrl(s.url))) note.textContent = "社群連結將在新分頁開啟；未設定的入口顯示為連結待補。";
  }
  const opportunityRoot = document.querySelector("[data-opportunities]");
  if (opportunityRoot && Array.isArray(config.opportunities)) {
    opportunityRoot.replaceChildren(...config.opportunities.map(item => {
      const url = httpsUrl(item.url), card = element("article", "join-card");
      card.append(element("span", "status", url ? "已開放" : "即將開放"), element("h3", "", item.title), element("p", "", item.description));
      if (url) card.append(link(url, "開啟「" + item.title + "」"));
      return card;
    }));
    const note = document.querySelector("[data-join-note]");
    if (note && config.opportunities.some(i => httpsUrl(i.url))) note.textContent = "點選已開放的項目，將在新分頁開啟對應問卷或活動頁。";
  }
  const photo = config.portrait;
  if (photo && photo.src && !photo.src.includes(":") && !photo.src.startsWith("/") && !photo.src.split(/[\\/]/).includes("..")) {
    const slot = document.querySelector('[data-photo="portrait"]');
    if (slot) {
      const img = new Image(); img.alt = photo.alt || "Zero 的個人照片";
      img.onload = () => { slot.replaceChildren(img); slot.removeAttribute("role"); slot.removeAttribute("aria-label"); };
      img.src = photo.src;
    }
  }
})();
