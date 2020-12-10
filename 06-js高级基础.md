### 0908

1 **数据类型：**

​                基本数据类型： 

​                    Null:null

​                    Undefined:undefined

​                    String:字符串 

​                        - 定义字符串 单引号、双引号、反引号  \:转义符号

​                    Number：数字 

​                        - 2进制(0bXXXXX) 

​                        - 8进制(0oXXX) 

​                        - 16进制(0xXXX) 

​                        - 10进制

​                        - 科学计数法  1.23E-30

​                        - NaN

​                        - Infinity

​                    Boolean: true/false

​                引用数据类型

​                    Object：

​                        - Object 对象{}  无序复杂的对象数据类型

​                        - Array 数组 []  有序的简单的对象数据类型

​                        - Function 函数     特殊的可执行的对象类型

​                        - Math、Date、RegExp

​                        - String、Number、Boolean的包装类型

**2typeof判断：**

​                - typeof有两种用法

​                    typeof(value)    typeof value

​                - typeof可以检测的类型：

​                    number、

​                    boolean、

​                    string、

​                    object(只能检测出来是对象类型，不能检测出是哪一种对象)、

​                    undefined、

​                    Function

```js
		var console.log=log;
		log(typeof []); //object
        log(typeof {}); //object
        log(typeof true); //boolean
        log(typeof
            function () {}); //Function
        log(typeof Math); //Object  Math直接就是对象，不需要实例化才运行
        log(typeof Date); //Function
        log(typeof new Date()); //Object
```

3 **A instanceof B:**

​                - 用来判断A是否是B的实例

​                - 返回一个布尔值

​                - 主要用来**检测对象类型**，**对于基本类型来说不能检测**

​		-可以检测的类型是：Array Function RegExp Object

```js
	 log([] instanceof Object); //true
        log(Array instanceof Function); //true
        log([] instanceof Function); //false
        log({}
            instanceof Array); //false
        log("123"
            instanceof String); //false
        log(1 instanceof Number); //false
        log(true instanceof Boolean); //false
        log(/\s/g
           instanceof RegExp)
        log(new String("123") instanceof String); //true//包装类对象
```

 因为null和undefined都只有一个唯一的值  null 和 undefined， 所以可以通过全等=== 来检测这两个类型

```js
 var a = null;
 console.log(a === null);
```

**4null和undefined**

```js
console.log(console.log(1));//1  undefined//因为log函数没有返回值
或者直接在控制台打印console.log(1);//1  undefined  也一样
```

声明一个a是一个对象

​                - 在堆中创建一个对象

​                - 在栈中创建一个变量

​                - 把对象的地址赋值给栈中的变量

-  如果对象不用了，那么我们需要把对象给从内存中删除，这样节省空间


-  如果a是局部作用域的变量，那么函数执行完成的时候，a就会自动销毁, a销毁以后，对象就没有被变量所引用（此时对象已经不可能再被使用），此时对象就会变成垃圾对象， 垃圾对象会等待回收


-   但是如果包含对象引用地址的变量是全局变量，则全局变量只有等待浏览器关闭才能销毁，所以此时不用的对象一直被引用，会占用空间。把变量主动设置为null，对象就没有被引用了，就变成了垃圾对象

```js
var a = 1; //变量a是基本类型   1是基本数据类型
var b = [1, 2]; //变量b是引用类型    [1,2]是对象类型
```

**4.1**其他的类型也有toString方法，但是和Object对象上的toString方法得到的结果不同

​            Object上的toString方法可以得到[object XXXX]的一个字符串  可以精确的确定对象的类类型

​            **Object.prototype.toString.call(被检测的值)**

```js
 	    console.log(Object.prototype.toString.call(123)) //"[object Number]"
        console.log(Object.prototype.toString.call([])) //"[object Array]"
        console.log(Object.prototype.toString.call({})) //"[object Object]"
        console.log(Object.prototype.toString.call(function () {})) //"[object Function]"
```



 5**变量类型：** 什么变量：我们创建的代表数据的一个标识符

​                        - 基本数据类型  变量的值是一个基本值

​			-引用数据类型  变量的值是一个地址值（只有变量才会出现引用关系）

 **数据类型**：基本数据类型

​		-对象数据类型（单指数据来说，本身就是一个对象类型）

​        console.log(a === null);

 6**内存的生命周期**

​            内存生命周期：通电 --  内存生效保存数据 -- 断电（数据全部清空）

​            内存创建的时候：

​                堆空间：存放一些对象类型（大）

​                栈空间：存放基本类型和变量和地址值 （小）(先进后出)

​            内存要区分开：

​             运行内存和硬盘内存

​            变量就是代表内存的一块区域，通过变量就可以访问到这个区域

7.

```js
 1. 两个引用变量 指向同一个对象，如果通过一个引用变量修改了对象的值，则另一个引用变量也看的见
        var o1 = {
            m: 1
        }
        var o2 = o1;
        o2.m = 2;
        console.log(o1.m, o1 === o2); //2   true
 2. 两个引用变量 指向同一个对象，如果修改了一个引用变量的地址值，另一个引用变量保持原有地址值不变
        var o3 = {
            m: 3
        }
        var o4 = o3
        o3 = {
            m: 4
        }
        console.log(o4.m, o4 === o3) //3 false

        //test1
        var o5 = {
            m: 5
        };
        var o6 = o5;
       //函数的传参操作其实是 值的传递或者是引用值的传递  而不是堆内数据的传递
        //传参的传递只有值传递  而没有引用传递
        //o5传递给obj  只是把地址值传递给了obj 而不是把o5所代表的对象传递给obj
        function fn(obj) {
            obj = {
                m: 6
            };
        }
        fn(o5);
        console.log(o5.m, o6.m, o6 === o5) //5 5 true

        //test2
        var o5 = {
            m: 5
        };
        var o6 = o5;

        function fn(obj) {
            obj.m = 6
        }
        fn(o5)
        console.log(o5.m, o6.m, o6 === o5) //6 6 true
```

8. **对象：**

是由一系列的键值对（key value）组成

  key：一定是一个字符串

value：可以是任意类型的

​              其中如果值是function的话，对应的属性被称作为方法

​            获取和设置对象属性

​              1.点操作符： 会把 点 后的值当做字符串解析 ，点后应该直接跟对象的属性

​              2.[]操作符(通用的)：中括号中可以运算及直接解析变量,也可以直接书写对象的属性（必须是字符串格式）

​                []括号操作符的使用场景：

​                    1.当key值是一个变量的时候

​                    2.当key值是一个不规则字符的时候

```js
		 var friend = "GirlFriend";
        var a = "age";
        var person = {
            name: "小王",
          	age:18
            score: 89.1,
            // friend: "小丽", //如果属性名是一个变量，在对象中也会把这个变量当做一个字符串解析，根本不回去解析变量的值
            GirlFriend: "小丽", //同上
            do: function () {
                console.log("吹水");
            }
        }
        console.log(person.GirlFriend); //小丽
        console.log(person.friend); //undefined//点操作符后面只能跟字符串，不能是变量
        console.log(person[friend]); //小丽
        console.log(person["GirlFriend"]); //小丽
        console.log(person["age"]); //18
		console.log(person[a]); //18
```

```js
var a = {}
        var obj1 = {
            n: 2
        }
        var obj2 = {
            m: 3
        }
        //首先解析obj1，obj1代表一个对象，因为对象的属性一定是一个字符串，所以把obj1代表的对象转换成了字符串，然后设置给a
        a[obj1] = 4; //a = {"[object Object]":4};
        a[obj2] = 5; // a = {"[object Object]":5};
        a[{}] = 6; // a = {"[object Object]":5};
        console.log(a[obj1]) //console.log(a["[object Object]"]) 6
        console.log(a[{}]) //console.log(a["[object Object]"]) 6
        console.log(a);//[object object]:6
```



**9定义函数：**

​                1. new Function

​                2. function声明

​		3.函数表达式

```js
	 var fn1 = new Function("a", "alert(a)");
        fn1(1);
        function fn2() {
            alert(2);
        }
        var fn3 = function () {
        }
```

**10调用函数：**

​                - fn() //一般调用

​                - new fn()//实例化调用

​                - obj.fn()//对象上下文调用

​                - fn.call()/fn.apply()/fn.bind()();//call方法。。调用

### 构造函数

- 使用`Function(p1,p2,p3,p4,..pn,body)`构造函数可以快速生成函数

- Functiono的参数类型都是字符串,p1-pn表示所创建函数的参数名称列表,body表示所创建函数的函数结构体语句,在body语句之间以分号分隔。

- 使用Function()构造函数不是很常用,因为一个函数体通常会包含很多代码,如果将这些代研以一行字符串的形式进行传递,代码的可读性会很差。

  ```js
  var fn1 = new Function("console.log(111)");
  fn1();
  //以下两种传参方式都可以使用
  var fn2 = new Function("a","b","c","console.log(a+b+c)");
  var fn2 = new Function("a,b,c","console.log(a+b+c)");
  fn2(1,2,3);
  ```

  ### [函数直接量](http://doc.lipeihua.vip:8800/#/./JS基础/06.函数?id=%e5%87%bd%e6%95%b0%e7%9b%b4%e6%8e%a5%e9%87%8f)

  - 函数直接量也称为匿名函数,即函数没有函数名,仅包含函数关键字,参数和函数体,具体用法如下 `function (){}`

  - 匿名函数就是一个表达式,即函数表达式,而不是函数结构的语句,可以把匿名函数作为值赋值给变量或者对象等等

  - 当把函数结构作为一个值赋值给变量之后,变量就可以作为函数被调用,此时变量就指向那个匿名函数

  - 匿名函数可以自己调用，比如加上小括号然后整体调用，或者在最前边添加!-+~等等一元操作符

    ​

    **11. 函数的身份：**

    ​                - 作为函数 自身可以调用

    ​		-作为一个对象，可以扩展属性和方法 所以函数也被称作为 函数对象

    ```js
     function fn() {
            }
            fn();
            fn.study = "js";
    ```

    **12匿名函数执行**：

    ​                - 把匿名函数赋值给一个变量，变量调用

    ​                - IIFE

    ​            IIFE：匿名函数自调用

    ​                (匿名函数)()

    ​                +匿名函数()

    ​            IIFE的作用：

    ​                - 构建局部作用域(防止变量污染)

    ​                - 模块化

```js
for (var i = 0; i < 5; i++) {
            (function (i) {
                setTimeout(function () {
                    console.log(i); //0 1 2 3 4
                })
            })(i)
        } 
```

**13.变量声明提前**

** **如果变量声明和函数名相同，如果变量在没有赋值的情况下，不会影响函数执行****

```js
 function abc() {
            alert(0);
        };
        var abc; //如果变量声明和函数名相同，如果变量在没有赋值的情况下，不会影响函数执行
        console.log(abc); //函数代码
```

14.面试题(综合)

**实例化某个构造函数的时候，可以加小括号也可以不加小括号。不加的话没法传参数。**

```js
new Foo;
new Foo();//带参数的优先级（19）比不带参数的优先级高（18）
```

优先级：圆括号（20），成员访问 .    须计算的成员访问[ ]    new（带参数列表）    函数调用（）   可选链？.(都是19，关联性从左到右)

```js
	function Foo() {
            abc = function () {
                alert(4);
            };
            return this;
        }
        Foo.prototype.abc = function () {
            alert(1);
        };
        Foo.abc = function () {
            alert(2);
        };

        function abc() {
            alert(0);
        };
        var abc = function () {
            alert(6);
        };

        Foo.abc(); //2//直接调用Foo.abc   
		////先找到Foo.abc  然后再去函数调用
        abc(); //6//直接调用var abc
        Foo().abc(); //4//调用了Foo//里面的abc成了全局变量覆盖了var
abc为4  
/////函数调用和成员访问的优先级是一样的，依次从左至右运算  先调用了Foo，然后abc为4变成了全局的abc覆盖了下面的abc0和6   调用了Foo函数返回return this，this指向window，所以window.abc（）为4
        abc(); //4//全局变量abc被覆盖成了4
        new Foo.abc(); //2//实例化对象，直接调用函数
////成员访问 Foo.abc 的优先级 比 new Foo 不带参数的new 高，所以先是成员访问相当于new （Foo.abc）（）
        new Foo().abc(); //1//new Foo（）实例化对象，找Foo函数中的abc方法，在prototype原型链上找到。里面的abc不是方法，而是代码属性
////new Foo（）是带参数的   Foo（）.abc成员访问 优先级一样 从左至右 先是实例化Foo，然后顺着原型链在实例化Foo里面找abc，没有，然后在Foo的构造函数中找，还是没有，在Foo的原型对象上找到了为1
        new new Foo().abc(); //1
//new是一元运算符，多个一元运算符在一起，是从右向左执行的
```

**15.a.call(b); //调用了a 并且a中的this指向的是b**

```js
function fn1() {
            console.log(1)
        }

        function fn2() {
            console.log(2)
        }
		  /* 
            fn1.call
                说明fn1对象上有一个call方法
                call方法的作用：
                    - 执行fn1
                        在call方法中怎么把fn1执行的？
                        1. 要在call方法中获取到fn1
                        2. 调用这个获取的fn1
                        3. obj.f() f的this指向obj  fn1.call call的this指向fn1
                        4.call内部的this 执行 this(),就相当于把fn1执行了
                      
                    - 将fn1的this指向fn2   
         */
        fn1.call(fn2); //1
        /* 
            把第一个call称作为call1
            把第二个call 称作为 call2

            fn1.call1 只是拿到了call方法 call1的this现在指向的是fn1

            call2执行之后：
                1.把call1的this指向了fn2
                2.执行了call1 （因为call的源码中有一个 this(),call1的this指向fn2 所以fn2调用了）
        
         */
        // call-- - this();
        fn1.call.call(fn2); //2
```



**16.arguments**

```js
(function (window) {
    window.module1 = {}
    //将来调用add 无论传递几个参数 都可以计算出实参的和
    function add() {
        // arguments 代表所有的实参
        // Array.from(arguments).forEach(function(item,index){})

        // 1.不能直接使用forEach  所以随便写一个数组，拿到forEach  [].forEach-->函数
        //2.[].forEach-->函数   forEach可以遍历前边的数组，因为 forEach的this是指向调用forEach函数的对象
        //3.forEach.call(arguments) 把forEach的this指向了arguments 所以此时forEach遍历的就是arguments
        //4.forEach方法调用需要一个参数，如果使用call调用forEach，forEach的参数应该写在call方法中
        /* [].forEach.call(arguments, function (item, index) {

        }); */
        return Array.prototype.reduce.call(arguments, function (p, c) {
            return p + c;
        })
    }
    function mins(a, b) {
        return a - b;
    }
    window.module1 = {
        add: add,
        mins: mins
    }

})(window);

新方法
/* (function (window) {
    window.module1 = {
        add: function () {
            return Array.prototype.reduce.call(arguments, function (p, c) {
                return p + c;
            })
        },
        mins: function (a, b) {
            return a - b;
        }
    }
})(window); */
```

#### 0909

1**.this是函数中的一个变量，他指向的对象是根据函数调用时候决定的**

​            函数调用有4中方式

​                - test() 自己调用

​                - obj.test() 上下文对象调用

​                - new test() 实例化调用

​                - test.call() call调用

如何确定this指向

​                - 首先确实是否是硬绑定，如果是则this指向call所规定的对象

​                - 是否是实例化调用，如果是实例化调用，则this指向实例化对象

​                - 判断函数调用是否是被上下文对象调用的，如果是 则this指向上下文对象（要注意是否存在隐式丢失现象）

​              -函数自调用 返回window

```js
	 function fn1() {
            console.log(this);
        }
        //1.自调用（默认绑定）  自调用的this指向window
        fn1();
        [1, 2, 3].forEach(function (item, index) {
            console.log(this); //window 回调函数是自己调用的，数组调用的是forEach 而不是forEach中的回调
        })
        setTimeout(function () {
            console.log(this); //当事件到了之后调用，回调函数自己调用,指向window
        })

        // 2.对象调用（隐式绑定）
        var obj = {
            name: "lily",
            fn: fn1 //把fn1变量保存的引用地址 给了fn
        }
        obj.fn() //此时调用的fn1函数  函数调用有一个上下文对象obj  所以this指向的是obj

        document.onclick = fn; //事件函数this指向 绑定事件的元素


        //3.隐式丢失
        var obj1 = {
            name: "lily",
            fn: fn1 //把fn1变量保存的引用地址 给了fn
        }
        var fn2 = obj1.fn; //把obj1的fn属性保存的引用地址给了fn2
        fn2(); //window 这个属于默认绑定 自调用  和obj1没有任何关系


        //4.实例化调用
        var f = new fn1(); //this指向实例化对象 指向f变量保存的对象


        //5.显示绑定（硬绑定）call apply bind
        fn1.call(window) //window
        fn1.call(obj1) //obj1
```

2 **call、apply、bind：**

​                - 每一个函数都有这三个方法

​                - 这三个方法作用一直，都是改变函数运行时的上下文指向，其实就是改变函数中的this指向

​            call\apply 功能一样，但是参数不一样的

​                fn.call(fn的this指向,fn函数的参数 参数和参数之间逗号隔开)

​                fn.apply(fn的this指向,[数组，里边书写的是fn的参数])

​                fn.bind(fn的this指向,fn函数的参数 参数和参数之间逗号隔开) 和call类似

​            call\apply都是改变了this指向 并且调用了函数

​            bind 只是改变了this指向，并且返回了一个新函数的引用，并没有调用函数

```js
  var arr = [1, 2, 3, 4, 5];
        Math.max(1, 2, 3, 4, 5);
        Math.max.call(Math, 1, 2, 3, 4, 5);
        var max1 = Math.max.bind(Math, 1, 2, 3, 4, 5);
        max1()//bind没有自调用
        Math.max.apply(Math, arr);
```

3. prototype：被称作为显式原型

​                1.每一个函数都有自己的显式原型（prototype属性）

​                2.函数只有在使用的时候如果是new调用 才是一个构造函数

​                3.显示原型（prototype其实是一个指针）指向的是 当前函数的原型对象

​                4.所以每一个自己定义函数都有自己的原型对象 默认是空对象

​            constructor：

​                1.构造器

​                    a.constructor  获取的是a的构造函数

​                    '123'.constructor  --> f String

​                    [].constructor  --> f Array

​		2.每一原型对象都有一个constructor属性，指向当前原型对象的构造函数

4.每一个对象都有一个__proto__属性，我们把这个属性称作为隐式原型

​            在ES6之前，我们是不能操作隐式原型的

​            基础原型链总结：  

​                每一个函数都有一个显示原型 prototype 

​                每一个对象都有一个隐式原型 __proto__

​                对象的隐式原型 指向 对象构造函数的 显式原型

5. A instanceof B

​            如果B的显式原型对象 在  A的原型链上（通过__proto__确定的） 则返回true

```js
手写instanceOf
		function instanceOf(A,B){
            //首先获得b的原型对象再做判断
            var Bprototype=B.prototype;
            while(A.__proto__){
                if(A.__proto__===Bprototype){
                    return true;
                }
                A=A.__proto__;
            }
            //最后为null没有找到就为false
            return false;
        }
        console.log(instanceOf(Function,Object));
```

6.面试题

```js
 		//构造函数A
        var A = function () {}
        //给构造函数A的原型对象扩展一个n属性
        A.prototype.n = 1
        //实例化构造函数A 
        //**实例化的时候已经确定好了整个原型链**
        var b = new A();
        //把构造函数的A的原型对象 重新设置为另外一个对象了
        A.prototype = {
            n: 2,
            m: 3
        }
        //再次实例化A
        var c = new A()
        // 实例化的时候已经确定好了整个原型链
        //把构造函数的A的原型对象 重新设置为另外一个对象了
        A.prototype = {
            n: 6,
            m: 7
        }
        console.log(b.n, b.m, c.n, c.m)//1 undefined 2 3
```

```js
 //构造函数F
        var F = function () {};
        //给Object构造函数的原型对象 扩展一个a方法
        Object.prototype.a = function () {
            console.log('a()')
        };

        //给Function构造函数的原型对象 扩展一个b方法
        Function.prototype.b = function () {
            console.log('b()')
        };
        //实例化的F
        var f = new F();

        //把F当做一个函数对象，获取这个对象的a属性，先找F对象自身
        //F是一个函数，所以F的构造函数是Function,所以F.__proto__--->Function.prototype
        //Function的原型对象的__proto__ 指向的是Object的prototype
        F.a() //a
        F.b() //b

        //先找f上有没有a属性
        //然后再找f的构造函数的原型对象  F的原型对象没有设置 所以是空对象
        //再沿着原型链找 Object的原型对象
        f.a() //a
        f.b() //b is not a function
```



#### 0911(11)

**1执行上下文：**

- 在执行js代码的时候，会进行一个准备工作，称为执行上下文，执行上下文在内存中为函数执行创建一个空间。
- 全局的执行上下文只有一个，局部的执行上下文可以有多个，js会创建一个执行上下文栈（stack）用来管理所有的执行上下文。
- 开始解析程序的时候先遇到全局代码，会先在stack中压入一个全局执行上下文，全局上下文等代码全部执行完成才会退出。
- 当代码执行一个函数的时候，就会创建一个函数执行上下文，并把它压入stack中，当函数执行完成，就把当前执行上下文在stack中弹出。

```js
  var scope = "hello";

        function checkscope() {
            var scope = "world";

            function f() {
                return scope;
            }
            return f();
        }
        checkscope();
            var stack = [];
            stack.push([globalContext]);
            stack.push(<checkscope>context);
            stack.push(<f>context);
            stack.pop();
            stack.pop();
```



**2变量对象**

- 变量对象用来保存当前作用域所有的属性和方法的。变量对象在执行上下文中才被激活，只有被激活，才能获取到当前作用域定义的属性和方法。分为全局变量对象和局部变量对象。
- 全局的变量对象就是window对象
- 局部变量对象：
  - 进入执行上下文的时候，首先在变量对象中声明形参 ，并把实参赋值给形参。
  - 其次检查所有声明的函数放到变量对象中，如果有重名的属性，直接覆盖
  - 再次检查当前作用域中所有的变量，以键值对的形式保存在变量对象中，值为undefined
  - 当提升的变量如果和形参或函数有重名的，除非变量被赋值才会覆盖，否则不会干扰已经存在的属性

```js
 		//局部变量对象
        function fn(a, b) {
              /*  创建变量对象：
                var VO = {
                    arguments:{
                        0:1,
                        1:2,
                        2:3,
                        length:3
                    }
                    a:1,
                    b:2
                    doIt:function(){},
                    num:function(){},
                    num:undefined,
                    count:undefined
                }*/
            console.log(num);
            var num = 2;
            var count = 3;
            function doIt() {
                console.log("do")
            }
            function num() {
                console.log(num);
            }
        }
       fn(1, 2, 3);


        function fn(a, b) {
           /*  1.创建一个对象，在里面找变量声明和作为对象的属性名，值为undefined
            2. 在里面找形参声明
            3. 实参赋予给形参
            4. 找函数声明，值赋予函数体 */
            console.log(b); //2 
            console.log(a);//fun
            var b = 10;
            console.log(b);//10

            function a() {
                console.log("a");
            }
        }
        fn(1, 2)
```

3  **什么是闭包:**

​                - 函数嵌套函数，闭包就是内部嵌套的函数

​                - 闭包 是一个包含内部函数引入外部函数变量的那个对象

​                - 闭包是函数内部和函数外部的连接的桥梁（间接的让函数外部读取函数内部的局部变量）

​            构成闭包的条件：

​                - 函数嵌套

​                - 内部函数使用外部函数的变量

​                - 调用外部函数

 闭包的作用（优点）：

​                - 让局部变量在函数执行结束以后，仍然存在于内存当中，延长了局部变量的声明周期

​                - 可以让外部作用域读写内部作用域的变量

​            闭包的生命周期：

​                - 产生：当进入外部函数的时候就产生了，也就是没有执行内部函数的时候就已经产生了

​                - 死亡：因为内部函数引用外部变量的原因，所以闭包存在，当内部函数变成垃圾对象的时候，闭包就消失了

​            闭包的缺点：

​                - 函数执行完成之后，局部变量不会销毁，长时间占用内存，还可能造成内存泄漏

- 解决方法：减少使用、及时释放

  ```js
  function fn1() {
              var a = 2;

              function inner() {
                  a++;
                  console.log(a);
              }
              return inner;
          }

          //inner是定义在fn1中，所以inner可以读取fn1中定义的变量
          //本来inner是局部的函数，但是fn1调用后，把inner返回出去赋值给了一个全局变量f1
          //此时调用全局的f1，就可以读取fn1中的局部变量了
          var f1 = fn1(); //f1就是inner了
          f1(); //3
          f1(); //4
          f1(); //5
          f1(); //6
          f1 = null;//释放内存
  ```

  ```js
   闭包 面试题：
  function fun(n, o) {//（0，undefined）//（1，0）//（2，0） //（3，0）
              console.log(o)//undefined  //0  //0  //0
              return {
                  fun: function (m) {//1   //2   //3
                     return fun(m, n)//引用外部变量n  //fun（1，0）  //fun（2，0）  //fun（3，0）
                  }
              }
          }
          var a = fun(0)//return了一个函数地址值 给全局变量a接收
          a.fun(1)//0 //调用函数fun 返回一个函数fun（m，n）//外部的函数还保存在内存中，继续执行
          a.fun(2)//0
          a.fun(3) //0
  		//a没有设为null的话，则外部函数和内部函数一直被保存在内存中，被全局变量a引用

           var b = fun(0).fun(1).fun(2).fun(3) 
           var b=fun(0);//undefined
           var c=b.fun(1);//fun(1,0)  //0
           var d=c.fun(2);//fun(2,1)  //1
           var e=d.fun(3);//fun(3,2)  //2

          var c = fun(0).fun(1)//0
          c.fun(2)//1
          c.fun(3)// 1
  ```

  ​

  **4创建对象：**

  ​                1.Object构造函数创建 / 字面量的方法创建

  ​                    特点：语句太多，每次创建一个车都要执行一遍代码

  ​                2.工厂模式

  ​                    封装函数

  ​                    特点：无法区分当前对象是谁的。生成的对象没有具体的类型，都是Object

  ​                3.构造函数模式

  ​                    使用构造函数+实例化

  ​                    特点：所有的对象共同的方法都是各自私有的，占用内存

  ​                4.原型模式

  ​                    使用原型添加属性和方法

  ​                    特点：无法给对象定制一些属性（无法传参）

  ​                5.构造函数+原型

  ​                    构造函数可以定制属性（传参）

  ​                    原型对象可以书写共同的方法

  ```js
  5构造函数+原型
          function Car(name, color, speed) {
            //如果当前的函数被new调用了，当前函数就是一个构造函数
              //构造函数中的this指向其实例化对象
              //构造函数不需要先创建一个对象，因为实例化的时候本身就创建了一个对象
              this.name = name;
              this.color = color;
              this.speed = speed;
          }
          Car.prototype.run = function () {
              console.log("最高时速" + this.speed);
          }

          var car1 = new Car("BMX-X1", "red", 300);
          var car2 = new Car("BMX-X3", "red", 330);

          console.log(car1 instanceof Car); //true
          console.log(car1.constructor); //Car
          console.log(car1.run === car2.run); //true
  ```

5. 公有属性和公有方法:设置**给实例化对象的属性和方法**

   私有属性和私有方法:声明**在构造函数中的变量或函数**

   静态属性和方法:js中**无需实例化就可以调用**的方法或属性

   特权方法：在构造函数中给实例对象绑定的方法

```js
      function Car(color, speed) {
            //私有属性
            var num = 0;
            //私有方法
            function fn() {
                console.log("fn")
            }
            //这个属性是设置给所有实例化对象的（公有属性）
            this.color = color;
            this.speed = speed;

            //在构造函数中给实例化对象设置的方法被称作为 特权方法
            this.getColor = function () {
                console.log("特权方法")
            }
        }
        //这个方法是设置给所有实例化对象的（公有方法）
        Car.prototype.run = function () {
            console.log("驾~")
        }
        //就是简单的把Car当做一个对象（函数对象），扩展了属性和方法
        //这些属性和方法被称作为静态属性和静态方法
        Car.title = "造车";
        Car.do = function () {
            console.log("doit")
        }
```

**6.new 的过程**

​	创建一个空对象 将来会返回这个对象

​	调用构造函数，并将构造函数的this指向新创建的对象

​	把原型对象的方法给新创建的对象，把新创建对象的__proto__指向构造函数的显式原型

​	判断构造函数的返回值，来决定new的返回值是构造函数的返回值还是实例化对象

```js
 function Car(color, speed) {
            this.color = color;
            this.speed = speed;
            //如果构造函数return一个对象，则实例化的返回值丢弃实例化对象，返回return的值
            //如果构造函数return一个基本值，则忽略 ，仍然返回实例化对象
            /* return {
                name: "lily"
            } */
            return 2;
        }

        Car.prototype.run = function () {
            console.log("驾~")
        }
        function writeNew(Car){
            var o={};
            var result=Car.apply(o,Array.prototype.slice.call(arguments,1));
            var obj= typeof result==='object'&&result!=null;
            var fun=typeof result ==='function';
             //判断Car构造函数的返回值，如果是Object类型  则丢弃o 如果是基本类型 则返回o
            return(obj||fun)?result:o;
        }

        var car1=writeNew(Car,'red','200');
        var car2=writeNew(Car,'black','300');
        console.log(car1);
        console.log(car2);
```



**7作用域链**

- 在声明函数的时候会创建一条包含全局变量对象的作用域链。用途：保证对  当前执行环境  所能够访问的所有变量和函数的  有序访问
- 在函数定义没有执行的时候，作用域链是不完整的，最前端没有变量对象。当函数调用并创建执行上下文时，当前作用域的变量对象会在作用域链的最前端，此时作用域链完整并激活。作用域链的最末端是window对象。
- 当查找一个变量的时候，就会沿着作用域链去查找，如果查不到就会抛出错误。


#### 0912

1.**多态**:JS对象多态性是与生俱来的：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果，也就是说，给不同的对象发送同一个消息时，这些对象会根据这个消息分别给出不同的反馈。

**封装**：包括封装数据、封装实现。封装实现：即隐藏实现细节、设计细节，封装使得对象内部的变化对其他对象而言是不可见的，对象对它自己的行为负责，其他对象或者用户都不关心它的内部实现，使用者只需要知道如何使用即可.封装使得对象之间的耦合变松散，对象之间只通过暴露的API接口来通信。

2.继承

```js
	function Animal(name,age){
            this.name=name;
            this.age=age;
        }
        Animal.prototype.eat=function(){
            console.log('chi');
        }
        function Cat(name,age,color){
            //构造函数继承
            Animal.call(this,name,age);
            this.color=color;
        }
        //原型链继承
        Cat.prototype=new Animal();
        Cat.prototype.constructor=Cat;
        Cat.prototype.do=function(){
            console.log("玩红外线");
        }
        var cat1=new Cat('xiaohua',2,'white');
        console.log(cat1);
        console.log(cat1.eat);
        console.log(cat1.do);
```

**3.进程和线程**

​                1**.进程**是程序的某一次的执行，主要在内存开启一定的空间

​                2**.线程**是进程的一个独立单元，是cpu的基本调度单位

​                3.有的程序是单进程的  有的程序是多进程的（多个进程不可以共享数据）

​                4.有的进程是单线程( 编程简单,效率低)，有的进程是多线程:多个线程可以共享数据, 可以提高CPU的利用率;但是创建多个线程和切换线程的时候会有额外的开销，容易产生死锁（活锁、饿死）。

4.浏览器内核：

- 支撑浏览器运行的最核心的程序
- 不同的浏览器可能不一样
  - Chrome, Safari : webkit
  - firefox : Gecko
  - IE : Trident
  - 360,搜狗等国内浏览器: Trident + webkit
- 内核由很多模块组成
  - 主线程
    - js引擎模块 : 负责js程序的编译与运行
    - html,css文档解析模块 : 负责页面文本的解析
    - DOM/CSS模块 : 负责dom/css在内存中的相关处理
    - 布局和渲染模块 : 负责页面的布局和效果的绘制(内存中的对象)
  - 分线程
    - 定时器模块 : 负责定时器的管理
    - DOM事件响应模块 : 负责事件的管理
    - 网络请求模块 : 负责ajax请求
  - 定时器：一般会延迟一丁点(可以接受), 也有可能延迟很长时间(不能接受)
  - 定时器回调函数是在主线程执行的, js是单线程的。

**5.事件轮询机制：**

​                - 代码分类：

​                    - 同步代码：初始化代码、绑定事件、定义计时器、发送ajax

​                    - 异步代码：事件执行后的回调函数、计时器到期后的回调函数，ajax成功后的回调函数

​                - js执行代码的顺序：

​                    先执行同步代码

​                    等待同步代码执行完成后才执行异步代码

​                - 模型由两个重要内容

​                    - 事件管理模块

​                    - 回调队列

​                - 事件轮询机制：

​                    - 执行初始化同步代码，把相应的回调给到浏览器对应的管理模块（事件回调->事件管理模块 、计时器回调->计时器管理模块  、ajax回调->ajax管理模块）

​                    - 当事件发生或计时器到期等等。。就会把相应的回调函数添加到回调队列中，等待执行

​		   -等初始化代码指向完毕，js引擎就会循环的检查回调队列中的回调函数，并执行

**6.h5新属性多线程**

- H5规范提供了js分线程的实现, 取名为: Web Workers
- 相关API
  - Worker: 构造函数, 加载分线程执行的js文件
  - Worker.prototype.onmessage: 用于接收另一个线程的回调函数
  - Worker.prototype.postMessage: 向另一个线程发送消息
- 不足
  - worker内代码不能操作DOM(更新UI)
  - 不能跨域加载JS
  - 不是每个浏览器都支持这个新特性