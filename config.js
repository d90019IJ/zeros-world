/* 公開設定：不放私人資料、金鑰或未公開草稿。網址留空就維持未開放。
 * 照片放在 images/，再填入相對路徑及真實照片描述。 */
window.ZERO_CONFIG = {
  portrait: { src: "images/zero-portrait-v1.webp", alt: "Zero 的漫畫風肖像，戴著墨鏡與口罩、穿橄欖綠上衣" },
  socials: [
    { name: "Instagram", note: "生活與日常", mark: "◎", url: "" },
    { name: "Threads", note: "想法與交流", mark: "@", url: "" },
    { name: "LINE", note: "保持聯繫", mark: "LINE", url: "" }
  ],
  // 可新增同格式項目；有效 HTTPS 網址設定後才會顯示入口。
  opportunities: [
    { title: "互動問卷", description: "健康、生活與自我探索相關問卷。", url: "" },
    { title: "活動與交流", description: "分享、活動報名及合作交流。", url: "" }
  ]
};
