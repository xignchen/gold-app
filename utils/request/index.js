import Request from '@/js_sdk/luch-request/luch-request/index.js';

const http = new Request();

http.setConfig((config) => {
	config.baseURL = 'https://api.jisuapi.com';
	config.header = {
		// 'content-type': "application/x-www-form-urlencoded;charset=utf-8", 
		'Content-Type': 'application/json;charset=UTF-8',
		// 'content-type': "application/json", 
		// 'content-type': 'multipart/form-data'
	}
	return config
})
http.interceptors.request.use(
	(config) => {
		return config
	},
	config => {
		console.log('request error, 请求拦截器失败1');
		return Promise.reject(config)
	})

http.interceptors.response.use((response) => {
	return response.data
}, (error) => {
	if(error.statusCode) {
		switch (error.statusCode){
			case 401:
				break;
			case 404:
				break;
			case 501:
				break;
			case 502:
				break;
			default:
				uni.showToast({
					title: '服务器繁忙，请稍后重试！',
					icon: 'none'
				})
				break;
		}
	} else {
		uni.showToast({
			title: '无网络',
			icon: 'error'
		})
	}
	return Promise.reject(response)
})

function coverFormData(data) {
	return Object.keys(data).map(key => {
		let value = data[key];
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}
		return encodeURIComponent(key) + '=' + encodeURIComponent(value);

	})

}

export function get(url, params) {
	return new Promise((resolve, reject) => {
		http.get(url, {
			params
		}).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	})
}

export function post(url, params, config) {
	return new Promise((resolve, reject) => {
		http.post(url, params, config).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

export function put(url, params, config) {
	return new Promise((resolve, reject) => {
		http.put(url, params, config).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

export function dle(url, param) {
	const str = coverFormData(param).join('&');
	// console.log(str)
	return new Promise((resolve, reject) => {
		http.delete(url + '?' + str).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	})
}

export default http