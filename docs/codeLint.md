---
outline: deep
---

# 代码规范

## GIT规范

因为所有人开发水平参差不齐，这里暂时不考虑自动化检测，后续大家习惯逐渐统一之后，会加入代码提交自动检测的。

### 提交内容规范

1. **避免空文件的提交！！绝对避免！！**
2. 不要提交空信息，每次提交用最简单的话写明白自己做了什么。
3. 多文件修改不要一次性提交，尽可能分开提交文件，将自己每次修改了什么单次提交。
4. 做有意义的提交，每次提交尽可能是一次工作完成的节点，通过撤回上次提交来修改每次提交进度的内容。
5. 每次提交之前进行代码格式化，让风格大体统一，保证编译不报错。

这里我逐个解释一下原因。

1. 避免空文件，是为了避免打包时候，vite打包会报错，空文件导致vite无法编译。
2. 空信息不便于排查，数个月之后排查对应代码，没有清晰的信息，很难排查对应的错误。
3. 多文件一次性提交，同样不利于排查，如果本次提交导致报错，会加大排查的工作量。
4. 无意义提交太多，同样也会增加排查的工作量，所以尽可能让每次提交都是一个功能的闭环。
5. 暂时因为所有人的开发水平不一致，所以这里不考虑使用代码提交格式检测，但是尽可能的保证每次代码的规范性。



## 组件拆分规范

组件拆分是很重要的一环，vue3相对于v2做了很多解耦的便捷性改动，我们必须利用好这些特性。

### 拆分思路

1. 常规列表的增删改查，尽可能的项目中封装好的动态表单和表格来实现，不要用`element-plus`的自己写
2. 如果页面有弹窗操作，先看看这类弹窗操作是否在原项目中多次复用，如多次复用，需将该类弹窗操作封装成公用业务组件，通用业务组件代码统一放在`src/component/business`文件夹下，命名规则为大驼峰命名法。
3. 如果群内有其他人完成开发，则可以考虑直接复用他人组件。
4. 如果是普通的新增或编辑弹窗操作，命名`MoudleAction`新开一个文件夹进行书写。



## JS规范

因为本次开发以Vue3技术栈为主，所以这里有些规范会偏向于vue3的书写思路。

### 组合式优先

1. template标签放在最上方，不要把script标签放在上方
2. 直接在script标签中添加setup，不要在内额外使用`setup()`函数增加额外的代码行数
3. 不推荐用ref包裹业务变量，ref应该用来去包裹一些非业务的，界面操作性质的变量。
4. 不推荐用react的函数式写法去写组件
5. 使用reactive成块的包裹业务块，成块的分割逻辑，便于代码逻辑的阅读

```javascript
<script>
/**@table - 用reactive包装,将变量和方法都封在这一个逻辑块中，这块的是最核心的代码*/
const table = reactive({
    column:[],
    data:[],
    listLoading: false,
    request: ()=>{
        // 封装请求，这里我们赋值也不需要从.value什么的拿，直接用table.data就能获取列表的值，简直方便，省的ref那种搞法了。
    },
    add:()=>{},
    action:()=>{
        // 这里存放增删改查的逻辑
    },
    delete:() =>{}
})

/**@module XX1模块 - 日常开发时优先采用这种命令式直接写业务逻辑，不要包裹到table中，便于特殊处理，如果业务逻辑过于复杂，就抽离到一个单独的TS文件中*/
function todoA(){}

/**@module XX1模块 - 钩子这块直接放置所有需要触发的机制*/
onMounted(()=>{
    table.request()
})
</script>
```



### 尽可能的削减代码行数

1. 在不需要代码换行的时候，尽量避免换行，比如动态表单和动态表格，都尽量避免换行；
2. 优先考虑三目运算符，但谨记不要写超过3层的三目运算符；
3. 多使用扩展运算符`...`和解构赋值，在接口提交参数的时候放出去；
4. 接口放在api文件下统一处理，减少甚至避免在vue文件中用url写入原生的url；

### 使用async await获取数据

```js
/** 
* 接口请求 
* @param req 接口api 
* @param params 参数 
*/ 
const table = reactive({
    request: async(params:any) =>{
        const res = await req(params) 
        return Promise.resolve(res) 
    }
})
```

### 坚持函数功能单一原则

函数内仅做该函数应该做的，尽量避免通过传入标记控制不同行为；

通过命名语义化减少代码阅读的难受程度。

1. request，将代码接口请求逻辑封装在此类命名的方法中，避免使用
2. action，代表操作逻辑的聚合，减少非操作的业务逻辑的聚合

### 使用`/@`代替src

在vue-cli 脚手架使用架自带的指向 src 开发目录的 '/@' 符号引入文件资源.

当然，这点可以通过代码智能提示自动引入，平时搭建不用太过关注。

### 统一使用单引号

简单的来说就是业务中的JS代码字符串之类的，用单引号而非双引号。

不过，这个有eslint规范会自动格式化的，大家平时用不着记。



## 命名规范

命名规范是为了解决代码目录阅读速度慢的问题，这里做的规定尽量做。

不然后续排查起成百上千的文件夹，实在太过麻烦。

### 目录命名

- 业务文件目录命名 按照小驼峰命名，首字母小写（如：projectName）
- 组件目录命名 按照大驼峰命名，如下：

```js
|-- components
| |-- ProjectName
| | | -- ProjectName.vue
| | | -- index.js
```

小驼峰命名的业务文件，便于日常翻阅。

而大驼峰对应的组件，则可以避免全局引入的时候出现代码混淆的问题。



### 文件命名

1. 按照路由的路径进行命名，存放在views目录中。
2. 非路由的文件，尽可能的复用原项目的名称，如果原项目文件名太过冗长，可适当缩短。
3. 按照小驼峰命令，英文单词过长或超出2个以上，可缩略至前四位。

```js
// 业务统计 
approvalStatistical 

// 缩略 
approvalStat
```



### 方法命名

这里尽量按照原本的代码进行处理即可。

按照小驼峰命名法，可使用常见动词约定；

- `can` 判断是否可执行某个动作，函数返回一个布尔值。true：可执行；false：不可执行
- `has` 判断是否含有某个值， 函数返回一个布尔值。- true：含有此值；false：不含有此值
- `is`： 判断是否为某个值，函数返回一个布尔值。true：为某个值；false：不为某个值
- `get`： 获取某个之，函数返回一个非布尔值
- `set`： 设置某个值，无返回值、返回是否设置成功或者返回链式对象 load 加载某些数据,无返回值或者返回是否加载完成的结果

语义化英文命名，仅组件内部使用方法前加上_（下划线）区分，如下

```js
// 公共方法的定义，可以提供外面使用
publicbFunction () {} 

// 私有方法，下划线定义，仅供组件内使用。多单词，注意与系统名字冲突！
_privateFunction () {} 
```

#### 引入组件

首字母大写的驼峰法命名。推荐使用 ES6 的方式引入

```js
import Article from 'xxx' 
import ArticleDetail from 'xxx'
```

#### 变量

使用驼峰式命名，优先使用`let`、`const`、避免使用`var`

```js
let userName = ref('luffy')

const userInfo = reactive({ 
  name: 'luffy'
})
```

#### 常量

字母全部大写，以下横线`_`划分

```js
const Api = { 
  ITEMS_OFONE_TYPE = '***', // 获取事项分类 
  SOLUTION_LIST = '***',, // 获取事项列表
}
```

### 常用词

这里常用的增删改查可能之前大家各有习惯，这里推荐使用

### 常用动词

| 简写                | 说明      |
| ------------------- | --------- |
| get\set             | 取值\给值 |
| add\remove          | 增加\移除 |
| show\hide           | 显示\隐藏 |
| view                | 查看      |
| browse              | 浏览      |
| modify              | 修改      |
| save                | 保存      |
| delete              | 删除      |
| find                | 查询      |
| undo                | 撤销      |
| redo                | 重做      |
| clean               | 清除      |
| index               | 索引      |
| observe             | 观察      |
| send\receive        | 发送\接收 |
| refresh\synchronize | 刷新\同步 |

1. 常用缩写

| 数据类型/标签 | 简写后缀 |
| ------------- | -------- |
| object        | obj      |
| array         | arr      |
| json          | json     |
| function      | fn       |
| message       | msg      |
| button        | btn      |

### 样式命名

这里不做强制要求，但是样式命名尽可能的语义化，不要`-l,-r,-t,-b`这种简写无限嵌套，这种很读起来很伤神的。

样式，尽可能的少些甚至不写，用自带组件的样式解决就可以，不要非得去还原样式。

class命名以小写字母开头，小写字母、中划线和数字组成。不建议使用驼峰法命名 class 的属性。

以下是一些常用到的 class的名字：

- 包裹层: .xx-wrap;
- 列表: .xx-list;
- 列表项: .xx-list-item; 
- 左边内容: .xx-left; 
- 中间内容: .xx-middle; 
- 右边内容: .xx-right; 
- 某个页面: .xx-page;

## 调试

### 及时删除log调试日志

一旦代码合并到正式分支中，对于无用代码必须及时删除，例如：一些调试的 console 语句、无用的弃用功能代码。

```js
// 推荐 
console.log('路由': 文件路由, '打印简述': 打印数据) 

// 不推荐 
console.log(打印数据, '1111')
```





## 注释规范

### 单行注释

双斜线后应跟空格，且缩进与上下文的代码保持一致

```js
// 一些说明... 
const userID = 24; 
```

### 多行注释（不推荐）

一般用于注释难以理解的、可能存在错误的、逻辑强的代码，且缩进一致；

```js
/* 
* 针对下方代码的说明 
* 第一行太长写第二行 
*/ 
const a = 1；
```

### 函数注释

如果特别重要的方法，且复用度很高才推荐使用）写明传入参数名称，类型，推荐完整注释以下格式；

```js
/** 
* @Description 加入购物车
* @Author lint 
* @Date 2020-09-08
* @param {Number} goodId 商品id 
* @param {Array<Number>} specs sku规格 
* @param {Number} amount 数量 
* @param {String} remarks 备注
* @returns <Promise> 购物车信息 
*/ 
apiProductAddCard = (goodId, specs, amount, remarks) => { 
  return axios.post('***', { goodId, specs, amount, remarks }) 
}
```



## HTML规范

### 语义化标签

标签语义化，切忌清一色的 div 元素。列表可以使用 ul li，文字使用 p 标签，标题使用 h* 标签，等等。 

HTML5 推出了语义化的标签，建议使用：section，aside，header，footer，article，等 HTML5 布局标签。

### 自定义标签

推荐使用自闭合标签的写法(自闭合标签不使用连线方式）。

不用记，格式化工具会自动处理。

```javascript
<MyComponents />
```

### 多特性分行写

不用记，格式化工具会自动处理。

```js
<template> 
   <scroll 
      ref="scrollWrap" 
      class="home-scroll-warp" 
      :data="homeData" 
      :pullDownRefresh="true" 
      :pullUpLoad="true" 
      @pullingDown="pullingDownGetNewData" 
      @pullingUp="pullingUpGetMore" 
   />
</template>
```

### 使用表达式

在模版中使用表达式，复杂情况使用计算属性或函数，如下：

```javascript
<template>
  <div v-show="getLimitData(data)"> 
   ... 
  </div>
</template>

// 反例
<template> 
  <div v-show="data.type !== 'dir' && dzqz && hasBtn && attrs.mode !== 'ended'"> 
   ... 
  </div> 
</template>
```

### 代码嵌套

尽可能的保证代码行缩减，避免半个标签占一行的情况

```javascript
// 不推荐
<div>
  <h1>
  	test-title  
  </h1>
  <p>
  	test-text  
  </p>
</div> 
<p><span></span><span></span></p>

// 第二种
<div>
    <h1></h1>
	<p></p>
</div>
<p> 
  <span></span>
  <span></span>
</p>
```



### 避免重复

避免过多重复代码，如果超过三行类似的代码，配置数据再循环遍历



### 活用v-show, v-if 

v-show，v-for，v-if不要同时出现在一个标签上。

- v-show不会改变dom树，也就是说不会导致重排。
- v-if会改变dom树，会导致重排。

比如，我们在查询表单的页面上，不要用v-if，用v-show会减少页面性能的开销。



### 注释规范

```js
<!-- 单行注释 -->
<div class="test">
  <!-- 组件注释 -->
  <CustomTable ref="customTableRef" />
  <!-- 其他注释 -->
  <div>...</div>
</div>

<!-- 
  多行注释
  多行注释
-->
<div>内容</div>
  
```



## CSS规范

推荐使用UnoCSS引擎进行原子化CSS开发 推荐使用scss预编译 由于样式的情况比较多也比较复杂  做出如下规范

### 避免

- 避免使用标签选择器。因为在 Vue 中，特别是在局部组件，使用标签选择器效率特别低，损耗性能，建议需要的情况，直接定义 class；
- 非特殊情况下，禁止使用 ID 选择器定义样式。有 JS 逻辑的情况除外；
- 避免使用important选择器；
- 避免大量的嵌套规则，控制在3级之内，对于超过4级的嵌套，考虑重写或新建子项；
- 避免使用ID选择器及全局标签选择器防止污染全局样式；

### 推荐使用

- 提取公用样式进assets文件styles里，按模块/功能区分；

```js
|assets
|-- styles
| |-- common 放置公用样式，如重置，混合，复写element样式等 
| |-- modules 放置模块样式
```

- 推荐使用直接子选择器；

```js
/* 推荐 */ 
.jdc {} 
.jdc li {} 
.jdc li p{}

/* 不推荐 */ 
*{} 
#jdc {} 
.jdc div{}
```

- 使用 scoped 关键字，约束样式生效的范围

```js
<style lang="scss" scoped>
.app-wrapper {
  ... 
}
</style>
```

- 使用变量 可复用属性尽量抽离为页面变量，易于统一维护

```css
/* css */ 
.class-name { 
  color: red;
  border-color: red; 
} 

/* scss */  
$color: red; 
.class-name { 
  color: $color;
  border-color: $color; 
}
```

### 书写顺序

CSS 属性书写顺序：先决定定位宽高显示大小，再做局部细节修饰，推荐顺序（可以提升浏览器渲染 `dom` 的性能）：

定位属性(或显示属性，display)->宽高属性->边距属性(margin, padding)->字体，背景，颜色等，修饰属性的定义，这样定义为了更好的可读性，让别人只要看一眼就能在脑海中浮现最终显示的效果。

1. 布局定位属性：display / position / float / clear / visibility / overflow
2. 自身属性：width / height / margin / padding / border / background
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
4. 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient … 以下给出常用的定义示例：

```javascript
.class-name {
  position: fixed;
  top: 100px; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  display: block; 
  width: 100%; 
  height: 100%;
  margin: 10px; 
  padding: 10px; 
  font-size: 14px; 
  color: #000; 
  background-color: red; 
  border-radius: 2px; 
  line-height: 1.42; 
}
```

### 样式覆盖

组件内部需要覆盖UI框架样式，必须在最外层组件加类名

### 注释规范

以/ 注释内容 /格式注释，前后空格，嵌套子类需要一个回车分割开

```javascript
/* 注释内容 */
.pha-element {
  width: 20px;
  /* 这里需要换行 */ 
  .pha-element-l { 
    color: blue 
  } 
}
```





## 参考

[前端代码规范（vue篇）](https://juejin.cn/post/7331714933388525580?searchId=20240620205348AEFE866814D0411E41DB)

[浅析ref与reactvie的区别](https://crazystudent13.cn/2024/06/04/%E6%B5%85%E6%9E%90ref%E4%B8%8Ereactvie%E7%9A%84%E5%8C%BA%E5%88%AB)
