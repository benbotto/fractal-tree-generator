angular.module('TreeApp')
.controller('TreeCtrl',
['$scope', 'Tree',
function($scope, Tree)
{
  'use strict';
  
  var _color      = Tree.BASE_COLOR;
  var _maxDepth   = 11;
  
  $scope.treeDetails =
  {
    // Whether or not to remove trees on render.
    sawyer: true,
    
    // Whether or not the angles of the branches are random.
    randomBranchAngles: function(randAngles)
    {
      if (randAngles !== undefined)
        $scope.tree = new Tree($scope.tree.maxDepth, _color, randAngles);
      
      return $scope.tree.randBranchAngles;
    },
    
    // Change the color of the tree.
    color: function(color)
    {
      if (color !== undefined)
      {
        _color = color;
        if (color.match(/^#[0-9A-F]{6}$/i))
          $scope.tree = new Tree($scope.tree.maxDepth, _color, $scope.tree.randBranchAngles);
      }
      
      return _color;
    },
    
    // Change the max depth (how many branches).
    maxDepth: function(maxDepth)
    {
      if (maxDepth !== undefined)
      {
        var intDepth = parseInt(maxDepth);
        _maxDepth    = maxDepth;
        
        if (!isNaN(intDepth) && intDepth < 15)
          $scope.tree = new Tree(intDepth, $scope.tree.color, $scope.tree.randBranchAngles);
      }
      
      return _maxDepth;
    }
  };
  
  $scope.tree = new Tree(_maxDepth, _color, $scope.treeDetails.randBranchAngles);
}]);

