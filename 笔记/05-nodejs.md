#### 1009

1.global作为nodejs的顶层对象（在nodejs环境运行）,global可以省略

```js
// console.log(global.process);
// console.log(global.Buffer);
console.log(Buffer);
```

nodejs中没有window对象

```js
console.log(window)
//ReferenceError: window is not defined
```

setImmediate:立即执行函数，异步代码，当同步代码执行完成后会立即调用

```js
setImmediate(() => {
    console.log("Immediate");
})
```

queueMicrotask:异步代码 这个是语义化的微任务设置 立即执行函数

```js
queueMicrotask(() => {
    console.log("queueMicrotask")
})
```

process.nextTick:立即执行函数，也是一个微任务。但是优先一切异步代码执行。当同步代码执行完成直接就执行nextTick

```js
process.nextTick(() => {
    console.log("nextTick")
})
```

2. **nodeJS的事件轮询：**

​        1.nodeJS使用了第三方库libuv，nodeJS会把一些异步操作（I/O、文件的读写）交给libuv处理。nodejs的主线程没有必要等待，可以继续处理其他事情。

​        2.libuv会开启多个线程去执行这些异步操作，当异步代码操作完毕以后，会把回调函数放到回调队列中，主线程在同步代码执行完成的时候回去轮询回调队列。

​        3.nodeJs把异步代码分为了两大类，分别是微任务和宏任务。微任务优先宏任务执行。

​        4.宏任务也是根据异步代码不同，而产生多种回调队列，nodejs会依次轮询这几个回调队列：timers、pendding callback、idle、poll、check、close

**3.宏任务的轮询顺序**

​        1.timers阶段：处理setTimeout和setInterval的回调函数

​        2.pedding阶段：处理系统级别操作的回调函数

​        3.idle阶段：处理nodejs内部的回调函数

​        4.poll阶段：处理I/O或者网络请求等异步操作的回调函数

​            - 当poll阶段不为空的时候，那么执行完回调函数，就继续执行下个阶段check了

​            - 当poll阶段为空，会一直等待poll中有其他的回调函数

​                - 当时当 timer阶段的计时器到期了，或者check阶段有setImmediate等待执行的时候，会直接跳入check阶段

​        5.check阶段：setImmediate的回调函数

​        6.close阶段：执行一些关闭的函数宏任务的轮询顺序

   **4  微任务和宏任务：**

​        1.nodejs把所有的异步操作代码分为了微任务代码和宏任务代码

​        2.nodejs会优先执行微任务代码，然后才执行宏任务代码

​        3.微任务：process.nextTick，Promise的then\catch\finally、queueMicrotask

​        4.process.nextTick一定是最先执行，其他微任务根据书写代码依次执行

​        5.在宏任务每次执行下一个阶段之前，都会去检查微任务队列中是否有微任务需要执行，然后才会执行下一个阶段

**5.nodejs模块化的暴露和引入**

在CommonJS模块规范中，一个文件就是一个模块，并通过`module.exports`和`exports`两种方式来暴露模块中的变量或函数。通过`require`方法来引入模块。

### [4.2 module.exports](http://doc.lipeihua.vip:8800/#/./NodeJS/02.NodeJS%E6%A8%A1%E5%9D%97%E5%8C%96?id=_42-moduleexports)

- module.exports 对象是由模块系统创建的，表示当前文件对外输出的接口。
- `module.exports`就是模块暴露的本质

### [4.3 exports](http://doc.lipeihua.vip:8800/#/./NodeJS/02.NodeJS%E6%A8%A1%E5%9D%97%E5%8C%96?id=_43-exports)

- 为了方便，Node为每个模块提供一个exports变量，指向module.exports，例如： `module.exports.fun = …`，相当于`exports.fun = ...`
- 但注意，不能将一个值赋值给`exports`，而是使用`exports.XXX`来暴露。否则这样它将不再绑定到`module.exports`。如果exports导出的变量类型是引用类型如函数，则会断开与`module.exports`的地址指向，导致变量导出失败。因为最终还是要靠`module.exports`来导出变量的

### [4.4 module.exports和exports的使用](http://doc.lipeihua.vip:8800/#/./NodeJS/02.NodeJS%E6%A8%A1%E5%9D%97%E5%8C%96?id=_44-moduleexports%e5%92%8cexports%e7%9a%84%e4%bd%bf%e7%94%a8)

- 如果模块内部只有一个功能需要暴露，通常使用module.exports = XXX

- 如果模块内部有多个功能需要暴露：这两种都可以书写

  

  - 入口文件 index.js  main.j

  -  有三种模块：自定义模块、第三方模块、nodejs模块

    ```js
    //引入自定义模块，直接书写路径，可以省略后缀
    const add = require("./add");
    console.log(add(1,3));
    //引入nodejs自有模块
    const fs=require('fs');
    console.log(fs);
    const os = require('os');
    const mem = os.freemem() / os.totalmem() * 100;
    console.log(`内存占⽤用率${mem.toFixed(2)}%`);
    //引入第三方模块
    const {
        JSDOM
    } = require("jsdom");

    const {
        window
    } = new JSDOM("");
    const $ = require("jquery")(window);
    console.log($.each);
    ```

  -  使用require方法来引入模块,其实引入的是module.exports所代表的对象

  - 在使用引入模块的时候，一定要清晰的知道当前的模块是怎么暴露的

    ```js
    function add(...rest){
        return rest.reduce((p,c)=> p+c,0)
    }
    module.exports=add;
    function mins(a,b){
        return a-b;
    }
    module.exports=mins;

    const add=require('./add');
    console.log(add(1,2,3,4));
    const mins=require('./mins');
    console.log(mins(4,1));
    ```

#### 1010

module对象的exports对象就是模块暴露的对象.exports  引用地址指向了 module.exports

**1.在nodejs中，每个js都包裹了一层函数**

```js
console.log(arguments.callee.toString());
/* 
    外层自动包裹的函数：
    function (exports, require, module, __filename, __dirname) {
    }
    exports：指向的是暴露对象module.exports
    require: 引入
    module：module对象
    __dirname:文件夹绝对路径
    __filename：文件的绝对路径
*/
```

**2包管理器**

- 通过NPM可以对Node的包进行搜索、下载、安装、删除、上传

- NPM的常用指令：

  - npm -v ：查看npm的版本

  - **npm ini**t：初始化项目的package.json文件

  - npm init -y 初始化一个默认配置package.json

    npm i 安装

    npm r 删除​

cnpm直接安装:`npm install -g cnpm --registry=https://registry.npm.taobao.org`

**yarn的安装npm install yarn -g**

**常用命令**

yarn add

- yarn --version
- yarn init //生成package.json ！！！注意生成的包名不能有中文，大写
- yarn add global package (全局安装)
- yarn add package (局部安装)
- **yarn add** package --dev (相当于npm中的--save-dev)
- **yarn remove** package
- yarn 下载所有包


- yarn引用npm的仓库，因为‘墙’的存在，可能会导致下载不了或速度很慢的情况，所以需要引入cyarn（淘宝镜像）
- 直接安装cyarn：`npm install cyarn -g --registry https://registry.npm.taobao.org` 配置后，只需将yarn改为cyarn使用即可
- 修改npm仓库地址：`yarn config set registry https://registry.npm.taobao.org/`

**3.Buffer**

Buffer是一个和数组类似的对象，不同是Buffer是专门用来保存二进制数据的。Buffer 类在全局作用域中，可以直接使用，性能较好。

 1字节 1byte ---> 8位(00000000--11111111) 8bit

1个英文字母符号 -- 1字节

 1个汉字        -- 3字节

```js
//Buffer.alloc在内存中开辟一块干净的区域，长度固定，如果没有填充内容，则区域保存的都是0  
//打印显示的时候 显示的是十六进制数据
const buf=Buffer.alloc(10,'dabaitu');
console.log(buf);//<Buffer 64 61 62 61 69 74 75 64 61 62>
console.log(buf.toString());//dabaitudab
```

```js
//Buffer.allocUnsafe去内存中找一个空间（这个空间可能还没有被清理干净）
 const buf2=Buffer.allocUnsafe(10);
 console.log(buf2);//<Buffer 00 45 52 52 00 55 4e 4b 4e 4f>
 console.log(buf2.toString());// ERR UNKNO
```

```js
const buf3=Buffer.from('dabaitu');
 console.log(buf3);//<Buffer 64 61 62 61 69 74 75>
 console.log(buf3.toString());//dabaitu
buf3.forEach((item,index)=>{
     console.log(item);
 })
```

**4process**:不需要require引入  负责进程相关的东西

```js
/* //启动命令：node 02.process.js -hello
    //获取启动命令的 node路径 和 文件路径  启动命令的其他值
    [
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\lipeihua\\Desktop\\nice0721\\day02\\08.process.js',
    '-hello'
    ]
*/
console.log(process.argv);
if (process.argv.includes("-hello")) {
    console.log("欢迎光临");//欢迎光临
} else if (process.argv.includes("-world")) {
    console.log("滚")
}
console.log(process.argv0);//C:\node.exe

//cwd返回当前 node 的工作目录
console.log(process.cwd());//C:\Users\Lenovo\Desktop\node
console.log(__dirname);//C:\Users\Lenovo\Desktop\node
```

**5path模块主要负责处理路径 需要require引入**

path.resolve([...paths]) 方法将路径或路径片段的序列解析为绝对路径

```js
//path模块主要负责处理路径 需要require引入
const path = require("path");
//没有参数的时候，默认是当前文件夹所在绝对路径
const filePath=path.resolve('./test','../txt/hello');
console.log(filePath);//C:\Users\Lenovo\Desktop\node\txt\hello
//获取兄弟6文件的绝对路径
const filePath2=path.resolve(__dirname,'./6.process.js');
console.log(filePath2);//C:\Users\Lenovo\Desktop\node\6.process.js
```

**6fs文件系统**

fs文件系统就是对计算机中的文件进行增删改查等操作。它是一个服务器的基础，在Node中通过fs模块来操作文件系统。

1.同步打开文件

openSync:返回值就是打开的文件标识

 flags:

​        'a': 打开文件用于追加。 如果文件不存在，则创建该文件。

​        'r': 打开文件用于读取。 如果文件不存在，则会发生异常

​        'w': 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件

```js
const fs=require('fs');
//console.log(fs);
const path=require('path');
//获取被写入文件的路径 //绝对路径
const filePath=path.resolve(__dirname,'./1.txt');
const fd=fs.openSync(filePath,'a');//文件标识
console.log(fd);//文件标识
fs.writeSync(fd,'dabaitu');
fs.closeSync(fd);
```

2异步打开文件

```js
function openFile(){
    return new Promise((resolve,reject)=>{
        fs.open(filePath,"a",(err,fd)=>{
            if(err){
                reject(err);
            }
            resolve(fd);
        })
    })
}
function writeFile(fd){
    return new Promise((resolve,reject)=>{
        fs.write(fd,'dabaitu',(err,fd)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}
function closeFile(fd){
    return new Promise((resolve,reject)=>{
        fs.close(fd,(err,fd)=>{
            if(err){
                reject(err);
            }
            resolve();
        })
    })
}
(async()=>{
    const fd=await openFile();
    await writeFile(fd);
    await closeFile(fd);
})().then(()=>{
    console.log('cg');
}).catch((err)=>{
    console.log(err);
})

```

3promisify解决回调地狱

```js
const fs = require("fs");
const path = require("path");
const {promisify}=require('util');
const filePath = path.resolve(__dirname, "./01.txt");
const openFile=promisify(fs.open);
const writeFile=promisify(fs.write);
const closeFile=promisify(fs.close);
const fn=async()=>{
    const fd=await openFile(filePath,'a');
    await writeFile(fd,'dabaitu');
    await closeFile(fd);
}
fn().then(()=>{
    console.log('cg');
}).catch((err)=>{
    console.log(err);
})
```

4简单写入读取

```js
const fs = require("fs");
const path = require("path");

//获取被写入文件的路径
const filePath = path.resolve(__dirname, "./01.txt");
fs.writeFile(filePath,'dabaitu',{
    flag:'a'
},(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('快速写入成功');
})

fs.readFile(filePath,(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
    console.log(data.toString());
})
```

#### 1012

**1.流式读写**

```js
const fs=require('fs');
const path=require('path');
const writeFile=path.resolve(__dirname,'./18.mp4');
const readFile=`C:\\Users\\Lenovo\\Desktop\\day28-nodeJS\\02.可写流.mp4`;
const ws=fs.createWriteStream(writeFile);
const rs=fs.createReadStream(readFile);
//rs的data事件就是用来消费可读流的 每次读取的事件
//chunk就是每次读取的64kb的数据
rs.on('data',(chunk)=>{
    //console.log(chunk.toString());
    ws.write(chunk);
})
//读取完成后end事件触发 关闭
rs.on('end',()=>{
    console.log('关闭了');
})
```

**2快速读写**

```js
const fs=require('fs');
const path=require('path');
//拼接路径
const readFile='C:\\Users\\Lenovo\\Desktop\\day28-nodeJS\\02.可写流.mp4';
const writeFile=path.resolve(__dirname,'./a.mp4');
const rs=fs.createReadStream(readFile);
const ws=fs.createWriteStream(writeFile);
//pipe方法就是管道  可以直接把可读流通过管道写入可写流
rs.pipe(ws);
```

**3事件触发器**

```js
//引入events模块
const EventEmitter=require('events');
//自定义一个类 继承引入的类
class MyEmitter extends EventEmitter{}
//因为模块返回的是一个类，需要实例化才能使用
const myEmitter=new MyEmitter();
//实例化对象有on方法 可以定义一个事件
/* myEmitter.on('hello',()=>{
    console.log('hello world');
}) */
//实例化对象有once方法
myEmitter.once('hello',()=>{
    console.log('hello world');
})
//实例化对象一个emit方法，可以触发自定义事件
//myEmitter.emit('hello');
setTimeout(()=>{
    myEmitter.emit('hello');
},2000);
```

**4crypto加密**

`crypto` 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。使用 `require('crypto')` 来访问该模块。

```js
//引入加密模块
const crypto=require('crypto');
//假设拿到了加密的信息
let secret='xcy1120';
//给明文信息加点东西
secret +='nice';
//使用createHmac可以生成HMAC对象  参数是加密方式和明文
const hmac=crypto.createHmac('MD5',secret);
//通过digest可以把HMAC转换为16进制显示或保存
const mySecret=hmac.digest('hex');
console.log(mySecret);
//可以再次加密
const hmac2=crypto.createHmac('sha256',mySecret);
const mySecret2=hmac2.digest('hex');
console.log(mySecret2);
```

**5node服务器搭建**

```js
const http=require('http');
/* const fs=require('fs');
const path=require('path');
const filePath=path.resolve(__dirname,'./liuwer/index.html');
const rs=fs.createReadStream(filePath); */

const server=http.createServer((request,response)=>{
    //响应头中的数据格式
    response.setHeader('Content-Type','text/html;charset=utf-8');
    //响应
    response.end('<h1>经年留影</h1>');
})
const port=3000;
const host='192.168.20.41';
server.listen(port,host,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://${host}:${port}`);
})
```

**node 服务器补充**

```js
const http = require("http");
//querystring库可以处理查询字符串为对象
const qs=require('querystring');


const server = http.createServer((request, response) => {
    /* //获取用户get请求发送过来的数据
    const resulte = request.url.split("?")[1].split("&").reduce((p, c) => {
        const [key, value] = c.split("=");
        p[key] = value;
        return p;
    }, {})
    console.log(resulte); */
    //处理favicon的请求
    if(request.url==='/favicon.ico')return response.end();
    //得到请求地址
    console.log(request.url);
     //得到请求方式
    console.log(request.method);
   const re=qs.parse(request.url.split('?')[1]);
    console.log(re);

    //在返回相应之前，需要设置响应头中的数据格式
    response.setHeader("Content-Type", "text/plain;charset=utf-8")
    //返回相应
    response.end("<h1>湖人总冠军</h1>");
})


const port = 3000;
const host = "localhost";
server.listen(port, host, (err) => {
    if (err) {
        console.log("服务器启动失败：" + err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://${host}:${port}`)
})
```

**6node作为客户端**

```js
const http=require('http');
const url='http://192.168.20.41:3000/';
//创建一个客户端
//request方法可以创建一个客户端，两个参数：请求的地址、请求的回调函数，回调函数中的形参是req响应
const req=http.request(url,(req)=>{
    console.log(req.statusCode);
    //接受请求数据
    let str='';
    req.on('data',(chunk)=>{
        str+=chunk.toString();
        console.log(str);
    })
})
//发送请求
req.end();
```

**7http协议**

1.协议就是：在网络通信中，两台计算机必须准守的规则或者规定。

​    2.http协议就是：超文本传输协议。在万维网中，服务器向浏览器传递超文本的时候准守的协议。

​    3.在客户端和服务端互传的信息称作为报文，http协议规定了报文的格式。服务端响应的报文称作为响应报文，客户端发送的报文称作为请求报文

```js
GET响应报文：
        响应报文首行
            HTTP/1.1 200 OK
            - HTTP/1.1：协议版本
            - 200 响应状态码
            - OK 响应状态信息

        响应报文头部
            - 响应报文的内容格式及字符编码
            Content-Type: text/html;charset=utf-8

            - 响应的时间
            Date: Mon, 12 Oct 2020 08:31:37 GMT

            - 可以保持长连接
            Connection: keep-alive

            - 长连接的保持时间
            Keep-Alive: timeout=5

            - 响应内容的字节长度
            Content-Length: 24

        响应报文空行

        响应报文体
            <h1>湖人总冠军</h1>
```

```js
POST请求报文：
        请求报文首行
            POST http://192.168.20.25:3000/ HTTP/1.1
        
        请求报文头部
            Host: 192.168.20.25:3000
            Connection: keep-alive
            - 请求数据的字节长度
            Content-Length: 25
            Cache-Control: max-age=0
            Upgrade-Insecure-Requests: 1
            Origin: null
            - 请求的MIME类型 form表单请求
            Content-Type: application/x-www-form-urlencoded
            User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36
            Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,
              ;q=0.8,application/signed-exchange;v=b3;q=0.9
            Accept-Encoding: gzip, deflate
            Accept-Language: zh,zh-TW;q=0.9,en-US;q=0.8,en;q=0.7
        请求报文空行

        请求报文体
            user=lipeihua&pass=123456


    POST的响应报文
        HTTP/1.1 200 OK
        Content-Type: text/html;charset=utf-8
        Date: Mon, 12 Oct 2020 08:39:32 GMT
        Connection: keep-alive
        Keep-Alive: timeout=5
        Content-Length: 24

        <h1>湖人总冠军</h1>
```

#### 1013

#### 请求方式及解析

​	1.GET请求（查）

​            用于请求指定的页面信息，并返回一个实体

​            数据会在url地址上边发送（查询字符串 queryString）

​        2.POST(增)

​            - 向指定的资源提交数据进行处理（登录注册）

​            - 数据会在报文体中发送

​        3.PUT(改)

​            - 更改服务器数据

​            - 发送文件

​        

​        4.DELETE(删)

​            - 删除指定的数据

​        5.OPTIONS（预检）

​	-提前检查服务器支持的请求类型

#### MIME类型：

       text/plain   文本
        text/css     css
        text/html    html
        application/javascript    js
        application/x-www-form-urlencoded   form表单类型
        application/json   json
       	image/gif
        image/jpeg
        image/png
        image/webp
        image/svg+xml
        audio/mp3
        video/mp4

#### 响应状态码：

​        1XX: 正在响应

​            100：请求继续，请继续发送请求

​            101：协议切换中

​        2XX: 响应成功

​            200：请求成功

​            204：请求成功，但是页面不需要任何更新

​            206：范围请求，只请求的部分资源

​        3XX: 重定向

​            301：永久重定向1

​            302：临时重定向

​            304：读取缓存

​        4XX: 客户端错误导致响应失败

​            400：请求报文中有语法错误

​            403: 服务器拒绝客户端访问

​            404：找不到资源

​        5XX: 服务器错误

​            500：服务器出现了问题

​            503：服务器正在忙

#### TCP三次握手：

​        在发送数据之前，客户端和服务端要建立连接，所谓的建立连接其实就是双方都保存有对方的信息

​        TCP三次握手的意义在于：客户端和服务端都能知道对方的接收和发送能力正常。

​        1.客户端向服务端发送数据包，服务端收到数据包，说明客户端的发送能力正常

​        2.服务端接收到数据包之后，向客户端发送数据包，客户端接收的服务端的数据包之后，说明服务端的接受和发送能力正常

​        3.客户端继续向服务端发送数据包，服务端接受到数据包之后，说明客户端的接受能力也正常

#### TCP四次挥手：

​        客户端和服务端总共要发送4个数据包，保证双方都知道对方的数据发送完毕

​        1.客户端发送数据包，表示请求数据发送完毕

​        2.服务端接受到客户端的释放信号，向客户端发送数据包，表示已经接收到客户端发送的释放信号

​        3.服务端的数据发送完毕后，会主动给客户端发送数据包，表示服务端的响应数据发送完毕

​        4.客户端向服务端发送数据包，表示收到，并同意断开连接

#### 从输入url地址到最终渲染页面，中间经历的过程：

​        1.DNS解析：解析域名得到服务器的公网IP,从而能访问服务器

​            - DNS缓存   

​                - 浏览器缓存

​                - 计算机缓存

​                - 路由器缓存

​                - 运营商缓存

​        2.TCP三次握手：建立连接，确保双方发送和接受能力正常

​        3.发送请求

​        4.服务器返回响应

​        5.渲染页面

- 解析html生成DOM树
- 解析css生产CSSOM树
- 解析js，可能会对DOM和样式修改
- 根据DOM树和CSSOM树，生成渲染树（render Tree）
- 分层：根据层叠上下文属性，将渲染树的节点进行分层
- 生成图层绘制指令
- 栅格化：将图层划分为图块
- 合成和显示

​        6.TCP四次挥手：断开连接

# 1014

# 数据库

## 第1章：数据库

### 1.1数据库是什么

数据库（DataBase）是按照数据结构来组织、存储和管理数据的仓库。

### 1.2为什么要使用数据库

我们的程序都是在内存中运行的，一旦程序运行结束或者计算机断电，程序运行中的数据都会丢失。所以我们就需要将一些程序运行的数据持久化到硬盘之中，以确保数据的安全性。而数据库就是数据持久化的最佳选择。说白了，数据库就是存储数据的仓库。

### 1.3数据库的分类

#### 1.3.1 关系型数据库（RDBS）

代表有：MySQL、Oracle、DB2、SQL Server...

特点：关系紧密，都是表

#### 1.3.2 非关系型数据库（NoSQL）

代表有：MongoDB、Redis...

特点：关系不紧密，有文档，有键值对

## 第3章：MongoDB的使用

### 3.1简介

#### 3.1.1数据库（database）

数据库是一个仓库，在仓库中可以存放集合。

#### 3.1.2集合（collection）

集合类似于JS中的数组，在集合中可以存放文档。

说白了，集合就是一组文档。

#### 3.1.3文档（document）

文档数据库中的最小单位，我们存储和操作的内容都是文档。

类似于JS中的对象，在MongoDB中每一条数据都是一个文档。

### 基本命令使用

```js
//使用某一个数据库
use test
//向数据库中的集合插入 students 表，并插入数据
db.students.insert({name:"xiaoli",age:30})
//向students中插入多条数据
db.students.insert([{name:"xiaowang",age:18},{name:"xiaoli",age:20}])
//查看表内容
db.students.find()
//查找name是小王的数据
db.students.find({name:"xiaowang"})

//操作符 $gt $gte $lt $lte $ne $in
//查找年龄大于等于10岁的
db.students.find({age:{ $gte:10}})
//查找id
db.students.find({_id:ObjectId("5f843fece4bf9e0d1d3af77c")})
//查找年龄18 或者姓名是小王的数据
db.students.find({$or:[{age:18},{name:"xiaowang"}]})
//查找年龄是18或者年龄是20的
db.students.find({$or:[{age:18},{age:20}]})
//查找年龄是18或者20的
db.students.find({age:{$in:[18,20]}})
//查找姓名是以xiao为开头的数据
db.students.find({name:/^xiao/})
//使用$where查找数据
db.students.find({$where:function(){
	return this.age === 18 || this.age ===20;
}})

//过滤：查找全部，只显示id和name
db.students.find({},{name:1})
//过滤：查找全部，只显示name
db.students.find({},{name:1,_id:0})
//过滤：查找全部，不显示age
db.students.find({},{age:0})

//查找满足条件的第一个
db.students.findOne({age:18})

//updateOne更新某条数据，（查找条件,新的文档） $set是设置
db.students.updateOne({name:"xiaowang"},{$set:{age:1}})
db.students.find({name:"xiaowang"})

//更新所有 年龄都加1  $inc是增加
db.students.updateMany({},{$inc:{age:1}})
db.students.find()

db.students.deleteOne({age:2})
db.students.find({age:2})
```

## 第4章：Mongoose的使用

### 4.1简介

Mongoose是一个对象文档模型（ODM）库，它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。

### **4.3核心对象**

#### **4.3.1 Schema**

模式对象，通过Schema可以对集合进行约束

#### **4.3.2 Model**

模型对象，相当于数据库中的集合，通过该对象可以对集合进行操作

#### **4.3.3 Document**

文档对象，它和数据库中的文档相对应，通过它可以读取文档的信息，也可以对文档进行各种操作

### **4.4使用**

#### **4.4.1连接数据库**

1) 下载安装Mongoose

npm i mongoose --save

2) 引入Mongoose

var mongoose = require("mongoose");

3) 连接MongoDB数据库

mongoose.connect("mongodb://ip地址:端口号/数据库名");

```js
//引入mongoose
const mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/mongo_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true
});
//连接以后的触发的事件
mongoose.connection.once("open", (err) => {
    if (err) {
        console.log(err)
    }
    console.log("数据库连接陈宫")
})
```

#### **4.4.2创建核心对象**

1) 创建Schema对象，内部传入约束对象

**var** Schema = mongoose.Schema;

 **var** xxxSchema = **new** Schema({   **字段**:类型,   **字段**:类型,   **字段**:类型,   **字段**:类型 }); 

```js
//创建一个集合的约束
//实例化mongoose.schema,传入约束对象进行约束
//并不是直接对某个集合做约束，而是写好一个约束以后给某个集合使用
//返回一个schema对象
const teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    age:Number,
    sex:String,
    hobby:[String],
    createTime:{
        type:Date,
        default:Date.now
    }
})
```

2) 创建Model对象

`var XxxModel = mongoose.model(集合名,xxxSchema); `

注意： 生成的集合会自动添加，并转为小写。

```js
//model对象就相当于集合 对集合操作
//创建model对象（teacher集合），并传入约束
const Teacher=mongoose.model('teacher',teacherSchema);
```

3) 创建Document对象

**var** xxx = **new** XxxModel({   **属性**:值,   **属性**:值,   **属性**:值 }); 

```js
//创建document对象（创建文档）
//实例化model对象，并传入初始值
new Teacher({
    name:'一一',
    age:30,
    sex:'女',
    hobby:['主持'],
    createTime:Date.now()
}).save((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('成功保存');
})
```

#### **4.4.3使用方式**

1) Model的方法

```js
//create方法
 Teacher.create({
    name:'赵一',
    age:1,
    sex:'女',
    hobby:['说话','睡觉'],
    createTime:Date.now()
},(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('添加成功');
}) 
//find方法
 const result=Teacher.find({
    age:{$lt:20}
});
result.then((value)=>{
    console.log(value);
}).catch((err)=>{
    console.log(err);
}) 
//update--改
 const result=Teacher.updateMany({},{
    $inc:{
        age:1
    }
})
result.then((value)=>{
    console.log(value);
}).catch((err)=>{
    console.log(err);
}) 
//delete--删
const result=Teacher.deleteOne({
    name:'李二'
});
result.then((value)=>{
    console.log(value);
}).catch((err)=>{
    console.log(err);
})
```

### [4.5 mongoose的模块化](http://doc.lipeihua.vip:8800/#/./NodeJS/08.mongoDB?id=_45-mongoose%e7%9a%84%e6%a8%a1%e5%9d%97%e5%8c%96)

- tools/db.js

  该模块专门用来连接MongoDB数据库

  ```js
  //引入mongoose包
  const mongoose = require("mongoose");

  //连接MongoDB数据库
  //connect第一个参数：mongodb://域名:端口号/连接的数据库名称
  mongoose.connect("mongodb://127.0.0.1:27017/atguigu", {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  //对mongoose对象的connection对象绑定事件，当数据库连接的时候会触发open事件
  mongoose.connection.once("open", (err) => {
      if (err) {
          console.log(err);
          return;
      }
      console.log("MongoDB连接成功")
  })
  //mongo链接数据库代码可以不暴露出去，直接require引入就可以了
  ```


- models/student.js

来定义Teacher的模型

```js
const mongoose=require('mongoose');
//创建一个集合的约束
//实例化mongoose.schema,传入约束对象进行约束
//并不是直接对某个集合做约束，而是写好一个约束以后给某个集合使用
//返回一个schema对象
const teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    age:Number,
    sex:String,
    hobby:[String],
    createTime:{
        type:Date,
        default:Date.now
    }
})
module.exports=teacherSchema;
```

- 入口文件index.js

  ```js
  const mongoose=require('mongoose');
  require('./db/index');
  const teacherSchema=require('./teacher/index');
  const Teacher=mongoose.model('teacher',teacherSchema);
  Teacher.create({
      name:'赵二',
      age:2,
      sex:'女',
      hobby:['说话','睡觉'],
      createTime:Date.now()
  },(err)=>{
      if(err){
          console.log(err);
          return;
      }
      console.log('添加成功');
  })
  ```





### express基础使用

```js
const express=require('express');
const {resolve}=require('path');
//创建application对象
//服务器已建立
const app=express();
//‘/:id’:接受当前规定路径的任意的请求
app.get('/:id',(req,res)=>{
    //req.params拿到请求的信息
    //console.log(req.params);//{ id: '：124' }

    // res.send()响应：帮我们书写好了响应头的content-type
     /* res.send({
        name:'lily',
        age:16
    })  */
    //影响一个json
    /* res.json({
        name:'lihua',
        age:'18'
    }) */
    //res.download("./package.json");//响应一个下载文件
   // res.sendFile(resolve(__dirname, "./package.json"))//返回响应，浏览器自动打开文件 
    //res.redirect("http://www.jd.com");//返回重定向
    //res.set("hello", "world");//设置响应头
     res.status();//设置相应状态码
     res.send("hello")
});
app.get('/user',(req,res)=>{
    res.send('当前在user目录');
});
app.get('/login',(req,res)=>{
    res.send('当前在login目录');
})

//启动服务器
app.listen(3002,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('服务器启动成功: http://localhost:3002');
})
```

#### 登录注册模块

```js
const express=require('express');
//注册一个服务
const app=express();
//连接数据库模块
require('./db');
//userInfo集合约束
const userInfoSchema=require('./userInfo');
//引入mongoose模块
const mongoose=require('mongoose');
//创建一个userInfo集合的引用
const userInfo=mongoose.model('userInfo',userInfoSchema);
const {resolve}=require('path');

//注册的接口
/* 
        1.获取用户数据
        2.判断是否已经注册
        3.如果没有注册，则保存在数据库
        4.返回相应
*/
app.get('/register',async(req,res)=>{
    //1获取用户数据
     const {user,pass}=req.query;
    console.log(user,pass); 
    //2判断用户是否注册过
    //find返回的是一个数组，findOne返回的是查找的对象
    //find查找不到返回空数组  findOne查找不到 返回null
    const isHasUser=await userInfo.findOne({
        user
    })
    console.log(isHasUser);//null
    if(isHasUser){
        if(isHasUser.user===user){
            res.send('用户名被注册');
            return;
        }
    }
    //3.如果没有注册，则保存在数据库
    const saveRegister=await userInfo.create({
        user,
        pass:pass[0]
    })
    console.log(saveRegister);

    //4.返回相应响应
     //res.send("注册成功");
    //注册成功后直接跳转登录页面
    res.sendFile(resolve(__dirname,'./login.html'));   
})

//登录接口
 /* 
        1.获取用户的数据
        2.判断是否存在当前用户名
        3.判断密码是否正确
        4.返回成功相应
*/
app.get('/login',async(req,res)=>{
    //1.获取用户的数据
    const {user,pass}=req.query;
    //2.判断是否存在当前用户名
    const isHasUser=await userInfo.findOne({
        user
    })
    if(!isHasUser)return res.send('用户名不存在');
    //3.判断密码是否正确
    //isHasUser其中已经包含的密码
   if(isHasUser.pass===pass){
       res.send('登录成功');
   }else{
       res.send('密码不正确');
   }

})
//register.html接口
 app.get('/register.html',async(req,res)=>{
     res.sendFile(resolve(__dirname,'./register.html'));
 })
 //login.html接口
 app.get('/login.html',async(req,res)=>{
     res.sendFile(resolve(__dirname,'./login.html'));
 })
//启动服务器
app.listen(3003,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`服务器启动成功 http://127.0.0.1:3003`);
})
```

#### 路由管理模块

```js
const express=require('express');
//注册一个服务
const app=express();
//连接数据库模块
require('./db');
//引入userRouter
const userRouter = require('./router/userRouter');
const userRouterRouter=require('./router/userReg-Router')
//引入静态资源
app.use(express.static('./public'));
//获取请求体，解析为一个对象，放到req的body上
app.use(express.urlencoded({
    extended: true
}))
//正则校验路由中间件
app.use(userRouterRouter);
//注册登录的路由中间件
app.use(userRouter);

//启动服务器
app.listen(3003,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`服务器启动成功 http://127.0.0.1:3003`);
})
```



#### **中间件**

    中间件：
    - 本质是一个函数
    - 组成
        req
        res
        next
    - 作用
        执行任意代码
        修改req和res对象
        接受请求 处理请求  返回响应
        调用下一个中间件或路由
    - 应用：
        应用级中间件（权限管理、防盗链等等，完成公共逻辑,正则校验）
        第三方中间件（cookie-parser、session）
        内置中间件（官方提供的中间件 express.static 和express.urlencoded）
        路由器中间件
        错误处理中间件
```js
const express = require("express");
//创建application对象
const app = express();

//可以直接访问lll文件夹中的所有静态资源
app.use(express.static("./lll"))

//获取请求体，解析为一个对象，放到req的body上
app.use(express.urlencoded({
    extended: true
}))
//  
app.use((req, res, next) => {
  	//可以执行其他的操作
    console.log("bbb")
    // res.end("bbb");
   	//中间件可以给req或res扩展属性和方法
    req.xxx = "xxx";
    next();
})


app.get("/", (req, res) => {
    // console.log(req.body)
    console.log("aaa")
    res.end("aaa")
})
app.post("/", (req, res) => {
   	// console.log(req.query);//只能接受查询字符串
    console.log(req.body)// req.body是接受报文体数据
    console.log(ren)
    console.log("ccc")
    res.end("ccc")
})
app.use((err, req, res, next) => {
    console.log(err + "11111");
})
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3000`)
})
```

#### ejs

```js
const express = require("express");
const ejs = require("ejs");
/* 
    ejs：模板引擎
        1.服务器渲染技术
        2.使用
            1.下载ejs
            2.配置ejs
                //配置使用哪一个模板引擎
                app.set("view engine",'ejs');
                //配置模板引擎资源目录
                app.set("views","xxx");

*/
const app = express();

app.set("view engine", "ejs");
app.set("views", "views")

app.get("/", (req, res) => {
    /* const person = {
        name: "<strong>lily</strong>",
        age: "<strong>18</strong>"
    };

    // render的第二个参数是一个对象
    res.render("index.ejs", person) */


    const person = [{
            name: "lily",
            age: 18
        },
        {
            name: "laowang",
            age: 19
        },
    ]
    res.render("index.ejs", {
        person
    })
})

app.listen(3003, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3003`)
})
```

#### cookie

​        1.是什么？
​            一个解决http无状态协议（无法分清楚谁发送的请求）的技术
​            本质上：是一个存储在浏览器上的文本 key-value

​        2.作用是
​            解决http无状态
​            储存少量文本

​        3.使用

- 1.“HTTP 是一个无状态的协议”:即使同一个客户端连续两次发送请求给服务器，服务器也识别不出这是同一个客户端发送的请求。为了解决 HTTP 无状态导致的问题，后来出现了 Cookie
  2**.Cookie指某些网站为了辨别用户身份而储存在用户本地终端上的数据**
  3.Cookie作为一段一般不超过 4KB 的小型文本数据，它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成
  4.Cookie的设置

  ```
  - 客户端发送 HTTP 请求到服务器
  - 当服务器收到 HTTP 请求时，在响应头里面添加一个 Set-Cookie 字段
  - 浏览器收到响应后保存下 Cookie
  - 之后对该服务器每一次请求中都通过 Cookie 字段将 Cookie 信息发送给服务器。
  ```

  5.一些设置：

  ```
  - Expires 用于设置 Cookie 的过期时间
  - Max-Age 用于设置在 Cookie 失效之前需要经过的秒数
  - HTTPOnly：设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。
  ```

```js
const express=require('express');
//注册一个服务器
const app=express();
const cookieParser=require('cookie-parser');
//解析cookie数据挂载到req上
app.use(cookieParser());
//设置cookie
app.get('/login',(req,res)=>{
    //当请求login的时候，就设置一个cookie给客户端
    //cookie在客户端是按照域名和浏览器保存的
    //只要在这个域名下，所有的页面都可以访问到cookie
    //换一个浏览器就不能访问其他浏览器的cookie
    //不同域名不可以互相访问cookie
    res.cookie('userID','12345',{
        maxAge:1000 * 60 * 60 * 24 * 7,
        httpOnly:true//禁止客户端使用document.cookie访问cookie数据
    })
    res.end('success');
})
//获取cookie
app.get('/center',(req,res)=>{
    //如果用户有cookie凭证，则显示数据  否则拒绝访问
    //express-parser可以通过req.cookie 获取到cookie
    console.log(req.cookies);
    const {userID}=req.cookies;
    if(userID==='12345'){
        res.send('欢迎光临');
    }else{
        res.send('拒绝访问');
    }
})
//删除cookie
app.get('/quit',(req,res)=>{
    //删除cookie其实就是给cookie设置一个过去的时间或者是0
    res.cookie('userID','xxx',{maxAge:0});
    res.send('退出成功');
})
//启动服务
app.listen(3000, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:3000")
})

```

#### session

1.因为 Cookie 可以通过客户端修改，而 Session 只能在服务端设置，所以安全性比 Cookie 高，一般会用于验证用户登录状态
2 Session 是基于Cookie 实现的另一种记录服务端和客户端会话状态的机制
3 Session 是存储在服务端，而 SessionId 会被存储在客户端的 Cookie 中
4 描述Session的过程

1.发送请求，请求登录，可能在报文头或者url中携带登录信息。

2.服务端接收响应，创建一个session对象，然后创建一个当前用户信息永远不重复sessionID，把当前用户的信息和sessionID组成一个key-value值，保存在session对象中。

3.返回响应，cookie中携带了session

4.接受到session，并保存在cookie中

5.第二次发送请求，会自动携带sessionID，因为在cookie中保存

6.服务器通过解析获取到cookie中的sessionID对象中判断当前sessionID是否存在

7.如果服务端认证成功，会直接响应相应的请求，否则需要再次登录

![QQ截图20201017145153](C:\Users\Lenovo\Desktop\0721第二阶段\QQ截图20201017145153.png)

```js
//session设置的配置中间件
app.use(session({
    secret:'keyboard cat',
    saveUninitialized:false,//don't create session until something stored
    resave:false,//don't save session if unmodified
    store:new MongoStore({
        url:'mongodb://127.0.0.1:27017atguigu/',
        ttl:14 * 24 * 60 * 60 
    }),
    cookie:{
        maxAge:14 * 24 * 60 * 60,
        httpOnly:true
    }
}));
```



#### 谈一谈缓存

1.缓存是性能优化中简单高效的一种优化方式。一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷
2.缓存分为强缓存和协商缓存

```
- 强缓存：不会向服务器发送请求，直接从缓存中读取资源，并且显示from disk cache或from memory cache字样，强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。
- 协商缓存：协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
- 描述协商缓存过程
1客户端向服务端发送一个请求，请求相应的资源
2服务端向客户端发送响应，在响应头中携带两个缓存的内容，分别时文件的唯一标识（eTag）和文件最后一次的修改时间（last-modified）。
3客户端接收到响应eTag和last-modified，并且保存在客户端，但是改名了，把eTag改名为if-none-match，把last-modified改名为if-modified改名为if-modified-since
4客户端第二次请求服务端，请求指定的资源，在请求头上会携带两个字段分别是if-none-match和if-modified-since
5服务端接收到客户端发送的if-none-match和if-modified-since，和自己重获当前文件的eTag和last-modified进行比较，如果两个都相同，则读取缓存。如果有一个不同，则返回新的响应
6如果走缓存，则服务端的响应状态码应该是304，并且不需要设置响应内容
7如果走缓存，则客户端接收到的状态码是304，直接读取缓存
8如果不走缓存，则响应状态码是200，并且返回新的资源，还要返回最新的eTag和last-modified。
```

![oQQ截图20201017145435](C:\Users\Lenovo\Desktop\0721第二阶段\QQ截图20201017145435.png)

```js
const express=require('express');
const app=express();
const eTag=require('etag');

//可以改造异步方法 返回promise对象
const {
    promisify
}=require('util');
const {
    resolve
}=require('path');
const fs=require('fs');
app.get('/',(req,res)=>{
    const filePath=resolve(__dirname,'./public/index.html');
    const rs=fs.createReadStream(filePath);
    res.set('Content-Type','text/html;charset=utf-8');
    rs.pipe(res);
});
app.get('/js/index.js',(req,res)=>{
    const filePath=resolve(__dirname,'./public/js/index.js');
    const rs=fs.createReadStream(filePath);
    //设置强制缓存 http1.1
    res.set('cache-control','max-age=2');
    //设置强制缓存 http1.0
    //res.set('expires',new Date(Date.now() +1000*3600).toGMTString());
    res.set('Content-Type','application/javascript;charset=utf-8');
    rs.pipe(res);
});
 
app.get('/css/index.css',async(req,res)=>{
    const filePath=resolve(__dirname,'./public/css/index.css');
    //fs.stat可以读取到文件的所有详细信息 是一个Stats对象
    //把fs.stat方法 转换成返回promise对象的方法
    const stat=promisify(fs.stat);
    //等待stat方法 去读取文件的详细信息 并返回出来
    const fileStat=await stat(filePath);

    //获取请求时候携带的文件唯一标识 和 文件最后修改时间
    const ifNoneMatch=req.headers['if-none-match'];
    const ifModdifiedSince=req.headers['if-modified-since'];
    
    //获取文件唯一标识
    const fileEtag=eTag(fileStat);
    //获取文件的最后一次修改时间 并转换位时间对象字符串
    const lastModified=new Date(fileStat.mtime).toGMTString();
    if(ifNoneMatch===fileEtag && ifModdifiedSince===lastModified){
        res.status(304).end();
        return;
    }

    //只要协商缓存不相等  则重新设置最新的响应头 并返回新的响应
    res.set('eTag',fileEtag);
    res.set('last-modified',lastModefied);
    const rs=fs.createReadStream(filePath);
    //设置强制缓存 http1.1
    res.set('Content-Type','text/css;charset=utf-8'); 
    rs.pipe(res);
}); 

```

#### 压缩

```js
 /*  //支持gzip压缩
     if(acceptEncoding.includes('gzip')){
        //创建一个新的gzip压缩格式 并把流式读取的文件写入
        const fileGzip=rs.pipe(zlib.createGzip());
        res.set('Content-Encoding','gzip');
        fileGzip.pipe(res);
        return;
    } */

   //支持br压缩
     if(acceptEncoding.includes('br')){
        //创建一个新的gzip压缩格式 并把流式读取的文件写入
        const fileBr=rs.pipe(zlib.createBrotliCompress());
        res.set('Content-Encoding','br');
        fileBr.pipe(res);
        return;
    }

     /*  //支持deflate压缩
     if(acceptEncoding.includes('deflate')){
        //创建一个新的gzip压缩格式 并把流式读取的文件写入
        const fileDeflate=rs.pipe(zlib.createDeflate());
        res.set('Content-Encoding','deflate');
        fileDeflate.pipe(res);
        return;
    } */
    rs.pipe(res);
});
```

#### 自动打开浏览器

```js
const {exec} = require("child_process");

function open(url){
    //platForm获取系统标识
    const platForm = process.platform;
    console.log(platForm)

    let cmd = "";
    //switch判断
    switch(platForm){
        case 'win32'://window
            cmd = "start";
            break;
        case 'darwin'://macOS
            cmd = "open";
            break;
        case 'linux'://Linux
            cmd="xdg-open"
            break;
    }

    // exec可以执行commad命令
    exec(`${cmd} ${url}`);
}

module.exports = open;
//启动服务的时候调用
open("http://127.0.0.1:3000")
```



### 1019

#### 浏览器存储  webStorage

- LocalStorage是浏览器本地持久化存储技术，也叫永久存储
- SessionStorage是浏览器本地临时存储技术，也叫会话存储

**LocalStorage**

 cookie                     localstorage

4kb左右                         5M

数量有限                         不限

必须发送给服务端         只有在本地存储

可以设置过期时间         永久

一般是服务端设置         一般是客户端设置

```js
oBtn1.onclick = function () {
            window.localStorage.setItem("user", "laowang");
            window.localStorage.setItem("pass", "12345");
        }
        oBtn2.onclick = function () {
            console.log(localStorage) //{user: "laowang", length: 1}
            // console.log(localStorage.user);
            console.log(localStorage.getItem("user"));
        }

        oBtn3.onclick = function () {
            // console.log(localStorage.removeItem("user"));
            console.log(localStorage.clear());
        }
```

**SessionStorage**临时存储不能跨页面访问,只能当前页面访问  .关闭页面之后直接消失

- 当其他同源的页面修改了localStorage的时候,会自动触发其他页面的stroage事件


-  从而让其他页面随之更新

1XML:可扩展标记语言

​        - 传输数据和保存数据

​        - 自定义标签

​        - 语法严格

  2 HTML:超文本标记语言

​        - 展示数据

​        - 预定义很多种类标签

​        - 语法宽松

  3 XHTML：超文本标记语言

​        - 是http4之后的一个html的一种版本 只更新到了Xhtml1.1 后被html5所取代

​	_html+xml语法形成一个新的标记语言，有更严格的语法

```js
<?xml vision='1.0' enconding='utf-8'?>
<message>
    <teacher>
        <person>
            <name>
                静哥
            </name>
            <age>
                18
            </age>
            <hobby>
                <ho>
                    钓鱼
                </ho>
            </hobby>
        </person>
    </teacher>
</message>
```



## AJAX

##### 简介

- AJAX 全称为Asynchronous Javascript And XML，就是异步的 JS 和 XML。


- 通过AJAX可以在浏览器中向服务器发送异步请求。
- AJAX 不是新的编程语言，而是一种使用现有标准的新方法

##### Ajax的工作原理

相当于在用户和服务器之间加了一个中间层(Ajax引擎)，使用户操作与服务器响应异步化。

### [1.4 AJAX的特点](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_14-ajax%e7%9a%84%e7%89%b9%e7%82%b9)

#### [1.4.1 AJAX的优点](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_141-ajax%e7%9a%84%e4%bc%98%e7%82%b9)

1. 可以无需刷新页面而与服务器端进行通信。
2. 允许你根据用户事件来更新部分页面内容。

#### [1.4.2 AJAX的缺点](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_142-ajax%e7%9a%84%e7%bc%ba%e7%82%b9)

1. 没有浏览历史，不能回退
2. 存在跨域问题
3. SEO不友好

### [1.5 AJAX的使用](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_15-ajax%e7%9a%84%e4%bd%bf%e7%94%a8)

#### [1.5.1 核心对象](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_151-%e6%a0%b8%e5%bf%83%e5%af%b9%e8%b1%a1)

XMLHttpRequest，AJAX的所有操作都是通过该对象进行的。

#### [1.5.2 使用步骤](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_152-%e4%bd%bf%e7%94%a8%e6%ad%a5%e9%aa%a4)

- 创建XMLHttpRequest对象

  `var xhr = new XMLHttpRequest();`

- 设置请求信息

  `xhr.open(method, url);`


- 发送请求

  - get请求：

    xhr.send():因为请求体在查询字符串中，所以不需要书写参数

  - post请求：

    - `xhr.send(body)` //get请求不传body参数，只有post请求使用
    - body如果是查询字符串格式，则书写请求头`xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');`,服务器需要使用中间件`app.use(express.urlencoded(extended: true}))`
    - body如果是json字符串格式，则书写请求头`xhr.setRequestHeader("content-type", "application/json")`,服务器需要使用中间件`app.use(express.json());

- 接收响应

  `onreadystatechange `事件中，当`xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)`时表示成功

  `xhr.responseXML` 接收xml格式的响应数据

  `xhr.responseText` 接收文本格式的响应数据

  > xhr.readyState:
  >
  >  0 :初始化状态
  >
  >  1 :代表open调用，但send方法还未调用（没有发送请求）
  >
  >  2 :代表send方法调用，并且接受到了部分响应信息（响应首行和响应头：状态码就在其中）
  >
  >  3 :代表接受了部分响应体数据，（如果响应体数据较小就全部接受。但是数据如果比较大，就只接受一部分）
  >
  >  4 :代表全部接受完成

#### [1.5.3 解决IE缓存问题](http://doc.lipeihua.vip:8800/#/./NodeJS/12.ajax?id=_153-%e8%a7%a3%e5%86%b3ie%e7%bc%93%e5%ad%98%e9%97%ae%e9%a2%98)

问题：在一些浏览器中(IE),由于缓存机制的存在，ajax的get请求只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。chrome/firfox执行协商缓存，IE走强制缓存

解决方式：浏览器的缓存是根据url地址来记录的，所以我们只需要修改url地址即可避免缓存问题

`xhr.open("get","/testAJAX?t="+Date.now());`

#### ajax请求

```js
const express = require('express');
const app = express();
app.use(express.static('./public'));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.get('/userinfo',(req,res)=>{
    //得到请求体
    console.log(req.query);
    //响应Ajax数据
    res.json({
        name:'laoli',
        age:16
    })
});
app.post('/userinfo',(req,res)=>{
    //得到请求体
    console.log(req.body);
    //响应Ajax数据
    res.json({
        name:'laowang',
        age:12
    })
});
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`服务器启动成功 http://127.0.0.1:3000`);
}) 



<form action='###'>
        <label>
        请输入用户名：
        <input type="text" name='userid' id='user'>
        </label>
        <br>
        <button>提交</button>
    </form>
    <script>
        const oForm=document.querySelector('form');
        const oButton=document.querySelector('obutton');
        const oUser=document.querySelector('#user');
        oForm.onsubmit=function(){
             const xhr=new XMLHttpRequest();
            xhr.open('POST',`/userinfo`,true); 
            /* xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');          
            xhr.send('userid=oUser.value'); */
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({
                userid:oUser.value
            }))        
            xhr.onreadystatechange=function(){            
            console.log(xhr.readyState);        
               if(xhr.readyState===4 && (xhr.status>199 && xhr.status<300)){
                   console.log('请求成功 数据接收成功');
                   
                console.log(JSON.parse(xhr.responseText));
               }
             }
            //阻止默认事件  阻止表单提交 而是使用ajax提交
            return false;
        } 
    </script>
```

**jquery的ajax请求**

```js
$(function(){
            $('form').submit(function(){
              //$.get(url, [data], [callback], [type])
                /* $.ajax({
                    type:'get',
                    url:`/userinfo?userid=${$('#user').val()}`,
                    cache:false,
                    success(data){
                        console.log(data);
                    },
                    error(err){
                        console.log(err);
                    }
                }) */
              
				//$.post(url, [data], [callback], [type])
               /*  $.ajax({
                    type:'post',
                    url:`/userinfo`,
                    headers:{
                        'Content-Type':'application/json;charset=utf-8'
                        //'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    },
                    //data:{userid:$('#user').val()},
                    //data:`userid=${$('#user').val()}`,
                    data:JSON.stringify({
                        userid:$('#user').val()
                    }),
                    success(data){
                        console.log(data);
                    },
                    error(err){
                        console.log(err);
                    }
                }) */

               /*  $.get('/userinfo',{name:'lily',age:12},function(data){
                    console.log(data);
                }) */

                $.post('/userinfo',function(data){
                    console.log(data);
                })
                return false;
        })
           
        })
```

### 1020

- **同源： 协议、域名、端口号 必须完全相同。**
- **违背同源策略就是跨域。**

#### jsonp跨域   只支持get请求。

在网页有一些标签天生具有跨域能力，比如：img link iframe script。

JSONP就是利用script标签的跨域能力来发送请求的。

```js
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.js"></script>
</head>
<body>
    <button id='btn'>发送</button>
    <script>
        const oBtn=document.querySelector('#btn');
        oBtn.onclick=function(){
          /* 1  //jsonp的回调函数 一定是一个全局函数，否则jsonp的script标签执行的时候找不到这个函数
            window.fn=function(data){
                console.log(data);
            }
            //script标签的src属性可以进行跨域请求，所以我们使用script标签的src进行请求
            //创建一个script标签
            const script=document.createElement('scritp');
            script.src=`http://127.0.0.1:3000/user?name=lily&callback=fn&_t=`+Date.now();
            //插入页面时候，script就会执行
            document.body.appendChild(script); */

             //2//jQuery的jsonp跨域
             $.getJSON('http://127.0.0.1:3000/user?name=lily&callback=?',function(data){
                 console.log(data);
             })
        }
    </script>
```

```js
const express = require("express");
//注册一个服务
const app = express();

app.use(express.static("./public"));

//获取post请求体 挂载到req上  只能处理urlencoded编码格式的请求
app.use(express.urlencoded({
    extended: true
}))

//获取post请求体，并挂载到req上  只能处理json字符串格式的请求
app.use(express.json());

app.get("/user", (req, res) => {
    console.log(req.query);
    const {
        callback
    }=req.query;
    const data={
        name:'laowang',
        age:13
    }
    res.send(`${callback}(${JSON.stringify(data)})`);
})

//启动服务
app.listen(3000, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:3000");
})
```

#### cors跨域

CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持get和post请求。

CORS是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

```js
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <button id='btn'>发送</button>
    <script>
        const oBtn=document.querySelector('#btn');
        oBtn.onclick=function(){
          axios({
              method:'get',
              url:'http://127.0.0.1:3000/user',
              params:{
                  firstname:111,
                  lastname:222
              }
          }).then((data)=>{
              console.log(data);
          })
        }
    </script>

app.get("/user", (req, res) => {
    console.log(req.headers);
    //cors跨域
    //res.set("Access-Control-Allow-Origin", "*");

   //设置白名单
   const safeUrl=['http://127.0.0.1:5500','http://baidu.com'];
   const userURL=req.headers.origin;
   if(safeUrl.includes(userURL)){
       res.set('Access-Control-Allow-Origin',userURL);
       
        /* 
            Access-Control-Allow-Credentials: true
            当请求是非get的时候，或者请求头有特殊字段的时候,浏览器会发送一个预检请求（请求方式是options）
            预检请求检查当前是否允许跨域，如果不行 则直接拒绝不在发送
            Access-Control-Allow-Headers：x-class0721-hello
            允许以上设置的请求头字段可以跨域
            Access-Control-Allow-Methods: GET, OPTIONS, HEAD, PUT, POST、
            允许跨域请求的方法
            Access-Control-Allow-Origin: https://juejin.im
            允许跨域请求的地址
            Access-Control-Max-Age: 1800
            预检请求的缓存时间
        */
   }
   res.send('');
})
```



