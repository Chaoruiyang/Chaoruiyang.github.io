'use strict';

// Create an instance
var wavesurfer = {};

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
	
	
	// 音频
	wavesurfer = WaveSurfer.create({
        container: document.getElementById('waveform'),
		forceDecode: true,
		backgroundColor: '#000',
		waveColor: '#c6c6c6',
		progressColor: '#fff',
		height: 200,
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
	let upload_audio = document.getElementById('upload_audio')
	
	upload_audio.onchange = function(e){
		let get_audio_src = new FileReader()
		get_audio_src.readAsDataURL(upload_audio.files[0])
		console.log(get_audio_src)
		console.log(upload_audio,upload_audio.files[0])
		console.log(e.target.result)
		get_audio_src.onload = function(){
			let before_upload = document.getElementsByClassName('befor_upload')[0]
			before_upload.style.display = 'none'
			wavesurfer.load(get_audio_src.result)
		}
	}
	

    // Play button
    var button = document.querySelector('[data-action="play"]');

    button.addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

	
	// 加载文本
	let upload_text = document.getElementById('upload_text')
	
	upload_text.onchange = function(){
		let get_txt_src = new FileReader()
		get_txt_src.readAsText(upload_text.files[0])
		get_txt_src.onload = function(){
			// 折叠 
			let fold = false;
			let upload_text_area = document.getElementsByClassName('befor_upload')[1]
			if (fold == false){
				upload_text_area.style.borderRadius = '10px'
				upload_text_area.style.width = '20px'
				upload_text_area.style.height = '20px'
				upload_text_area.style.backgroundColor = '#FFFFFF'
				fold = true
			}
			else{
				upload_text_area.style.width = '71%'
				upload_text_area.style.height = '20.25rem'
				fold = true
			}
			let res = get_txt_src.result.split('\n')
			// console.log(res.split('\n'))
			// 上传的文本结果
			for(let i = 0; i<res.length; i++){
				addLiElements(res, i)
			}
		}
	}
	
	
	// 将结果添加到ul
	function addLiElements(text_result, i){
		let ul = document.getElementsByClassName('content_list')[0]
		let createli = document.createElement('li')
		let creatediv = document.createElement('div')
		let createbutton = document.createElement('button')
		
		
		creatediv.className = 'content_list_item'
		createli.appendChild(creatediv)
		
		for(let j = 0; j<3; j++){
			let createinput = document.createElement('input')
			if(j==0){
				createinput.className = 'content_list_item_text'
				createinput.value = text_result[i]  //这里的i是77行的循环中的i
			}
			if(j==1){
				createinput.className = 'time start'
				createinput.value = "-- : -- : ---"
			}
			if(j==2){
				createinput.className = 'time end'
				createinput.value = "-- : -- : ---"
			}
			creatediv.appendChild(createinput)
		}
		
		createbutton.className = 'play_current_slide_btn'
		createbutton.innerText = 'play this'
		creatediv.appendChild(createbutton)
		ul.appendChild(createli)
		// 添加输入时间的函数
		addtime()
		// 为每一个play this绑定一个事件
		bindFunctionOnNewButton()
		
		
	}
	
	
	// 输入时间
	function addtime(){
		// Get the marked time
		let start_time = document.getElementsByClassName('start')
		let end_time = document.getElementsByClassName('end')
		let label_time = document.getElementsByTagName('showtitle').item(0)
		let input_elements = document.getElementsByTagName('input')
		
		// 为所有的结束时间的输入框绑定自动获取焦点
		
		// 填入值
		for(let i = 0; i<start_time.length; i++){
			start_time[i].onkeydown = function(event){
				if(event.altKey == 1){
					start_time[i].value = label_time.textContent
				}
			}
			end_time[i].onkeydown = function(event){
				if(event.altKey == 1){
					end_time[i].value = label_time.textContent
					if( i != start_time.length-1 ){
						start_time[i+1].value = end_time[i].value
					}
				}
			}
			// 这里的自动获取焦点有点问题
			// end_time[i].onblur = function(){
			// 	end_time[i].removeAttribute('autofocus')
			// 	if( i != start_time.length-1 ){
			// 		setTimeout(()=>{end_time[i+1].focus()}, 300, i) 
			// 	}
			// }
		}
	}

	
	// 开始暂停  组合键ctrl+空格
	let body = document.getElementsByTagName('body')[0]
	body.onkeydown = function(event){
		if(event.ctrlKey == 1){
			body.onkeyup = function(event){
				if(event.keyCode == '32'){
					wavesurfer.playPause()
				}
			}
		}
	}
	// 为每一个input元素都绑定一个onfocus事件
	// for(let i = 0; i<input_elements.length; i++){
	// 	input_elements[i].onfocus = function(){
	// 	}
	// }
	
	// 获取被点击的button的兄弟元素的值
	function getValueOfBothersElement(){
		// 获取其兄弟元素列表
		let cur_part = document.activeElement.parentNode.children
		// 将兄弟元素中的值转换成浮点型
		let cur_part_start_time = cur_part[1].value
		cur_part_start_time = cur_part_start_time.split(':')
		cur_part_start_time = (+cur_part_start_time[0])*60 + (+cur_part_start_time[1]) + (+cur_part_start_time[2]/1000)	
		
		let cur_part_end_time = cur_part[2].value
		cur_part_end_time = cur_part_end_time.split(':')
		cur_part_end_time = (+cur_part_end_time[0])*60 + (+cur_part_end_time[1]) + (+cur_part_end_time[2]/1000)
		
		wavesurfer.play(cur_part_start_time,cur_part_end_time)
	}
	
	// 为每一个play this绑定一个事件
	function bindFunctionOnNewButton(){
		// 播放一个小片段
		let play_current_slid = document.querySelectorAll('button')
		for(let i = 1; i<play_current_slid.length; i++){
			play_current_slid[i].onclick = function(){
				console.log('play_current_slid function')
				getValueOfBothersElement()
			}
		}
	}

	
	// 导出数据
	function save_data(){
		// 保存文本和时间
		let data = document.getElementById('export_data')
		data.onclick = function(){
			let total_data = []
			let text_data_elements = document.getElementsByClassName('content_list_item_text')
			let time_data_elements = document.getElementsByClassName('time')
			for(let i = 0; i<text_data_elements.length; i++){
				total_data.push(text_data_elements[i].value)
				total_data.push(time_data_elements[i*2+2].value)
				total_data.push(time_data_elements[i*2+3].value)
			}
			localStorage.setItem('total_data',total_data)
			
		}
		// 保存音频地址
		// 不可以直接复制前面加载音频的片段，不然会有两个onchange事件
		upload_audio.onchange = function(){
			let get_audio_src = new FileReader()
			console.log(upload_audio.files[0].name)
			localStorage.setItem('audio', upload_audio.files[0])
		}
	}
	
	let a_save_data = document.getElementById('export_data')
	// 在绑定监听事件的时候一定不要在函数名之后加一个括号，不然监听事件还没有触发他就执行了
	// 就比如在下面的save_data后面加个括号就直接执行了save_data函数
	// a_save_data.addEventListener('click', save_data())
	a_save_data.addEventListener('click', save_data)
	
	// // tips 提示
	// let tips_btn = document.getElementById('tips_btn')
	// let tips_area = document.getElementsByClassName('tips')[0]
	// tips_btn.onclick = function(){
	// 	tips_area.style.display = 'none';
	// }
});



