export const videoTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) {
    return "0:00";
  }

  time = Math.floor(time);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;

  if (time < 3600) {
    return minutes + ":" + ("0" + seconds).slice(-2);
  } else {
    return (
      hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
    );
  }
};
