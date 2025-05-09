const maxPower = 61, minPower = 1;
const minWater = 1, maxWater = 3;
const minLand = 1, maxLand = 5;

const slider = document.getElementById('indoorSlider');
const powerEl = d3.select("#powerIcons");
const waterEl = d3.select("#waterIcons");
const landEl = d3.select("#landIcons");
const percentText = document.getElementById('percentDisplay');

const powerCountLabel = document.getElementById("powerCount");
const waterCountLabel = document.getElementById("waterCount");
const landCountLabel = document.getElementById("landCount");

function drawIcons(container, total, activeCount, iconPath) {
    container.html(""); // clear all

    for (let i = 0; i < total; i++) {
        container.append("img")
            .attr("src", iconPath)
            .attr("width", 24)
            .attr("height", 24)
            .classed("active", i < activeCount)
            .classed("inactive", i >= activeCount);
    }
}


function update(rawValue) {
    const indoorPercent = 66 - rawValue; // flip direction

    const indoor = indoorPercent / 66;
    const outdoor = 100 - indoorPercent;

    const powerCount = Math.round(minPower + (maxPower - minPower) * indoor);
    const waterCount = Math.round(minWater + (maxWater - minWater) * (1 - indoor));
    const landCount = Math.round(minLand + (maxLand - minLand) * (1 - indoor));

    percentText.textContent = `Indoor: ${indoorPercent}%, Outdoor: ${outdoor}%`;

    drawIcons(powerEl, 61, powerCount, "icons/power.svg");
    drawIcons(waterEl, 3, waterCount, "icons/water.svg");
    drawIcons(landEl, 5, landCount, "icons/land.svg");


    // Update the labels
    const powerReduction = Math.abs(powerCount - maxPower - 1);

    powerCountLabel.textContent = `${powerReduction}x`;

    waterCountLabel.textContent = `${waterCount}x`;
    landCountLabel.textContent = `${landCount}x`;

    const powerArrow = document.getElementById("powerArrow");
    const waterArrow = document.getElementById("waterArrow");
    const landArrow = document.getElementById("landArrow");

    // Clear all arrows initially
    powerArrow.innerHTML = "";
    waterArrow.innerHTML = "";
    landArrow.innerHTML = "";

    // Only show arrows if slider is not at default (extreme left = 0)
    if (rawValue !== 0) {
        // Show down arrow if power count is less than max (savings)
        if (powerCount < maxPower) {
            powerArrow.innerHTML = `<img src="icons/down-arrow.svg" width="27" height="27" alt="Power down arrow">`;
        }

        // Show up arrow if water count > min
        if (waterCount > minWater) {
            waterArrow.innerHTML = `<img src="icons/up-arrow.svg" width="27" height="27" alt="Water up arrow">`;
        }

        // Show up arrow if land count > min
        if (landCount > minLand) {
            landArrow.innerHTML = `<img src="icons/up-arrow.svg" width="27" height="27" alt="Land up arrow">`;
        }
    }
}

slider.addEventListener("sl-change", (event) => {
    update(+event.target.value);
});

update(0); // initial state
