angular.module('TreeApp')

/**
 * This service contains various matrix and vertex functions.
 */
.factory('matrixHelper',
['$window',
function($window)
{
  'use strict';

  /**
   * Store a reference to any SVG on the page (it doesn't matter which one)
   * for producing matrices.  See createSVGMatrix().
   */
  function MatrixHelper()
  {
    var svgNS = 'http://www.w3.org/2000/svg';
    this._svg = $window.document.createElementNS(svgNS, 'svg');
  }

  /**
   * The JS spec does not allow for constructing an SVGMatrix() directly.
   * Matrices have to be created from an svg's createSVGMatrix() factory
   * function.  This produces a martrix using an SVG from the page.
   */
  MatrixHelper.prototype.createSVGMatrix = function()
  {
    return this._svg.createSVGMatrix();
  };
  
    /**
   * Same as above, but for a point.
   * @param x An optional x parameter.
   * @param y An optional y parameter.
   */
  MatrixHelper.prototype.createSVGPoint = function(x, y)
  {
    var pt = this._svg.createSVGPoint();
    
    pt.x = x || 0;
    pt.y = y || 0;

    return pt;
  };

  // Single instance.
  return new MatrixHelper();
}]);
