
export class CodeContainer{
    public static readonly EMPTY:CodeContainer = new CodeContainer();
    public name:string;
    public languages:LanguageContainer[];

    public static async FetchCodeContainer(path:string){
        const ind : 
        {
            name:string,
            languages:
            {
                language:string,
                files:
                {
                    name:string,
                    path:string
                }[]
            }[]
        } = JSON.parse(await(await fetch("http://localhost:3000"+path+"/index.json")).text());
        const obj = new CodeContainer()
        obj.name = ind.name;
        obj.languages = [];

        for(let i=0; i<ind.languages.length; i++){
            const tempLang = new LanguageContainer();
            tempLang.language = ind.languages[i].language;
            tempLang.files = []
            for(let j=0; j<ind.languages[i].files.length; j++){
                const tempCode = new CodeFile();
                tempCode.name = ind.languages[i].files[j].name;
                tempCode.path = ind.languages[i].files[j].path;
                tempCode.code = (await (await fetch("http://localhost:3000"+path+ind.languages[i].files[j].path)).text());
                tempLang.files.push(tempCode);
            }
            obj.languages.push(tempLang);
        }
        return obj;
    }
}

export class LanguageContainer{
    public language:string;
    public files:CodeFile[]
}

export class CodeFile{
    public name:string;
    public path:string;
    public code:string;
}