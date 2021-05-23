## createId.ts

這裡面有兩個方法 `createEdgeId` 和 `createNodeId`，當使用者拖拉節點進畫面的時候會使用 `createNodeId` 來產生該節點的 id，當使用者將節點連再一起時，會使用 `createEdgeId` 來產生`線`的 id


## useScriptResourceRegister.tsx

這是一個 hook，使用其中的方法 `registerVariableToContext` 可以將 `資源` 註冊到 `scriptResourceContext` 中

傳入的參數有：
* nodeId：節點 id
* value：`資源`的名稱
* type：要註冊到哪個資源中
