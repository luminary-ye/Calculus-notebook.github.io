# Stokes 定理：曲面旋度与边界环流

> [!abstract] 本节主线
> Stokes 定理把一张定向曲面内部的“局部旋转”累积，改写成它的边界上的“总环流”：
> $$
> \oint_{\partial S}\vec F\cdot d\vec r
> =
> \iint_S(\nabla\times\vec F)\cdot\vec n\,dS.
> $$
> 左边沿边界曲线累积切向分量，右边在曲面上累积旋度的法向分量。它的核心不是多一个公式，而是同一件事的两种读法：边界上绕一圈的总趋势，等于曲面内部每一点微小旋转的总和。

> [!info] 和前后讲义的关系
> 本节把 [[04-数学/00-微积分/06-向量场与积分定理/01-向量场与线积分/03-向量场线积分：做功、环流与路径方向|向量场线积分]] 中的闭合路径环流，和 [[04-数学/00-微积分/06-向量场与积分定理/03-参数曲面与通量/02-通量积分：定向曲面与穿过曲面的流量|通量积分]] 中的法向穿过量合在一起。通量积分已经解释了 $\vec n\,dS$ 和参数公式；这里把穿过曲面的向量场换成 $\nabla\times\vec F$。旋度的完整图像属于 [[04-数学/00-微积分/06-向量场与积分定理/02-局部算子与平面 Green 定理/01-散度与旋度：局部源汇、局部旋转与 del 语言|散度与旋度]]；平面版本属于 [[04-数学/00-微积分/06-向量场与积分定理/02-局部算子与平面 Green 定理/03-Green 定理：平面区域内部与边界的交换|Green 定理]]。后面 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/03-散度定理：空间内部源汇与闭合曲面通量|散度定理]] 会把另一个内部导数和闭合曲面通量联系起来。

> [!question] 先问一个问题
> 如果一个流速场在曲面上到处都有微小旋转，那么沿着这张曲面的边界绕一圈，会不会正好读出这些微小旋转的总效果？

先回到环流。若 $C$ 是闭合曲线，

$$
\oint_C\vec F\cdot d\vec r
$$

衡量的是向量场沿 $C$ 的切向绕行趋势。曲线方向一反过来，环流符号也反过来。

再看曲面。若 $S$ 选定了单位法向量 $\vec n$，那么

$$
(\nabla\times\vec F)\cdot\vec n
$$

读的是向量场在“绕着 $\vec n$ 这根轴旋转”的强弱。乘上小面积 $dS$，就是这一小片曲面对总旋转的贡献。

Stokes 定理说：把这些小片贡献铺满整张曲面，最后得到的不是一个陌生的新量，而正是边界曲线上的环流。

## 为什么内部会只剩边界

把曲面 $S$ 切成许多很小的曲面片。每一小片都有自己的小边界。对单个小片来说，旋度的法向通量可以理解成小边界上的微小环流。

现在把所有小片的小边界环流加起来。相邻两个小片共享一条边，但这条边在两个小片的边界方向中正好相反：一个小片沿这条边向前走，另一个小片沿同一条边向后走。因此共享边上的线积分会互相抵消。

抵消完以后，内部边全没了，只剩整张曲面的外边界 $\partial S$。这就是公式背后的图像：

$$
\text{内部小环流相加}
\quad\longrightarrow\quad
\text{只剩外边界环流}.
$$

> [!tip] 怎么想
> Stokes 定理是二维曲面上的“望远镜效应”：许多小块的内边界一正一反互相抵消，最后只留下最外层边界。公式右边形式上在算曲面内部，左边形式上只绕边界走一圈，但它们记录的是同一批局部旋转的总效果。

> [!info] 图像说明
> 绿色区域是一张定向曲面，红色箭头是选定法向量，蓝色箭头是边界的正方向。方向不是随意配的：法向量一旦选定，边界方向就由右手法则决定。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1, >=stealth]
  \draw[fill=green!13, draw=green!55!black, thick]
    (0.25,0.8) .. controls (1.0,0.15) and (3.35,0.1) .. (4.05,0.85)
    .. controls (4.55,1.45) and (3.3,2.2) .. (2.2,2.1)
    .. controls (1.0,2.0) and (-0.2,1.35) .. (0.25,0.8);

  \draw[blue!80, very thick, ->]
    (0.45,0.72) .. controls (1.35,0.05) and (3.25,0.18) .. (3.95,0.9);
  \draw[blue!80, very thick, ->]
    (4.0,0.92) .. controls (4.45,1.45) and (3.25,2.12) .. (2.25,2.08);
  \node[blue!80] at (4.45,1.75) {$\partial S$};

  \coordinate (P) at (2.25,1.2);
  \fill (P) circle (2pt);
  \draw[red!75, very thick, ->] (P) -- (2.25,2.85) node[above] {$\vec n$};
  \draw[purple!75, thick, ->] (1.55,1.18) arc[start angle=190, end angle=-130, radius=0.42];
  \node[purple!75] at (1.15,1.7) {$\nabla\times\vec F$};

  \node[green!45!black] at (2.25,0.7) {$S$};
  \node at (2.25,-0.35) {right-hand orientation};
\end{tikzpicture}
\end{document}
```

## 旋度在这里做什么

设

$$
\vec F(x,y,z)=\langle P(x,y,z),Q(x,y,z),R(x,y,z)\rangle.
$$

旋度是向量场

$$
\nabla\times\vec F
=
\left\langle
\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z},
\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x},
\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}
\right\rangle.
$$

这三个分量分别描述绕 $x$、$y$、$z$ 方向的局部旋转趋势。但在一张曲面上，我们不需要把整个旋度向量都加起来；我们只取它沿曲面法向的分量：

$$
(\nabla\times\vec F)\cdot\vec n.
$$

原因很自然：曲面小片有一个法向轴，围绕这根轴的旋转才会在小片边界上表现成环流。

> [!info] 符号说明
> $\nabla\times\vec F$ 是一个向量场；$(\nabla\times\vec F)\cdot\vec n$ 是一个标量函数。Stokes 定理右边实际上是一个通量积分，只不过穿过曲面的向量场不是原来的 $\vec F$，而是它的旋度 $\nabla\times\vec F$。

局部读法可以这样记：在很小的曲面片附近，可以把

$$
(\nabla\times\vec F)(P)\cdot\vec n
$$

看成“单位面积上的边界环流”。所以旋度不是凭空出现的代数对象，它是在极小闭合曲线附近测出来的环流密度。

## 定理陈述

> [!note] 定理
> 设 $S$ 是分片光滑、可定向的曲面，$\vec n$ 是 $S$ 上选定的单位法向量，边界 $\partial S$ 是分片光滑闭曲线，并按 $\vec n$ 诱导的正方向取向。若 $\vec F$ 在包含 $S$ 的区域内有连续一阶偏导数，则
> $$
> \oint_{\partial S}\vec F\cdot d\vec r
> =
> \iint_S(\nabla\times\vec F)\cdot\vec n\,dS.
> $$
> 也可以写成
> $$
> \oint_{\partial S}\vec F\cdot d\vec r
> =
> \iint_S(\nabla\times\vec F)\cdot d\vec S,
> \qquad d\vec S=\vec n\,dS.
> $$

如果 $\partial S$ 有多条边界曲线，例如一张带洞曲面的外圈和内圈，那么左边表示所有边界分量的线积分之和。每一条边界曲线都必须使用由同一个曲面方向诱导出来的方向。

## 方向如何配套

Stokes 定理里容易错的不是求导，而是方向。曲面方向和边界方向不能各选各的。

> [!warning] 方向要成套
> 先选曲面的单位法向量 $\vec n$。右手拇指指向 $\vec n$，四指弯曲的方向就是 $\partial S$ 的正方向。等价地，沿正方向绕边界走，并让头朝向 $\vec n$，曲面应该始终在左手边。

例如 $S$ 是 $xy$ 平面中的区域，法向量选 $\vec k$，也就是向上。从上往下看，边界的正方向就是逆时针。若法向量改成 $-\vec k$，边界正方向就变成顺时针。两边同时变号，所以 Stokes 公式仍然成立。

这个配套也解释了为什么 Stokes 定理不是单纯地说“曲面边界任意绕一圈”。它说的是：定向曲面诱导出定向边界，然后这两个定向对象的积分相等。

## 用参数计算右边

如果曲面由

$$
\vec r(u,v),\qquad (u,v)\in D
$$

参数化，并且 $\vec r_u\times\vec r_v$ 的方向与选定的 $\vec n$ 一致，那么

> [!note] 参数公式
> Stokes 定理右边可化为参数域上的二重积分：
> $$
> \iint_S(\nabla\times\vec F)\cdot\vec n\,dS
> =
> \iint_D
> (\nabla\times\vec F)(\vec r(u,v))\cdot
> (\vec r_u\times\vec r_v)\,du\,dv.
> $$
> 若 $\vec r_u\times\vec r_v$ 指向相反方向，就换成 $\vec r_v\times\vec r_u$，或者在结果前加负号。

这和上一节通量积分的公式完全同型：

$$
\iint_S\vec G\cdot\vec n\,dS
=
\iint_D \vec G(\vec r(u,v))\cdot(\vec r_u\times\vec r_v)\,du\,dv.
$$

只要把 $\vec G$ 换成 $\nabla\times\vec F$，就得到 Stokes 右边。

Stokes 定理给了两条路：如果边界曲线简单，就算 $\oint_{\partial S}\vec F\cdot d\vec r$；如果曲面和旋度简单，就算 $\iint_S(\nabla\times\vec F)\cdot\vec n\,dS$。题目重点考查的常常不是强行算，而是看出哪一边更省力。

## 平面情形就是 Green 定理

设 $S$ 是 $xy$ 平面中的区域 $D$，方向取向上，即 $\vec n=\vec k$。若

$$
\vec F=\langle P,Q,R\rangle,
$$

则

$$
(\nabla\times\vec F)\cdot\vec k
=
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}.
$$

Stokes 定理变成

$$
\oint_{\partial D}P\,dx+Q\,dy
=
\iint_D
\left(
\frac{\partial Q}{\partial x}
-
\frac{\partial P}{\partial y}
\right)dA.
$$

这正是平面区域上的环流型 Green 定理。换句话说，Green 定理不是孤立的平面技巧；它是 Stokes 定理在平面曲面上的特殊情形。

关系可以这样看：Green 定理把平面区域内部的旋转与平面边界环流联系起来；Stokes 定理把同一思想搬到空间曲面上。曲面可以弯，法向可以变，但“内部旋转总和等于边界环流”这条主线不变。

## 算一遍：单位圆盘上的旋转场

> [!example] 圆盘验证
> 设
> $$
> \vec F(x,y,z)=\left\langle-\frac{y}{2},\frac{x}{2},0\right\rangle,
> $$
> $S$ 是 $xy$ 平面中的单位圆盘，方向取向上。边界 $\partial S$ 是单位圆，按逆时针方向绕行。

先算右边。旋度为

$$
\nabla\times\vec F
=
\langle 0,0,1\rangle.
$$

因为 $\vec n=\vec k$，所以

$$
\iint_S(\nabla\times\vec F)\cdot\vec n\,dS
=
\iint_S 1\,dS
=
\pi.
$$

再算左边。边界参数化为

$$
\vec r(t)=\langle\cos t,\sin t,0\rangle,\qquad 0\le t\le2\pi.
$$

于是

$$
\vec r'(t)=\langle-\sin t,\cos t,0\rangle,
$$

并且

$$
\vec F(\vec r(t))
=
\left\langle-\frac{\sin t}{2},\frac{\cos t}{2},0\right\rangle.
$$

所以

$$
\vec F(\vec r(t))\cdot\vec r'(t)
=
\frac{\sin^2t+\cos^2t}{2}
=
\frac{1}{2}.
$$

因此

$$
\oint_{\partial S}\vec F\cdot d\vec r
=
\int_0^{2\pi}\frac{1}{2}\,dt
=
\pi.
$$

两边相等。这个例子很干净：旋度的法向分量处处为 $1$，圆盘面积为 $\pi$，所以总环流就是 $\pi$。

## 换曲面：边界相同就可以省事

Stokes 定理还有一个非常实用的后果：对同一个边界曲线，旋度通量常常可以换到另一张更容易算的曲面上。

设 $S_1$ 和 $S_2$ 是两张定向曲面，它们有同一个边界 $C$，并且边界方向与两张曲面的方向配套一致。若 $\vec F$ 在相关区域内足够光滑，则

$$
\iint_{S_1}(\nabla\times\vec F)\cdot\vec n\,dS
=
\oint_C\vec F\cdot d\vec r
=
\iint_{S_2}(\nabla\times\vec F)\cdot\vec n\,dS.
$$

这说明：旋度通量只看共同边界给出的环流，不看你在内部选了哪张曲面。

> [!example] 换成圆盘
> 仍取
> $$
> \vec F(x,y,z)=\left\langle-\frac{y}{2},\frac{x}{2},0\right\rangle.
> $$
> 若一张曲面 $S$ 的边界是 $xy$ 平面中的单位圆，并且边界方向从上方看为逆时针，那么
> $$
> \iint_S(\nabla\times\vec F)\cdot\vec n\,dS
> =
> \oint_{\partial S}\vec F\cdot d\vec r
> =
> \pi.
> $$
> 不必知道 $S$ 在内部怎样弯曲。实际决定结果的是同一条边界曲线和相容的方向。

这和保守场中的路径无关有一点相似：那里线积分只看端点；这里旋度通量只看边界曲线。不过不宜把两者混成同一个定理。一个讨论的是梯度场的线积分，一个讨论的是旋度场的曲面通量。

## 解题时怎样走

> [!todo] 学习动作
> 看到 Stokes 定理题，可以按这个顺序检查：
> 1. 找清楚曲面 $S$ 和边界 $\partial S$。
> 2. 先确定法向量和边界方向是否配套。
> 3. 判断左边线积分还是右边曲面积分更容易。
> 4. 如果算右边，先求 $\nabla\times\vec F$，再做通量积分。
> 5. 如果曲面复杂但边界简单，尝试换成同边界的简单曲面。

通常有三种省力信号：

- 边界是一条简单圆、椭圆或多边形，线积分可能更好算。
- 旋度很简单，曲面通量可能更好算。
- 原曲面很复杂，但边界落在一个平面里，可以换成平面区域来算旋度通量。

## 常见误区

> [!warning] 常见误区
> Stokes 定理里有几类错误特别常见：
> 1. 右边忘记求旋度，直接把 $\vec F$ 拿去做通量。
> 2. 法向量和边界方向没有按右手法则配套。
> 3. 换曲面时只看“差不多盖住同一圈”，却没有确认边界完全相同。
> 4. 有多个边界分量时，只算了外边界，漏掉洞的边界。
> 5. 向量场在曲面附近有奇点或不光滑，却直接套用定理。

> [!faq]- 闭合曲面能直接用吗？
> 如果 $S$ 是闭合曲面，就没有边界，$\partial S=\varnothing$。在光滑条件满足时，Stokes 定理给出
> $$
> \iint_S(\nabla\times\vec F)\cdot\vec n\,dS=0.
> $$
> 但实际题目中如果向量场有奇点、曲面不是题目允许的定向曲面，或者区域条件被破坏，就不能只凭“闭合”二字机械套用。

> [!success] 阶段小结
> Stokes 定理可以用一句话记住：曲面上旋度的法向通量，等于边界上的环流。学会它时要同时抓住三件事：旋度是局部环流密度，右手法则把曲面方向和边界方向绑在一起，同一边界允许我们在曲面侧选择更容易的计算对象。

## 课后练习与作业题

> [!info] 做题安排
> Stokes 定理的难点通常不在积分本身，而在对象、方向和换曲面的判断。A 组先练判断；B 组做低门槛计算；C 组把本节和 Green 定理、曲面积分、保守场区别开。

> [!example] 低门槛例题
> 令 $\vec F=\langle -y,x,0\rangle$，$S$ 是单位圆盘 $z=0$，法向量向上。因为
> $$
> \nabla\times\vec F=\langle0,0,2\rangle,
> $$
> 所以
> $$
> \iint_S(\nabla\times\vec F)\cdot\vec n\,dS=2\pi.
> $$
> Stokes 定理说，这也等于边界单位圆按右手方向走一周的环流。

### A. 概念理解题（必须）

1. 用一句话解释：为什么 Stokes 定理左边是曲面积分，右边却是边界曲线上的线积分？
2. 若曲面法向量反向，边界方向应怎样变化？结果符号会怎样变化？
3. 为什么换曲面时必须保证边界完全相同，而不是“形式上差不多围住同一片区域”？
4. 闭合曲面没有边界。若 $\vec F$ 足够光滑，为什么
   $$
   \iint_S(\nabla\times\vec F)\cdot\vec n\,dS=0
   $$
   是合理的？

### B. 计算练习强化

1. 设
   $$
   \vec F(x,y,z)=\left\langle-\frac y2,\frac x2,0\right\rangle,
   $$
   $S$ 为单位圆盘 $x^2+y^2\le1,\ z=0$，法向量取向上。用 Stokes 定理计算边界逆时针方向上的
   $$
   \oint_{\partial S}\vec F\cdot d\vec r.
   $$
2. 把上一题的单位圆盘半径改成 $a$，结果是多少？
3. 设
   $$
   \vec F(x,y,z)=\langle -y,x,z\rangle.
   $$
   $S$ 是任意一张以单位圆 $x^2+y^2=1,\ z=0$ 为边界、方向与从上方看逆时针边界配套的曲面。用换曲面思想计算 $\iint_S(\nabla\times\vec F)\cdot\vec n\,dS$。
4. 设 $C$ 是平面三角形边界，顶点为 $(0,0,0)$、$(1,0,0)$、$(0,1,0)$，从上方看为逆时针。对 $\vec F=\langle -y,0,0\rangle$，用 Stokes 定理计算 $\oint_C\vec F\cdot d\vec r$。

### C. 滚动复习与经典贯通题

1. 当曲面 $S$ 就是 $xy$ 平面上的区域时，Stokes 定理如何退化成 [[04-数学/00-微积分/06-向量场与积分定理/02-局部算子与平面 Green 定理/03-Green 定理：平面区域内部与边界的交换|Green 定理]] 的环流形式？
2. 为什么 Stokes 定理处理的是“旋度通量与边界环流”，而 [[04-数学/00-微积分/06-向量场与积分定理/04-空间积分定理/03-散度定理：空间内部源汇与闭合曲面通量|散度定理]] 处理的是“散度与闭合曲面通量”？请从切向/法向角度区分。
3. 若 $\vec F=\nabla f$，则 $\nabla\times\vec F=\vec0$。这能解释什么线积分现象？回看 [[04-数学/00-微积分/06-向量场与积分定理/01-向量场与线积分/05-线积分基本定理：保守场、势函数与路径无关|保守场与线积分基本定理]]。

> [!example]- 参考答案与提示
> A1：曲面的内部旋转会在边界上表现为总环流；内部相邻小环流在公共边上相互抵消，只剩外边界。
>
> A2：法向量反向时，按右手法则配套的边界方向也反向；两边积分同时变号。
>
> A3：Stokes 定理固定的是同一条边界曲线给出的环流。边界不同，右边线积分一般就不是同一个对象。
>
> A4：闭合曲面没有边界环流；在光滑条件下，曲面上旋度通量的总和会相互抵消。
>
> B1：$\nabla\times\vec F=\langle0,0,1\rangle$，向上法向量下通量为圆盘面积 $\pi$，所以边界环流为 $\pi$。
>
> B2：结果为 $\pi a^2$。
>
> B3：$\nabla\times\vec F=\langle0,0,2\rangle$。换成单位圆盘，通量为 $2\pi$。
>
> B4：$\nabla\times\vec F=\langle0,0,1\rangle$，三角形面积为 $\frac12$，所以积分为 $\frac12$。
>
> C1：取 $S$ 为平面区域、$\vec n=\vec k$，则 $(\nabla\times\vec F)\cdot\vec k=Q_x-P_y$，得到 Green 环流形式。
>
> C2：Stokes 看的是场沿边界切向转了多少；散度定理看的是场穿出闭合外壳多少。
>
> C3：梯度场没有旋度，因此闭合环流为 $0$；这对应保守场的路径无关与闭合路径积分为零。
