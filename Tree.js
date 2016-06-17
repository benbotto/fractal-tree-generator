angular.module('TreeApp')

/**
 * A fractal binary tree class.
 */
.factory('Tree',
['matrixHelper', 'colorHelper',
function(matrixHelper, colorHelper)
{
  'use strict';
  
  Tree.BASE_HEIGHT = 50;
  Tree.BASE_WIDTH  = 5;
  Tree.BASE_COLOR  = '#234204';
  
  /**
   * Create the tree and all the branches.
   */
  function Tree(maxDepth, color, randBranchAngles, transform, depth, dir)
  {
    maxDepth = maxDepth || 11;
    color    = color    || Tree.BASE_COLOR;
    depth    = depth    || 0;
    
    var sizeFactor = Math.pow(0.8, depth);
    
    this.height           = Tree.BASE_HEIGHT * sizeFactor;
    this.width            = Tree.BASE_WIDTH  * sizeFactor;
    this.color            = colorHelper.lighten(color, 12 * depth);
    this.maxDepth         = maxDepth;
    this.randBranchAngles = randBranchAngles;
    
    if (depth === 0)
    {
      // I'm the trunk.
      this.transform = matrixHelper.createSVGMatrix();
      this.transform = this.transform
        // Move to the middle of the viewport.
        .translate(200, 400)
        // Flip the tree.  (0, 0) is at the top-left corner, so the tree is
        // actually drawn upside down.
        .scale(-1);
    }
    else
    {
      var angle = (this.randBranchAngles) ? Math.random() * 90 - 45 : 30 * dir;
      
      this.transform = transform
         // Height of the last branch.
        .translate(0, this.height / 0.8)
        .rotate(angle);
    }
    
    this.branches = [];
    
    if (depth < this.maxDepth)
    {
      this.branches.push(new Tree(maxDepth, color, this.randBranchAngles, this.transform, depth + 1, 1));
      this.branches.push(new Tree(maxDepth, color, this.randBranchAngles, this.transform, depth + 1, -1));
    }
  }
  
  return Tree;
}]);