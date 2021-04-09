## Float Panel

畫面中匡起來的區塊：

![截圖 2021-03-30 下午5.38.26](https://tva1.sinaimg.cn/large/008eGmZEgy1gp22ifuc9mj31ha0qbmzg.jpg)

負責顯示及編輯節點內容

### layout

float panel 中顯示的內容定義在 /layout 這個資料夾中，代表的是當點擊此節點時，要顯示此節點可以編輯的內容

每個 layout 都應該包含三個參數

1. onChange: 當使用者編輯完成後，按下確定時需要將資料由 onChange 這個 function 送到 `floatPanel` 這個 component 來處理

2. onDelete: 當使用者點擊刪除按鈕時，透過 onDelete 來告訴 `floatPanel` 要刪除此節點，不需要傳入此節點的 id，因為目前選中的節點是由 `flowElementsContext` 來做統一管理

3. payload: 傳入要給此 layout 顯示的內容，格式根據不同 layout 而定