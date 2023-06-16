import { sidebar } from "vuepress-theme-hope";

export default sidebar({

  "/notes/": [
    {
      text: "Additional",
      icon: "laptop-code",
      prefix: "Additional/",
      children: "structure",
    },
    {
      text: "Language",
      icon: "laptop-code",
      prefix: "Language/",
      children: "structure",
    },

  ]



});
