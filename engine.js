/* =====================================================================
   PROGRAMM 3 — ENGINE (Baustein E: Einfügen)

   Neu gegenüber den bisherigen Engines:
   - Bilder: Klick-Auswahl (wie ein echtes Bild in Word anklicken), dann
     Größen-Buttons wirken auf das ausgewählte Bild.
   - Kopf-/Fußzeile: zwei eigene, vom Haupttext getrennte Zonen. Die
     Erklärung lehrt den echten Doppelklick-Mechanismus aus Word; die
     Zonen sind während der passenden Missionen direkt bearbeitbar,
     damit sowohl Doppelklick als auch einfacher Klick funktionieren.
   ===================================================================== */

window.InsertEngine = (() => {
  "use strict";

  const editor = document.getElementById("editor");
  const headerZone = document.getElementById("headerZone");
  const footerZone = document.getElementById("footerZone");
  const el = {
    panelBody: document.getElementById("panelBody"),
    progressFill: document.getElementById("progressFill"),
    progressLabel: document.getElementById("progressLabel"),
    familyLabel: document.getElementById("familyLabel"),
    brandNum: document.getElementById("brandNum"),
    docName: document.getElementById("docName"),
  };

  const state = {
    missions: [], index: 0, phase: "erklaerung", done: false,
    startNumber: 1, totalCount: 21, onComplete: null,
    selectedImage: null,
  };

  // -----------------------------------------------------------
  // Platzhalterbild (Inline-SVG, keine externe Datei nötig)
  // -----------------------------------------------------------
  const PLACEHOLDER_SVG =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 70'>" +
    "<rect width='100' height='70' rx='4' fill='#EAF0EE' stroke='#3E6E63' stroke-width='2'/>" +
    "<circle cx='26' cy='22' r='8' fill='#F5C451'/>" +
    "<polygon points='0,70 35,36 55,54 75,30 100,70' fill='#3E6E63'/>" +
    "</svg>";
  const PLACEHOLDER_IMG_SRC = "data:image/svg+xml," + encodeURIComponent(PLACEHOLDER_SVG);

  // -----------------------------------------------------------
  // Text-Hilfsfunktionen
  // -----------------------------------------------------------

  function getPlainText() {
    return [...editor.querySelectorAll("p")].map(p => p.textContent).join("\n");
  }

  function setContent(m) {
    state.selectedImage = null;
    if (m.initialHTML) {
      editor.innerHTML = m.initialHTML;
    } else {
      editor.innerHTML = "";
      (m.paragraphs || []).forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        editor.appendChild(p);
      });
    }
    if (m.needsPlaceholderImage) {
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.src = PLACEHOLDER_IMG_SRC;
      img.alt = "Platzhalterbild";
      img.style.width = "200px";
      p.appendChild(img);
      editor.appendChild(p);
    }

    headerZone.textContent = "";
    footerZone.textContent = "";
    const headerActive = m.family === "Kopfzeile";
    const footerActive = m.family === "Fusszeile";
    headerZone.contentEditable = headerActive ? "true" : "false";
    footerZone.contentEditable = footerActive ? "true" : "false";
  }

  // -----------------------------------------------------------
  // Einfüge-Aktionen
  // -----------------------------------------------------------

  function insertNodeAtCursor(node, { collapseAfter = true } = {}) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editor.contains(sel.anchorNode)) {
      // Kein Cursor im Editor: ans Ende des letzten Absatzes anhängen.
      const lastP = editor.querySelector("p:last-child") || editor;
      lastP.appendChild(node);
      return;
    }
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(node);
    if (collapseAfter) {
      range.setStartAfter(node);
      range.setEndAfter(node);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  function insertSymbolAtCursor(symbol) {
    if (!editor.contains(window.getSelection().anchorNode)) { editor.focus(); }
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editor.contains(sel.anchorNode)) return false;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(symbol);
    range.insertNode(node);
    range.setStartAfter(node);
    range.setEndAfter(node);
    sel.removeAllRanges();
    sel.addRange(range);
    return true;
  }

  function insertImageAtCursor() {
    const img = document.createElement("img");
    img.src = PLACEHOLDER_IMG_SRC;
    img.alt = "Platzhalterbild";
    img.style.width = "200px";
    insertNodeAtCursor(img);
    return true;
  }

  function insertTextboxAtCursor() {
    const box = document.createElement("div");
    box.className = "textfeld-box";
    box.contentEditable = "true";
    insertNodeAtCursor(box, { collapseAfter: false });
    const range = document.createRange();
    range.selectNodeContents(box);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    box.focus();
    return true;
  }

  function flashButton(elm) {
    if (!elm) return;
    elm.classList.add("flash");
    setTimeout(() => elm.classList.remove("flash"), 220);
  }

  // Symbole
  document.querySelectorAll(".rbtn-symbol").forEach(btn => {
    btn.addEventListener("click", () => {
      flashButton(btn);
      if (insertSymbolAtCursor(btn.dataset.symbol)) afterManualEdit();
    });
  });

  // Bild einfügen
  document.getElementById("btn-bild").addEventListener("click", (e) => {
    flashButton(e.currentTarget);
    insertImageAtCursor();
    afterManualEdit();
  });

  // Bild auswählen (Klick auf ein Bild im Editor)
  editor.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      if (state.selectedImage) state.selectedImage.classList.remove("selected");
      state.selectedImage = e.target;
      state.selectedImage.classList.add("selected");
    } else if (state.selectedImage) {
      state.selectedImage.classList.remove("selected");
      state.selectedImage = null;
    }
  });

  // Bildgröße
  document.querySelectorAll(".rbtn-size").forEach(btn => {
    btn.addEventListener("click", () => {
      flashButton(btn);
      if (state.selectedImage) {
        state.selectedImage.style.width = btn.dataset.width + "px";
        afterManualEdit();
      }
    });
  });

  // Textfeld
  document.getElementById("btn-textfeld").addEventListener("click", (e) => {
    flashButton(e.currentTarget);
    insertTextboxAtCursor();
    afterManualEdit();
  });

  // Kopf-/Fußzeile: Ribbon-Buttons aktivieren/fokussieren die jeweilige Zone
  document.getElementById("btn-kopfzeile").addEventListener("click", (e) => {
    flashButton(e.currentTarget);
    if (headerZone.contentEditable === "true") headerZone.focus();
  });
  document.getElementById("btn-fusszeile").addEventListener("click", (e) => {
    flashButton(e.currentTarget);
    if (footerZone.contentEditable === "true") footerZone.focus();
  });
  headerZone.addEventListener("input", afterManualEdit);
  footerZone.addEventListener("input", afterManualEdit);
  headerZone.addEventListener("dblclick", () => { if (headerZone.contentEditable === "true") headerZone.focus(); });
  footerZone.addEventListener("dblclick", () => { if (footerZone.contentEditable === "true") footerZone.focus(); });

  function afterManualEdit() { runCheck(); }

  // -----------------------------------------------------------
  // Missions-/Phasen-Steuerung
  // -----------------------------------------------------------

  function currentMission() { return state.missions[state.index]; }

  function renderRibbonHighlightReset() {
    document.querySelectorAll(".rbtn").forEach(b => b.classList.remove("flash"));
  }

  function setPhase(phase) { state.phase = phase; render(); }

  function render() {
    const m = currentMission();
    el.docName.textContent = "Mission " + (state.index + state.startNumber) + " – " + m.title + ".docx";
    if (el.brandNum && m.baustein) el.brandNum.textContent = m.baustein;
    if (m.bausteinLabel) el.familyLabel.textContent = m.bausteinLabel;
    renderRibbonHighlightReset();

    if (state.phase === "erklaerung") {
      setContent(m);
      el.panelBody.innerHTML = `
        <span class="phase-tag">So wird es gemacht!</span>
        <span class="method-badge">${m.method === "maus" ? "🖱️ Maus" : "🖱️⌨️ Beides"}</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="explanation-text">${m.erklaerung}</p>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnSkipDemo">Direkt zur Übung →</button>
          <button class="btn btn-primary" id="btnZurDemo">Demo ansehen →</button>
        </div>`;
      document.getElementById("btnZurDemo").addEventListener("click", () => setPhase("demo"));
      document.getElementById("btnSkipDemo").addEventListener("click", () => setPhase("aufgabe"));
      return;
    }

    if (state.phase === "demo") {
      setContent(m);
      el.panelBody.innerHTML = `
        <span class="phase-tag demo">Demo</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="explanation-text">${m.erklaerung}</p>
        <div id="demoVisual" class="demo-visual"></div>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnDemoNochmal">Nochmal ansehen</button>
          <button class="btn btn-primary" id="btnJetztDu">Jetzt du! →</button>
        </div>`;
      document.getElementById("btnDemoNochmal").addEventListener("click", playDemo);
      document.getElementById("btnJetztDu").addEventListener("click", () => setPhase("aufgabe"));
      playDemo();
      return;
    }

    if (state.phase === "aufgabe") {
      state.done = false;
      setContent(m);
      editor.contentEditable = "true";
      el.panelBody.innerHTML = `
        <span class="phase-tag aufgabe">Deine Aufgabe</span>
        <span class="method-badge">${m.method === "maus" ? "🖱️ Mit der Maus" : "🖱️⌨️ Maus oder Doppelklick"}</span>
        <h2 id="missionTitle">${m.title}</h2>
        <p class="instruction">${m.aufgabe}</p>
        ${m.hint ? `<div class="hintbox">
          <button class="hint-toggle" id="hintToggle">Tipp anzeigen</button>
          <p class="hint-text" id="hintText" hidden>${m.hint}</p>
        </div>` : ""}
        <div class="feedback" id="feedback"></div>
        <div class="panelnav">
          <button class="btn btn-ghost" id="btnRetry">Neu starten</button>
          <button class="btn btn-primary" id="btnNext" disabled>Weiter →</button>
        </div>`;
      if (m.hint) {
        document.getElementById("hintToggle").addEventListener("click", () => {
          const t = document.getElementById("hintText");
          const show = t.hidden;
          t.hidden = !show;
          document.getElementById("hintToggle").textContent = show ? "Tipp verbergen" : "Tipp anzeigen";
        });
      }
      document.getElementById("btnRetry").addEventListener("click", () => setPhase("aufgabe"));
      document.getElementById("btnNext").addEventListener("click", nextMission);
      editor.focus();
      return;
    }
  }

  function playDemo() {
    const m = currentMission();
    const visualHost = document.getElementById("demoVisual");
    if (visualHost) visualHost.innerHTML = "";
    if (m.demo) {
      visualHost.innerHTML = `
        <div class="demo-compare">
          <div class="demo-compare-box">
            <span class="demo-compare-label">Vorher</span>
            <p>${m.demo.vorher}</p>
          </div>
          <div class="demo-compare-arrow">↓</div>
          <div class="demo-compare-box demo-compare-after">
            <span class="demo-compare-label">Nachher</span>
            <p>${m.demo.nachher}</p>
          </div>
        </div>`;
    }
    if (m.ribbonDemo && m.ribbonDemo.length) {
      let i = 0;
      const step = () => {
        if (i > 0) { const prev = document.getElementById(m.ribbonDemo[i - 1]); if (prev) prev.classList.remove("flash"); }
        if (i < m.ribbonDemo.length) {
          const elm = document.getElementById(m.ribbonDemo[i]);
          if (elm) elm.classList.add("flash");
          i++; setTimeout(step, 650);
        }
      };
      step();
    }
  }

  function updateProgress() {
    el.progressFill.style.width = Math.round(state.index / state.missions.length * 100) + "%";
    el.progressLabel.textContent = "Mission " + (state.index + state.startNumber) + " / " + state.totalCount;
  }

  function runCheck() {
    const m = currentMission();
    if (state.phase !== "aufgabe" || state.done) return;

    const ctx = {
      plainText: getPlainText(),
      headerText: headerZone.textContent.trim(),
      footerText: footerZone.textContent.trim(),
      imageCount: editor.querySelectorAll("img").length,
      imageWidth: (() => {
        const img = editor.querySelector("img");
        return img ? parseFloat(img.style.width) : null;
      })(),
      textboxText: () => [...editor.querySelectorAll(".textfeld-box")].map(b => b.textContent.trim()).join(" | "),
    };

    let ok = false;
    try { ok = !!m.check(ctx); } catch (e) { ok = false; }
    if (ok) {
      state.done = true;
      const fb = document.getElementById("feedback");
      if (fb) { fb.textContent = "✓ Richtig gemacht! Klicke auf „Weiter“."; fb.className = "feedback ok"; }
      const btn = document.getElementById("btnNext");
      if (btn) btn.disabled = false;
      updateProgress();
    }
  }

  editor.addEventListener("keyup", runCheck);
  editor.addEventListener("mouseup", runCheck);
  document.addEventListener("selectionchange", () => {
    if (state.phase === "aufgabe") runCheck();
  });

  function nextMission() {
    if (state.index < state.missions.length - 1) {
      state.index++;
      updateProgress();
      setPhase("erklaerung");
    } else {
      editor.contentEditable = "false";
      headerZone.contentEditable = "false";
      footerZone.contentEditable = "false";
      const done = state.onComplete || { title: "Geschafft", text: `Du hast alle ${state.totalCount} Missionen gemeistert.` };
      el.panelBody.innerHTML = `
        <span class="phase-tag aufgabe">Geschafft! 🎉</span>
        <h2 id="missionTitle">${done.title}</h2>
        <p class="explanation-text">${done.text}</p>`;
    }
  }

  function start(missions, { familyLabel, startNumber = 1, totalCount, onComplete } = {}) {
    state.missions = missions;
    state.index = 0;
    state.startNumber = startNumber;
    state.totalCount = totalCount || missions.length;
    state.onComplete = onComplete || null;
    if (familyLabel) el.familyLabel.textContent = familyLabel;
    updateProgress();
    setPhase("erklaerung");
  }

  return { start };
})();
