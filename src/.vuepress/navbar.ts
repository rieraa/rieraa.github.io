import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",


    {
        text: "笔记",
        icon: "book",
        prefix: "/notes/Language/",
        children: [
           
            {
              text: "Java",
              icon: "pen-to-square",
              prefix: "java/",
              children: [
                  {text: "basic", icon: "pen-to-square", link: "basic"},


              ],
              
          },
            
        ]
    }


]);
