// TODO 之後跟後端的 constant 看有沒有辦法共用
enum NodeType {
    WEB_HOOK = "WEB_HOOK",
    FETCH_DATA = "FETCH_DATA",
    DECLAR_VARIABLE = "DECLAR_VARIABLE",
    CONDITION = "CONDITION",
    LOOP = "LOOP",
    BASIC_CACULATION = "BASIC_CACULATION",
    HTTP_RESPONSE = "HTTP_RESPONSE",
    TIMER = "TIMER",
    DELAY = "DELAY",
    SEND_EMAIL = "SEND_EMAIL",
    HTML_RESPONSE = "HTML_RESPONSE"
}

export default NodeType