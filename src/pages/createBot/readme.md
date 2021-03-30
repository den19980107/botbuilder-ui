## create bot page 說明

這邊介面大致長這樣
![截圖 2021-03-30 上午12.53.28](https://tva1.sinaimg.cn/large/008eGmZEgy1gp19itz3dwj30zi0lpabp.jpg)

主要由三個 component 組成

1. SideBar 在頁面最右邊，負責列出所有可用的 node 讓使用者可以用拖拉的方式放到流程圖中

2. Flow Chart 在頁面中間，主要負責顯示與編輯流程圖

3. Float Bar 浮在 Flow Chart 上，當使用者點擊任一個節點時會出現，可供使用者編輯節點功能

下面是這些 component 的巢狀結構：
![截圖 2021-03-30 上午12.58.37](https://tva1.sinaimg.cn/large/008eGmZEgy1gp19lmnd2yj30qe0f1gm4.jpg)


## flowElementsContext

需要使用 react context 來讓這些 SideBar、Flow Chart、Float Bar 都能存取到節點得資料

裡面定義了三個狀態

1. currentDragElement: 記錄目前從 sideBar 拖入 flow chat 的節點訊息，side bar 那邊會先定義好這個節點的`預設`基本資訊，拖入後就可以透過 currentDragElement 來取得該節點的`預設`資料

2. currentSelectElement: 記錄目前在 flow chart 中選中的節點，可讓 float bar 取得被選中節點的資料
 
3. elements: 紀錄 flow chart 中所有的節點，需要更新節點時都是使用這個