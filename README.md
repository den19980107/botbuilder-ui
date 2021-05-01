# BotBuilder UI

## Intro：

BotBuilder 由三個專案組成

[BotBuilder](https://github.com/den19980107/BotBuilder): botbuilder 的後端，由 node.js express.js mongodb 組成

[botbuilder-ui](https://github.com/den19980107/botbuilder-ui): botbuilder 的前端，由 react 組成

[Botbuilder.Share](https://github.com/den19980107/Botbuilder.Share): 用來共享前後端的 typing

## 介面：

![截圖 2021-05-01 下午10.48.38](https://tva1.sinaimg.cn/large/008i3skNgy1gq3bfpog3fj31ka0u0113.jpg)

![截圖 2021-05-01 下午10.53.54](https://tva1.sinaimg.cn/large/008i3skNgy1gq3bg2145fj31ka0u0n26.jpg)

## 功能介紹：

此專案是一個流程設計軟體，目的是讓使用者可以在不需要會寫程式的情況下，透過拖拉節點的方式將所需要的功能以流程圖的方式組合出來。

### 節點：

在這個專案中，每個節點代表一個小功能，使用者可以透過組合這些小節點來完成自己想要的功能

節點清單：

* 判斷條件

  提供 condition、operator、operant，判斷的模式大致如下

  if `operant` `operator` `condition` === true ? `DO TRUE` : `DO FALSE`

  ![截圖 2021-05-01 下午11.02.29](https://tva1.sinaimg.cn/large/008i3skNgy1gq3boxoam9j31l00u0aft.jpg)

* 建立 API

  提供使用者建立自己的 endpoint 來當作一個觸發事件。

  Api 的 prefix 會是 [bot builder domain]/[user name]/[使用者自己取的 endpoint]，並且可以指定 http method 和 body 存放的位置

  ![截圖 2021-05-01 下午11.06.47](https://tva1.sinaimg.cn/large/008i3skNgy1gq3btfdxinj31l00u0dme.jpg)

* 呼叫 API

  此節點可以呼叫外部 API 並設定回傳資料存在哪個變數中

  ![截圖 2021-05-01 下午11.08.26](https://tva1.sinaimg.cn/large/008i3skNgy1gq3bv7oxp1j31l00u0n35.jpg)

* 傳送 response

  當一個流程是由使用者建立的 API 開始觸發時，在結束時可透過傳送 response 來讓外部呼叫此 api 的人了解此項請求的狀態

  ![截圖 2021-05-01 下午11.09.27](https://tva1.sinaimg.cn/large/008i3skNgy1gq3bwdbu01j31l00u00zb.jpg)

* 插入一行資料

  bot builder 提供使用者自行建立資料表，建立完資料表後，在流程內可新增一行資料到該資料表中。選擇資料表後，下方會顯示該資料表的所有欄位，根據相對應的欄位輸入想要 insert 的資料即可

  ![截圖 2021-05-01 下午11.11.45](https://tva1.sinaimg.cn/large/008i3skNgy1gq3bym0mjvj31l00u0q9g.jpg)

* 排程：

  使用者可以設定從什麼時候開始到什麼時候結束，每天的幾點幾分，並在禮拜幾會執行來當作觸發條件

  ![截圖 2021-05-01 下午11.13.10](https://tva1.sinaimg.cn/large/008i3skNgy1gq3c0a8x5yj31l00u0tfd.jpg)

### 流程：

在一個機器人中，由多個節點串連而成的稱之為流程

![截圖 2021-05-01 下午11.15.17](https://tva1.sinaimg.cn/large/008i3skNgy1gq3c3787y7j31l00u0gt6.jpg)

### 機器人：

由多個流程組合而成的稱之為一個機器人