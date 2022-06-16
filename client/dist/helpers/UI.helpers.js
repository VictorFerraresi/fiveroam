import * as native from "natives";
export function drawText(msg, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true, center = true) {
    native.beginTextCommandDisplayText("STRING");
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(center);
    native.setTextColour(r, g, b, a);
    if (useOutline)
        native.setTextOutline();
    if (useDropShadow)
        native.setTextDropShadow();
    native.endTextCommandDisplayText(x, y, 0);
}
