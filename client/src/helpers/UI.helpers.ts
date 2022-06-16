import * as native from "natives";

/**
 * Draw text in an update loop.
 * @param msg
 * @param x is a float 0 - 1.0
 * @param y is a float 0 - 1.0
 */
export function drawText(
  msg: string,
  x: number,
  y: number,
  scale: number,
  fontType: number,
  r: number,
  g: number,
  b: number,
  a: number,
  useOutline: boolean = true,
  useDropShadow: boolean = true,
  center: boolean = true
) {
  native.beginTextCommandDisplayText("STRING");
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(fontType);
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, 1.0);
  native.setTextCentre(center);
  native.setTextColour(r, g, b, a);

  if (useOutline) native.setTextOutline();

  if (useDropShadow) native.setTextDropShadow();

  native.endTextCommandDisplayText(x, y, 0);
}
