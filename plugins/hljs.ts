import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";

export default defineNuxtPlugin(() => {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("java", java);
    hljs.registerLanguage("csharp", csharp);
    hljs.registerLanguage("python", python);
    hljs.autoDetection = () => false;    
})