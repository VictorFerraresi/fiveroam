import * as alt from "alt-client";
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
export const getDistance = (positionOne, positionTwo) => Math.sqrt(Math.pow(positionOne.x - positionTwo.x, 2) +
    Math.pow(positionOne.y - positionTwo.y, 2) +
    Math.pow(positionOne.z - positionTwo.z, 2));
export const delay = async (duration) => {
    return new Promise((resolve, reject) => {
        alt.setTimeout(() => resolve(true), duration);
    });
};
export function forwardVector(rotation) {
    var roll = rotation.x * (Math.PI / 180.0);
    var pitch = rotation.y * (Math.PI / 180.0);
    var yaw = rotation.z * (Math.PI / 180.0);
    var qx = Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) -
        Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
    var qy = Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2) +
        Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2);
    var qz = Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2) -
        Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2);
    var qw = Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) +
        Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
    var quatRot = { x: qx, y: qy, z: qz, w: qw };
    var fVectorX = 2 * (quatRot.x * quatRot.y - quatRot.w * quatRot.z);
    var fVectorY = 1 - 2 * (quatRot.x * quatRot.x + quatRot.z * quatRot.z);
    var fVectorZ = 2 * (quatRot.y * quatRot.z + quatRot.w * quatRot.x);
    return new alt.Vector3(fVectorX, fVectorY, fVectorZ);
}
export function cashFormat(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function isDrivingVehicle() {
    return (native.getPedInVehicleSeat(native.getVehiclePedIsIn(alt.Player.local.scriptID, true), -1, false) === alt.Player.local.scriptID);
}
export const getMappedKey = (code) => {
    switch (code) {
        case "L":
            return "L";
        case "W":
            return "W";
        case "A":
            return "A";
        case "S":
            return "S";
        case "D":
            return "D";
        case "Z":
            return "Z";
        case "C":
            return "C";
        case "B":
            return "B";
        case "E":
            return "E";
        case "Q":
            return "Q";
        case "R":
            return "R";
        case "G":
            return "G";
        case "F":
            return "F";
        case "X":
            return "X";
        case "H":
            return "H";
        case ".":
            return "Ponto (.)";
        case ",":
            return "Vírgula (,)";
        case "=":
            return "Igual (=)";
        case "-":
            return "Hífen (-)";
        case "[":
            return "[";
        case "]":
            return "]";
        case "`":
            return "Crase (`)";
        case "b_100":
            return "Mouse Esquerdo";
        case "b_101":
            return "Mouse Direito";
        case "b_102":
            return "Click do Scroll";
        case "b_115":
            return "Mouse Wheel Up";
        case "b_116":
            return "Mouse Wheel Down";
        case "b_117":
            return "Scroll";
        case "b_130":
            return "Num -";
        case "b_131":
            return "Num +";
        case "b_140":
            return "Num 4";
        case "b_141":
            return "Num 5";
        case "b_143":
            return "Num 7";
        case "b_144":
            return "Num 8";
        case "b_145":
            return "Num 9";
        case "b_170":
            return "F1";
        case "b_171":
            return "F2";
        case "b_172":
            return "F3";
        case "b_174":
            return "F5";
        case "b_175":
            return "F6";
        case "b_176":
            return "F7";
        case "b_177":
            return "F8";
        case "b_178":
            return "F9";
        case "b_179":
            return "F10";
        case "b_194":
            return "Seta pra Cima";
        case "b_195":
            return "Seta pra Baixo";
        case "b_196":
            return "Seta pra Esquerda";
        case "b_197":
            return "Seta pra Direita";
        case "b_198":
            return "Delete";
        case "b_199":
            return "Esc";
        case "b_200":
            return "Insert";
        case "b_1000":
            return "Shift Esquerdo";
        case "b_1002":
            return "Tab";
        case "b_1003":
            return "Enter";
        case "b_1004":
            return "Backspace";
        case "b_1008":
            return "Home";
        case "b_1009":
            return "Page Up";
        case "b_1010":
            return "Page Down";
        case "b_1012":
            return "Capslock";
        case "b_1013":
            return "Ctrl Esquerdo";
        case "b_1014":
            return "Ctrl Direito";
        case "b_1015":
            return "Alt Esquerdo";
        case "b_2000":
            return "Barra de Espaço";
        default:
            return "Desconhecido";
    }
};
export const getParsedTime = (seconds) => {
    return {
        hours: ~~(seconds / 3600),
        minutes: ~~((seconds % 3600) / 60),
        seconds: ~~seconds % 60,
    };
};
