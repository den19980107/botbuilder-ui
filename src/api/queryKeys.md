## Query Keys

這邊會定義所有 react query 的 key

### 使用方式：

https://react-query.tanstack.com/guides/query-keys

query key 是react query 中的一個機制，如果我們 fetch 一個 api 並用 useQuery 來使用

react query 會將結果存在我們 useQuery 時給的那個 key 上

以下面的例子就是 `todos`

``` javascript

 // A list of todos
 useQuery('todos', ...) // queryKey === ['todos']

```

如果之後需要重新 fetch 資料，或是把這個 key 儲存的資料清空

可以用

``` javascript
// 清空資料
queryClient.removeQueries("todos");
// 重新 fetch
queryClient.invalidateQueries("todos")
```

所以這個檔案的目的是為了統一管理這些 key 避免不小心誤用
