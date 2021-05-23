# FlowDesigner

## flowDesigner

... 待補

## reactFlowContainer

... 待補

## sideBar

整個 flow designer 右邊的區塊，負責將支援的所有節點列在這邊

![截圖 2021-05-23 下午11.10.34](https://tva1.sinaimg.cn/large/008i3skNgy1gqsrkejojwj31gp0u045o.jpg)

### 新增節點

在 sideBar.tsx 中有一個變數叫 node，是一個陣列，在這個陣列中新增加一筆類型為 `node` 的資料即可新增一個節點到 sideBar 上

```jsx
const Nodes: node[] = [
    {
        label: "🧑‍⚖️ 判斷條件",
        nodeType: NodeType.CONDITION,
        reactFlowNodeType: "condition",
        needToRegister: [],
        payload: {
        }
    }
    ...
]
```

### node

為節點的型態，裡面包含幾個屬性：

* label：此節點的標籤，會顯示在流程圖中

  ![截圖 2021-05-23 下午11.15.22](https://tva1.sinaimg.cn/large/008i3skNgy1gqsrp5nuetj30be02sgln.jpg)

* nodeType：此節點的類型，代表此節點的功能，類型定義在 [botbuilder.share](https://github.com/den19980107/Botbuilder.Share/blob/master/src/constants/nodeType.constants.ts) 中，根據此類型 botbuilder 後端才能判斷要生產什麼樣的節點到節點池中

* reactFlowNodeType：用來定義節點的外觀，節點的外觀定義在 FlowDesigner/customNodes 中，例如：

  * event：

    ![截圖 2021-05-23 下午11.19.05](https://tva1.sinaimg.cn/large/008i3skNgy1gqsrszufgzj30da042dg2.jpg)

  * process：

    ![截圖 2021-05-23 下午11.19.54](https://tva1.sinaimg.cn/large/008i3skNgy1gqsrtwecgyj30bo032jrh.jpg)

  * result：

    ![截圖 2021-05-23 下午11.20.31](https://tva1.sinaimg.cn/large/008i3skNgy1gqsrujf8q2j30bo032jre.jpg)

  等等。

* needToRegister：為一個陣列，內容型態為字串，此變數的目的是在剛載入 ReactFlowDesigner 時，需要檢查這些節點內有沒有使用者新增的資源，需要將該資源註冊到 `scriptResourceContext` 中，裡面要填入的值為 payload 中有新增資源的欄位

  例如：

  user 新增了一個 webhook 節點，讓使用者可以將資料以 `post` 的方式傳上來，並且使用者想要將 post 上來的 body 內容儲存在一個叫 `postData` 的變數中，這個 postData 就是資源

  我們可以來看一下 webhook 節點的 [payload 定義](https://github.com/den19980107/Botbuilder.Share/blob/master/src/nodePayload/webhook.node.payload.ts)

  ```typescript
  export interface WebHookNodePayload {
      userId: string;
      route: string;
      method: string;
      storeBodyAt: string
  }
  ```

  將 post 上來的 body 內容儲存到變數的欄位為 `storeBodyAt`，所以我們 needToRegister 內的內容就應該填

  ```javascript
  needToRegister:["storeBodyAt"]
  ```

* payload：為節點所儲存的資料，這邊預設都為空物件，如果有需要幫欄位設定預設值，可以在 payload 中相對應的欄位輸入資料，如

  ```
  payload:{
      userId: "user-1";
      route: "/defaultRoute";
      method: "post";
      storeBodyAt: "DATA"
  }
  ```

  
