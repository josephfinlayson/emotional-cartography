"use strict";angular.module("realEmoWebserviceApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","chart.js"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/"),c.html5Mode(!0)}]),angular.module("realEmoWebserviceApp").controller("MainCtrl",["$scope","$http","$interval","$stateParams",function(a,b,c,d){function e(){b.get("/emotions").success(function(b){console.log(b);var c=[],e=0,f=0;a.emotions.labels=["Positive (s)","Negative (s)"],console.log(b),b.forEach(function(a){(a.duration&&a.username===d.userID||!d.userID)&&("POSITIVE"===a.emotion.mood?e+=a.duration:f+=a.duration)}),e/=1e3,f/=1e3,c.push(e),c.push(f),c=[c],a.emotions.allEmotions=c})}a.emotions={},c(e(),200)}]),angular.module("realEmoWebserviceApp").config(["$stateProvider",function(a){a.state("main",{url:"/:userID",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("realEmoWebserviceApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("realEmoWebserviceApp").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"Home",link:"/"}],a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]),angular.module("realEmoWebserviceApp").run(["$templateCache",function(a){a.put("app/main/main.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><header class=hero-unit id=banner><div class=container><h1>Emotion Tracker</h1></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Emotions over the last 24 hours (in seconds)</h1><!--{{emotions.allEmotions}}--><canvas id=bar class="chart chart-bar" data=emotions.allEmotions labels=emotions.labels></canvas></div></div></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>real-emo-webservice</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li></ul></div></div></div>')}]);