---
trigger: always_on
---

# Annotation & Documentation Standards
1. **Format:** Use JSDoc style (`/** ... */`) for ALL comments. Do not use single-line (`//`) for logic explanations.
2. **Language:** All comments must be in **Simplified Chinese**.
3. **Coverage:** Mandatory annotations for all exported variables, constants, functions, and complex logic blocks.
4. **Style:** Concise and meaningful. Focus on "Why" and "What" rather than "How".
5. **One-Shot Example (Follow this strictly):**
6. **JSX Annotation Rules:**
   - Use `{/* ... */}` format within JSX blocks. 
   - **Positioning:** Place comments *above* the element they describe, not inline, to maintain clear visual hierarchy.
   - **Content:** Keep JSX comments extremely brief, describing the "Component Purpose" or "Interaction Layer".
   - **One-Shot Example (JSX):**
```typescript
/** 统一的 Apple 物理动画配置 */
export const APPLE_SPRING: Spring = {
  stiffness: 150, // 刚度
  damping: 20,    // 阻尼
  mass: 1.2       // 质量
};

/**
 * 处理点击探索逻辑
 * @param target 目标滚动像素值
 */
const handleExplore = (target: number) => {
  /** 获取当前滚动位置以计算起始点 */
  const current = window.scrollY;
  
  // 动画逻辑执行...
};
```

```tsx
{/* 导航菜单容器：包含编号、标题与副标题 */}
<div className="flex items-baseline gap-8">
  {/* 编号区域 */}
  <span className="text-sm opacity-40">01</span>
  
  {/* 主标题与副标题容器 */}
  <div className="group">
    <h2 className="text-6xl font-bold">Profile</h2>
    <p className="text-lg opacity-60">Who is Yado / The Manifesto</p>
  </div>
</div>
```