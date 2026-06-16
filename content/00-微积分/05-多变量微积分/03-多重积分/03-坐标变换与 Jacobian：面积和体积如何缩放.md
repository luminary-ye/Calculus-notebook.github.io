# 坐标变换与 Jacobian：面积和体积如何缩放

> [!abstract] 本节主线
> 坐标变换不是只把 \(x,y\) 换成 \(u,v\)。它会把新坐标平面中的小矩形，弯曲或拉伸成旧坐标平面中的小平行四边形。Jacobian 行列式的绝对值，就是这个局部小面积的缩放倍率。  
> 因此换变量时要同时改三件事：区域、被积函数、面积或体积元素。

> [!info] 和前后讲义的关系
> [[03-多重积分/02-积分次序与区域重写：把区域切给合适的变量|积分次序与区域重写]] 改变的是切片顺序；本节改变的是坐标网格本身。二重积分和 \(dA\) 的基本意义见 [[03-多重积分/01-二重积分：区域、小面积与迭代积分|二重积分]]。Jacobian 矩阵作为多变量导数的意义见 [[02-多元微分/04-可微性、全微分与 Jacobian：多变量导数的线性本质|可微性、全微分与 Jacobian]]。  
> 极坐标点和曲线的表示意义见 [[04-数学/00-微积分/04-曲线与坐标系统/03-极坐标/01-极坐标网格|极坐标的表示意义]]；一元积分里的换元结构可回看 [[04-数学/00-微积分/01-一元积分学/03-定积分求值与近似/01-定积分计算结构|定积分计算结构]]。后面 [[03-多重积分/04-三重积分、柱坐标与球坐标：体积区域的坐标选择|三重积分、柱坐标与球坐标]] 会系统使用三维体积元素。

> [!question] 先问一个问题
> 极坐标里为什么不是简单写 \(dA=dr\,d\theta\)，而一定要写
> \[
> dA=r\,dr\,d\theta?
> \]
> 这个多出来的 \(r\)，就是最早遇到的 Jacobian 因子。

一元换元时，\(dx\) 会随着 \(x=g(u)\) 变成 \(g'(u)\,du\)。多变量换元也是同一件事，只是“小长度缩放”升级成“小面积、小体积缩放”。Jacobian 的讲法最好从这个局部小片开始，而不是从行列式公式开始：坐标变换把一个小网格格子送到哪里，它的面积被放大了多少，积分就必须补上多少。

## 从换序到换坐标

上一节里，我们面对的是同一个 \(xy\) 平面区域 \(D\)，只是把竖直小片改成水平小片：

$$
dy\,dx
\quad\longleftrightarrow\quad
dx\,dy.
$$

坐标变换更进一步。我们不再只沿 \(x\)、\(y\) 方向切，而是在另一个平面中用 \(u\)、\(v\) 切出小矩形，再通过一个变换

$$
T(u,v)=(x(u,v),y(u,v))
$$

把它送到 \(xy\) 平面。

如果 \(S\) 是 \(uv\) 平面中的区域，\(D=T(S)\) 是它在 \(xy\) 平面中的像，那么在 \(D\) 上积分可以改写成在 \(S\) 上积分。

> [!tip] 一句话图像
> 换序是在同一张地图上换扫描方向；换坐标是换一张更合适的地图，再把地图上的小格子按实际面积折算回来。

## 二维换变量公式

设

$$
x=x(u,v),\qquad y=y(u,v),
$$

并记

$$
J_T(u,v)
=
\det
\begin{pmatrix}
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v}\\
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v}
\end{pmatrix}
=
\frac{\partial x}{\partial u}\frac{\partial y}{\partial v}
-
\frac{\partial x}{\partial v}\frac{\partial y}{\partial u}.
$$

在常见的良好情形下，若 \(T\) 把 \(S\) 一一对应地映到 \(D\)，且 \(J_T\) 不在区域内部变成 \(0\)，则

$$
\iint_D f(x,y)\,dA
=
\iint_S f(x(u,v),y(u,v))\,\lvert J_T(u,v)\rvert\,du\,dv.
$$

也可以把面积元素单独记成

$$
dA
=
\lvert J_T(u,v)\rvert\,du\,dv.
$$

> [!note] Jacobian 行列式
> 这里的 \(J_T\) 是 Jacobian 矩阵的行列式。Jacobian 矩阵描述局部线性近似，Jacobian 行列式描述这个局部线性近似怎样缩放面积。  
> 行列式可以为负，但面积不能为负，所以换变量公式里使用 \(\lvert J_T\rvert\)。

> [!warning] 两个条件不宜混成一个
> \(J_T\ne0\) 说明小片在局部没有被压扁；一一对应说明整块区域没有被重复覆盖。前者是局部条件，后者是全局条件。换变量题里两者都要看。

## 为什么是行列式

固定 \(uv\) 平面中的一个点 \((u_0,v_0)\)。从这个点出发，沿 \(u\) 方向走一点点，\(T\) 在 \(xy\) 平面中的变化近似为

$$
T_u(u_0,v_0)\,\Delta u.
$$

沿 \(v\) 方向走一点点，变化近似为

$$
T_v(u_0,v_0)\,\Delta v.
$$

所以一个很小的 \(uv\) 矩形，经过变换后近似成为 \(xy\) 平面中的小平行四边形。这个小平行四边形的面积是

$$
\lvert \det(T_u,T_v)\rvert\,\Delta u\,\Delta v.
$$

这里 \(T_u\) 和 \(T_v\) 是两个偏导向量，它们给出新坐标网格两条边被送到 \(xy\) 平面后的方向和长度。

当小矩形越来越小，这个近似就变成面积元素公式。

```tikz
\begin{document}
\begin{tikzpicture}[scale=0.9, >=stealth]
  \draw[->] (-0.2,0) -- (2.9,0) node[right] {$u$};
  \draw[->] (0,-0.2) -- (0,2.2) node[above] {$v$};
  \fill[blue!12] (0.7,0.45) rectangle (2.1,1.45);
  \draw[blue!70, thick] (0.7,0.45) rectangle (2.1,1.45);
  \node[blue!70] at (1.4,0.25) {$\Delta u$};
  \node[blue!70] at (0.35,0.95) {$\Delta v$};
  \node at (1.4,1.75) {$uv$ 平面的小矩形};

  \draw[->, thick] (3.1,1.0) -- (4.2,1.0) node[midway, above] {$T$};

  \draw[->] (4.6,0) -- (8.1,0) node[right] {$x$};
  \draw[->] (4.8,-0.2) -- (4.8,2.5) node[above] {$y$};
  \coordinate (A) at (5.25,0.55);
  \coordinate (B) at (6.85,0.85);
  \coordinate (D) at (5.85,1.7);
  \coordinate (C) at (7.45,2.0);
  \fill[green!15] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[green!60!black, thick] (A) -- (B) -- (C) -- (D) -- cycle;
  \draw[red, very thick, ->] (A) -- (B) node[midway, below] {$T_u\Delta u$};
  \draw[purple, very thick, ->] (A) -- (D) node[midway, left] {$T_v\Delta v$};
  \node at (6.4,2.28) {$xy$ 平面的近似小平行四边形};
\end{tikzpicture}
\end{document}
```

> [!info] 局部线性化的角色
> 多变量可微性说明：足够小的区域附近，光滑变换可以被它的线性近似代替。线性变换缩放面积的倍率正是行列式的绝对值，所以一般变换的局部面积倍率就是 Jacobian 行列式的绝对值。

## 极坐标：第一个 Jacobian

极坐标变换是

$$
x=r\cos\theta,\qquad y=r\sin\theta.
$$

因此

$$
J(r,\theta)
=
\det
\begin{pmatrix}
\cos\theta & -r\sin\theta\\
\sin\theta & r\cos\theta
\end{pmatrix}
=
r\cos^2\theta+r\sin^2\theta
=r.
$$

所以在极坐标中

$$
dA=r\,dr\,d\theta.
$$

这不是一个额外记忆项，而是“极坐标小矩形”被送到 \(xy\) 平面后变成小扇形造成的面积缩放。

> [!tip] 直觉
> 同样是角度变化 \(\Delta\theta\)，离原点越远，扫过的弧长越长。半径为 \(r\) 时，小弧长近似是 \(r\Delta\theta\)，再乘径向厚度 \(\Delta r\)，小面积就是
> \[
> r\,\Delta r\,\Delta\theta.
> \]

例如，半径为 \(a\) 的圆盘面积可以写成

$$
\iint_{x^2+y^2\le a^2}1\,dA
=
\int_0^{2\pi}\int_0^a r\,dr\,d\theta
=
\pi a^2.
$$

再看一个会让被积函数一起变简单的例子：

$$
I=\iint_{x^2+y^2\le a^2} e^{-(x^2+y^2)}\,dA.
$$

换成极坐标后，区域变成

$$
0\le r\le a,\qquad 0\le\theta\le2\pi,
$$

被积函数变成 \(e^{-r^2}\)，面积元素变成 \(r\,dr\,d\theta\)。所以

$$
I
=
\int_0^{2\pi}\int_0^a e^{-r^2}r\,dr\,d\theta
=
\pi\left(1-e^{-a^2}\right).
$$

这里的 \(r\) 不是多余负担，反而正好让 \(e^{-r^2}\) 的积分变顺。

### 极坐标区域怎么写

极坐标二重积分最常见的困难不是 Jacobian，而是把区域写对。一个典型极坐标区域写成

$$
\alpha\le\theta\le\beta,\qquad
r_{\min}(\theta)\le r\le r_{\max}(\theta).
$$

这句话的读法是：先固定一条角度射线，再沿这条射线从内边界走到外边界。

> [!tip] 什么时候优先想极坐标
> 如果区域边界里出现圆
> $$
> x^2+y^2=a^2
> $$
> 或射线
> $$
> y=(\tan\alpha)x,
> $$
> 或被积函数里出现
> $$
> x^2+y^2,
> $$
> 通常应该先试试极坐标。圆变成 \(r=\text{常数}\)，射线变成 \(\theta=\text{常数}\)，距离平方变成 \(r^2\)。

下面这张图表示一个极坐标扇形区域：角度先在两条射线之间扫动，半径再从内圈走到外圈。

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.0, >=stealth]
  \draw[->] (-0.4,0) -- (4.4,0) node[right] {$x$};
  \draw[->] (0,-0.4) -- (0,3.3) node[above] {$y$};

  \fill[blue!10] (25:1.15) arc (25:70:1.15) -- (70:3.1) arc (70:25:3.1) -- cycle;
  \draw[blue!70, thick] (25:1.15) arc (25:70:1.15);
  \draw[blue!70, thick] (25:3.1) arc (25:70:3.1);
  \draw[red!70, thick] (0,0) -- (25:3.35);
  \draw[red!70, thick] (0,0) -- (70:3.35);

  \node[blue!70] at (2.9,2.35) {$r=r_{\max}(\theta)$};
  \node[blue!70] at (1.0,1.05) {$r=r_{\min}(\theta)$};
  \node[red!70] at (3.45,1.18) {$\theta=\alpha$};
  \node[red!70] at (1.0,3.1) {$\theta=\beta$};
  \node at (2.1,1.65) {$D$};
\end{tikzpicture}
\end{document}
```

> [!example] 半圆盘上的积分
> 设 \(D\) 是上半圆盘
> $$
> x^2+y^2\le4,\qquad y\ge0.
> $$
> 则极坐标下
> $$
> 0\le r\le2,\qquad 0\le\theta\le\pi.
> $$
> 若要计算
> $$
> \iint_D (x^2+y^2)\,dA,
> $$
> 就写成
> $$
> \int_0^\pi\int_0^2 r^2\cdot r\,dr\,d\theta
> =
> 4\pi.
> $$
> 这里第一个 \(r^2\) 来自被积函数 \(x^2+y^2\)，第二个 \(r\) 来自面积元素 \(dA=r\,dr\,d\theta\)。

> [!warning] 角度范围不是总是 \(0\) 到 \(2\pi\)
> 全圆盘才常用 \(0\le\theta\le2\pi\)。半圆、扇形、右半平面里的圆，角度范围都要跟着区域改。  
> 若角度多扫了一遍，积分会重复计算；若角度少扫了，区域会漏掉。

## 一一性：小片不压扁，还要整块不重扫

初学时很容易把“Jacobian 不为零”和“变换可以放心使用”混为一谈。更准确地说：

| 检查 | 它保证什么 | 它不保证什么 |
|---|---|---|
| \(J_T\ne0\) | 每个很小的小矩形局部变成非退化小平行四边形 | 整个区域不会绕回来盖住自己 |
| \(T\) 在区域上一一对应 | 目标区域中的点被计算一次 | 小片是否局部被压扁 |

一个典型例子是

$$
T(s,t)=(e^s\cos t,e^s\sin t).
$$

它的 Jacobian 绝对值是

$$
\left\lvert
\frac{\partial(x,y)}{\partial(s,t)}
\right\rvert
=e^{2s},
$$

在所有点都不为 \(0\)。但是如果让

$$
0\le s\le \ln 2,\qquad 0\le t\le4\pi,
$$

那么同一个圆环会被扫两遍，积分也会重复两遍。若改成一圈角度范围，例如

$$
0\le s\le \ln 2,\qquad 0\le t\le2\pi,
$$

除去边界上的重复表示，圆环内部就只被覆盖一次。

> [!tip] 实用检查
> 对带角度的坐标，先问“角度有没有多扫一圈”；对由 \(u=x+y,\ v=x-y\) 这类线性组合来的变换，先反解 \(x,y\)，能唯一反解通常就比较稳。

## 换变量的执行流程

> [!todo] 五步流程
> 1. 看区域边界和被积函数，决定新变量想让什么东西变简单。
> 2. 写出 \(x,y\) 关于新变量的表达；如果先写了 \(u,v\) 关于 \(x,y\)，就要反解或使用倒数 Jacobian。
> 3. 把旧区域 \(D\) 的边界改写到新变量平面，得到新区域 \(S\)。
> 4. 计算 \(\lvert \partial(x,y)/\partial(u,v)\rvert\)。
> 5. 同时替换被积函数和面积元素，再写新积分。

| 需要改的对象 | 原来 | 变成 |
|---|---|---|
| 区域 | \(D\) 中的 \(x,y\) 条件 | \(S\) 中的 \(u,v\) 条件 |
| 函数 | \(f(x,y)\) | \(f(x(u,v),y(u,v))\) |
| 面积元素 | \(dA\) 或 \(dx\,dy\) | \(\lvert J_T(u,v)\rvert\,du\,dv\) |

> [!warning] 不宜只换函数
> 把 \(x,y\) 换成新变量后，如果仍然把 \(dA\) 当成 \(du\,dv\)，就漏掉了面积缩放。极坐标里最常见的错误就是把 \(dA\) 写成 \(dr\,d\theta\)，少了 \(r\)。

## 例子：把斜平行四边形拉直

设 \(D\) 是由下面四条直线围成的平行四边形：

$$
0\le x+y\le 2,\qquad 0\le x-y\le 1.
$$

计算

$$
I=\iint_D (x+y)\,dA.
$$

这个区域在 \(xy\) 平面中是斜的，但边界已经暗示应该取

$$
u=x+y,\qquad v=x-y.
$$

于是新区域直接变成矩形：

$$
0\le u\le 2,\qquad 0\le v\le 1.
$$

反解得到

$$
x={u+v\over 2},\qquad y={u-v\over 2}.
$$

计算 Jacobian：

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\det
\begin{pmatrix}
\frac12 & \frac12\\
\frac12 & -\frac12
\end{pmatrix}
=
-{1\over 2}.
$$

所以

$$
dA={1\over 2}\,du\,dv.
$$

又因为 \(x+y=u\)，因此

$$
I
=
\int_0^2\int_0^1 u\cdot {1\over 2}\,dv\,du
=1.
$$

> [!tip] 这个例子的重点
> 新变量不是任意取的。边界里已经出现了 \(x+y\) 和 \(x-y\)，把它们直接命名为 \(u,v\)，斜边界就会变成常数边界。

## 例子：椭圆面积为什么是 \(\pi ab\)

设 \(a,b>0\)。椭圆区域

$$
{x^2\over a^2}+{y^2\over b^2}\le 1
$$

可以看成单位圆盘经过 \(x\) 方向拉伸 \(a\) 倍、\(y\) 方向拉伸 \(b\) 倍得到的区域。取

$$
x=ar\cos\theta,\qquad y=br\sin\theta,
$$

其中

$$
0\le r\le1,\qquad 0\le\theta\le2\pi.
$$

Jacobian 为

$$
J(r,\theta)
=
\det
\begin{pmatrix}
a\cos\theta & -ar\sin\theta\\
b\sin\theta & br\cos\theta
\end{pmatrix}
=
ab r.
$$

所以椭圆面积是

$$
A
=
\int_0^{2\pi}\int_0^1 ab r\,dr\,d\theta
=
\pi ab.
$$

这个计算把两个缩放同时看清楚了：\(ab\) 来自横纵方向的整体拉伸，\(r\) 来自极坐标角向小片的弧长缩放。

## 三维体积元素

三维中完全类似。若

$$
T(u,v,w)=(x(u,v,w),y(u,v,w),z(u,v,w)),
$$

则

$$
dV
=
\left\lvert
\frac{\partial(x,y,z)}{\partial(u,v,w)}
\right\rvert
\,du\,dv\,dw.
$$

换变量公式为

$$
\iiint_D F(x,y,z)\,dV
=
\iiint_S
F(x(u,v,w),y(u,v,w),z(u,v,w))
\left\lvert
\frac{\partial(x,y,z)}{\partial(u,v,w)}
\right\rvert
\,du\,dv\,dw.
$$

常见的两个体积元素是：

| 坐标 | 坐标变换 | 体积元素 |
|---|---|---|
| 柱坐标 | \(x=r\cos\theta,\ y=r\sin\theta,\ z=z\) | \(dV=r\,dr\,d\theta\,dz\) |
| 球坐标 | \(x=\rho\sin\varphi\cos\theta,\ y=\rho\sin\varphi\sin\theta,\ z=\rho\cos\varphi\) | \(dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta\) |

> [!info] 先记住从哪里来
> 柱坐标的 \(r\) 和极坐标的 \(r\) 是同一个平面面积因子；球坐标的 \(\rho^2\sin\varphi\) 来自球面附近三个方向的小长度相乘。这里采用 \(\varphi\) 从正 \(z\) 轴量起的约定。完整的空间区域设置放到 [[03-多重积分/04-三重积分、柱坐标与球坐标：体积区域的坐标选择|三重积分、柱坐标与球坐标]] 中展开。

## 常见误区

> [!warning] 误区 1：忘记绝对值
> Jacobian 行列式的符号表示方向是否翻转；面积和体积只看大小。因此普通面积、体积和质量积分中使用 \(\lvert J\rvert\)，不是 \(J\) 本身。

> [!warning] 误区 2：用反了 Jacobian
> 如果你写的是
> \[
> u=u(x,y),\qquad v=v(x,y),
> \]
> 那么直接算出来的是
> \[
> \frac{\partial(u,v)}{\partial(x,y)}.
> \]
> 但换变量公式需要的是
> \[
> \frac{\partial(x,y)}{\partial(u,v)}.
> \]
> 在非零且可逆的情形下，二者互为倒数。

> [!warning] 误区 3：只改积分式，不改区域
> 换变量时，区域也必须改写。一个复杂的 \(D\) 之所以值得换变量，常常正是因为它在新变量中变成了矩形、圆盘、盒子或简单不等式。

> [!failure] 不是所有变换都可以任意用
> 若一个变换在区域内部把大片不同点压到同一点，或者同一块区域被重复覆盖，积分会被漏算或重复算。极坐标在 \(r=0\) 处不是一一对应，但那只是一条边界上的退化，通常不影响普通二重积分；若角度区间让区域重复扫过，就必须主动修正。

## 小结

> [!success] 本节要点
> - 换变量要同时改变区域、被积函数和面积或体积元素。
> - Jacobian 矩阵给出坐标变换的局部线性近似。
> - Jacobian 行列式的绝对值给出局部面积或体积缩放倍率。
> - \(J\ne0\) 是局部不退化检查，一一对应是全局不重复覆盖检查。
> - 极坐标的 \(dA=r\,dr\,d\theta\) 是二维换变量公式的基本例子。
> - 柱坐标、球坐标和更一般的坐标变换，都是同一个原则的延伸。

## 练习

> [!example] 练习 1
> 对极坐标变换
> \[
> x=r\cos\theta,\qquad y=r\sin\theta,
> \]
> 计算 \(\partial(x,y)/\partial(r,\theta)\)。
>
> 参考答案：
> \[
> \frac{\partial(x,y)}{\partial(r,\theta)}
> =
> r.
> \]

> [!example] 练习 2
> 用坐标变换求椭圆
> \[
> {x^2\over 9}+{y^2\over 4}\le1
> \]
> 的面积。
>
> 参考答案：取 \(x=3r\cos\theta,\ y=2r\sin\theta\)，则 \(\lvert J\rvert=6r\)，所以
> \[
> A=\int_0^{2\pi}\int_0^1 6r\,dr\,d\theta=6\pi.
> \]

> [!example] 练习 3
> 设 \(D\) 由
> \[
> 1\le x+y\le 3,\qquad 0\le x-y\le 2
> \]
> 围成。令 \(u=x+y,\ v=x-y\)，写出 \(D\) 在 \(uv\) 平面中的区域，并给出 \(dA\)。
>
> 参考答案：
> \[
> 1\le u\le3,\qquad 0\le v\le2,
> \]
> 且
> \[
> dA={1\over 2}\,du\,dv.
> \]

> [!example] 练习 4
> 设 \(u=x-y,\ v=x+y\)。若直接计算得到
> \[
> \frac{\partial(u,v)}{\partial(x,y)}=2,
> \]
> 那么换变量公式中 \(dA\) 应该怎样写？
>
> 参考答案：
> \[
> dA=
> \left\lvert
> \frac{\partial(x,y)}{\partial(u,v)}
> \right\rvert du\,dv
> ={1\over 2}\,du\,dv.
> \]
## 课后练习与作业题

> [!example] 低门槛例题
> 极坐标变换 $x=r\cos\theta,y=r\sin\theta$ 的 Jacobian 行列式绝对值是 $r$，所以
>
> $$
> dA=r\,dr\,d\theta.
> $$
>
> 这不是多出来的附加记号，而是小面积被坐标变换拉伸后的比例。

> [!todo] 做题安排
> 先算 Jacobian，再写新区域，再换 integrand。极坐标基础回看 [[04-数学/00-微积分/04-曲线与坐标系统/03-极坐标/02-坐标互化|极坐标互化]]。

### A. 概念理解题（必须）

1. Jacobian 行列式为什么和面积缩放有关？
2. 为什么换变量公式里要取绝对值？
3. 极坐标的 $r$ 因子来自哪里？
4. 换变量时，区域、函数、小面积三个对象都要怎样改变？
5. 经典题：解释椭圆面积 $\pi ab$ 为什么可由单位圆缩放得到。
6. 为什么 \(J\ne0\) 不自动保证区域没有被重复计算？

### B. 计算练习强化（按方法分组）

**Jacobian 计算**

1. 对 $x=2u,y=3v$ 求 Jacobian。
2. 对 $x=u+v,y=u-v$ 求 Jacobian。
3. 对极坐标变换求 Jacobian。

**换变量积分**

4. 用缩放变换求椭圆 $x^2/a^2+y^2/b^2\le1$ 的面积。
5. 把圆盘 $x^2+y^2\le4$ 上的 $\iint_R(x^2+y^2)dA$ 写成极坐标积分。
### C. 综合贯通与回看

6. 经典贯通题：比较一元换元法中的 $dx$ 缩放和二重积分中的 Jacobian 缩放。

> [!example]- 参考答案与提示
> 1：$6$。2：$-2$，面积缩放 $2$。3：$r$。4：$x=au,y=bv$，面积为 $ab\pi$。5：$\int_0^{2\pi}\int_0^2 r^2\cdot r\,dr\,d\theta$。6：因为 \(J\ne0\) 只说明局部小片不被压扁；若角度范围或参数区域让同一目标点出现多次，积分仍会重复计算。
