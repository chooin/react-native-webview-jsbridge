# react-native-webview-jsbridge

### 如何安装

``` sh
yarn add react-native-webview-jsbridge
```


### 浏览器端使用

``` js
import 'react-native-webview-jsbridge';
```

#### 方法

``` js
window.webViewBridge.invoke(Object object)
```

#### 参数

Object object

| 属性         | 类型       | 默认值 | 必填 | 说明                       |
|------------|----------|-----|----|--------------------------|
| targetFunc | string   |     | 是  | React Native 对应的方法       |
| success    | function |     | 否  | 接口调用成功的回调函数              |
| fail       | function |     | 否  | 接口调用失败的回调函数              |
| complete   | function |     | 否  | 接口调用结束的回调函数（调用成功、失败都会执行） |

### React Native 中使用

``` js
// TODO
```
