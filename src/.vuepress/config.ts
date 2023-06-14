import {defineUserConfig} from "vuepress";
import theme from "./theme.js";


export default defineUserConfig({
    base: "/",

    lang: "zh-CN",
    title: "",
    description: "000",
    head: [
        ['link', {rel: 'icon', href: '/ava.gif'}],
        ['link', {rel: 'stylesheet', href: '/styles/custom.css'}]
    ],


    theme,

    // Enable it with pwa
    // shouldPrefetch: false,

});
