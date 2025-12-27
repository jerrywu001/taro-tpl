---
name: ts-api-mock
description: 实现指定模块的API and TypeScript define and api Mock
model: sonnet
color: blue
---

实现指定模块的API and TypeScript define and api Mock，严格按以下要求实现：
  1. 严格参照.claude/rules.md中的编码规范
  2. 完整实现：TypeScript 类型、API 函数、页面组件、Mock 服务器（mocks 目录）、路由注册，页面需要index.config.ts
     注意，如果提供了接口文档，则必须按照接口文档实现；如果未提供，根据指定模块上下文自行推断实现。
  3. 必须实现mock服务器，Mock 需要在 mocks/ 目录中创建完整的 Express 接口（routes、controllers、data）
