const root = document.querySelector('.experience-titan');
if (root) {

    const conditions = {
      0: {
        title: "A narrow chemical window",
        summary: "Only five of the 40 studied molecules are thermodynamically accessible without added ammonia.",
        note: "The exceptions are striking because their formulas fit the starting supply of carbon, hydrogen, nitrogen, and oxygen especially well.",
        classes: [
          ["Amino acids", "3 of 21", "Alanine, beta-alanine, proline", false],
          ["Nucleobases", "1 of 7", "Adenine", false],
          ["Ribose", "0 of 1", "Not accessible", false],
          ["Fatty acids", "1 of 11", "Butanoic acid", false]
        ]
      },
      1: {
        title: "The gate swings open",
        summary: "A small modeled addition of ammonia makes nearly the entire investigated set accessible at equilibrium.",
        note: "One percent means one ammonia molecule for roughly every 100 water molecules in the model's starting mixture.",
        classes: [
          ["Amino acids", "19 of 21", "All studied except cysteine and methionine", true],
          ["Nucleobases", "7 of 7", "Purines and pyrimidines", true],
          ["Ribose", "1 of 1", "Thermodynamically accessible", true],
          ["Fatty acids", "11 of 11", "C₂ through C₁₂", true]
        ]
      },
      2: {
        title: "Broad access, different maximum conversions",
        summary: "At 2% NH₃, the modeled starting inventory remains broadly convertible into the molecular families studied; the accessible set is already near its maximum at 1% NH₃.",
        note: "This describes accessibility and the conversion of starting inventory into products, not the yield of one product. Many amino acids and longer fatty acids reach their highest modeled conversions around 2% NH₃, while nucleobases, ribose, and shorter fatty acids peak at 1% NH₃.",
        classes: [
          ["Amino acids", "19 of 21", "Many yields peak near 2% NH₃", true],
          ["Nucleobases", "7 of 7", "Accessible; yields are slightly below the 1% NH₃ case", true],
          ["Ribose", "1 of 1", "Accessible; yield is slightly below the 1% NH₃ case", true],
          ["Fatty acids", "11 of 11", "C₇-C₁₂ peak near 2% NH₃", true]
        ]
      },
      3: {
        title: "Broad access persists",
        summary: "At 3% NH₃, 38 of the 40 investigated molecules remain thermodynamically accessible in the reported models.",
        note: "The published 3% columns retain the same accessible set as the 1% and 2% cases. Most modeled conversions are beginning to taper from their lower-ammonia maxima.",
        classes: [
          ["Amino acids", "19 of 21", "Cysteine and methionine remain inaccessible", true],
          ["Nucleobases", "7 of 7", "Purines and pyrimidines", true],
          ["Ribose", "1 of 1", "Thermodynamically accessible", true],
          ["Fatty acids", "11 of 11", "C₂ through C₁₂", true]
        ]
      },
      4: {
        title: "Broad access, tapering conversions",
        summary: "At 4% NH₃, the reported models still make 38 of 40 investigated molecules thermodynamically accessible.",
        note: "The accessible set is unchanged from 1% through 4%. The figure colors show generally smaller modeled conversions than at the lower-ammonia peak conditions.",
        classes: [
          ["Amino acids", "19 of 21", "Cysteine and methionine remain inaccessible", true],
          ["Nucleobases", "7 of 7", "Purines and pyrimidines", true],
          ["Ribose", "1 of 1", "Thermodynamically accessible", true],
          ["Fatty acids", "11 of 11", "C₂ through C₁₂", true]
        ]
      },
      5: {
        title: "Broad access, lower conversions",
        summary: "At 5% NH₃, 38 of the 40 investigated molecules remain thermodynamically accessible in the reported models.",
        note: "The model still favors the same broad molecular inventory, while most conversions continue their gradual decline from the 1%–2% range.",
        classes: [
          ["Amino acids", "19 of 21", "Cysteine and methionine remain inaccessible", true],
          ["Nucleobases", "7 of 7", "Purines and pyrimidines", true],
          ["Ribose", "1 of 1", "Thermodynamically accessible", true],
          ["Fatty acids", "11 of 11", "C₂ through C₁₂", true]
        ]
      },
      10: {
        title: "Broad access at the highest reported setting",
        summary: "At 10% NH₃, the reported models still make 38 of 40 investigated molecules thermodynamically accessible.",
        note: "The accessible set remains broad, but the published 10% columns show lower modeled conversions for most products than the lower-ammonia peak conditions.",
        classes: [
          ["Amino acids", "19 of 21", "Cysteine and methionine remain inaccessible", true],
          ["Nucleobases", "7 of 7", "Purines and pyrimidines", true],
          ["Ribose", "1 of 1", "Thermodynamically accessible", true],
          ["Fatty acids", "11 of 11", "C₂ through C₁₂", true]
        ]
      }
    };

    const reportedAmmonia = [0, 1, 2, 3, 4, 5, 10];
    const title = root.querySelector("#" + "condition-title");
    const summary = root.querySelector("#" + "condition-summary");
    const note = root.querySelector("#" + "condition-note");
    const grid = root.querySelector("#" + "molecule-grid");
    const slider = root.querySelector("#" + "ammonia-slider");
    const sliderValue = root.querySelector("#" + "ammonia-value");
    const sliderTicks = Array.from(root.querySelectorAll(".slider-ticks span"));

    function renderCondition(key) {
      const data = conditions[key];
      title.textContent = data.title;
      summary.textContent = data.summary;
      note.textContent = data.note;
      grid.replaceChildren(...data.classes.map(([name, count, examples, open]) => {
        const card = document.createElement("article");
        card.className = "molecule" + (open ? " open" : "");
        const top = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("strong");
        const detail = document.createElement("p");
        label.textContent = name;
        value.textContent = count;
        detail.textContent = examples;
        top.append(label, value);
        card.append(top, detail);
        return card;
      }));
      sliderValue.textContent = `${key}% NH₃`;
      slider.setAttribute("aria-valuetext", `${key}% ammonia`);
      slider.style.setProperty("--slider-progress", `${(Number(slider.value) / (reportedAmmonia.length - 1)) * 100}%`);
      sliderTicks.forEach((tick, index) => tick.classList.toggle("active", reportedAmmonia[index] === Number(key)));
    }

    slider.addEventListener("input", () => renderCondition(reportedAmmonia[Number(slider.value)]));
    renderCondition("0");
    root.classList.add("controls-ready");
  
}
