import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",


    {
        text: "笔记",
        icon: "book",
        prefix: "/notes/",
        children: [
            {
                text: "设计模式",
                icon: "pen-to-square",
                prefix: "design/",
                children: [
                    {text: "设计模式", icon: "pen-to-square", link: "patterns"},


                ],
                
            },
            
        ]
    }


]);
