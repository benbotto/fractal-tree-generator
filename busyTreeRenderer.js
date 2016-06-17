angular.module('TreeApp')

/**
 * Tree directive, for displaying a recursive Tree.
 */
.directive('busyTreeRenderer',
['$window', 'Tree',
function($window, Tree)
{
  var ddo =
  {
    restrict: 'E',
    scope:
    {
      tree:   '=tree',
      sawyer: '=sawyer'
    },
    link: function(scope, ele, attrs)
    {
      var svgNS = 'http://www.w3.org/2000/svg';
      
      // Create the SVG.
      var svg = $window.document.createElementNS(svgNS, 'svg');
      svg.setAttributeNS(null, 'width',  400);
      svg.setAttributeNS(null, 'height', 400);
      $window.document.body.appendChild(svg);
      
      // Recursively render the tree an each branch.
      function drawTree(tree)
      {
        // Add the tree to the svg.
        var rect      = $window.document.createElementNS(svgNS, 'rect');
        var transList = rect.transform.baseVal;
        
        // Width, height, and color.
        rect.setAttributeNS(null, 'width',  tree.width);
        rect.setAttributeNS(null, 'height', tree.height);
        rect.setAttributeNS(null, 'fill',   tree.color);
        
        // Transform.
        transList.appendItem(transList.createSVGTransformFromMatrix(tree.transform));
        
        svg.appendChild(rect);
        
        tree.branches.forEach(drawTree);
      }
      
      // Any time the tree changes, draw it anew.
      scope.$watch('tree', function(tree)
      {
        // Remove all the old trees if requested.
        while (scope.sawyer && svg.firstChild)
          svg.removeChild(svg.firstChild);
          
        drawTree(tree);
      });
    }
  };
  
  return ddo;
}]);