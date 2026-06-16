# Green 定理：平面区域内部与边界的交换

> [!abstract] 本节主线
> Green 定理把平面区域内部的导数量，改写成边界曲线上的积分。它有两种常用形式：
> $$
> \oint_{\partial D}P\,dx+Q\,dy
> =
> \iint_D
> \left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA
> $$
> 这是环流形式；以及
> $$
> \oint_{\partial D}\vec F\cdot\vec N\,ds
> =
> \iint_D
> \left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}\right)dA
> $$
> 这是通量形式。前者把“内部旋转”换成“边界环流”，后者把“内部源汇”换成“边界外流”。

> [!info] 和前后讲义的关系
> 本节把 [[04-数学/00-微积分/06-向量场与积分定理/01-向量场与线积分/03-向量场线积分：做功、环流与路径方向|向量场线积分]] 的闭合路径环流、[[04-数学/00-微积分/06-向量场与积分定理/02-局部算子与平面 Green 定理/01-散度与旋度：局部源汇、局部旋转与 del 语言|散度与旋度]] 的局部导数、以及二维区域上的二重积分连在一起。它是 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/01-Stokes 定理：曲面旋度与边界环流|Stokes 定理]] 和 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/03-散度定理：空间内部源汇与闭合曲面通量|散度定理]] 的平面原型。二重积分和区域设限可回看 [[04-数学/00-微积分/05-多变量微积分/03-多重积分/01-二重积分：区域、小面积与迭代积分|二重积分]]。

> [!question] 先问一个问题
> 如果沿一个平面闭合曲线绕一圈的环流很难直接算，能不能只看它围住的区域里每一点的局部旋转？

Green 定理的想法和后面的 Stokes 定理、散度定理一样：把区域切成许多小块。每个小块的边界积分描述局部效应；把小块加起来时，内部共享边方向相反，贡献互相抵消；最后只剩最外层边界。

所以 Green 定理不是一个突然出现的技巧，而是“内部小边界抵消，只剩外边界”的平面版本。

## 正向边界

Green 定理要求边界方向和区域方向配套。平面区域默认取向上法向量 $\vec k$，正向边界就是让区域始终在左手边的方向。

对没有洞的区域，这通常就是逆时针方向。对有洞区域，外边界逆时针，内边界顺时针。

> [!warning] 方向先于公式
> 如果题目给的边界方向是顺时针，而 Green 定理公式使用的是正向边界，那么结果要整体加负号。方向错了，公式再熟也会错。

**图像说明：** 外边界逆时针，内边界顺时针，走的时候区域都在左手边。这就是有洞区域的正向边界。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1, >=stealth]
  \fill[green!12] (0,0) circle (2.0);
  \fill[white] (0.6,0.2) circle (0.75);
  \draw[green!55!black, thick] (0,0) circle (2.0);
  \draw[green!55!black, thick] (0.6,0.2) circle (0.75);

  \draw[blue!80, very thick, ->] (1.7,0) arc[start angle=0,end angle=70,radius=1.7];
  \draw[blue!80, very thick, ->] (-1.7,0) arc[start angle=180,end angle=250,radius=1.7];

  \draw[red!80, very thick, ->] (1.25,0.2) arc[start angle=0,end angle=-95,radius=0.65];
  \draw[red!80, very thick, ->] (0.6,-0.45) arc[start angle=-90,end angle=-180,radius=0.65];

  \node[blue!80] at (-1.15,2.2) {outer ccw};
  \node[red!80] at (2.15,-0.45) {inner cw};
  \node[green!50!black] at (-0.75,-1.2) {$D$};
\end{tikzpicture}
\end{document}
```

## 环流形式

设

$$
\vec F(x,y)=\langle P(x,y),Q(x,y)\rangle,
$$

$D$ 是平面区域，边界 $\partial D$ 分片光滑并取正向。若 $P,Q$ 有连续一阶偏导数，则

> [!note] 环流形式
> $$
> \oint_{\partial D}P\,dx+Q\,dy
> =
> \iint_D
> \left(
> \frac{\partial Q}{\partial x}
> -
> \frac{\partial P}{\partial y}
> \right)dA.
> $$
> 右边括号里正是平面旋度的 $z$ 分量。

左边是边界上的环流，右边是区域内部的旋度累积。记忆方式是：

$$
\text{边界环流}
=
\text{内部旋度总和}.
$$

> [!tip] 什么时候用
> 如果闭合曲线由好几段组成，直接线积分要分段算许多次；而 $Q_x-P_y$ 很简单，就优先用 Green 定理。反过来，如果区域积分很难，但边界参数化很简单，也可以用它把二重积分变成线积分。

## 算一遍：圆周上的做功

> [!example] 环流例子
> 设
> $$
> \vec F(x,y)=\langle -y,x\rangle,
> $$
> $C$ 是半径为 $a$ 的圆，按逆时针方向绕行。求
> $$
> \oint_C\vec F\cdot d\vec r.
> $$

这里 $P=-y,\ Q=x$，所以

$$
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
=
1-(-1)=2.
$$

圆盘区域记为 $D$。由 Green 定理，

$$
\oint_C\vec F\cdot d\vec r
=
\iint_D 2\,dA
=
2\pi a^2.
$$

这个例子也说明：旋转场绕圆一圈的总环流，不是只看边界上的箭头长度，而是在累积圆盘内部每一点的局部旋转。

## 用 Green 定理求面积

只要选一个向量场让

$$
Q_x-P_y=1,
$$

环流形式就会变成面积公式。一个对称选择是

$$
\vec F=\left\langle-\frac{y}{2},\frac{x}{2}\right\rangle.
$$

因为

$$
\frac{\partial}{\partial x}\left(\frac{x}{2}\right)
-
\frac{\partial}{\partial y}\left(-\frac{y}{2}\right)
=1,
$$

所以

$$
\operatorname{Area}(D)
=
\frac12\oint_{\partial D}-y\,dx+x\,dy.
$$

> [!example] 面积公式
> 若椭圆边界参数化为
> $$
> x=a\cos t,\qquad y=b\sin t,\qquad 0\le t\le2\pi,
> $$
> 且按逆时针方向绕行，则
> $$
> \operatorname{Area}(D)
> =
> \frac12\int_0^{2\pi}
> \left[-b\sin t(-a\sin t)+a\cos t(b\cos t)\right]dt
> =
> \pi ab.
> $$

## 通量形式

Green 定理还有一个同样重要的读法。令 $\vec N$ 表示边界上的向外单位法向量，则

> [!note] 通量形式
> 对正向边界 $\partial D$，
> $$
> \oint_{\partial D}\vec F\cdot\vec N\,ds
> =
> \iint_D
> \left(
> \frac{\partial P}{\partial x}
> +
> \frac{\partial Q}{\partial y}
> \right)dA
> =
> \iint_D\nabla\cdot\vec F\,dA.
> $$

左边是穿过平面边界曲线的向外通量，右边是区域内部散度的累积。记忆方式是：

$$
\text{边界外流}
=
\text{内部源汇总和}.
$$

如果边界按逆时针方向参数化为

$$
\vec r(t)=\langle x(t),y(t)\rangle,
$$

那么一个方便公式是

$$
\vec F\cdot\vec N\,ds
=
P\,dy-Q\,dx.
$$

因此通量形式也可写成

$$
\oint_{\partial D}P\,dy-Q\,dx
=
\iint_D(P_x+Q_y)\,dA.
$$

> [!example] 通量例子
> 设
> $$
> \vec F(x,y)=\langle x,y\rangle,
> $$
> $C$ 是半径为 $a$ 的圆，取正向。因为
> $$
> \nabla\cdot\vec F=1+1=2,
> $$
> 所以
> $$
> \oint_C\vec F\cdot\vec N\,ds
> =
> \iint_D2\,dA
> =
> 2\pi a^2.
> $$
> 径向场从圆盘内部向外发散，边界上读到的正是总外流。

## 有洞区域怎么处理

Green 定理对有有限个洞的区域仍然可用，但必须把所有边界分量都带上正确方向：外边界逆时针，内边界顺时针。

为什么内边界要顺时针？因为沿正向走时，区域始终要在左手边。绕内洞走时，洞不属于区域，实际的区域在外侧，所以方向必须反过来。

> [!warning] 不宜漏掉内边界
> 有洞区域的 $\partial D$ 不是只有外圈。若只沿外边界积分，内部洞口的边界贡献没有被计入，Green 定理通常会失效。

## 和后续定理的连接

Green 定理是后面两个空间定理的平面影子：

- 环流形式升维后，得到 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/01-Stokes 定理：曲面旋度与边界环流|Stokes 定理]]。
- 通量形式升维后，得到 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/03-散度定理：空间内部源汇与闭合曲面通量|散度定理]]。

> [!success] 结构图景
> Green 定理是第一次完整看到“边界积分 = 内部导数积分”的地方。环流形式对应旋度，通量形式对应散度；方向和边界分量是否完整，是使用它的第一检查点。

## 学习动作

> [!todo] 自测
> 看到 Green 定理题，按顺序问：
> 1. 曲线是否闭合，是否在平面中？
> 2. 边界方向是不是正向？如果不是，是否需要加负号？
> 3. 用环流形式还是通量形式？
> 4. 区域有没有洞？内边界是否也要积分？
> 5. 左边和右边哪一边更容易算？

> [!warning] 常见误区
> 1. 把 $Q_x-P_y$ 写成 $P_y-Q_x$。
> 2. 把通量形式和环流形式混在一起。
> 3. 边界顺时针却直接套正向公式。
> 4. 有洞区域漏掉内边界。
> 5. 三维向量场或空间曲线题误用 Green 定理；空间版本应看 Stokes 定理或散度定理。

> [!success] 阶段小结
> Green 定理把平面区域的内部旋度/散度与边界环流/通量连起来。学会它的重点不是背两条公式，而是会判断：边界方向、区域是否完整、选环流还是通量、哪一边更好算。

## 课后练习与作业题

> [!example] 低门槛例题
> 令 $\vec F=\left\langle -\frac{y}{2},\frac{x}{2}\right\rangle$，$C$ 是单位圆逆时针边界，$D$ 是单位圆盘。因为
> $$
> Q_x-P_y=\frac12-\left(-\frac12\right)=1,
> $$
> 所以
> $$
> \oint_C \vec F\cdot d\vec r=\iint_D 1\,dA=\pi.
> $$
> 这道题是 Green 定理的核心图像：边界环流等于内部旋度密度的总和。

### A. 概念理解题（必须）

> [!todo] 概念理解
> 1. Green 定理为什么要求边界正向通常是逆时针？如果方向改成顺时针，公式怎样变？
> 2. 环流形式中的 $Q_x-P_y$ 和 [[04-数学/00-微积分/06-向量场与积分定理/02-局部算子与平面 Green 定理/01-散度与旋度：局部源汇、局部旋转与 del 语言|平面旋度]] 是什么关系？
> 3. 通量形式为什么会出现 $P_x+Q_y$？它和散度是什么关系？
> 4. 有洞区域的内边界方向为什么通常是顺时针？
> 5. 什么时候直接算边界线积分更简单？什么时候改成区域二重积分更简单？

### B. 计算练习强化

> [!todo] 计算练习：环流形式
> 1. 用 Green 定理计算 $\oint_C (-y\,dx+x\,dy)$，其中 $C$ 是单位圆逆时针一周。
> 2. 用 Green 定理计算 $\oint_C (x^2y\,dx+xy^2\,dy)$，其中 $C$ 是矩形 $0\le x\le1,\ 0\le y\le2$ 的正向边界。
> 3. 设 $C$ 是三角形 $(0,0),(1,0),(0,1)$ 的正向边界，计算 $\oint_C (y\,dx+x\,dy)$。

> [!todo] 计算练习：面积与通量形式
> 1. 用公式
> $$
> A=\frac12\oint_C x\,dy-y\,dx
> $$
> 求椭圆参数曲线 $x=a\cos t,\ y=b\sin t$ 围成的面积。
> 2. 对 $\vec F=\langle x,y\rangle$，用 Green 定理的通量形式求单位圆边界的外向通量。
> 3. 对 $\vec F=\langle y,0\rangle$，求矩形 $0\le x\le2,\ 0\le y\le1$ 的外向通量。

### C. 滚动复习与经典贯通题

> [!todo] 贯通题：有洞区域与奇点
> 1. 对 $\vec F=\left\langle \frac{-y}{x^2+y^2},\frac{x}{x^2+y^2}\right\rangle$，为什么不能在包含原点的圆盘上直接用 Green 定理说环流为 $0$？
> 2. 设 $D$ 是 $1\le x^2+y^2\le4$ 的环形区域。写出外边界和内边界的正向方向，并说明两条边界都要计入。
> 3. 给出一个闭合平面曲线题，直接线积分很麻烦，但 Green 定理后变成简单面积或二重积分。

> [!example]- 参考答案与提示
> A1：正向让区域始终在行进方向左侧；若改成顺时针，积分符号变号。
>
> A2：$Q_x-P_y$ 正是平面旋度，表示局部环流密度。
>
> A3：通量形式累计外向流出，内部对应平面散度 $P_x+Q_y$。
>
> A4：为了让环形区域始终在左侧，内边界必须顺时针走。
>
> A5：边界参数简单时直接算可能更短；区域简单且 $Q_x-P_y$ 或散度简单时 Green 定理更短。
>
> B1：$Q_x-P_y=1-(-1)=2$，单位圆面积为 $\pi$，结果为 $2\pi$。
>
> B2：$P=x^2y,\ Q=xy^2$，$Q_x-P_y=y^2-x^2$，积分为
> $$
> \int_0^1\int_0^2(y^2-x^2)\,dy\,dx=2.
> $$
>
> B3：$Q_x-P_y=1-1=0$，结果为 $0$。
>
> B4：$\frac12\int_0^{2\pi}(ab\cos^2t+ab\sin^2t)\,dt=\pi ab$。
>
> B5：散度为 $2$，单位圆面积为 $\pi$，外向通量为 $2\pi$。
>
> B6：散度为 $0$，矩形外向总通量为 $0$。
>
> C1：该场在原点没有定义，包含原点的圆盘不满足 Green 定理的光滑条件。
>
> C2：外边界逆时针，内边界顺时针；两条边界共同组成 $\partial D$。
>
> C3：例如求椭圆面积可用 $\frac12\oint x\,dy-y\,dx$，直接边界积分也可算，但 Green 定理给出面积意义。

> [!tip]- 提示
> Green 定理题先问四件事：平面吗、闭合吗、方向正吗、区域内光滑吗。四个条件没有看完之前，先暂缓写 $Q_x-P_y$。
