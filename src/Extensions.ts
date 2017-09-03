interface Function{
    getParameters(): string[],
    fields: Oh.FunctionParameter[];
}

module Oh{
    export class FunctionParameter{
        public index:number;
        public name:string;    
        public where:ApiFieldTypes;    
    }
}

Function.prototype.getParameters = function(){
    let temp =<string> this.toString().match(/\(.+\)/g)[0];
    temp = temp.substring(1);
    temp = temp.substring(0,temp.length - 1);
    
    return temp.split(',').map(x=>x.trim());
}