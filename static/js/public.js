const vm = new Vue({
	el: '#container',
	computed: {
		computedPopperArr() {
			const width = parseInt(this.bg.width)
			const height = parseInt(this.bg.height)
			let item = this.popperArr.map((item) => {
				return {
					...item,
					class: {
						left: `${item.class.left * 0.01 * width}px`,
						bottom: `${item.class.bottom * 0.01 * height}px`
					}
				}
			})
			console.log(item)
			return item
		}
	},
	data: {
		popperArr,
		bg: {
			width: '0px',
			height: '0px',
			timer: null
		},
		body: {
			width: 0,
			height: 0
		},
		isFullHeight: true,
		containerShow: false,
		popperShow: false,
		nowPopperImgSrc: `./static/img/popper1.png`
	},
	methods: {
		getBgImgSize(e) {
			e = e || document.querySelector('#img--bg')
			const bg = e.path ? e.path[0] : e
			if (bg.complete) {
				this.bg.width = `${bg.width}px`
				this.bg.height = `${bg.height}px`
				this.countRadio()
			}
			if (this.bg.timer) {
				return
			}
			this.bg.timer = setTimeout(() => {
				this.bg.timer = null
				this.getBgImgSize()
			}, 1000)
		},
		countRadio() {
			const body = document.querySelector('body')
			const width = (this.body.width = body.clientWidth)
			const height = (this.body.hegiht = body.clientHeight)

			const bodyRadio = width / height
			const imgRadio = parseInt(this.bg.width) / parseInt(this.bg.height)
      this.isFullHeight = bodyRadio < imgRadio ? true : false
		},
		debounce(callback, wait) {
			let timer = null
			return function () {
				if (timer !== null) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					callback(null)
				}, wait)
			}
		},
		popupIn(index) {
			this.popperShow = true
			this.nowPopperImgSrc = `./static/img/popper${index + 1}.png`
		},
		popupOut() {
			this.popperShow = false
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.getBgImgSize()
		})
		window.addEventListener('resize', this.debounce(this.getBgImgSize, 50))
		window.onload = () => {
			this.getBgImgSize()
			this.containerShow = true
		}
	}
})
