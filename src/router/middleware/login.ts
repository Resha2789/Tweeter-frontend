/** @format */
var url = ''
import store from '@/store/index'

export default function test({
	to,
	from,
	next
}: {
	to: any
	from: any
	next: Function
}): Function {
	console.log('middleware', from.name, to.name, to.path)
	var re = /(login)+/i

	if (re.exec(to.path)) {
		console.log(from.name)
		console.log(store.getters.getLoginForm)
		store.dispatch('setLoginForm', { visible: true })
		console.log(store.getters.getLoginForm)
	}

	return next()
}
