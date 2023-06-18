import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as e,a as s}from"./app-f5592d1c.js";const i={},d=s(`<h1 id="java教程" tabindex="-1"><a class="header-anchor" href="#java教程" aria-hidden="true">#</a> JAVA教程</h1><h2 id="java入门" tabindex="-1"><a class="header-anchor" href="#java入门" aria-hidden="true">#</a> JAVA入门</h2><h3 id="程序基本结构" tabindex="-1"><a class="header-anchor" href="#程序基本结构" aria-hidden="true">#</a> 程序基本结构</h3><p>Java入口程序规定的方法必须是静态方法，方法名必须为<code>main</code>，括号内的参数必须是String数组。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 方法名是main</span>
        <span class="token comment">// 方法代码...</span>
    <span class="token punctuation">}</span> <span class="token comment">// 方法定义结束</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本数据类型" tabindex="-1"><a class="header-anchor" href="#基本数据类型" aria-hidden="true">#</a> 基本数据类型</h3><p>计算机内存的最小存储单元是字节（byte），一个字节就是一个8位二进制数，即8个bit。它的二进制表示范围从<code>00000000</code><sub>\`11111111\`，换算成十进制是0</sub>255，换算成十六进制是<code>00</code>~<code>ff</code>。</p><p>内存单元从0开始编号，称为内存地址。每个内存单元可以看作一间房间，内存地址就是门牌号。</p><div class="language-ascii line-numbers-mode" data-ext="ascii"><pre class="language-ascii"><code>  0   1   2   3   4   5   6  ...
┌───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │...
└───┴───┴───┴───┴───┴───┴───┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个字节是1byte，1024字节是1K，1024K是1M，1024M是1G，1024G是1T。一个拥有4T内存的计算机的字节数量就是：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>4T = 4 x 1024G
   = 4 x 1024 x 1024M
   = 4 x 1024 x 1024 x 1024K
   = 4 x 1024 x 1024 x 1024 x 1024
   = 4398046511104
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同的数据类型占用的字节数不一样。我们看一下Java基本数据类型占用的字节数：</p><div class="language-ascii line-numbers-mode" data-ext="ascii"><pre class="language-ascii"><code>       ┌───┐
  byte │   │
       └───┘
       ┌───┬───┐
 short │   │   │
       └───┴───┘
       ┌───┬───┬───┬───┐
   int │   │   │   │   │
       └───┴───┴───┴───┘
       ┌───┬───┬───┬───┬───┬───┬───┬───┐
  long │   │   │   │   │   │   │   │   │
       └───┴───┴───┴───┴───┴───┴───┴───┘
       ┌───┬───┬───┬───┐
 float │   │   │   │   │
       └───┴───┴───┴───┘
       ┌───┬───┬───┬───┬───┬───┬───┬───┐
double │   │   │   │   │   │   │   │   │
       └───┴───┴───┴───┴───┴───┴───┴───┘
       ┌───┬───┐
  char │   │   │
       └───┴───┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>byte</code>恰好就是一个字节，而<code>long</code>和<code>double</code>需要8个字节。</p><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3>`,15),l=[d];function c(r,t){return a(),e("div",null,l)}const u=n(i,[["render",c],["__file","basic.html.vue"]]);export{u as default};
