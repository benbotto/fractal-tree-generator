angular.module('TreeApp')

/**
 * Helper for colors.  For example, lightening and darkening.
 */
.factory('colorHelper', [function()
{
  'use strict';

  /**
   * Do-nothing ctor (singleton).
   */
  function ColorHelper() {}

  /**
   * Clamp a color part to a number between 0 and 255.
   * @param colorPart The r, g, or b portion of a color.
   */
  ColorHelper.prototype.clamp = function(colorPart)
  {
    if (colorPart > 255)
      return 255;
    if (colorPart < 0)
      return 0;
    return colorPart;
  };

  /**
   * Lighten or darken a color.
   * @param color The color, in #RRGGBB format.
   * @param amount The amount to add to the r, g, and b portions of the color.
   */
  ColorHelper.prototype.lightenOrDarken = function(color, amount)
  {
    var newColor, r, g, b;

    if (!color.match(/^#[0-9A-F]{6}$/i))
      return;

    if (color.length !== 7)
      return;

    // Remove the leading # and convert the color to an int.
    color = parseInt(color.slice(1), 16);

    // This is the returned color.  Note the leading 1.  This 1 will be removed
    // at the end, but is used to ensure that the color is always 6 digits
    // long.  (When converting a number such as 0x000010 to a hex string, the
    // leading 0's are removed.)
    newColor = 0x1000000;

    // Pull the individual color parts.
    r = (color >> 16);
    g = (color >> 8) & 0xFF;
    b = color & 0xFF;

    // Adjust each color, and clamp it so that it's between 0 and 255.
    r = this.clamp(r + amount);
    g = this.clamp(g + amount);
    b = this.clamp(b + amount);

    // Create the new color.
    newColor |= (r << 16);
    newColor |= (g << 8);
    newColor |= b;

    // Convert back to a hex string, and remove the leading 1 noted above.
    return '#' + newColor.toString(16).slice(1);
  };

  /**
   * Lighten a color.
   * @param color The color, in #RRGGBB format.
   * @param amount The amount to add to the r, g, and b portions of the color.
   */
  ColorHelper.prototype.lighten = function(color, amount)
  {
    return this.lightenOrDarken(color, amount);
  };

  /**
   * Darken a color.
   * @param color The color, in #RRGGBB format.
   * @param amount The amount to subtract from the r, g, and b portions of the color.
   */
  ColorHelper.prototype.darken = function(color, amount)
  {
    return this.lightenOrDarken(color, -amount);
  };

  // Single instance.
  return new ColorHelper();
}]);
