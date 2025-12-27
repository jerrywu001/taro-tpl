# Claude Code Hooks 配置说明

本文档说明 `.claude/settings.local.json` 中配置的 hooks。

## SubagentStop Hook

### 功能

在子 agent 完成工作后自动执行 ESLint 代码规范修复。

### 配置

```json
{
  "hooks": {
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint:fix",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

### 说明

- **触发时机**：当任何子 agent（如 Task tool 启动的 agent）完成工作时
- **执行命令**：`npm run lint:fix` - 自动修复代码规范问题
- **超时时间**：60 秒
- **优势**：
  - 自动化代码质量保证
  - 无需手动运行 lint 修复
  - 确保所有 agent 生成的代码符合项目规范

## 可用的 Hook 类型

Claude Code 支持以下 hook 类型：

- **PreToolUse** - 工具使用前执行
- **PostToolUse** - 工具使用后执行
- **Notification** - 通知时执行
- **UserPromptSubmit** - 用户提交提示后执行
- **SessionStart** - 会话开始时执行
- **SessionEnd** - 会话结束时执行
- **Stop** - 停止时执行
- **SubagentStop** - 子 agent 停止时执行（当前使用）
- **PreCompact** - 压缩前执行

## Hook 配置结构

每个 hook 可以包含两种类型：

### 1. Command Hook（命令钩子）

```json
{
  "type": "command",
  "command": "shell command to execute",
  "timeout": 60
}
```

### 2. Prompt Hook（提示钩子）

```json
{
  "type": "prompt",
  "prompt": "LLM prompt to evaluate. Use $ARGUMENTS placeholder for hook input JSON.",
  "timeout": 60
}
```

## 最佳实践

1. **合理设置超时**：避免 hook 执行时间过长影响工作流
2. **选择合适的触发时机**：根据需求选择合适的 hook 类型
3. **避免副作用**：确保 hook 命令不会破坏项目状态
4. **使用白名单**：在 `permissions.allow` 中添加 hook 需要的命令权限

## 相关命令

- `npm run lint` - 运行所有代码检查（OxLint + ESLint + StyleLint）
- `npm run lint:fix` - 运行 ESLint 并自动修复问题（hooks 使用）
