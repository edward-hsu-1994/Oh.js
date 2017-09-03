module Oh {
    export function apiMethod(config?: {
        url?: string,
        httpMethod?: HttpMethods
    }) {
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.value.method = config || {};
            descriptor.value.method.name = propertyKey;
            if(!(config || {}).httpMethod)descriptor.value.method.httpMethod = HttpMethods.Get;
        }
    }

    export function apiField(config?: {
        where?: Oh.ApiFieldTypes,
        name?: string
    }) {
        return function (target, propertyKey: string, parameterIndex: number) {
            let functionInstance : Function = target[propertyKey];

            let functionParameters = functionInstance.getParameters();
            functionInstance.fields = target[propertyKey].fields || [];

            functionInstance.fields.push({
                index : parameterIndex,
                name: functionParameters[parameterIndex],
                field : (config || {}).name || functionParameters[parameterIndex],
                where : (config || {}).where || ApiFieldTypes.Default
            });     
        }
    }

    export function apiBase(url: string) {
        return function<T extends {new():{}}>(target : T) {//輸入類別
            target.prototype.baseUrl = url;
            return target;
        }
    }

    @apiBase("{a}")
    export class Test {
        public newProperty: string;
        public hello: string;

        @apiMethod()
        public Q(@apiField({where : ApiFieldTypes.Route}) a: number, @apiField() qq:string) {}
    }
}