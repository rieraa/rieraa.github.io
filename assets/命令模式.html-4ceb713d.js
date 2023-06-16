import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-a438ebbc.js";const e={},p=t(`<h1 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>命令模式（Command Pattern）用于将请求（命令）封装成一个对象，使得可以将不同的请求参数化并且支持请求的排队、记录日志、撤销等操作</p><h2 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h2><figure><img src="https://oooooo.oss-cn-fuzhou.aliyuncs.com/img/image-20230531111839798.png" alt="image-20230531111839798" tabindex="0" loading="lazy"><figcaption>image-20230531111839798</figcaption></figure><h2 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h2><ul><li>命令接口（Command）</li><li>具体命令（Concrete Command）</li><li>命令接收者（Receiver）</li><li>命令发起者（Invoker）</li></ul><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//	抽象命令</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Command</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 具体命令</span>

<span class="token comment">// 帮助</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelpCommand</span> <span class="token keyword">extends</span> <span class="token class-name">Command</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">DisplayHelpClass</span> hcObj<span class="token punctuation">;</span>   <span class="token comment">//维持对请求接收者的引用</span>

	<span class="token keyword">public</span> <span class="token class-name">HelpCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		hcObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DisplayHelpClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//命令执行方法，将调用请求接收者的业务方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		hcObj<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 退出</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExitCommand</span> <span class="token keyword">extends</span> <span class="token class-name">Command</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">SystemExitClass</span> seObj<span class="token punctuation">;</span>  <span class="token comment">//维持对请求接收者的引用</span>

	<span class="token keyword">public</span> <span class="token class-name">ExitCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		seObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SystemExitClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//命令执行方法，将调用请求接收者的业务方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		seObj<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 接收者</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DisplayHelpClass</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;显示帮助文档！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SystemExitClass</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;退出系统！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 调用者</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FunctionButton</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">Command</span> command<span class="token punctuation">;</span>  <span class="token comment">//维持一个抽象命令对象的引用</span>

	<span class="token comment">//为功能键注入命令</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCommand</span><span class="token punctuation">(</span><span class="token class-name">Command</span> command<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>command <span class="token operator">=</span> command<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//发送请求的方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;单击功能键: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		command<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 客户端</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">FunctionButton</span> fb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FunctionButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">Command</span> command<span class="token punctuation">;</span> <span class="token comment">//定义命令对象</span>
		command <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Command</span><span class="token punctuation">)</span><span class="token class-name">XMLUtil</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//读取配置文件，反射生成对象</span>

		fb<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将命令对象注入功能键</span>
		fb<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//调用功能键的业务方法</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","命令模式.html.vue"]]);export{k as default};
