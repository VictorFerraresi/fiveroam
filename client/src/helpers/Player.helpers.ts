import * as native from "natives";
import * as alt from "alt-client";

let spawned: boolean = false;

export const isPlayerSpawned = () => {
  return spawned;
};

export const setPlayerSpawned = (isSpawned: boolean) => {
  spawned = isSpawned;
};

export const requestModel = async (modelHash: number, timeoutMs = 1000) => {
  return new Promise((resolve, reject) => {
    if (!native.isModelValid(modelHash)) {
      reject(new Error(`Model does not exist: ${modelHash}`));
      return;
    }

    if (native.hasModelLoaded(modelHash)) {
      resolve(true);
      return;
    }

    native.requestModel(modelHash);

    const deadline = new Date().getTime() + timeoutMs;

    const inter = alt.setInterval(() => {
      if (native.hasModelLoaded(modelHash)) {
        alt.clearInterval(inter);
        resolve(true);
      } else if (deadline < new Date().getTime()) {
        alt.clearInterval(inter);
        const error = `Error: Async loading failed for model: ${modelHash}`;
        alt.log(error);
        reject(new Error(error)); // probably better resolve(false)
      }
    }, 10);
  });
};
