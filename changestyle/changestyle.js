window.onload = function(){
	
	// let total_data = [
	// "这个网站可能它不只是一个网站", "0:01:999", "0:03:646",
	// "它可能决定着或意味着", "0:03:646", "0:04:997", 
	// "一个开始", "0:04:997", "0:06:676", 
	// "一个难忘的开始", "0:06:676", "0:08:462"]
	
	// 从loaclStorage中获取数据
	let total_data = localStorage.getItem('total_data').split(',')
	
	// 导入音频
	function import_audio(){
		wavesurfer = WaveSurfer.create({
		    container: document.getElementById('waveform'),
			forceDecode: true,
			backgroundColor: '#000',
			waveColor: '#c6c6c6',
			progressColor: '#fff',
			height: 99,
			audioRate: 1,
			cursorColor: '#e6e6e6',
		    plugins: [
		        WaveSurfer.cursor.create({
		            showTime: true,
		            opacity: 1,
		            customShowTimeStyle: {
		                'background-color': '#000',
		                color: '#fff',
		                padding: '2px',
		                'font-size': '10px'
		            }
		        })
		    ]
		});
		
		//zooming up
		var zoom_num = document.getElementById('zoom_num')
		zoom_num.addEventListener('input',function(){
			wavesurfer.zoom(this.value)	
		})
		
		wavesurfer.on('error', function(e) {
		    console.warn(e);
		});
		
		// Load audio from URL
		wavesurfer.load(loaclStorage.getItem('audio'));
		// let upload_audio = document.getElementById('upload_audio')
		
		// upload_audio.onchange = function(){
		// 	let get_audio_src = new FileReader()
		// 	get_audio_src.readAsDataURL(upload_audio.files[0])
		// 	get_audio_src.onload = function(){
		// 		let before_upload = document.getElementsByClassName('befor_upload')[0]
		// 		before_upload.style.display = 'none'
		// 		wavesurfer.load(get_audio_src.result)
				
		// 	}
		// }
		
		
		// Play button
		var button = document.querySelector('[data-action="play"]');
		
		button.addEventListener('click', wavesurfer.playPause.bind(wavesurfer));
	}


	// 添加文本到show中
	function addTextIntoShow(){
		let show = document.getElementsByClassName('show')[0]

		let create_div = document.createElement('div')
		create_div.className = 'create_box'
		create_div.style.width = '100%'
		create_div.style.position = 'absolute'
		create_div.style.transitionProperty = 'top'
		create_div.style.transitionDuration = '0s'
		
		for(let i=0; i<(total_data.length/3) ;i++){
			let create_p = document.createElement('p')
			create_p.className = 'create_by_yourself'
			create_p.innerText = total_data[i*3]
			create_div.appendChild(create_p)
		}
		show.appendChild(create_div)
		
		let create_i_top = document.createElement('i')
		create_i_top.className = 'mask_block_top'
		create_i_top.style.width = '100%'
		create_i_top.style.height = 0
		create_i_top.style.position = 'absolute'
		create_i_top.style.top = 0
		create_i_top.style.backgroundColor = '#000000'
		/* 
		在改变遮罩颜色之前改变遮罩高度没有效果的原因是：
		遮罩颜色的改变是改变它的背景颜色，没有改变遮罩颜色之前的遮罩是空的，没有背景颜色的
		故应该在一开始就设置遮罩块的背景颜色
		这样才不会出现问题
		 */
		show.appendChild(create_i_top)
		let create_i_bottom = document.createElement('i')
		create_i_bottom.className = 'mask_block_bottom'
		create_i_bottom.style.width = '100%'
		create_i_bottom.style.height = 0
		create_i_bottom.style.position = 'absolute'
		create_i_bottom.style.bottom = 0
		create_i_bottom.style.backgroundColor = '#000000'
		show.appendChild(create_i_bottom)
		
		
	}

	
	// 获取调整的数据
	function get_modifying_data(){
		let global_data = document.getElementsByClassName('global')
		console.log(global_data.length)
		let current_data = document.getElementsByClassName('current')
		let background = document.getElementsByClassName('background')
		let Global = {
			1:['fontFamily', "Microsoft YaHei"],
			2:['fontSize', '10px'],
			3:['fontWeight','100'],
			4:['letterSpacing','0px'],
			5:['color','#fff'],
			6:['opacity','1'],
			7:['padding','0px'],
			8:['transitionDuration','0s'],
			9:['transitionDelay',''],
			// transitionroperty:'all',
		}
		let create_by_yourself = document.getElementsByClassName('create_by_yourself')
		
		// 字体
		global_data[0].onchange = function(){
			Global[1][1] = global_data[0].value
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.fontFamily = Global[1][1]
			}
		}
		// 字体大小
		global_data[1].onchange = function(){
			Global[2][1] = global_data[1].value + 'px'
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.fontSize = Global[2][1]
			}
			console.log(Global[2][1])
			console.log('字体大小')
		}
		// 字体粗细 
		global_data[2].onchange = function(){
			Global[3][1] = global_data[2].value
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.fontWeight = Global[3][1]
			}
		}
		// 字间距
		global_data[3].onchange = function(){
			Global[4][1] = global_data[3].value + 'px'
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.letterSpacing = Global[4][1]
			}
		}
		// 字体颜色
		global_data[4].onchange = function(){
			Global[5][1] = global_data[4].value
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.color = Global[5][1]
			}
		}
		// 透明度
		global_data[5].onchange = function(){
			Global[6][1] = global_data[5].value
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.opacity = Global[6][1]
			}
		}
		// 行间距
		global_data[6].onchange = function(){
			Global[7][1] = global_data[6].value + 'px'
			for(let i = 0; i<create_by_yourself.length; i++){
				create_by_yourself[i].style.paddingTop = Global[7][1]
				create_by_yourself[i].style.paddingBottom = Global[7][1]
			}
		}
		// 变换时间
		// for(let i = 0; i<create_by_yourself.length; i++){
		// 	create_by_yourself[i].style.transitionDuration = Global[8][1]
		// }
		// for(let i = 0; i<create_by_yourself.length; i++){
		// 	create_by_yourself[i].style.transitionProperty = 'all'
		// }
	}
	
	
	// 监听居中、平移、背景、遮罩的更改
	function modify_others_style(){
		// 文本居中
		let checkbox = document.getElementsByClassName('checkbox')[1]
		checkbox.onchange = function(){
			let create_box = document.getElementsByClassName('create_box')[0]
			if(checkbox.checked == true){
				create_box.style.textAlign = 'center'
			}
			else{
				create_box.style.textAlign = 'left'
			}
		}
		
		// 文本平移
		let vertical_moving_range = document.getElementsByClassName('range')[0]
		vertical_moving_range.onchange = function(){
			let create_box = document.getElementsByClassName('create_box')[0]
			create_box.style.top = vertical_moving_range.value + '%'
		}
		
		// 更改背景
		let background_color = document.getElementsByClassName('background')[0]
		background_color.onchange = function(){
			let show_area = document.getElementsByClassName('show')[0]
			show_area.style.backgroundColor = background_color.value
		}
		
		
		/* ********遮罩块部分********** */
		let mask_block_top = document.getElementsByClassName('mask_block_top')[0]
		let mask_block_bottom = document.getElementsByClassName('mask_block_bottom')[0]
		
		// 遮罩块颜色
		let mask_color = document.getElementsByClassName('mask_color')[0]
		mask_color.onchange = function(){
			// let mask_block_top = document.getElementsByClassName('mask_block_top')[0]
			// let mask_block_bottom = document.getElementsByClassName('mask_block_bottom')[0]
			mask_block_top.style.backgroundColor = mask_color.value
			mask_block_bottom.style.backgroundColor = mask_color.value
		}
		
		
		// 遮罩块高度
		let mask_heigt_range = document.getElementsByClassName('range')[1]
		mask_heigt_range.onchange = function(){
			// let mask_block_top = document.getElementsByClassName('mask_block_top')[0]
			// let mask_block_bottom = document.getElementsByClassName('mask_block_bottom')[0]
			mask_block_bottom.style.height = mask_heigt_range.value + "%"
			mask_block_top.style.height = mask_heigt_range.value + "%"
		}
		
		// 遮罩块透明度
		let mask_opacity_range = document.getElementsByClassName('range')[2]
		mask_opacity_range.onchange = function(){
			// let mask_block_top = document.getElementsByClassName('mask_block_top')[0]
			// let mask_block_bottom = document.getElementsByClassName('mask_block_bottom')[0]
			mask_block_bottom.style.opacity = mask_opacity_range.value / 100
			mask_block_top.style.opacity = mask_opacity_range.value / 100
		}
	}
	
	
	// 向上移动
	function move_upward(){
		// 时间列表
		let time_list = []
		for(let i=0; i<(total_data.length/3); i++){
			let time_items = total_data[i*3+2].split(':')
			// 将单位转换为ms
			time_items = (+time_items[0])*60000 + (+time_items[1]*1000) + (+time_items[2])
			time_list.push(time_items)
		}
		
		// for(let i = 0; i<time_list.length; i){
		// }
		for(let i = 0; i<time_list.length; i++){
			setTimeout(move, time_list[i])
		}
	}
	
	// go
	function move(){
		let create_box = document.getElementsByClassName('create_box')[0]
		let create_p_height = document.getElementsByClassName('create_by_yourself')[0].clientHeight  //这个返回的是一个没有单位的数值
		let create_box_top = getComputedStyle(create_box).top  //这个返回的是一个字符串
		// 将create_box_top转换成数字
		create_box_top = +create_box_top.replace('px','')
		create_box.style.top = (create_box_top - create_p_height) + 'px'
	}
	
	// 全屏预览
	let lulan = document.getElementById('yulan')
	let quit = document.getElementById('quit')
	lulan.onclick = function(){
		let show_outside = document.getElementsByClassName('show_outside')[0]
		let modify = document.getElementsByClassName('modify')[0]
		let time = document.getElementsByClassName('time')[0]
		time.style.visibility = 'hidden'
		modify.style.visibility = 'hidden'
		show_outside.style.transform = "scale(1,1)"
	}
	quit.onclick = function(){
		let show_outside = document.getElementsByClassName('show_outside')[0]
		let modify = document.getElementsByClassName('modify')[0]
		let time = document.getElementsByClassName('time')[0]
		time.style.visibility = 'visible'
		modify.style.visibility = 'visible'
		show_outside.style.transform = "scale(0.7,0.7)"
	}
	// 导入文字
	addTextIntoShow()
	
	// 导入音频
	import_audio()
	
	// 获取调整数据
	get_modifying_data()
	
	// 监听居中、平移、背景、遮罩的更改
	modify_others_style()
	
	// 向上移动
	let go = document.getElementById('start')
	go.onclick = function(){
		let visibility = document.getElementsByClassName('btn')[0]
		visibility.style.visibility = 'hidden'
		move_upward()
	}
}