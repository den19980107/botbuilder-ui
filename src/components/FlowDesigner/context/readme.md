# Context

## scriptElementsContext

用於存放 react flow 中所有 element 的 context

## scriptResourceContext

用於存放一個腳本(script)中，使用者定義的`資源`

### 資源：

* flowVariable：在同一流程中定義的變數且只能在同一流程中取用
* scriptVariable：在同一腳本中定義的變數且只能在同一腳本中的所有流程中取用
* route：使用者透過 `webhook` 節點建立的所有 route
* table：使用者建立的資料表
* script：使用者建立的腳本

### 目的：

希望使用者在輸入匡中可以快速取得已經建立好的資源，如下圖，輸入 `#` 字號之後會顯示所有資源，並達成 auto complete 的效果

![截圖 2021-05-23 下午5.55.20](https://tva1.sinaimg.cn/large/008i3skNgy1gqsqyj058cj31c60tigpu.jpg)