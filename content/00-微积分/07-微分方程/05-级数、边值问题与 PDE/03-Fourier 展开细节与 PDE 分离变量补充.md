---
title: Fourier 展开细节与 PDE 分离变量补充
aliases:
  - "25-Fourier 展开细节与 PDE 分离变量补充"
tags:
  - math/calculus/differential-equations
status: draft
---

# Fourier 展开细节与 PDE 分离变量补充

> [!abstract] 本节主线
> [[04-数学/00-微积分/07-微分方程/05-级数、边值问题与 PDE/02-Fourier、边值问题与 PDE 接口|Fourier、边值问题与 PDE 接口]] 已经说明“边界筛模式，初始形状定系数”。本页补上入门计算里容易漏掉的细节：半区间正弦/余弦展开、一般区间长度、收敛读法、非零边界热方程、Laplace 方程和带初速度的弦振动。

> [!info] 学习位置
> 前置：[[04-数学/00-微积分/07-微分方程/05-级数、边值问题与 PDE/02-Fourier、边值问题与 PDE 接口|Fourier、边值问题与 PDE 接口]]、[[04-数学/00-微积分/07-微分方程/02-二阶线性与振动/02-特征方程与齐次解|特征方程与齐次解]]、[[04-数学/00-微积分/07-微分方程/05-级数、边值问题与 PDE/01-级数解入口|级数解入口]]。
>
> 本页仍然是微分方程目录中的接口页：重点是会选模式、会写系数、会把 PDE 拆成空间边值问题和时间方程；严格收敛定理和更一般的函数空间语言留给后续专题。

> [!question] 先问一个问题
> 同样只知道 $0<x<L$ 上的一个函数，为什么有时展开成正弦级数，有时展开成余弦级数，有时又要写成完整的正弦加余弦？

答案不在函数本身，而在你打算把区间外面怎样“补出来”。正弦级数对应奇延拓，余弦级数对应偶延拓，完整 Fourier 级数对应周期延拓。微分方程里，边界条件会替你决定哪一种延拓最自然。

因此 Fourier/PDE 题的第一步不是马上算系数，而是先听边界条件在说什么。边界先筛出允许的空间模式；系数公式只是把初始形状或剩余边界数据投影到这些模式上。

## 四种展开先分清

在区间 $0<x<L$ 上，最常见的三个基底是

$$
\sin\frac{n\pi x}{L},\qquad
\cos\frac{n\pi x}{L},\qquad
1,\cos\frac{n\pi x}{L},\sin\frac{n\pi x}{L}.
$$

它们回答的是不同边界问题。

| 目标 | 典型展开 | 系数 | 边界直觉 |
| --- | --- | --- | --- |
| 半区间正弦展开 | $f(x)\sim\sum_{n=1}^{\infty}b_n\sin\frac{n\pi x}{L}$ | $b_n=\frac2L\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx$ | 适合零端点函数值 |
| 半区间余弦展开 | $f(x)\sim\frac{a_0}{2}+\sum_{n=1}^{\infty}a_n\cos\frac{n\pi x}{L}$ | $a_n=\frac2L\int_0^L f(x)\cos\frac{n\pi x}{L}\,dx$ | 适合零端点导数 |
| 完整 Fourier 展开 | $f(x)\sim\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{L}+b_n\sin\frac{n\pi x}{L}\right)$ | 同时算 $a_n,b_n$ | 适合周期条件 |

> [!warning] 不宜先背公式，先看边界
> $u(0,t)=u(L,t)=0$ 常把空间模式推向正弦；$u_x(0,t)=u_x(L,t)=0$ 常把空间模式推向余弦；周期条件才自然保留完整的正弦加余弦。

> [!tip] 延拓图像
> 同一段函数放到 $(-L,L)$ 上，可以有两种镜像：奇延拓过原点换号，偶延拓过原点不换号。正弦和余弦的选择，本质上就是选择哪一种镜像。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1, >=stealth]
  \draw[->] (-3.4,0) -- (3.4,0) node[right] {$x$};
  \draw[->] (0,-1.8) -- (0,2.1) node[above] {$y$};

  \draw[dashed] (-2.4,-1.6) -- (-2.4,1.9);
  \draw[dashed] (2.4,-1.6) -- (2.4,1.9);
  \node[below] at (-2.4,0) {$-L$};
  \node[below] at (2.4,0) {$L$};

  \draw[thick, blue!70, domain=0:2.4, samples=60, smooth] plot ({\x},{0.35+0.45*\x/2.4+0.35*sin(100*\x)});
  \draw[thick, red!70, domain=-2.4:0, samples=60, smooth] plot ({\x},{-0.35+0.45*\x/2.4+0.35*sin(100*\x)});
  \node[blue!70] at (1.45,1.45) {原函数};
  \node[red!70] at (-1.45,-1.25) {奇延拓};

  \begin{scope}[yshift=-3.9cm]
    \draw[->] (-3.4,0) -- (3.4,0) node[right] {$x$};
    \draw[->] (0,-0.4) -- (0,2.5) node[above] {$y$};
    \draw[dashed] (-2.4,-0.3) -- (-2.4,2.2);
    \draw[dashed] (2.4,-0.3) -- (2.4,2.2);
    \node[below] at (-2.4,0) {$-L$};
    \node[below] at (2.4,0) {$L$};
    \draw[thick, blue!70, domain=0:2.4, samples=60, smooth] plot ({\x},{0.35+0.45*\x/2.4+0.35*sin(100*\x)});
    \draw[thick, green!60!black, domain=-2.4:0, samples=60, smooth] plot ({\x},{0.35-0.45*\x/2.4-0.35*sin(100*\x)});
    \node[green!60!black] at (-1.45,1.55) {偶延拓};
  \end{scope}
\end{tikzpicture}
\end{document}
```

## 收敛读法：级数究竟趋向谁

Fourier 级数不是在所有点都自动等于原函数。入门阶段可以记住下面的读法。

若函数在分段上足够光滑，并且左右极限存在，则：

1. 在连续点，Fourier 级数趋向函数值 $f(x)$。
2. 在跳跃点，Fourier 级数趋向左右极限的平均值：

$$
\frac{f(x^-)+f(x^+)}2.
$$

3. 在端点，半区间展开要看你选的是奇延拓、偶延拓还是周期延拓。

> [!warning] 端点容易被忽略
> 正弦展开的奇延拓通常会在 $x=0,L$ 处给出 $0$；这不一定等于原来半区间函数的端点值。做热方程零端点问题时，这正好和边界条件一致；做纯函数展开题时，要说明端点读法。

> [!warning] 不宜任意逐项求导
> Fourier 级数可以逐项积分的条件通常比逐项求导宽松。逐项求导会放大高频项，若没有额外光滑性，很容易得到错误结论。

## 例题：半区间正弦展开

在 $0<x<L$ 上令

$$
f(x)=x.
$$

若要做正弦展开，就写

$$
x\sim\sum_{n=1}^{\infty}b_n\sin\frac{n\pi x}{L},
$$

其中

$$
b_n=\frac2L\int_0^L x\sin\frac{n\pi x}{L}\,dx.
$$

分部积分可得

$$
b_n=\frac{2L(-1)^{n+1}}{n\pi}.
$$

所以

$$
x\sim\sum_{n=1}^{\infty}\frac{2L(-1)^{n+1}}{n\pi}\sin\frac{n\pi x}{L}.
$$

> [!tip] 怎么读这个结果
> 这个级数不是说“直线本身天然由正弦组成”，而是说：如果只允许使用满足零端点的正弦模式，那么这些系数给出在区间内部逼近 $x$ 的最佳投影组合。

## 非零边界热方程：先拆出稳态

零边界热方程可以直接用正弦模式。若端点温度不是零，先不宜机械套用正弦展开。

考虑

$$
u_t=ku_{xx},\qquad 0<x<L,
$$

边界条件为

$$
u(0,t)=A,\qquad u(L,t)=B,
$$

初始条件为

$$
u(x,0)=f(x).
$$

先拆出满足边界的稳态直线

$$
v(x)=A+\frac{B-A}{L}x.
$$

令

$$
w(x,t)=u(x,t)-v(x).
$$

因为 $v''(x)=0$，所以 $w$ 满足同样的热方程：

$$
w_t=kw_{xx}.
$$

边界变成

$$
w(0,t)=0,\qquad w(L,t)=0,
$$

初始条件变成

$$
w(x,0)=f(x)-v(x).
$$

于是

$$
w(x,t)=\sum_{n=1}^{\infty}b_ne^{-k(n\pi/L)^2t}\sin\frac{n\pi x}{L},
$$

其中

$$
b_n=\frac2L\int_0^L\bigl(f(x)-v(x)\bigr)\sin\frac{n\pi x}{L}\,dx.
$$

最后

$$
u(x,t)=v(x)+w(x,t).
$$

> [!example] 算一遍
> 若
>
> $$
> u(0,t)=10,\qquad u(L,t)=30,
> $$
>
> 且
>
> $$
> f(x)=10+\frac{20}{L}x+5\sin\frac{\pi x}{L},
> $$
>
> 则稳态部分是
>
> $$
> v(x)=10+\frac{20}{L}x.
> $$
>
> 剩余初始形状只有一个正弦模式：
>
> $$
> w(x,0)=5\sin\frac{\pi x}{L}.
> $$
>
> 因此
>
> $$
> u(x,t)=10+\frac{20}{L}x+5e^{-k\pi^2t/L^2}\sin\frac{\pi x}{L}.
> $$

> [!tip] 热方程长期图像
> 非零边界热方程的长期形状通常不是 $0$，而是满足边界的稳态函数。瞬态部分才会由热扩散逐渐衰减。

## Laplace 方程：没有时间的稳态 PDE

Laplace 方程常写成

$$
u_{xx}+u_{yy}=0.
$$

它描述的是稳态状态：没有 $t$，所以没有“初始形状如何随时间演化”。边界条件直接决定整个区域内部的函数。

考虑矩形

$$
0<x<a,\qquad 0<y<b,
$$

并取三个边界为零、上边界给定：

$$
u(0,y)=u(a,y)=u(x,0)=0,\qquad u(x,b)=g(x).
$$

设

$$
u(x,y)=X(x)Y(y).
$$

代入后得到

$$
\frac{X''}{X}=-\frac{Y''}{Y}.
$$

为了满足 $X(0)=X(a)=0$，空间方向取

$$
X_n(x)=\sin\frac{n\pi x}{a}.
$$

对应的 $Y$ 方程是

$$
Y_n''-\left(\frac{n\pi}{a}\right)^2Y_n=0.
$$

由下边界 $u(x,0)=0$ 选出

$$
Y_n(y)=\sinh\frac{n\pi y}{a}.
$$

因此解写成

$$
u(x,y)=\sum_{n=1}^{\infty}c_n
\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)}
\sin\frac{n\pi x}{a},
$$

其中

$$
c_n=\frac2a\int_0^a g(x)\sin\frac{n\pi x}{a}\,dx.
$$

> [!example] 单一上边界模式
> 若 $g(x)=\sin\frac{\pi x}{a}$，则只有 $n=1$ 的系数为 $1$，所以
>
> $$
> u(x,y)=
> \frac{\sinh(\pi y/a)}{\sinh(\pi b/a)}
> \sin\frac{\pi x}{a}.
> $$

> [!warning] Laplace 方程和 Laplace 变换不是同一件事
> Laplace 方程是 PDE $u_{xx}+u_{yy}=0$；Laplace 变换是把 $t$ 函数送到 $s$ 函数的积分变换。名字相同，但问题位置完全不同。

## 弦振动：初位移和初速度都要进入系数

两端固定的弦振动模型为

$$
u_{tt}=c^2u_{xx},\qquad u(0,t)=u(L,t)=0.
$$

若同时给出

$$
u(x,0)=f(x),\qquad u_t(x,0)=g(x),
$$

则空间模式仍是

$$
\sin\frac{n\pi x}{L}.
$$

时间方程给出

$$
\cos\frac{cn\pi t}{L},\qquad \sin\frac{cn\pi t}{L}.
$$

所以完整形式是

$$
u(x,t)=\sum_{n=1}^{\infty}
\left(A_n\cos\frac{cn\pi t}{L}
+B_n\sin\frac{cn\pi t}{L}\right)
\sin\frac{n\pi x}{L}.
$$

初位移决定 $A_n$：

$$
A_n=\frac2L\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx.
$$

初速度决定 $B_n$。因为

$$
u_t(x,0)=\sum_{n=1}^{\infty}
B_n\frac{cn\pi}{L}\sin\frac{n\pi x}{L},
$$

所以

$$
B_n=\frac{2}{cn\pi}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx.
$$

> [!example] 只有初速度
> 若 $f(x)=0$，$g(x)=\sin\frac{\pi x}{L}$，则 $A_n=0$，且只有 $B_1$ 非零：
>
> $$
> B_1=\frac{L}{c\pi}.
> $$
>
> 因此
>
> $$
> u(x,t)=\frac{L}{c\pi}\sin\frac{c\pi t}{L}\sin\frac{\pi x}{L}.
> $$

> [!tip] 和热方程的对照
> 热方程每个模式只有一个时间系数 $e^{-k(n\pi/L)^2t}$，所以只需要初始温度。波方程每个模式有 $\cos$ 和 $\sin$ 两个时间方向，所以初位移和初速度都要给。

## 分离变量总流程

> [!todo] 学习动作
> 1. 先读区域和边界：区间长度是 $L$、$a$，还是 $\pi$？
> 2. 设 $u=X(x)T(t)$ 或 $u=X(x)Y(y)$。
> 3. 把 PDE 代入，分离成只含一个变量的方程。
> 4. 用边界条件先筛空间特征值和特征函数。
> 5. 解另一个变量的方程：热方程给指数衰减，波方程给振荡，Laplace 方程给双曲函数。
> 6. 叠加所有模式。
> 7. 用初始条件或剩余边界条件做 Fourier 投影，求系数。
> 8. 最后回看收敛、端点和边界是否确实满足。

## 自测练习

> [!todo] 练习
> 1. 在 $0<x<L$ 上，写出 $f(x)=1$ 的半区间正弦系数 $b_n$。
> 2. 在 $0<x<L$ 上，写出 $f(x)=1$ 的半区间余弦展开。
> 3. 对热方程 $u_t=ku_{xx}$，若 $u(0,t)=0,u(L,t)=100$，应先拆出哪个稳态函数？
> 4. 在矩形 Laplace 方程例子中，若 $g(x)=3\sin\frac{2\pi x}{a}$，写出解。
> 5. 对两端固定弦，若 $f(x)=\sin\frac{2\pi x}{L}$ 且 $g(x)=0$，写出 $u(x,t)$。
> 6. 为什么波方程需要两个初始条件，而热方程通常只需要一个初始条件？

> [!success]- 参考答案
> 1.
> $$
> b_n=\frac2L\int_0^L\sin\frac{n\pi x}{L}\,dx
> =\frac{2}{n\pi}\bigl(1-(-1)^n\bigr).
> $$
> 偶数 $n$ 时为 $0$，奇数 $n$ 时为 $\frac4{n\pi}$。
>
> 2. 余弦展开只有常数项：
> $$
> 1=\frac{a_0}{2},\qquad a_0=2.
> $$
>
> 3. 稳态函数是
> $$
> v(x)=\frac{100}{L}x.
> $$
>
> 4. 只有 $n=2$ 模式：
> $$
> u(x,y)=3\frac{\sinh(2\pi y/a)}{\sinh(2\pi b/a)}\sin\frac{2\pi x}{a}.
> $$
>
> 5.
> $$
> u(x,t)=\cos\frac{2c\pi t}{L}\sin\frac{2\pi x}{L}.
> $$
>
> 6. 波方程对时间是二阶，需要初位移和初速度；热方程对时间是一阶，只需要初始温度。

> [!success] 小结
> Fourier/PDE 题的核心不是把所有公式背完，而是按边界选择模式。正弦、余弦、完整 Fourier 展开分别对应不同延拓和边界；热方程把模式衰减，波方程把模式振荡，Laplace 方程把边界形状传播进区域内部。只要先看边界，再做投影，公式就会变成可解释的步骤。
