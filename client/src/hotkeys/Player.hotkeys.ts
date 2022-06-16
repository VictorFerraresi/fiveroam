import * as alt from "alt-client";
import { Vector3 } from "alt-shared";
import * as native from "natives";

const raycastFlags = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256;

let clickCooldown = Date.now();
let rayCastInfo: any;
let lastRayCast = Date.now();
let cursorInterval: number | undefined;

alt.on("keydown", (key) => {
  if (key == "Z".charCodeAt(0)) {
    cursorInterval = alt.everyTick(showInteractionCursor);
  }
});

alt.on("keyup", (key) => {
  if (key == "Z".charCodeAt(0)) {
    if (!!cursorInterval) {
      alt.clearInterval(cursorInterval);
      cursorInterval = undefined;
    }
  }
});

const showInteractionCursor = () => {
  // Z is now pressed.
  // Disable other controls temporarily.
  native.disableControlAction(0, 24, true); // Left Mouse
  native.disableControlAction(0, 25, true); // Right Mouse
  native.disableControlAction(0, 63, true); // Vehicle Left
  native.disableControlAction(0, 64, true); // Vehicle Right
  native.disableControlAction(0, 68, true);
  native.disableControlAction(0, 1, true);
  native.disableControlAction(0, 2, true);
  native.disablePlayerFiring(alt.Player.local.scriptID, true);

  native.setMouseCursorActiveThisFrame();

  if (Date.now() > lastRayCast) {
    lastRayCast = Date.now() + 25;
    const [_, hit, endCoords, surfaceNormal, entity] = screenToWorld(
      raycastFlags,
      -1
    );

    if (!hit) {
      rayCastInfo = null;
      return;
    }

    rayCastInfo = {
      hit,
      endCoords,
      surfaceNormal,
    };
  }

  if (!rayCastInfo) {
    return;
  }

  // Left Click
  if (native.isDisabledControlJustReleased(0, 24)) {
    if (Date.now() < clickCooldown) {
      return;
    }

    clickCooldown = Date.now() + 100;

    alt.emitServer(
      "player:SetPosition",
      new Vector3(
        rayCastInfo.endCoords.x,
        rayCastInfo.endCoords.y,
        rayCastInfo.endCoords.z + 2
      )
    );

    rayCastInfo = null;
    //alt.clearInterval(interval!); commented because it was causing a [timer with that id does not exist] warning, which became an error with Alt:V version 10
  }
};

// s2w
const mulNumber = (vector1: any, value: any) => {
  return {
    x: vector1.x * value,
    y: vector1.y * value,
    z: vector1.z * value,
  };
};

const addVector3 = (vector1: any, vector2: any) => {
  return {
    x: vector1.x + vector2.x,
    y: vector1.y + vector2.y,
    z: vector1.z + vector2.z,
  };
};

const subVector3 = (vector1: any, vector2: any) => {
  return {
    x: vector1.x - vector2.x,
    y: vector1.y - vector2.y,
    z: vector1.z - vector2.z,
  };
};

const rotationToDirection = (rotation: any) => {
  let z = degToRad(rotation.z);
  let x = degToRad(rotation.x);
  let num = Math.abs(Math.cos(x));

  let result: any = {};
  result.x = -Math.sin(z) * num;
  result.y = Math.cos(z) * num;
  result.z = Math.sin(x);
  return result;
};

export const w2s = (position: any) => {
  let result = native.getScreenCoordFromWorldCoord(
    position.x,
    position.y,
    position.z,
    0,
    0
  );

  if (!result[0]) {
    return undefined;
  }

  let newPos: any = {};
  newPos.x = (result[1] - 0.5) * 2;
  newPos.y = (result[2] - 0.5) * 2;
  newPos.z = 0;
  return newPos;
};

export const processCoordinates = (x: any, y: any) => {
  const [_, width, height] = native.getActiveScreenResolution(0, 0);
  const screenX = width;
  const screenY = height;

  let relativeX = 1 - (x / screenX) * 1.0 * 2;
  let relativeY = 1 - (y / screenY) * 1.0 * 2;

  if (relativeX > 0.0) {
    relativeX = -relativeX;
  } else {
    relativeX = Math.abs(relativeX);
  }

  if (relativeY > 0.0) {
    relativeY = -relativeY;
  } else {
    relativeY = Math.abs(relativeY);
  }

  return { x: relativeX, y: relativeY };
};

export const s2w = (camPos: any, relX: any, relY: any) => {
  const camRot = native.getGameplayCamRot(0);
  const camForward = rotationToDirection(camRot);
  const rotUp = addVector3(camRot, { x: 10, y: 0, z: 0 });
  const rotDown = addVector3(camRot, { x: -10, y: 0, z: 0 });
  const rotLeft = addVector3(camRot, { x: 0, y: 0, z: -10 });
  const rotRight = addVector3(camRot, { x: 0, y: 0, z: 10 });

  const camRight = subVector3(
    rotationToDirection(rotRight),
    rotationToDirection(rotLeft)
  );
  const camUp = subVector3(
    rotationToDirection(rotUp),
    rotationToDirection(rotDown)
  );

  const rollRad = -degToRad(camRot.y);

  const camRightRoll = subVector3(
    mulNumber(camRight, Math.cos(rollRad)),
    mulNumber(camUp, Math.sin(rollRad))
  );
  const camUpRoll = addVector3(
    mulNumber(camRight, Math.sin(rollRad)),
    mulNumber(camUp, Math.cos(rollRad))
  );

  const point3D = addVector3(
    addVector3(addVector3(camPos, mulNumber(camForward, 10.0)), camRightRoll),
    camUpRoll
  );

  const point2D = w2s(point3D);

  if (point2D === undefined) {
    return addVector3(camPos, mulNumber(camForward, 10.0));
  }

  const point3DZero = addVector3(camPos, mulNumber(camForward, 10.0));
  const point2DZero = w2s(point3DZero);

  if (point2DZero === undefined) {
    return addVector3(camPos, mulNumber(camForward, 10.0));
  }

  const eps = 0.001;

  if (
    Math.abs(point2D.x - point2DZero.x) < eps ||
    Math.abs(point2D.y - point2DZero.y) < eps
  ) {
    return addVector3(camPos, mulNumber(camForward, 10.0));
  }

  const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
  const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
  const point3Dret = addVector3(
    addVector3(
      addVector3(camPos, mulNumber(camForward, 10.0)),
      mulNumber(camRightRoll, scaleX)
    ),
    mulNumber(camUpRoll, scaleY)
  );

  return point3Dret;
};

const degToRad = (deg: any) => {
  return (deg * Math.PI) / 180.0;
};

export const radToDeg = (rad: number) => {
  return rad * (180 / Math.PI);
};

// Get entity, ground, etc. targeted by mouse position in 3D space.
export const screenToWorld = (flags: any, ignore: any) => {
  const x = alt.getCursorPos().x;
  const y = alt.getCursorPos().y;

  const absoluteX = x;
  const absoluteY = y;

  const camPos = native.getGameplayCamCoord();
  const processedCoords = processCoordinates(absoluteX, absoluteY);
  const target = s2w(camPos, processedCoords.x, processedCoords.y);

  const dir = subVector3(target, camPos);
  const from = addVector3(camPos, mulNumber(dir, 0.05));
  const to = addVector3(camPos, mulNumber(dir, 300));

  //@ts-ignore
  const ray = native.startExpensiveSynchronousShapeTestLosProbe(
    from.x,
    from.y,
    from.z,
    to.x,
    to.y,
    to.z,
    flags,
    ignore,
    0
  );
  return native.getShapeTestResult(
    ray,
    false,
    new alt.Vector3(0, 0, 0),
    new alt.Vector3(0, 0, 0),
    0
  );
};
