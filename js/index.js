var app = angular.module('myApp', ['ui.router']);

/*
 	路由配置
 * */
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when("", "/home");

	$stateProvider
		.state("footer", {
			url: "",
			templateUrl: "html/footer.html"
		})
		.state("footer.home", {
			url: "/home",
			templateUrl: "html/home.html",
			controller: 'home'

		})
		.state("footer.menuClass", {
			url: "/menuClass",
			templateUrl: "html/menuClass.html",
			controller: 'menuClass'

		})
		.state("footer.menuShop", {
			url: "/menuShop",
			templateUrl: "html/menuShop.html",
			controller: 'menuShop'

		})
		.state("footer.menuMy", {
			url: "/menuMy",
			templateUrl: "html/menuMy.html",
			controller: 'menuMy'

		})

}]);

/*
 	主控制器,main
 * */
app.controller('main', ["$scope", "$location", function($scope, $location) {
	console.log('初始化main主控制器')
	$scope.goPage = function(url) {
		$location.path(url);
	}
}])

/*
 	主页控制器,home.html
 * */

app.controller('home', ["$scope", function($scope) {
	console.log('初始化home主页控制器')

	//读取轮播图数据，渲染页面
	var data = null;
	$.getJSON("js/banner.json", function(data) {

		var bannerList = data[0].api_data;
		//console.log(bannerList)
		//console.log(bannerList[0].bannerImage)
		var imgList = [];
		bannerList.forEach(function(value) {
			imgList.push(value.bannerImage)
		})
		//console.log(imgList)
		$scope.imgList = imgList;
		$scope.$apply(); //强制更新视图
	})
	//加载swiper
	setTimeout(function() { //加载图片需要时间
		var swiper = new Swiper(".swiper-container", {
			autoplay: 1000,
			loop: true,
			pagination: ".swiper-pagination",
			autoplayDisableOnInteraction: false
		});
	}, 1000);

	//选择区域，循环数据
	$scope.qichecheng = [{
			name: "汽车城",
			iconname: "iconfont icon-iconcar"
		},
		{
			name: "家居城",
			iconname: "iconfont icon-jiaju"
		},
		{
			name: "城中村",
			iconname: "iconfont icon-yezi"
		},
		{
			name: "城中城",
			iconname: "iconfont icon-hutonghulian"
		},
		{
			name: "商贸城",
			iconname: "iconfont icon-kuacheng"
		},
		{
			name: "新品",
			iconname: "iconfont icon-icon-new"
		},
		{
			name: "热卖",
			iconname: "iconfont icon-remai"
		},
		{
			name: "众筹",
			iconname: "iconfont icon-zhongchou2"
		},
		{
			name: "签到",
			iconname: "iconfont icon-qiandao"
		},
		{
			name: "抢红包",
			iconname: "iconfont icon-11"
		}
	];

	//热卖取数据
	$.getJSON("js/indexData.json", function(data) {
		var hot = data[0].api_data.index_hot;
		//console.log(hot);
		$scope.hotList = hot;
		$scope.$apply();
	})

	//热门推荐数据
	$.getJSON("js/indexData.json", function(data) {
		var news = data[0].api_data.index_news;
		//console.log(news);
		$scope.newsList = news;
		$scope.$apply();
	})
	//随机导航图
	var randImg = [
		{ "adImage": "http://image.3tcc.cn/imagesService/593yep0w20170414171208168593.jpg" },
		{ "adImage": "http://image.3tcc.cn/imagesService/4599dlad20170414171135502459.jpg" },
		{ "adImage": "http://image.3tcc.cn/imagesService/383do4nl20170414171145808383.jpg" },
		{ "adImage": "http://image.3tcc.cn/imagesService/349rlgne20170414171156643349.jpg" }
	];

	var num = parseInt(Math.random() * randImg.length);
	//console.log(num)
	//console.log(randImg[num])
	$scope.randomImg = randImg[num];

	//城中村
	$.getJSON("js/indexData.json", function(data) {
		var hometown = data[0].api_data.index_hometown;
		//console.log(hometown);
		$scope.hometownList = hometown;
		$scope.$apply();
	})

	//家居馆
	$.getJSON("js/indexData.json", function(data) {
		var house = data[0].api_data.index_house;
		//console.log(house);
		$scope.houseList = house;
		$scope.$apply();
	})

	//汽车馆
	$.getJSON("js/indexData.json", function(data) {
		var car = data[0].api_data.index_car;
		//console.log(car);
		$scope.carList = car;
		$scope.$apply();
	})
	//积分商城
	$.getJSON("js/indexData.json", function(data) {
		var point = data[0].api_data.index_point;
		//console.log(point);
		$scope.pointList = point;
		$scope.$apply();
		var firstli = $('.remove-firstli').find('li').eq(0);
		//console.log(firstli);
		firstli.remove();
	})

	//切换footer
	$('.qihuan').on('touchstart', 'li', function() {
		//console.log($(this));
		$(this).addClass('active').siblings().removeClass('active');
	})
	//
}])
/*
 	产品分类控制器,menuClass.html
 * */
app.controller('menuClass', ['$scope', function($scope) {
	console.log('初始化menuClass商品分类控制器');

	//导航栏数据
	$scope.navList = [{
		name: "家乡味"
	}, {
		name: "汽车城"
	}, {
		name: "家居城"
	}, {
		name: "更多"
	}]

	//切换导航栏样式
	$('.class-nav').on('touchstart', 'li', function() {
		//console.log($(this));
		$(this).addClass('active').siblings().removeClass('active');
		//切换列表
		var index = $(this).index();
		console.log(index);
		//切换列表
		var leibiao = $('.product-sort');
		leibiao.eq(index).addClass('active').siblings().removeClass('active');

		$scope.$apply();
	})
	$scope.ss = '家乡味';
	$scope.aaa = function(data) {
		$scope.ss = data;
	}

	//商品家乡味信息
	$.getJSON("js/menuClass-hometown.json", function(data) {
		//标题数据
		var largecategory = data[0].api_data;
		$scope.largecategoryList = largecategory;
		//console.log(largecategory);
		$scope.$apply();
	})
	//商品汽车城信息
	$.getJSON("js/menuClass-car.json", function(data) {
		//标题数据
		var carcategory = data[0].api_data;
		$scope.carcategoryList = carcategory;
		//console.log(carcategory);
		$scope.$apply();
	})
	//商品家居城信息
	$.getJSON("js/menuClass-house.json", function(data) {
		//标题数据
		var housecategory = data[0].api_data;
		$scope.housecategoryList = housecategory;
		//console.log(housecategory);
		$scope.$apply();
	})
}])
/*
 	购物车控制器,menuShop.html
 * */
app.controller('menuShop', ['$scope', function($scope) {
	console.log('初始化menuShop商品分类控制器');
	//点击勾选
	var count = 0;
	$('.gouxuan-tu').on('touchstart', '.gouxuan', function() {
		count++;
		if(count %= 2) {
			$(this).addClass('active');
			console.log($(this).parents().find().siblings().find('.gouxuan').addClass('active'))
		} else {
			$(this).removeClass('active');
		}
	})
	//点击全选
	$('.payment-fl-tu').on('touchstart', '.gouxuan', function() {
		count++;
		if(count %= 2) {
			$(this).addClass('active');
//			var shopmain = $('shop-main');
//			var gouxuan = shopmain.find('.gouxuan');
//			console.log(gouxuan);
//			$('shop-main').find('.gouxuan').addClass('active')
		} else {
			$(this).removeClass('active');
		}
	})
}])
/*
 	我的订单控制器,menuMy.html
 * */
app.controller('menuMy', ['$scope', function($scope) {
	console.log('初始化menuMy商品分类控制器');
	//我的订单数据
	$scope.myorder = [{
			name: "代付款",
			classname: "iconfont icon-daifukuan"
		},
		{
			name: "代发货",
			classname: "iconfont icon-daifahuo"
		},
		{
			name: "待收货",
			classname: "iconfont icon-daifahuo-copy"
		},
		{
			name: "待评价",
			classname: "iconfont icon-daipingjia"
		},
		{
			name: "售后/退款",
			classname: "iconfont icon-shouhou"
		}
	];
	//我的收藏数据
	$scope.myordermain = [{
			name: "我的收藏",
			classname: "iconfont icon-wodeshoucang"
		},
		{
			name: "我的众筹",
			classname: "iconfont icon-woyaozhongchou"
		},
		{
			name: "我的团购",
			classname: "iconfont icon-tuangou"
		},
		{
			name: "我的报名",
			classname: "iconfont icon-review"
		},
		{
			name: "邀请码",
			classname: "iconfont icon-yaoqingma"
		},
		{
			name: "浏览记录",
			classname: "iconfont icon-liulanjilu2"
		}
	];
}])