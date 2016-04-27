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
        var canvas, context, chart, options;
        var init = function(type){
          element.empty();
          element.append('<canvas></canvas>');

          canvas  = element.find("canvas")[0];
          context = canvas.getContext("2d");

          options = {
              type:   type   || "Line",
              width:  attrs.width  || baseWidth,
              height: attrs.height || baseHeight,
              last_type: false
          };
          canvas.height = options.height;
          canvas.width = options.width;
          chart = new Chart(context);
        };
        init(attrs.type);

        scope.$watch(function(){ return element.attr('type'); }, function(value){
          if (!value) return;
          init(value);
          var chartType = options.type;
          if(typeof scope.chartObject !== 'undefined'){
            chart[chartType](scope.chartObject.data, scope.chartObject.options);
          }
          chart[chartType](scope.chartObject.data, scope.chartObject.options);
        });

        //Update when charts data changes
        scope.$watch(function() { return scope.chartObject; }, function(value) {
          if (!value) return;
          var chartType = options.type;
          chart[chartType](scope.chartObject.data, scope.chartObject.options);
          if (scope.chartInstance) scope.chartInstance.destroy();
          scope.chartInstance = chart[chartType](scope.chartObject.data, scope.chartObject.options);
        }, true);
      }
    }
  });
