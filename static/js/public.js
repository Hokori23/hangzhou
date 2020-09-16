const vm = new Vue({
	el: '#container',
	data: {
		popperArr,
		width: '0px'
	},
	methods: {
		getImgWidth(e) {
			e = e || document.querySelector('#img--bg')
			const img = e.path ? e.path[0] : e
			if (img.complete) {
				if (!img.width) {
					setTimeout(() => {
						this.getImgWidth(e)
					}, 500)
					return
				}
				this.width = `${img.width}px`
			}
		},
		debounce(callback, wait) {
			let timer = null
			return function () {
				if (timer !== null) {
					clearTimeout(timer)
				}
				timer = setTimeout(callback, wait)
			}
    },
    popup(popper__waker, index) {
      console.log(popper__waker, index)
    }
	},
	mounted() {
		window.addEventListener('resize', this.debounce(this.getImgWidth, 50))
	}
})
