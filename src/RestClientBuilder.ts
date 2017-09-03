module Oh{
    export class RestClientBuilder{
        /*private static createType<T>(type : new()=>T) :new()=>T{
            var object = new type();
            
            

            return object;
        }
        */
        public static createInstance<T>(type: new()=>T): T {
            let result = new type();

            Reflect.ownKeys(type.prototype)//透過反射取得此類別成員
                .filter(x =>//過濾成員，須為Function並且名稱不能為建構子與目前呼叫方法
                    type.prototype[x] instanceof Function &&
                    x != 'constructor'
                ).forEach(x => {
                    if (!this[x].attributes) return;//必須有透過前面Decorators產生的屬性
                    console.log(this);
                });

            return result;
        }
    }
}