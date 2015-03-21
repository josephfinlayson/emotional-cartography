'use strict';

angular.module('realEmoWebserviceApp')
  .controller('MainCtrl', function ($scope, $http, $interval, $stateParams) {
    $scope.emotions = {}


    //debugger;
    //$interval(function(){
    function calcEmotions() {

      $http.get('/emotions').success(function (emotions) {
        console.log(emotions)
        var obj = []
        var posDur = 0;
        var negDur = 0;

        $scope.emotions.labels = ['Positive (s)', 'Negative (s)']
        console.log(emotions)

        emotions.forEach(function (emote) {
          if (emote.duration && emote.username === $stateParams.userID || !$stateParams.userID ) {
            if (emote.emotion.mood === 'POSITIVE') {
              posDur += emote.duration
            }
            else {
              negDur += emote.duration
            }
          }

        })

        posDur = posDur/1000
        negDur = negDur/1000

        obj.push(posDur)
        obj.push(negDur)

        obj = [obj]

        $scope.emotions.allEmotions = obj;
      })
    }

    $interval(calcEmotions()
      , 200)

    //}, 5000);


  });
