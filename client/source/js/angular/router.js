'use strict';

/**
 * Действия при запуске
 */
app.run(['$rootScope', function ($rootScope) {
    $rootScope.load = false;
    $rootScope.apiHost = apiHost;
}]);


/**
 * Действия при запуске
 */
//app.run(['$rootScope', '$state', '$q', 'AsyncService', function ($rootScope, $state, $q, AsyncService) {
//
//    $rootScope.models = {};
//
//    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//        $rootScope.stateName = toState.name;
//    });
//
//    $rootScope.load = false;
//
//    $rootScope.apiHost = apiHost;
//
//
//}]);






var templatesPath = '../../templates/';

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            abstract:false,
            url:'/home',
            templateUrl: templatesPath + 'home.html',
            //params: {
            //    hrurl: 'home',
            //},
            resolve: {
                homeData: function(HomeService, $stateParams){
                    return new HomeService.query();
                },
                pageData: function(PageService){
                    return new PageService.get({id:'1'});
                },
                allPages: function(PageService){
                    return new PageService.query();
                },
                advantagesData: function(AdvantagesService){
                    return new AdvantagesService.query();
                },
                partnersData: function(PartnersService){
                    return new PartnersService.query();
                },
                reviewData: function(ReviewService){
                    return new ReviewService.query();
                },
                orderData: function(OrderService){
                    //return new OrderService.query();
                    return new OrderService.get().then(function(data) {
                        if (data.status == 200) {
                            return data.data;
                        }
                      },function(err){
                        console.log(err);
                      }
                    );
                }

            },
            controller:'HomeCtrl',
        })
        .state('home.services', {
            //abstract:false,
            url:'/services',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 2, {scrollTo:"#servicesSection"});
            },
            templateUrl: templatesPath +'home.html',
            resolve: {
                pageData: function(PageService){
                    return new PageService.get({id:'1'});
                }
            },
            controller:'PageCtrl',
        })
        .state('home.povsednevnaya', {
            url:'/services/povsednevnaya-uborka-v-moskve',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesSection"});
            },
            resolve: {
                pageData: function(PageService){
                    return new PageService.get({id:'4'});
                }
            },
            views:{
                'services':{
                    templateUrl: templatesPath +'services.supporting.html',
                    controller:'PageCtrl',
                }
            }

        })
        .state('home.povsednevnaya.vhodit', {
            url:'/vhodit',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesPovsednevnayaView"});

            },
            resolve: {
                taskData: function(TaskService){
                    return new TaskService.query();
                }
            },
            views:{
                'servicesPovsednevnaya':{
                    templateUrl: templatesPath +'services.supporting.tasks.html',
                    controller:'TaskCtrl',
                }
            }

        })
        .state('home.povsednevnaya.price', {
            url:'/price',
            onEnter: function () {
                //var view = angular.element( document.querySelector( '#servicesPovsednevnayaViewContainer' ) );
                //alert(view.innerHeight);


                var tl = new TimelineLite()
                    //.set('#servicesPovsednevnayaViewContainer', {height:"auto"})
                    //.to('#servicesPovsednevnayaViewContainer', 1, {height:0,})

                    //.to('#servicesPovsednevnayaViewContainer', 1, {autoAlpha:0,})
                    //.from('#servicesPovsednevnayaViewContainer', 1, {height:0,immediateRender:false})
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    //.to('#servicesPovsednevnayaViewContainer', 1, {autoAlpha:1,})
                    .to(window, 1, {scrollTo:"#servicesPovsednevnayaView",});

            },
            resolve: {
                priceData: function(PriceService){
                    return new PriceService.query();
                }
            },
            views:{
                'servicesPovsednevnaya':{
                    templateUrl: templatesPath +'services.supporting.price.html',
                    controller:'PriceCtrl',
                }
            }
        })
        .state('home.generalnaya', {
            url:'/services/generalnaya-uborka-v-moskve',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesSection"});
            },
            resolve: {
                pageData: function(PageService){
                    return new PageService.get({id:'6'});
                }
            },
            views: {
                'services':{
                    templateUrl: templatesPath +'services.general.html',
                    controller:'PageCtrl',
                }
            }

        })
        .state('home.generalnaya.price', {
            url:'/price',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesGeneralView"});
            },
            resolve: {
                priceData: function(PriceService){
                    return new PriceService.query();
                }
            },
            views:{
                'servicesGeneral':{
                    templateUrl: templatesPath +'services.general.price.html',
                    controller:'PriceCtrl',
                }
            }
        })
        .state('home.generalnaya.vhodit', {
            url:'/vhodit',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesGeneralView"});
            },
            resolve: {
                taskData: function(TaskService){
                    return new TaskService.query();
                }
            },
            views:{
                'servicesGeneral':{
                    templateUrl: templatesPath +'services.general.tasks.html',
                    controller:'TaskCtrl',
                }
            }

        })
        .state('home.remont', {
            url:'/services/uborka-posle-remonta-v-moskve',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesSection"});
            },
            resolve: {
                pageData: function(PageService){
                    return new PageService.get({id:'5'});
                }
            },
            views:{
                'services':{
                    templateUrl: templatesPath +'services.repair.html',
                    controller:'PageCtrl',
                }
            }

        })
        .state('home.remont.price', {
            url:'/price',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesRepairView"});
            },
            resolve: {
                priceData: function(PriceService){
                    return new PriceService.query();
                }
            },
            views:{
                'servicesRepair':{
                    templateUrl: templatesPath +'services.repair.price.html',
                    controller:'PriceCtrl',
                }
            }
        })
        .state('home.remont.vhodit', {
            url:'/vhodit',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#servicesViewContainer', 1, {autoAlpha:0})
                    .to(window, 1, {scrollTo:"#servicesRepairView"});
            },
            resolve: {
                taskData: function(TaskService){
                    return new TaskService.query();
                },
// метод лабра
//                taskData: ['TaskService', function (TaskService) {
//                    return new TaskService().$get().then(function (response) {
//                        return response;
//                    });
//                }],
            },
            views:{
                'servicesRepair':{
                    templateUrl: templatesPath +'services.repair.tasks.html',
                    controller:'TaskCtrl',
                }
            }

        })
        .state('home.clean', {
            url:'/clean',
            onEnter: function () {
                TweenLite.to(window, 2, {scrollTo:"#clearSection"});
            },
            templateUrl: templatesPath + 'home.html',
            resolve: {
                pageData: function(PageService){
                    return new PageService.get({id:'3'});
                    ;
                }
            },
            controller:'PageCtrl',
        })
        .state('home.advantages', {
            url:'/preimushestva',
            onEnter: function () {
                TweenLite.to(window, 2, {scrollTo:"#advantagesSection"});
            },

            templateUrl: templatesPath + 'home.html',

        })
        .state('home.partners', {
            url:'/partners',
            onEnter: function () {
                TweenLite.to(window, 2, {scrollTo:"#partnersSection"});
            },

            templateUrl: templatesPath + 'home.html',

        })
        .state('home.review', {
            url:'/otzivy',
            onEnter: function () {
                TweenLite.to(window, 2, {scrollTo:"#reviewSection"});
            },

            templateUrl: templatesPath + 'home.html',

        })
        .state('home.zakaz', {
            url:'/zakaz',
            onEnter: function () {
                var tl = new TimelineLite()
                    .from('#orderSection', 1, {autoAlpha:0})
                    .to(window, 2, {scrollTo:"#orderSection"});
                yaCounter44480872.reachGoal('goToOrder');
            },

            templateUrl: templatesPath + 'home.html',

        })


    ;
});


