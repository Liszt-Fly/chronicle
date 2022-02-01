// 样式初始化
export let addStyle = (styleFile: string) => {
	const head = document.head || document.getElementsByTagName('head')[0];
	let style = document.createElement('style');

	head.appendChild(style);
}