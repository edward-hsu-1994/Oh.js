module Oh {
    /**
     * Http請求客戶端物件
     */
    export class HttpClient {
        /**
         * 預設Request標頭
         */
        public requestHeader: any = null;

        /**
         * 是否包含認證
         */
        public withCredentials: boolean = false;

        /**
         * 進度回呼
         */
        public progressCallback: (event: ProgressEvent) => any;

        /**
         * 使用者帳號
         */
        public user: string;

        /**
         * 使用者密碼
         */
        public password: string;

        private typeOf(obj: any): string {
            if (!obj) return obj;
            return obj.constructor.name;
        }

        private async openAndSend(method: string, url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
            return new Promise<HttpResponse>((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                //#region 事件與屬性
                xhr.withCredentials = this.withCredentials;
                xhr.onprogress = progressCallback || this.progressCallback;
                xhr.onreadystatechange = function (event) {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var result = new HttpResponse();
                        result.header = xhr.getAllResponseHeaders();
                        result.statusCode = xhr.status;
                        result.resultType = xhr.responseType;
                        result.resultText = xhr.responseText;
                        result.resultXML = xhr.responseXML;
                        result.result = xhr.response;
                        resolve(result);
                    } else {
                        reject(xhr.statusText);
                    }
                };
                //#endregion

                if (method == "GET" || method == "DELETE") {
                    var params = new Array<string>();
                    for (var key in data) params.push(`${key}=${encodeURIComponent(data[key])}`);
                    url += "?" + params.join("&");
                }
                xhr.open(method, url, true, user || this.user, password || this.password);

                //#region 設定Header
                if (this.requestHeader) for (var key in this.requestHeader) xhr.setRequestHeader(key, this.requestHeader[key]);
                if (header) for (var key in header) xhr.setRequestHeader(key, header[key]);
                //#endregion

                if (data) {
                    if (data instanceof FormData || this.typeOf(data) == 'String') {
                        xhr.send(data);
                    } else {
                        if (method == "GET" || method == "DELETE") {
                            xhr.send();
                        } else if (new FormData()['fake']) {//polyfill項目
                            var qString = "";
                            for (var key in data) {
                                if (data[key] instanceof Function) continue;
                                qString += "&" + key + "=" + encodeURIComponent(data[key]);
                            }
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                            xhr.send(qString.substring(1));
                        } else {
                            var formdata: FormData = new FormData();
                            for (var key in data) {
                                if (data[key] instanceof Function) continue;
                                formdata.append(key, data[key]);
                            }
                            xhr.send(formdata);
                        }
                    }
                } else {
                    xhr.send();
                }
            });
        }

        /**
         * GET
         * @param url 網址
         * @param header 標頭 
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        public async getAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
            return await this.openAndSend('GET', url, header, data, user, password, progressCallback);
        }

        /**
         * POST
         * @param url 網址
         * @param header 標頭 
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        public async postAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
            return await this.openAndSend('POST', url, header, data, user, password, progressCallback);
        }

        /**
         * PUT
         * @param url 網址
         * @param header 標頭 
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        public async putAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
            return await this.openAndSend('PUT', url, header, data, user, password, progressCallback);
        }

        /**
         * DELETE
         * @param url 網址
         * @param header 標頭 
         * @param data 資料
         * @param user 使用者帳號
         * @param password 使用者密碼
         * @param progressCallback 進度回呼
         */
        public async deleteAsync(url: string, header?: any, data?: (FormData | String | Object), user?: string, password?: string, progressCallback?: (event: ProgressEvent) => any): Promise<HttpResponse> {
            return await this.openAndSend('DELETE', url, header, data, user, password, progressCallback);
        }
    }

    /**
     * HttpClient結果
     */
    export class HttpResponse {
        /**
         * 狀態碼 
         */
        public statusCode: number;

        /**
         * Response標頭
         */
        public header: any;

        /**
         * 結果類型
         */
        public resultType: string;

        /**
         * 結果文字
         */
        public resultText: string;

        /**
         * 結果XML
         */
        public resultXML: Document;

        /**
         * 結果
         */
        public result: any;

        /**
         * 轉換為JSON結果
         */
        public toJSON(): JSON {
            return JSON.parse(this.resultText || this.result);
        }
    }
}