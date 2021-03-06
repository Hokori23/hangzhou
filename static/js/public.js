let playMusicHandler
const vm = new Vue({
	el: '#container',
	computed: {
		computedPopperArr() {
			const width = parseInt(this.bg.width)
			const height = parseInt(this.bg.height)
			return this.popperArr.map((item) => {
				return {
					text: item.text,
					class: {
						left: `${item.class.left * 0.01 * width}px`,
						bottom: `${item.class.bottom * 0.01 * height}px`
					}
				}
			})
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
			e = e || this.$refs['img--bg']
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
					callback()
				}, wait)
			}
		},
		popupIn(index) {
			this.popperShow = true
			this.nowPopperImgSrc = `./static/img/popper${index + 1}.png`
		},
		popupOut() {
			this.popperShow = false
		},
		playMusic() {
			const audio = this.$refs.audio
			if (!audio.paused) {
				return window.removeEventListener('touchstart', playMusicHandler)
			}
			if (audio.readyState === 4) {
				audio.play()
				if (!audio.pause) {
					window.removeEventListener('touchstart', playMusicHandler)
				}
			} else {
				setTimeout(() => {
					this.playMusic()
				}, 1000)
			}
		}
	},
	mounted() {
		// init
		this.$nextTick(() => {
			this.getBgImgSize()
			this.playMusic()
		})

		// 绑定事件
		window.addEventListener('resize', this.debounce(this.getBgImgSize, 50))
		playMusicHandler = window.addEventListener('touchstart', () => {
			this.playMusic()
		})
		this.$refs.popper__wrapper.addEventListener('touchmove', (e) => {
			e.preventDefault()
		})
		window.onload = () => {
			this.getBgImgSize()
			this.containerShow = true
		}
	}
})
