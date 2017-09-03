var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Oh;
(function (Oh) {
    var FunctionInfo = (function () {
        function FunctionInfo() {
        }
        return FunctionInfo;
    }());
    Oh.FunctionInfo = FunctionInfo;
    var FunctionParameter = (function () {
        function FunctionParameter() {
        }
        return FunctionParameter;
    }());
    Oh.FunctionParameter = FunctionParameter;
})(Oh || (Oh = {}));
Function.prototype.getParameters = function () {
    var temp = this.toString().match(/\(.+\)/g)[0];
    temp = temp.substring(1);
    temp = temp.substring(0, temp.length - 1);
    return temp.split(',').map(function (x) { return x.trim(); });
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var Oh;
(function (Oh) {
    var HttpMethods;
    (function (HttpMethods) {
        HttpMethods[HttpMethods["Get"] = 0] = "Get";
        HttpMethods[HttpMethods["Post"] = 1] = "Post";
        HttpMethods[HttpMethods["Put"] = 2] = "Put";
        HttpMethods[HttpMethods["Delete"] = 3] = "Delete";
    })(HttpMethods = Oh.HttpMethods || (Oh.HttpMethods = {}));
})(Oh || (Oh = {}));
var Oh;
(function (Oh) {
    var ApiFieldTypes;
    (function (ApiFieldTypes) {
        ApiFieldTypes[ApiFieldTypes["Default"] = 0] = "Default";
        ApiFieldTypes[ApiFieldTypes["Query"] = 0] = "Query";
        ApiFieldTypes[ApiFieldTypes["Route"] = 1] = "Route";
        ApiFieldTypes[ApiFieldTypes["Body"] = 2] = "Body";
    })(ApiFieldTypes = Oh.ApiFieldTypes || (Oh.ApiFieldTypes = {}));
})(Oh || (Oh = {}));
var Oh;
(function (Oh) {
    function apiMethod(config) {
        return function (target, propertyKey, descriptor) {
            descriptor.value.method = config || {};
            descriptor.value.method.name = propertyKey;
            if (!(config || {}).httpMethod)
                descriptor.value.method.httpMethod = Oh.HttpMethods.Get;
        };
    }
    Oh.apiMethod = apiMethod;
    function apiField(config) {
        return function (target, propertyKey, parameterIndex) {
            var functionInstance = target[propertyKey];
            var functionParameters = functionInstance.getParameters();
            functionInstance.fields = target[propertyKey].fields || [];
            functionInstance.fields.push({
                index: parameterIndex,
                name: functionParameters[parameterIndex],
                field: (config || {}).name || functionParameters[parameterIndex],
                where: (config || {}).where || Oh.ApiFieldTypes.Default
            });
        };
    }
    Oh.apiField = apiField;
    function apiBase(url) {
        return function (target) {
            target.prototype.baseUrl = url;
            return target;
        };
    }
    Oh.apiBase = apiBase;
    var Test = (function () {
        function Test() {
        }
        Test.prototype.Q = function (a, qq) { };
        return Test;
    }());
    __decorate([
        apiMethod(),
        __param(0, apiField({ where: Oh.ApiFieldTypes.Route })), __param(1, apiField())
    ], Test.prototype, "Q", null);
    Test = __decorate([
        apiBase("{a}")
    ], Test);
    Oh.Test = Test;
})(Oh || (Oh = {}));
var Oh;
(function (Oh) {
    /**
     * Http請求客戶端物件
     */
    var HttpClient = (function () {
        function HttpClient() {
            /**
             * 預設Request標頭
             */
            this.requestHeader = null;
            /**
             * 是否包含認證
             */
            this.withCredentials = false;
        }
        HttpClient.prototype.typeOf = function (obj) {
            if (!obj)
                return obj;
            return obj.constructor.name;
        };
        HttpClient.prototype.openAndSend = function (method, url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            //#region 事件與屬性
                            xhr.withCredentials = _this.withCredentials;
                            xhr.onprogress = progressCallback || _this.progressCallback;
                            xhr.onreadystatechange = function (event) {
                                if (xhr.readyState !== 4)
                                    return;
                                if (xhr.status >= 200 && xhr.status < 300) {
                                    var result = new HttpResponse();
                                    result.header = xhr.getAllResponseHeaders();
                                    result.statusCode = xhr.status;
                                    result.resultType = xhr.responseType;
                                    result.resultText = xhr.responseText;
                                    result.resultXML = xhr.responseXML;
                                    result.result = xhr.response;
                                    resolve(result);
                                }
                                else {
                                    reject(xhr.statusText);
                                }
                            };
                            //#endregion
                            if (method == "GET" || method == "DELETE") {
                                var params = new Array();
                                for (var key in data)
                                    params.push(key + "=" + encodeURIComponent(data[key]));
                                url += "?" + params.join("&");
                            }
                            xhr.open(method, url, true, user || _this.user, password || _this.password);
                            //#region 設定Header
                            if (_this.requestHeader)
                                for (var key in _this.requestHeader)
                                    xhr.setRequestHeader(key, _this.requestHeader[key]);
                            if (header)
                                for (var key in header)
                                    xhr.setRequestHeader(key, header[key]);
                            //#endregion
                            if (data) {
                                if (data instanceof FormData || _this.typeOf(data) == 'String') {
                                    xhr.send(data);
                                }
                                else {
                                    if (method == "GET" || method == "DELETE") {
                                        xhr.send();
                                    }
                                    else if (new FormData()['fake']) {
                                        var qString = "";
                                        for (var key in data) {
                                            if (data[key] instanceof Function)
                                                continue;
                                            qString += "&" + key + "=" + encodeURIComponent(data[key]);
                                        }
                                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                                        xhr.send(qString.substring(1));
                                    }
                                    else {
                                        var formdata = new FormData();
                                        for (var key in data) {
                                            if (data[key] instanceof Function)
                                                continue;
                                            formdata.append(key, data[key]);
                                        }
                                        xhr.send(formdata);
                                    }
                                }
                            }
                            else {
                                xhr.send();
                            }
                        })];
                });
            });
        };
        /**
         * GET
         * @param url 網址
         * @param header 標頭
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        HttpClient.prototype.getAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('GET', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * POST
         * @param url 網址
         * @param header 標頭
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        HttpClient.prototype.postAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('POST', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * PUT
         * @param url 網址
         * @param header 標頭
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        HttpClient.prototype.putAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('PUT', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * DELETE
         * @param url 網址
         * @param header 標頭
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        HttpClient.prototype.deleteAsync = function (url, header, data, user, password, progressCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openAndSend('DELETE', url, header, data, user, password, progressCallback)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return HttpClient;
    }());
    Oh.HttpClient = HttpClient;
    /**
     * HttpClient結果
     */
    var HttpResponse = (function () {
        function HttpResponse() {
        }
        /**
         * 轉換為JSON結果
         */
        HttpResponse.prototype.toJSON = function () {
            return JSON.parse(this.resultText || this.result);
        };
        return HttpResponse;
    }());
    Oh.HttpResponse = HttpResponse;
})(Oh || (Oh = {}));
var Oh;
(function (Oh) {
    var RestClientBuilder = (function () {
        function RestClientBuilder() {
        }
        RestClientBuilder.createMethod = function (type, func) {
            var url = type.baseUrl || "";
            if (func.method.url) {
                if (/^https?:/g.test(func.method.url)) {
                    url = func.method.url;
                }
                else {
                    url += func.method.url;
                }
            }
            var fields = func.fields.sort(function (a, b) { return a.index - b.index; });
            return new Function(fields.map(function (x) { return x.name; }).join(","), "var url = \"" + url + "\";\r\n" +
                ("var method = " + func.method.httpMethod + ";\r\n") +
                ("var fields = " + JSON.stringify(fields) + ";\r\n") +
                "var route = fields.filter(x=>x.where == Oh.ApiFieldTypes.Route);\r\n" +
                "for(var i = 0; i < route.length ; i++){\r\n" +
                "url = url.replaceAll(\"\\{\" + route[i].field + \"\\}\", eval(route[i].name));" +
                "}\r\n" +
                "var query = fields.filter(x=>x.where == Oh.ApiFieldTypes.Query).map(x=>x.field + \"=\" + encodeURIComponent(eval(x.name))).join(\"&\");\r\n" +
                "if(url.indexOf(\"?\") == -1)url += \"?\";\r\n" +
                "url += query;" +
                "var body = fields.filter(x=>x.where == Oh.ApiFieldTypes.Body);\r\n" +
                "var data = {};\r\n" +
                "for(var i = 0; i < body.length ; i++){\r\n" +
                "data[body.field] = eval(body[i].name);" +
                "}\r\n" +
                "console.log(data);\r\n" +
                "var httpClient = new Oh.HttpClient();\r\n" +
                "httpClient.withCredentials = true;\r\n" +
                "");
        };
        RestClientBuilder.createInstance = function (type) {
            var _this = this;
            var result = new type();
            Reflect.ownKeys(type.prototype) //透過反射取得此類別成員
                .filter(function (x) {
                return type.prototype[x] instanceof Function &&
                    x != 'constructor';
            }).forEach(function (x) {
                if (!result[x].method)
                    return; //必須有透過前面Decorators產生的屬性
                result[x] = _this.createMethod(result, result[x]);
            });
            return result;
        };
        return RestClientBuilder;
    }());
    Oh.RestClientBuilder = RestClientBuilder;
})(Oh || (Oh = {}));
