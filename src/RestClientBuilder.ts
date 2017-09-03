module Oh {
    export class RestClientBuilder {
        private static createMethod<T>(type: T, func: Function): Function {
            let url = type.baseUrl || "";
            if (func.method.url) {
                if (/^https?:/g.test(func.method.url)) {
                    url = func.method.url;
                } else {
                    url += func.method.url;
                }
            }
            var fields = func.fields.sort((a,b)=>a.index - b.index);
            var httpCall : string;
            
            switch(func.method.httpMethod){
                case HttpMethods.Get:
                    httpCall = "getAsync";
                    break;
                case HttpMethods.Post:
                    httpCall = "postAsync";
                    break;
                case HttpMethods.Put:
                    httpCall = "putAsync";
                    break;
                case HttpMethods.Delete:
                    httpCall = "deleteAsync";
                    break;
            }
            return new Function(
                fields.map(x=>x.name).join(","),
                `var url = "${url}";\r\n` + 
                `var method = ${func.method.httpMethod};\r\n`+
                `var fields = ${JSON.stringify(fields)};\r\n` + 
                `var route = fields.filter(x=>x.where == Oh.ApiFieldTypes.Route);\r\n`+
                `for(var i = 0; i < route.length ; i++){\r\n`+
                    `url = url.replaceAll("\\{" + route[i].field + "\\}", eval(route[i].name));`+//url route覆蓋
                `}\r\n` +
                `var query = fields.filter(x=>x.where == Oh.ApiFieldTypes.Query).map(x=>x.field + "=" + encodeURIComponent(eval(x.name))).join("&");\r\n`+
                `if(url.indexOf("?") == -1)url += "?";\r\n`+
                `url += query;`+//url route覆蓋
                `var body = fields.filter(x=>x.where == Oh.ApiFieldTypes.Body);\r\n`+
                `var data = {};\r\n` +
                `for(var i = 0; i < body.length ; i++){\r\n`+
                    `data[body.field] = eval(body[i].name);`+//url route覆蓋
                `}\r\n` +

                `console.log(data);\r\n`+
                `var httpClient = new Oh.HttpClient();\r\n` +
                `httpClient.withCredentials = ${func.method.withCredentials || false};\r\n` +
                `return httpClient.${httpCall}(url,null,data);`
            );
        }

        public static createInstance<T>(type: new () => T): T {
            let result = new type();

            Reflect.ownKeys(type.prototype)//透過反射取得此類別成員
                .filter(x =>//過濾成員，須為Function並且名稱不能為建構子與目前呼叫方法
                    type.prototype[x] instanceof Function &&
                    x != 'constructor'
                ).forEach(x => {
                    if (!(result[x] as Function).method) return;//必須有透過前面Decorators產生的屬性
                    console.log((result[x] as Function).method);
                    result[x] = this.createMethod(result, result[x] as Function);
                });

            return result;
        }
    }
}