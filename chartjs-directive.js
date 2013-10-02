'use strict';

angular.module('chartjs-directive', []).
  directive('chart', function () {
    var baseWidth = 600;
    var baseHeight = 400;

    return {
      restrict: 'E',
      template: '<canvas></canvas>',
      scope: {
        chartObject: "=value"
      },
      link: function (scope, element, attrs) {
        var canvas = element.find('canvas')[0];
        var context = canvas.getContext('2d');
        var options = {
          type:   attrs.type   || "Line",
          width:  attrs.width  || baseWidth,
          height: attrs.height || baseHeight
        };
        canvas.width = options.width;
        canvas.height = options.height;

        //Update when charts data changes
        scope.$watch(function() { return scope.chartObject; }, function(value) {
          if(!value) return;
          var chartType = options.type;
          new Chart(context)[chartType](scope.chartObject.data, scope.chartObject.options);
        });
      }
    }
  });