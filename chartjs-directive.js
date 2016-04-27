'use strict';

angular.module('chartjs-directive', []).
directive('chart', function() {
  var baseWidth = 600;
  var baseHeight = 400;

  return {
    restrict: 'E',
    template: '<canvas></canvas>',
    scope: {
      chartObject: "=value"
    },
    link: function(scope, element, attrs) {
      var canvas, context, chart, chartOptions = {};

      var updateChart = function() {
        element.empty();
        element.append('<canvas></canvas>');

        canvas = element.find("canvas")[0];
        context = canvas.getContext("2d");

        var chartData = {
          labels: [],
          datasets: []
        };

        if (scope.chartObject) {
          chartOptions = scope.chartObject;
        } else {
          chartOptions = {
            type: "line",
            options: {
              width: attrs.width || baseWidth,
              height: attrs.height || baseHeight,
            },
            data: chartData
          };
        }

        new Chart(context, chartOptions);
      };

      //Update when charts data changes
      scope.$watch(function() {
        return scope.chartObject;
      }, function(value) {
        if (!value) return scope.chartObject;
        updateChart();
      });
    }
  }
});