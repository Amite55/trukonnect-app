export class helpers {
  // ===== Strings =====
  static capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static lowerCase(text: string): string {
    return text ? text.toLowerCase() : "";
  }

  static upperCase(text: string): string {
    return text ? text.toUpperCase() : "";
  }

  //   ================= Images =================
  static getImgFullUrl(href: string): string {
    if (!href) return "";

    if (/^https?:\/\//.test(href)) return href;
    const base = process.env.EXPO_PUBLIC_IMG_URL?.replace(/\/+$/, "");
    const path = href.replace(/^\/+/, "");
    return `${base}/${path}`;
  }
}
