angular.module('sampleApp', ['ui.bootstrap']);
angular.module('sampleApp').directive('pie', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'data': '@data'
    },
    template: '<canvas width="75" height="75" />',
  link: function(scope, element, attrs) {
    var data = JSON.parse(scope.data);

    var option = {
      animateRotate : false,
      segmentShowStroke : false
    };
    var pieData = [
        {
          value: data.total,
          color:"rgba(255,255,255,.6)"
        },
        {
          value: data.covered,
          color: "rgba(0,0,0,.3)"
        }
      ];
    newCanvas = element.find('canvas');
    var ctx = newCanvas[0].getContext("2d");
    new Chart(ctx).Pie(pieData,option);
  }
  };
});

angular.module('sampleApp').controller('Accordion',['$scope','$http', function($scope,$http) {
  $scope.oneAtATime = true;

$http.get('/data/data.json').
  success(function(data, status) {
    $scope.groups = data.data;
  }).
  error(function(data) {
  });
  
  var newCanvas = $('<canvas/>');
  newCanvas[0].height = 200;
  newCanvas[0].width = 100;

  var ctx = newCanvas[0].getContext("2d");

  $scope.getBuildStatus = function(build) {
    if(build.debug ==='done' && build.release ==='done'){
      return '100%';
    }else if(build.debug ==='done' || build.release ==='done'){
      return '50%';
    }else {
      return '0%';
    }
  };

}]);




     
