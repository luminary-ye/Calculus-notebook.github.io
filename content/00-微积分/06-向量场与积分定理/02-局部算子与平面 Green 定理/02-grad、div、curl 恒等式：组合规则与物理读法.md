# grad、div、curl 恒等式：组合规则与物理读法

> [!abstract] 本节主线
> $\nabla$ 可以和标量场、向量场组合出梯度、散度、旋度。最重要的两条恒等式是
> $$
> \nabla\times(\nabla f)=\vec0,
> \qquad
> \nabla\cdot(\nabla\times\vec F)=0.
> $$
> 它们分别说：梯度场没有旋度；旋度场没有散度。

> [!info] 和前后讲义的关系
> 本节补强 [[04-数学/00-微积分/06-向量场与积分定理/02-局部算子与平面 Green 定理/01-散度与旋度：局部源汇、局部旋转与 del 语言|散度与旋度]] 的代数层，也解释 [[04-数学/00-微积分/06-向量场与积分定理/01-向量场与线积分/06-保守场判别：单连通、旋度为零与势函数构造|保守场判别]]、[[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/01-Stokes 定理：曲面旋度与边界环流|Stokes 定理]] 和 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/03-散度定理：空间内部源汇与闭合曲面通量|散度定理]] 中常见的“为零”现象。

## $\nabla$ 到底能做什么

> [!question] 先问一个问题
> 为什么同一个符号 $\nabla$ 有时写成 $\nabla f$，有时写成 $\nabla\cdot\vec F$，有时又写成 $\nabla\times\vec F$？

可以把 $\nabla$ 暂时看成一个“等待作用的微分向量”：

$$
\nabla=
\left\langle
\frac{\partial}{\partial x},
\frac{\partial}{\partial y},
\frac{\partial}{\partial z}
\right\rangle.
$$

它和不同对象组合，得到不同类型：

- 对标量场 $f$：$\nabla f$ 是向量场。
- 对向量场 $\vec F$ 做点积：$\nabla\cdot\vec F$ 是标量场。
- 对向量场 $\vec F$ 做叉积：$\nabla\times\vec F$ 是向量场。

> [!tip] 类型检查
> 先看输入输出类型，很多错误会自动暴露：散度的输出是标量，旋度的输出是向量，梯度的输出也是向量。

## 两条最重要的恒等式

> [!note] 恒等式
> 若函数和向量场足够光滑，则
> $$
> \nabla\times(\nabla f)=\vec0,
> $$
> 以及
> $$
> \nabla\cdot(\nabla\times\vec F)=0.
> $$

第一条说，真正来自势函数的梯度场没有局部旋转。第二条说，任何旋度场都没有局部净源汇。

```tikz
\begin{document}
\begin{tikzpicture}[scale=0.95, >=stealth]
  \node[draw, rounded corners=2pt, fill=blue!8, minimum width=2.2cm, minimum height=0.75cm] (scalar) at (0,0) {scalar $f$};
  \node[draw, rounded corners=2pt, fill=green!10, minimum width=2.4cm, minimum height=0.75cm] (grad) at (3.4,0) {$\nabla f$};
  \node[draw, rounded corners=2pt, fill=red!8, minimum width=2.4cm, minimum height=0.75cm] (curlgrad) at (6.9,0) {$\vec0$};

  \node[draw, rounded corners=2pt, fill=purple!9, minimum width=2.2cm, minimum height=0.75cm] (vec) at (0,-1.8) {vector $\vec F$};
  \node[draw, rounded corners=2pt, fill=orange!12, minimum width=2.4cm, minimum height=0.75cm] (curl) at (3.4,-1.8) {$\nabla\times\vec F$};
  \node[draw, rounded corners=2pt, fill=red!8, minimum width=2.4cm, minimum height=0.75cm] (divcurl) at (6.9,-1.8) {$0$};

  \draw[->, thick] (scalar) -- node[above] {grad} (grad);
  \draw[->, thick] (grad) -- node[above] {curl} (curlgrad);
  \draw[->, thick] (vec) -- node[above] {curl} (curl);
  \draw[->, thick] (curl) -- node[above] {div} (divcurl);
\end{tikzpicture}
\end{document}
```

## 为什么 $\nabla\times(\nabla f)=\vec0$

若

$$
\nabla f=\langle f_x,f_y,f_z\rangle,
$$

则

$$
\nabla\times(\nabla f)
=
\left\langle
f_{zy}-f_{yz},
f_{xz}-f_{zx},
f_{yx}-f_{xy}
\right\rangle.
$$

如果 $f$ 的二阶偏导连续，混合偏导可以交换顺序，因此每个分量都是 $0$。

> [!example] 直接算一遍
> 令 $f=x^2y+yz^2$。则
> $$
> \nabla f=\langle2xy,\ x^2+z^2,\ 2yz\rangle.
> $$
> 计算旋度：
> $$
> \nabla\times(\nabla f)
> =
> \langle 2z-2z,\ 0-0,\ 2x-2x\rangle
> =
> \vec0.
> $$

> [!warning] 条件不要丢
> 这条恒等式依赖混合偏导相等。若函数不够光滑，或者讨论区域有奇点，不能机械套用。

## 为什么 $\nabla\cdot(\nabla\times\vec F)=0$

设

$$
\vec F=\langle P,Q,R\rangle.
$$

旋度为

$$
\nabla\times\vec F
=
\langle R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\rangle.
$$

再取散度：

$$
\frac{\partial}{\partial x}(R_y-Q_z)
+
\frac{\partial}{\partial y}(P_z-R_x)
+
\frac{\partial}{\partial z}(Q_x-P_y).
$$

展开后，各项按混合偏导相等成对抵消。

> [!tip] 物理读法
> 旋度描述局部环流。一个纯粹由环流产生的场，不会在内部凭空产生或消失净流量，所以散度为零。

## 反过来不一定成立

> [!failure] 不要倒推
> $\nabla\times\vec F=\vec0$ 不总能推出 $\vec F=\nabla f$，除非区域条件合适。
> $\nabla\cdot\vec F=0$ 也不自动推出 $\vec F=\nabla\times\vec G$，同样需要区域条件和更高阶的理论支持。

这和保守场判别里的“有洞区域”是同一种风险：局部导数为零，不一定能直接推出全局势函数存在。

## 常用乘积规则

有时会遇到标量场 $f$ 和向量场 $\vec F$ 的乘积。常用规则是：

$$
\nabla\cdot(f\vec F)
=
\nabla f\cdot\vec F+f\,\nabla\cdot\vec F,
$$

以及

$$
\nabla\times(f\vec F)
=
\nabla f\times\vec F+f\,\nabla\times\vec F.
$$

它们是乘积法则的向量版本。第一条常出现在通量和守恒方程里，第二条常出现在电磁和流体的场分解里。

> [!todo] 自测
> 1. 取 $f=x^2+y^2+z^2$，计算 $\nabla\times(\nabla f)$。
> 2. 取 $\vec F=\langle yz,xz,xy\rangle$，计算 $\nabla\times\vec F$ 后再取散度。
> 3. 解释为什么“旋度为零”只是保守场的局部信号，不是永远充分的全局判据。

> [!success] 阶段小结
> $\nabla$ 的组合规则把向量微积分的计算组织起来：梯度场无旋，旋度场无源。真正做题时还要记住区域条件，不能把局部恒等式误用成无条件的全局结论。

## 课后练习与作业题

> [!info] 练习安排
> 本页练习先做局部代数计算，再做“能不能倒推”的概念判断。计算题不求多，但每题都要说出它服务哪条积分定理。

> [!example] 低门槛例题
> 设 $f=x^2+y^2+z^2$，则
> $$
> \nabla f=\langle2x,2y,2z\rangle.
> $$
> 再取旋度：
> $$
> \nabla\times(\nabla f)=\vec0.
> $$
> 这说明梯度场没有局部旋转，对应后面“保守场闭合环流为零”的直觉。

### A. 概念理解题（必须）

1. 为什么 $\nabla\times(\nabla f)=\vec0$ 可以解释保守场没有局部旋转？
2. 为什么 $\nabla\cdot(\nabla\times\vec F)=0$ 可以解释旋度场没有净源汇？
3. “旋度为零”为什么不能在任意区域中直接推出保守？
4. 乘积规则 $\nabla\cdot(f\vec F)$ 和一元乘积法则有什么相同结构？

### B. 计算练习强化

> [!todo] 恒等式计算
> 1. 取 $f=xyz$，计算 $\nabla f$，再验证 $\nabla\times(\nabla f)=\vec0$。
> 2. 取 $\vec F=\langle x^2y,y^2z,z^2x\rangle$，先求 $\nabla\times\vec F$，再求它的散度。
> 3. 取 $\vec F=\langle x,y,z\rangle$，$f=x+y+z$，验证 $\nabla\cdot(f\vec F)=\nabla f\cdot\vec F+f\nabla\cdot\vec F$。

> [!todo] 定理接口
> 4. 若 $\vec F=\nabla f$，用 Stokes 定理解释任意闭合边界上的 $\oint_C\vec F\cdot d\vec r$ 为什么应为 $0$。
> 5. 若 $\vec G=\nabla\times\vec F$，用散度定理解释闭合曲面上的 $\iint_S\vec G\cdot\vec n\,dS$ 为什么应为 $0$。

### C. 滚动复习与经典贯通题

1. 构造一个旋度为零但不能直接说保守的场，并说明坏在哪里。
2. 把“梯度场无旋”和“旋度场无源”分别对应到 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/01-Stokes 定理：曲面旋度与边界环流|Stokes 定理]]、[[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/03-散度定理：空间内部源汇与闭合曲面通量|散度定理]] 的哪一边。
3. 解释为什么 $d(d\omega)=0$ 是这些恒等式的统一影子。可回看 [[04-数学/00-微积分/06-向量场与积分定理/06-进阶接口（可选）/01-广义 Stokes 定理入口：微分形式视角|广义 Stokes 入口]]。

> [!example]- 参考答案与提示
> B1：$\nabla f=\langle yz,xz,xy\rangle$，旋度为 $\vec0$。
>
> B2：旋度为 $\langle-y^2,-z^2,-x^2\rangle$，散度为 $0$。
>
> B3：左边为 $\nabla\cdot\langle xf,yf,zf\rangle=4x+4y+4z$，右边为 $(x+y+z)+3(x+y+z)$，相同。
>
> C1：可用穿孔平面中的单位切向场；局部旋度为零，但定义域有洞。
