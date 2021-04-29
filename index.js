window.onload = function(){
	/* website设置了display:none是抓取不到的 */
	let website = document.getElementsByClassName('website')[0]
	let welcome_text = document.getElementsByClassName('welcome_text')[0]
	function change(){
		welcome_text.style.display = 'none'
		website.style.top = '45%'
		
	}
	setTimeout(change, 2000)
	// setTimeout(change,1000)
}