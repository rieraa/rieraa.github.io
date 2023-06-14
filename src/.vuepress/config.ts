import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "泡面期待沉思",
  description: "泡面的沉思",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
