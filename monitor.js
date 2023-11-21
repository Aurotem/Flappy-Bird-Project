function monitorScript(pipe,pipe2) {
  //? MONITOR
  let pipeMon = pipe.style.top.replace("px", "");
  let pipe2Mon = pipe2.style.top.replace("px", "");
  const monitor = document.createElement("div");
  const monitor2 = document.createElement("div");
  monitor.style.right = "0px";
  monitor2.style.right = "0px";
  monitor.id = "monitor";
  monitor2.id = "monitor2";
  monitor.style.top = pipeMon + "px";
  monitor2.style.top = Number(pipe2Mon) + 320 + "px";
  monitor.style.position = "absolute";
  monitor2.style.position = "absolute";
  monitor.style.background = "red";
  monitor.style.height = "5px";
  monitor.style.width = "50px";
  monitor2.style.background = "red";
  monitor2.style.height = "5px";
  monitor2.style.width = "50px";
  scenery.append(monitor2);
  scenery.append(monitor);

  const monitor3 = document.createElement("div");
  const monitor4 = document.createElement("div");
  monitor3.style.height = "100%";
  monitor3.style.width = "10px";
  monitor4.style.height = "100%";
  monitor4.style.width = "10px";
  monitor3.style.right = "222px";
  monitor4.style.right = "154px";
  monitor3.style.background = "red";
  monitor4.style.background = "red";
  monitor3.style.position = "absolute";
  monitor4.style.position = "absolute";
  scenery.append(monitor3);
  scenery.append(monitor4);
  //? MONITOR
  let arr = [monitor,monitor2]
 return arr
}
