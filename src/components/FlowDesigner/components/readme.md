# Components

## autoCompleteWithScriptResource

這個 component 是為了讓使用者可以快速取用已建立的資源，輸入 `#` 字號觸發，透過 scriptResourceContext 取得使用者建立的資源，並將資源顯示在選單中

實際效果如下圖：

![截圖 2021-05-23 下午5.55.20](https://tva1.sinaimg.cn/large/008i3skNgy1gqsr3h8qkcj31c60tigpu.jpg)

選擇其中一個選項後：

![截圖 2021-05-23 下午5.55.28](https://tva1.sinaimg.cn/large/008i3skNgy1gqsr3w372bj31c60ti78f.jpg)

## defindVariableInput

在此 component 中新增的值都會被記錄到 scriptResourceContext 中，適合用於像是 fetch api 節點中，需要將變數儲存起來的地方，或是任何有需要透過使用者輸入然後將資源註冊到 scriptResourceContext 的場景

使用方法如下：

![截圖 2021-05-23 下午10.56.38](https://tva1.sinaimg.cn/large/008i3skNgy1gqsr5xls6oj30s80w60uw.jpg)

當使用者在 input 中填入資料，此範例為 `tokenData`，該筆資料就會被註冊到 scriptResourceContext 中