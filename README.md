## 前言

本文档旨在为了解决多个项目开发不协调的问题，不同的代码习惯与提交习惯，让开发管理进度失控。

每次开发组长汇总各个组员的代码，看着不同风格的代码和奇怪的提交记录，想必是很崩溃。

那么，干脆汇总一下平日的问题，整理出一套行之有效的规范，解决这些因不规范造成的混乱问题吧。



### 开发

本项目基于vitepress实现，推荐使用pnpm安装所有的依赖包。

#### 依赖安装

```bash
pnpm install
```

如果您在国内发现安装依赖不成功，可以尝试切换为国内的淘宝镜像源。

```bash
pnpm config set registry https://registry.npmmirror.com
```

#### 本地开发

```bash
# 开发模式
pnpm run dev

# 预览模式，需要本地先打好发布包才能预览
pnpm run preview 
```

#### 项目发布

目前已经发布流程通过github Action做了自动化集成，未在本地集成自动化发布流程。

如果您Fork了本项目，未做好对应的服务器配置，那么打完发布包之后，需要您自己手动部署到服务器上。

```bash
pnpm run build
```



### 内容

规则书大致分为以下部分，后续会随着开发不断完善该规则书。

#### git规范

代码提交规范的指定，可以辅助自动生成更新记录，让所有人更清楚的明白开发了什么东西。



#### 代码规范

减少不必要的代码格式冲突，让不同的人的代码合并的时候，不会因为风格问题吵起来。



#### 偏好配置

辅助代码规范，让开发者不必去记忆代码规范，只要通过格式化的配置，就能让代码按照统一的风格处理。



#### 设计规范

记录一些无效的天坑设计，让前端在面对设计人员的时候，至少不至于无话可说，需要反驳一些明显不对劲的设计。
