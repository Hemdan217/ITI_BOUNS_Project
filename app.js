let allVideos = [];
let stringSelection = "";
let secDuration = [];
let minDuration = [];
let hrDuration = [];
let totalSeconds = 0;
let totalMinutes = 0;
let totalHours = 0;
let start = 1;
let end = 0;

document.onreadystatechange = function () {
  console.log("Loading...");
  console.log(location.href);
  if (document.readyState == "complete") {
    setTimeout(() => {
      if (location.href.includes("v=") && location.href.includes("&list=")) {
        stringSelection =
          "#secondary a#wc-endpoint  span.style-scope.ytd-thumbnail-overlay-time-status-renderer";
      } else {
        stringSelection =
          "span.style-scope.ytd-thumbnail-overlay-time-status-renderer";
      }
      allVideos = document.querySelectorAll(stringSelection);
      end = allVideos.length;
      console.log(allVideos);
      extractInfo(allVideos);
    }, 5000);
  }
};

function extractInfo(allVideos) {
  secDuration = [];
  minDuration = [];
  hrDuration = [];
  let randoColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`;
  for (let video of allVideos) {
    video.parentElement.style.backgroundColor = randoColor;
    video.style.color = "white";
    let details = video.textContent.replace(/\s/g, "");
    if (details.length <= 5) {
      minDuration.push(parseInt(details.split(":")[0] || 0));
      secDuration.push(parseInt(details.split(":")[1] || 0));
      hrDuration.push(parseInt(0));
    } else {
      hrDuration.push(parseInt(details.split(":")[0] || 0));
      minDuration.push(parseInt(details.split(":")[1] || 0));
      secDuration.push(parseInt(details.split(":")[2] || 0));
    }
  }
  // console.log(secDuration, minDuration, hrDuration);
  calculateDuration(secDuration, minDuration, hrDuration);
}

function calculateDuration(secDuration, minDuration, hrDuration) {
  totalSeconds = 0;
  totalMinutes = 0;
  totalHours = 0;
  for (let i in secDuration) {
    totalSeconds += secDuration[i];
    totalMinutes += minDuration[i];
    totalHours += hrDuration[i];
  }
  totalMinutes += parseInt(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;
  totalHours += parseInt(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;
  console.log(totalHours, totalMinutes, totalSeconds);
  displayResults(totalHours, totalMinutes, totalSeconds);
}

function displayResults(totalHours, totalMinutes, totalSeconds) {
  let div = document.createElement("div");
  div.innerHTML += `From :<input class='myInput' value=${start} type="number" max=${allVideos.length} min=1 id='start'/>`;
  div.innerHTML += `To :<input class='myInput' value=${end} type="number" min=1 max=${allVideos.length} id='end'/>`;
  div.innerHTML += `<button  class='myButton' >x</button>`;
  let h1 = document.createElement("h1");
  h1.innerHTML = `<h1>${totalHours} hr : ${totalMinutes} min : ${totalSeconds} sec <br> ${
    end - start + 1
  } Videos</h1>`;
  div.classList.add("container");
  div.appendChild(h1);

  document.body.appendChild(div);
  addEvents();
}

function addEvents() {
  let SpecificVideos = [];
  document.querySelector(".myButton").addEventListener("click", function (evt) {
    console.log(evt.target.parentElement);
    evt.target.parentElement.remove();
    console.log(evt.target);
  });
  document.querySelectorAll(".container input.myInput").forEach((input) => {
    input.addEventListener("input", (e) => {
      if (e.target.id == "start") {
        start = parseInt(e.target.value);
        SpecificVideos = [].slice.call(
          document.querySelectorAll(stringSelection),
          start - 1,
          end
        );
      } else if (e.target.id == "end") {
        console.log(e.target.id);
        console.log(e.target.value);
        end = parseInt(e.target.value);
        SpecificVideos = [].slice.call(
          document.querySelectorAll(stringSelection),
          start - 1,
          end
        );
      }
      e.target.parentElement.remove();
      console.log(SpecificVideos);
      extractInfo(SpecificVideos);
    });
  });
}
