# Vue 面试题汇总

 Web2001zz汇总面试题

## 什么是MVVM？

- MVVM是Model---View---ViewModel的缩写
- M - model 数据模型 存储数据的地方
- V - View 视图层 UI组件等
- VM  - ViewModel 可以理解为控制层，操作MV的同步变化
- Model和View实际上并没有直接的交互，而是通过VM进行交互
- 在MVVM模式下 我们可以通过VM来实现将数据模型实时渲染到视图层上，而又能在视图层上对数据模型进行操作
- 简单来说 MVVM模式就是真正的双向数据流



## MVVM和MVC有什么区别？

- MVC与MVVM类似 其中C表示Control控制层
- 对比MVVM MVC模式只能在控制层中控制数据渲染到视图上 却不能在视图上对数据进行操作
- 简单来说 两者最本质的区别就是 ：MVC是单向数据流，而MVVM是双向数据流