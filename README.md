Oh.js
=====

本專案採AOP實作針對typescript的REST Client

## 演示
### 
```typescript
@apiBase("https://api.github.com/users/{user}/")
class Test {
    @apiMethod({ url : "repos" })
    public repos(
        @apiField({ where : ApiFieldTypes.Route }) user: number,
        @apiField() page:number) {}
}

var githubApi = Oh.RestClientBuilder.createInstance(Test);
githubApi.repos("XuPeiYao",1).then((x) => {
  console.log(x.toJSON());
});
```
