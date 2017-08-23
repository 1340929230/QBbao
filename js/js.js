var div = document.getElementById('lunbo'); // 容器
	var ul = div.getElementsByTagName('ul')[0]; // 列表
	var imgs = ul.getElementsByTagName('img'); // 所有图片
	var prev = document.getElementById('prev'); // 左箭头
	var next = document.getElementById('next'); // 右箭头
	var btn = document.getElementById('btns'); // 按钮容器
	var btns = document.getElementsByTagName('span'); // 所有按钮
	var btnLen = btns.length; // 按钮数量
	var offset = -imgs[0].offsetWidth; // 图片移动距离（一副图片宽度）
	var imgNum = imgs.length; // 图片数量（去掉两幅重复的图片）
	var interval = 2000; // 轮播时间间隔（2S）
	var index = 0;  //图片的序号 （初始为0）
	ul.style.left = offset*index+'px'; // 设置轮播图初始位置
	function move() {
		if(index>imgNum-1) {
			index=0; // 超过最大图片数，回到第一幅图
		}
		if(index<0) {
			index=imgNum-1; // 超过最小图片书，回到最后一幅图
		}
		console.log(imgNum)
		ul.style.left = offset*index+'px'; // 设置轮播图新的位置
	}
	function showBtn() {
		for (var j=0; j<btnLen; j++) {
			if (btns[j].className=='on') { //找到class='on'的按钮
				btns[j].removeAttribute('class'); // 清除掉它的class属性的值
				break; // 因为同时只能有一个按钮具有class='on'，所以找到之后不再继续循环查找后续的按钮
			}
		}
		btns[index].className='on'; // 给当前图片对应的按钮添加class='on'
	}
	
	prev.onclick = function() {
		index--; // 显示上一幅图
		move(); //切换图片
		showBtn(); //切换按钮
	}
	next.onclick = function() {
		index++; // 显示下一幅图
		move();//切换图片
		showBtn();//切换按钮
	}
	var timer = setInterval(next.onclick,interval); // 设置自动轮播
	div.onmouseover = function () {
		clearInterval(timer); // 停止轮播
	}
	div.onmouseout = function () {
		timer = setInterval(next.onclick,interval);// 设置自动轮播
	}
	for (var i=0;i<btnLen;i++) {
		btns[i].onclick = function () {
			if (this.className=='on') { // 如果点击的按钮就是激活的按钮（当前图片对应的按钮），则不需要进行任何操作
				return;
			}
			var Index = this.getAttribute('index'); // 获取到点击的按钮的index属性值
			index = Index; // 把当前要显示的图片设置为点击的按钮的序号(index)对应的图片
			move(); //切换图片
			showBtn(); //切换按钮
		}
	}