export {};

declare global{

    interface Window{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        MathJax: any
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const MathJax:any;
