document.addEventListener("DOMContentLoaded", function () {
  // Arrays containing popular dark mode colors for background and text
  const bgColors = [
    "#0A0A0A",
    "#121212",
    "#15292B",
    "#161618",
    "#181818",
    "#192734",
    "#212121",
    "#212124",
    "#22303C",
    "#242526",
    "#282828",
    "#3A3B3C",
    "#404040",
    "#64748B",
    "#475569",
    "#334155",
    "#1E293B",
    "#0F172A",
    "#020617", 
    "#9CA3AF",
    "#6B7280",
    "#4B5563",
    "#374151",
    "#1F2937", 
    "#111827",
    "#030712",
    "#27272A",
    "#18181B",
    "#09090B", 
  ];

  const textColors = [
    "#ffffff",
    "#e0e0e0",
    "#b0b0b0",
    "#f0f0f0",
    "#cccccc",
    "#dcdcdc",
    "#a9a9a9",
    "#e8e8e8",
    "#d3d3d3",
    "#fafafa",
    "#d4d4d4",
    "#bebebe",
    "#d2d2d2",
    "#e3e3e3",
    "#f1f1f1",
    "#f9f9f9",
    "#ececec",
    "#c8c8c8",
    "#f7f7f7",
    "#f5f5f5",
  ];


  let selectedBgColor = bgColors[0];
  let selectedTextColor = textColors[0];

  // Function to create color boxes for background and text color options
  function createColorBoxes(colors, type) {
    const container = document.getElementById(`${type}-color-options`);
    colors.forEach((color) => {
      const box = document.createElement("div");
      box.classList.add("color-box");
      box.style.backgroundColor = color;
      box.dataset.color = color;
      box.addEventListener("click", () =>
        handleColorSelection(color, type, box)
      );
      container.appendChild(box);
    });
  }

  // Function to handle the selection of a color
  function handleColorSelection(color, type, box) {
    if (type === "bg") {
      selectedBgColor = color;
      document
        .querySelectorAll("#bg-color-options .color-box")
        .forEach((el) => el.classList.remove("selected"));
      document.getElementById("selected-bg-color").style.backgroundColor =
        color;
      document.getElementById("selected-bg-color-value").textContent = color;
    } else {
      selectedTextColor = color;
      document
        .querySelectorAll("#text-color-options .color-box")
        .forEach((el) => el.classList.remove("selected"));
      document.getElementById("selected-text-color").style.backgroundColor =
        color;
      document.getElementById("selected-text-color-value").textContent = color;
    }
    box.classList.add("selected");
    applyDarkMode(selectedBgColor, selectedTextColor);
  }

  // Function to apply the selected dark mode colors to the current tab
  function applyDarkMode(bgColor, textColor) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setColors,
        args: [bgColor, textColor],
      });
    });
  }

  // Function to set the colors on the webpage
  function setColors(bgColor, textColor) {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      element.style.backgroundColor = bgColor;
      element.style.color = textColor;
    });
  }

  // Create color boxes for both background and text color options
  createColorBoxes(bgColors, "bg");
  createColorBoxes(textColors, "text");

  // Set initial selected color boxes
  document.getElementById("selected-bg-color").style.backgroundColor =
    selectedBgColor;
  document.getElementById("selected-bg-color-value").textContent =
    selectedBgColor;
  document.getElementById("selected-text-color").style.backgroundColor =
    selectedTextColor;
  document.getElementById("selected-text-color-value").textContent =
    selectedTextColor;
});
