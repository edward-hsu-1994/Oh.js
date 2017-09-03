interface Function{
    getParameters(): string[],
    fields: Oh.FunctionParameter[];
    method: Oh.FunctionInfo;
}
interface Object{
    baseUrl:string;
}
interface String{
    replaceAll(search:string, replacement:string):string;
}

module Oh{
    export class FunctionInfo{
        public url: string;
        public name:string;
        public httpMethod: HttpMethods;
        public withCredentials: boolean;
    }
    export class FunctionParameter{
        public index:number;
        public name:string;   
        public field:string;     
        public where:ApiFieldTypes;    
    }
}

Function.prototype.getParameters = function(){
    let temp =<string> this.toString().match(/\(.+\)/g)[0];
    temp = temp.substring(1);
    temp = temp.substring(0,temp.length - 1);
    
    return temp.split(',').map(x=>x.trim());
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};