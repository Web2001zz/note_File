# Vue

​	

## 	Vue是什么

- 渐进式的Javascript框架
- 作者：尤雨溪
- 作用：动态构建用户界面



## 	Vue的特点

- 使用的是MVVM模式
  - MVC 
    - M ---  Model 数据层
    - V --- View  视图层
    - C --- Controller 控制层
    - 在MVC模式下  数据由控制层操作，控制层读取数据层的数据并渲染到视图层中（单向数据流）
  - MVVM
    - M --- Model 数据层 （包括但不限于data）
    - V --- View 视图层
    - VM --- ViewModel 视图模型层（VM）
    - 在MVVM模式下 数据由视图模型层控制，既可以从数据层中读取数据加载到视图层上，也可以从视图层上读取修改的数据来修改数据层上的数据（双向数据流）
- 编码简洁，体积小，运行效率高，适合PC / 移动端开发
- 本身只关注UI，可以轻松引入vue插件或其他第三库开发项目



## 	Vue的基础语法

``` html
<!-- 首先安装Vue 导入下载的本地Vue或CDN在线导入 -->
<script src="路径/地址"></script>

<body>
	<div id="root">
        <!-- 双括号表示插值，可以在里面书写表达式，不能输入语句 -->
        <h1>{{message}}</h1>
    </div>
    <script>
        //导入Vue后new一个并传入一个对象
    	new Vue({
            //el element 相当于获取元素节点
            el:"#root",
            data :{
                message : "今天星期六，你是九九七，今天努努力，明天努努力，后天努努力"
            }
        })
    </script>
</body>
```

  ### 	指令（v-bind、v-model、v-on）

- v-bind 强制绑定数据（单向绑定数据）简写为 :属性名
- v-model 双向数据绑定
- v-on 事件绑定 简写为@事件名 on绑定的事件要写在methods属性中

```html
<div id="root">
    <!-- 指令; v-bind 用来强制绑定数据 （单向绑定数据） 这里用来给value属性强制绑定num的值 -->
	<input type="text" v-bind:value="num1"/>
    <!-- 简写省略v-bind 直接冒号value-->
    <input type="text" :value="num1"/>
    
    <!-- 指令：v-model也是绑定数据（双向绑定数据），可以读取数据层数据渲染到视图层 也可以在视图层输入来修改数据层的数据-->
    <input type="text" v-model:value="num2"/>
    
    <!-- 指令：v-on绑定事件 ，在methods中书写DOM的回调函数-->
    <button v-on:change="handlechange">点我看美羊羊洗澡</button>
</div>
<script>
	new Vue({
        el:"#root",
        data:{
            //因为是单向绑定数据，num1并不会因为表单的改变而改变
            num1 : 43962200,
            //双向绑定数据，num2会因为表单的改变而改变
            num2 : 20200721，
            num3 : 1
        },
        methods:{
            handlechange(){
                //这里的this永远指向Vue的实例化对象(vm)并且会把data等的数据代理出去
                console.log(this)
                //因为有数据代理，num2是直接暴露在vm下的 因此可以直接用this.num2调用不需要在中间加data
                this:num2++
            }
        }
        
    })
</script>
```

### 计算属性与监听属性（computed、watch）

- computed计算属性会监视内部使用过的属性的变化，一旦发生变化便要重新开始计算
- 计算属性一般都会有个get() （读取方法）和set()（设置方法）
- watch监听属性会监视data中的属性，一旦发生变化就会调用响应的函数

``` html
<div id="root">
        <h2>{{zeroGo}}</h2>
        <input type="text" v-model:value="num1" />
        <input type="text" v-model:value="num2" />
        <h2>{{num3}}</h2>
    </div>

    <script>
        new Vue({
            el:"#root",
            data:{
                num1:null,
                num2:null,
                num3:null
            },
            //计算属性，监视内部使用过的属性的变化，一旦发生变化便开始计算
            computed:{
                //给vm定义一个属性为zeroGo
                zeroGo:{
                    //zeroGo属性的读取方法
                    get(){
                        return +this.num1 * +this.num2
                    },
                    //zeroGo属性的设置方法
                    set(){}
                }
            },
            watch:{
                //给num1和num2设置属性
                num1(){
                    
                }
            }
                        
        })
    </script>
```

###  class与style绑定

- 如何设置class和style？

  ```html
  <!-- 格式一 -->
  <p :class="isRed ? 'red' : green">用v-bind解析这个三元运算符</p>
  <!-- 格式二 -->
  <p :class="{red : isRed, green :!isRed}">直接在对象内解析最终返回</p>
  <!-- 格式三 -->
  <p :class="['red','size']">解析一个数组并返回这两个classname</p>
  
  <!-- 设置style -->
  <p :style="{'fontSize':变量名 + 'px',color:'red'}"></p>
  ```

- class和style用哪种？
  - 如果样式是可变的，则用style，如果样式是静态的，则使用class
  - 如果样式是可变的，但只是在某个范围内变化则使用class，如果设置的属性值是数字类(有无限的范围)，则使用style



 ### Vue对象的生命周期

- 初始化显示
  -  beforeCreate()    在数据代理之前触发，所以此时不能操作data等数据
  - created() 在数据创建完成后触发
  - beforeMount()  在挂载之前（页面渲染之前），所以此时不能操作DOM
  - **mounted()** （常用）在此阶段可以进行设置定时器、发送请求、绑定事件等任务
- 更新状态
  - beforeUpdate() 更新前
  - before() 更新后
- 销毁vue
  - beforeDestory（）在此阶段做收尾工作：如清楚计时器、接触事件等
  - destoryed() 自杀完成

### 事件处理函数

- v-on:eventname="handleClick"

  - 回调函数的参数：event

- v-on:eventname="handleClick()"

  - 回调函数没有参数

- v-on:eventname="handleClick(123)"

  - 回调函数的参数 ：123

- v-on:eventname="handleCilck(123,$event)"

  - 回调函数的参数 ： 123，event

- v-on:eventname="orderType=1"

  - 不需要设置回调函数 此时回调函数只有一条语句可直接执行

- 事件修饰符与按键修饰符

  ``` html
  <div id="root">
      <!-- .prevent禁止事件默认行为 .stop阻止冒泡事件-->
      <input @change.prevent.stop="handlechange"/>
      <!-- 按键修饰符可以直接书写简码和键名，如13和enter都代表回车触发-->
      <input @keyup.13="handlekeyup" />
      <input @keyup.enter="handlekeyup" />
  </div>
  ```

  

### 过渡动画

- **vue会给目标元素添加/移除特定的class**

- 基本过渡动画的编码

  - 在元素外包裹<transition name="xxx">

  - 定义class样式

  - 过渡的类名

    - xxx-enter-active: 指定显示的transition
    - xxx-leave-active: 指定隐藏的transition
    - xxx-enter: 指定隐藏时的样式


###  过滤器

- 过滤器(filter)可以对要显示的数据进行特定的格式化后再显示

- 需要注意的是过滤器后的数据并不会修改原数据，而是产生一个新的对应数据

  ``` html
  <!-- 使用过滤的格式-->
  <h1 id="root">现在的时间是：{{date | dateYMD("YYYY-MM-DD")}} {{date | dateHMS("HH:mm:ss")}}</h1>
  <script>
  	//全局定义过滤器 使用dayjs进行时间戳转格式 “年---月---日”
      //传入参数一为函数名，参数二是一个回调函数
      Vue.filter("dateYMD",(value,str) => { 
          //value为时间戳，str为需要转换的格式YYYY-MM-DD
          return dayjs(value).format(str)
      }
      
      new Vue({
          el:"#root",
          data:{
              //获取时间戳
              date:Date.now()
          },
          //定义局部过滤器 只能在该实例中使用
          filters:{
              dateHMS(value,str){
                  return dayjs(value).format(str)
              }
          }
      })
  </script>
  ```

### 自定义指令

- Vue中有很多内置指令：

  - ```html
    <!-- 
    v-if一般配合else指令使用 当if为ture时才会输出到页面，反之则else输出
    v-show指令通过控制display来控制显示/隐藏
    v-for遍历数组/对象
    v-on绑定事件监听，可简写为@
    v-bind强制绑定数据，单向数据绑定
    v-model双向数据绑定
    v-text更新元素的文本 实则调用了textContent
    v-html更新元素的html，可渲染元素标签 实则调用innerHTML
    v-cloak在网速慢的时候加载vue页面会出现闪现插值，用此指令来防止闪现
    v-pre会渲染最原始的内容 不会被vue解析
    v-once只渲染一次，后面更新数据后也不会重新解析和渲染
    ref
    为某个元素注册一个唯一标识, vue对象通过$refs属性访问这个元素对象
              设置给DOM元素，获取到的就是DOM元素
              设置给组件，获取到的就是组件实例对象
    -->
         
    ```

- 也可以通过directive来自定义指令

  - ``` html
    <script>
    	//定义全局指令
        //第一个参数是自定义指令名
        Vue.directive("xxx",function(el,binding){
            //el是当前绑定指令的元素 binding是一个对象 包含了指令表达式等数据
            //expression : "表达式"
            //name:"xxx" 指令名称
            //rawName:"v-xxx"指令全称
            //value :"表达式的值"
            console.log(el,binding)
            el.textContent = binding.value
        })
        
        //也可以在局部定义指令
        new Vue({
            el:"#xxx",
            directives :{
                "xxx":function(el,binding){
                    .....
                }
            }
        })
    </script>
    ```

### Key是选择id还是index？

- 直接结论：
  - 绝大多数情况选择id，更改数组更方便
  - 只有在数组最后面添加或删除才会选择index



## Vue脚手架的使用方法	

- 全局下载 npm install -g @vue/cli
- 创建脚手架 vue create vue-demo（项目名称）
- 不需要的报错可以在package.json里修正

### 如何分类组件？

- 通常情况下 最外层有一个App组件

- 根据功能性来分类组件

- 每个组件的使用格式都分为<template><script><style>三大块

- 组件之间的数据传递：

  - ``` vue
    <template>
    	<!-- 传递数据和参数-->
    	<Child :person="person" :add="add"/>
    </template>
    <script>
    export default {
    	name:"本父组件名"，
    	props :{
    		接收的数据 : 数据类型
    	}，
    	//本页面的data一般是一个函数，它会返回一个原本的data对象
    	data:{
    		return {
    			person : {id : 1，name : "lily" }
    		}
    	}，
    	//如果子组件传给父组件的话通常会在父组件声明一个函数传到子组件调用并传数据
    	methods:{
    		add(id){
    			console.log("子组件传过来的参数"，id)
    		}
    	}
    }
    </script> 
    ```

## 组件之间的通信

### props数据传递

- props适用于父子组件之间的数据传递

- ```js 
  //父传子
  <Child :data="data" />
  //子组件有三种方法使用props接收父组件的数据
  //1.props:["data"] 使用数组直接提取需要的数据
  //2.props:{data : Number} 使用对象需要声明接收数据的类型
  //3.props:{data : {type : Number}} 接收的数据也可以是对象，在对象里设置类型默认值等等
  //使用
      this.data
  
  //子传父则会在父组件内定义回调函数传给子组件
  //在子组件调用回调函数会将数据返回给父组件
  ```


### 自定义事件

- Vue允许使用者自定义事件

  - 在new Vue的实例对象上，this._events 可以获得储存事件的容器

  - 作用 : 子组件向父组件通信更方便(相对于传回调函数)

  - ```html
    //给子组件绑定自定义事件
    <Child @add="add"/>
    export default {
    	.....
    	methods:{
            add(){
                .....
            }
        }
    }
    
    //在子组件内：
    <button @click="add"></button>
    
    new Vue({
    	methods :{
    		add(){
    			//1.this.$listeners.add()
    			//2.this,$emit("add",传参)
    		}
    	}
    })
    
    ```

- 使用ref绑定触发自定义方法

  - <Child ref="child" />

  - ref如果设置给普通的DOM元素，则会获取该元素的真实DOM

  - 如果设置给组件，则会获取该组件的实例对象

    - 用该方法时，需要在Mounted阶段绑定事件函数

    - ``` js
      mounted() {
          this.$refs.child.$on("add", this.add);
          //所有组件实例对象都含有以下方法
          //$on(eventname,listener) 永久绑定自定义事件
          //$once(eventname,listener) 一次性绑定事件
          //$off(eventname,listener)解绑事件
          //$emit(eventname,data)触发自定义事件
      }
      //但定义仍然要在methods里定义
      methods :{
          add(){
              ....
          }
      }
      ```

### 全局事件总线

- 适用于任何场景

- 其本质上就是一个自定义组件

- 使用方法

  - 给Vue的原型对象上添加一个可以绑定事件的对象(如vm，组件的实例this)
  - Vue.prototype.$bus = new Vue()
  - beforeCreate() {Vue.prototype.$bus = this},

- 所有组件的实例对象都可以通过原型链访问到$bus，并在bus身上绑定或触发事件

  - 绑定事件

    - ``` js
      this.$bus.$on(eventName,listeners)
      ```

  - 触发事件

    - ``` js
      this.$bus.$emit(eventName,data)
      ```

- 如图

![全局事件总线](C:\Users\hanser\Desktop\全局事件总线.png)

### slot

- slot也可以实现父子组件通信

- 将组件标签写成双标签的形式

  ```html
  <!-- 在父组件中 -->
  <A>
  	<p>
          pppp
      </p>
  </A>
  <B>
  	<template v-slot:bbb>
      	<p>
              aolianfei
          </p>
      </template>
  </B>
  <C>
  	<template #ccc="{ccc}">
          <p>
              {{ccc.name}}
              {{ccc.age}}
          </p>
      </template>
  </C>
  <!-- 在需要传递的子组件内 -->
  <!-- A组件内直接使用标签slot -->
  <slot></slot>
  <!-- B组件需要给slot加一个name属性 -->
  <slot name="bbb"></slot>
  <!-- 在C组件定义数据 可以在父组件进行解构赋值提取,因此可以直接使用插值-->
  ```

  

### Vue中的Axios

- 使用npm i axios  --save下载

-  ``` js
  //导入
  import axios from "axios"
  //使用
  //get查 post增 delete删 patch改 
  axios.get(`http:-----`)
  .then((res)=>{
  	//通常请求的数据并不是全部用 因此会提取出来如
  	res.data.items.map((user)=>{
  		//重命名
  		url : user.url,
  		id : user.id
  	})
  })
  .catch((err)=>{
  	console.log(err)
  })
  ```

## Vue-router(前端路由)

### Vue-router的作用

- 用于开发SPA（单页面应用）
- 单页面应用
  - 整个应用只有一个完整页面，所有的页面变化都是在这一个页面上
  - 点击链接不会刷新页面和发送请求，只会局部更新并更新浏览器的历史
- 前端路由的原理
  - 给a标签绑定点击事件并阻止默认事件，因此点击链接不会刷新页面和发送请求
  - 调用history.push(path)可以更新浏览器的历史记录
  - 内部会监听浏览器历史的变化，一旦发生变化就会遍历路由的配置并匹配对应路径加载相应的组件

### Vue-router提供组件与传参

- ``` vue
  <!-- router-link会提供路由链接，在浏览器渲染表示为a标签 但并不会刷新页面和发送请求 -->
  <router-link to="/xxx">xxx</router-link>
  <!-- router-view用于显示当前路由的组件-->
  <router-view></router-view>
  ```

- params

  - ```js
    //:id能动态路由匹配多个地址
    {path:"/xxx/:id"}
    //子路由接收参数
    this.$route.params.id
    //当:id参数发生变化时，需要使用watch监视属性变化以更新数据
    watch:{
        $route:{
            handler(newVal){
                const id = +newVal.params.id;
                this.message = this.messages.find((message) => message.id === id);
            }
            //一般会先调用一次
            immediate:true
        }
    }
    ```

- query

  - ```js
    //路由链接设置
    <router-link to="/xxx?name=jack">xxx</router-link>
    //子组件获取
    this.$route.query
    ```

- props

​	

## VUEX

- ![vuex工作流程图](C:\Users\hanser\Desktop\vuex工作流程图.png)

## Vue源码分析

### 数据代理

- 数据代理的最终结果是可以通过this直接访问data中的数据

  - ``` js
    function MVVM(options){
        //此处的MVVM相当于平常的VUE，options为实例化时传入的大对象{el:"",data:"",methods:""~~~~~~}
        //将options添加到this this指向的时实例化对象（vm），并且带$为固定写法 直接绑定在实例化对象上
        this.$options = options
        //此处的this._data为原数据，还有一个data变量接收
        var data = (this._data = this.$options.data)
        //保持this指向
        var me = this
        //使用Object.keys方法提取变量data中的键并返回一个数组遍历
        Object.keys(data).forEach(function (key){
            //实现数据代理的主要方法
            me._proxy(key)
        })
    }
    
    MVVM.prototype = {
        //在vm的原型对象上定义_proxy方法以实现数据代理
        _proxy:function (key){
            //缓存this
            var me = this
            //通过Object.defineProperty方法给this添加新属性
            //传入三个参数，分别是需要设置的对象、对象的属性、设置对象属性的元属性
            Object.defineProperty(me,key,{
                configurable:false,//不可修改或删除元属性
                enumerable:true,//可被枚举
                //在读取时，实际上是在读取原数据data的值
                get:function proxyGetter(){
                    return me._data[key]
                },
                //在设置时，实际上也是在设置原数据data的值
                set:function proxySetter(newVal){
                    me._data[key] = newVal
                }
            })
        }
    }
    ```

- 实现数据代理总结：

  - 将传入的对象中的data数据赋值给实例对象的原数据_data和一个新声明的变量data
  - 提取data中的属性并遍历，对每个属性名进行数据代理
  - 在vm的显式原型上定义数据代理的方法，每个属性名都会被添加到实例对象上（this）并设置其元属性
  - 设置get和set，不管是读写都是在操作其元数据，最终实现数据代理



### 模板解析——插值

- 所谓插值，即在目标中用双括号并在其中输入语句，vue会自动解析模板并返回语句的返回值到模板上

  - ``` js
    //模板解析:解析页面的插值语法与指令语法
    //第一个参数是el，字符串或者是元素
    this.$compile = new Compile(options.el || document.body, this);
    
    function Compile (el,vm){
        //将vm添加到this.$vm上
        this.$vm = vm；
    //判断el是否是元素节点，如果是就返回这个元素，如果不是就获取元素并返回
        //函数isElementNode在原型链上定义，检测是否是元素节点
        this.$el = this.isElementNode(el) ? el :document.querySelector(el);
        //实现插值的主要三步
        if(this.$el){
            //将el元素的所有节点（包括换行符、文本节点等）添加到文档碎片中
           this.$fragment = this.node2Fragment(this.$el); 
            //编译模板、解析模板
           this.init();
            //将解析后的文档碎片节点添加到页面中生效
           this.$el.appendChild(this.$fragment)
        }
        
    }
    ```
    
  - 