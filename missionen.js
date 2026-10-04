/* =====================================================================
   MISSIONSDATEN — Baustein E: Einfügen (18 Einheiten)
   6 Familien × 3 Wiederholungen, am Ende per Round-Robin gemischt.
   ===================================================================== */

(() => {
  "use strict";
  const missions = [];

  function norm(t) {
    return t.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();
  }

  // ---------------------------------------------------------------
  // Symbole
  // ---------------------------------------------------------------
  missions.push({
    id: "sym-1", family: "Symbole", method: "maus", title: "Ein Copyright-Symbol einfügen",
    ribbonDemo: ["sym-copyright"],
    erklaerung: "Im Menüband unter „Symbole“ lassen sich häufig gebrauchte Zeichen direkt einfügen — ohne Sonderzeichentabelle.",
    aufgabe: "Setze den Cursor ganz ans Satzende (nach dem Punkt) und füge dort das Copyright-Symbol „©“ ein (mit einem Leerzeichen davor).",
    hint: "Erst klicken, um den Cursor zu platzieren, dann auf „©“ klicken.",
    paragraphs: ["Alle Fotos in diesem Artikel stammen von unserer Redaktion."],
    demo: { vorher: "...stammen von unserer Redaktion.", nachher: "...stammen von unserer Redaktion. ©" },
    check: (ctx) => norm(ctx.plainText) === norm("Alle Fotos in diesem Artikel stammen von unserer Redaktion. ©"),
  });
  missions.push({
    id: "sym-2", family: "Symbole", method: "maus", title: "Ein Pfeil-Symbol einfügen",
    ribbonDemo: ["sym-pfeil"],
    erklaerung: "Pfeile eignen sich gut, um auf eine andere Stelle im Heft zu verweisen.",
    aufgabe: "Setze den Cursor direkt nach dem Wort „dazu“ und füge dort das Pfeil-Symbol „→“ ein (mit Leerzeichen davor und danach).",
    hint: "Cursor zwischen „dazu“ und „auf“ setzen, dann auf „→“ klicken.",
    paragraphs: ["Mehr dazu auf Seite 3."],
    demo: { vorher: "Mehr dazu auf Seite 3.", nachher: "Mehr dazu → auf Seite 3." },
    check: (ctx) => norm(ctx.plainText) === norm("Mehr dazu → auf Seite 3."),
  });
  missions.push({
    id: "sym-3", family: "Symbole", method: "maus", title: "Ein Stern-Symbol einfügen",
    ribbonDemo: ["sym-stern"],
    erklaerung: "Sterne eignen sich, um eine besonders gelungene Stelle hervorzuheben.",
    aufgabe: "Setze den Cursor ans Ende des Satzes und füge das Stern-Symbol „★“ ein (mit einem Leerzeichen davor).",
    hint: "Ans Satzende klicken, dann auf „★“ klicken.",
    paragraphs: ["Dieser Beitrag wurde besonders gut bewertet"],
    demo: { vorher: "Dieser Beitrag wurde besonders gut bewertet", nachher: "Dieser Beitrag wurde besonders gut bewertet ★" },
    check: (ctx) => norm(ctx.plainText) === norm("Dieser Beitrag wurde besonders gut bewertet ★"),
  });

  // ---------------------------------------------------------------
  // Bild einfügen
  // ---------------------------------------------------------------
  missions.push({
    id: "bild-1", family: "BildEinfuegen", method: "maus", title: "Ein Bild einfügen (1)",
    ribbonDemo: ["btn-bild"],
    erklaerung: "Mit „Bild“ im Menüband fügt ihr ein Bild an der Cursorposition ein.",
    aufgabe: "Setze den Cursor ans Ende der Zeile und füge ein Bild ein.",
    hint: "Ans Zeilenende klicken, dann auf „🖼️ Bild“ klicken.",
    paragraphs: ["Hier soll später ein Foto vom Schulfest stehen:"],
    demo: { vorher: "Hier soll später ein Foto vom Schulfest stehen:", nachher: "Hier soll später ein Foto vom Schulfest stehen: 🖼️" },
    check: (ctx) => ctx.imageCount >= 1,
  });
  missions.push({
    id: "bild-2", family: "BildEinfuegen", method: "maus", title: "Ein Bild einfügen (2)",
    ribbonDemo: ["btn-bild"],
    erklaerung: "Auch ein fehlendes Titelbild lässt sich so schnell ersetzen.",
    aufgabe: "Setze den Cursor ans Ende der Zeile und füge ein Bild ein.",
    hint: "Ans Zeilenende klicken, dann auf „🖼️ Bild“ klicken.",
    paragraphs: ["Das Titelbild für diese Ausgabe fehlt noch."],
    demo: { vorher: "Das Titelbild für diese Ausgabe fehlt noch.", nachher: "Das Titelbild für diese Ausgabe fehlt noch. 🖼️" },
    check: (ctx) => ctx.imageCount >= 1,
  });
  missions.push({
    id: "bild-3", family: "BildEinfuegen", method: "maus", title: "Ein Bild einfügen (3)",
    ribbonDemo: ["btn-bild"],
    erklaerung: "So baut ihr nach und nach eine Bildergalerie auf.",
    aufgabe: "Setze den Cursor ans Ende der Zeile und füge ein Bild ein.",
    hint: "Ans Zeilenende klicken, dann auf „🖼️ Bild“ klicken.",
    paragraphs: ["Ein Beispielfoto für die Bildergalerie:"],
    demo: { vorher: "Ein Beispielfoto für die Bildergalerie:", nachher: "Ein Beispielfoto für die Bildergalerie: 🖼️" },
    check: (ctx) => ctx.imageCount >= 1,
  });

  // ---------------------------------------------------------------
  // Bildgröße ändern
  // ---------------------------------------------------------------
  missions.push({
    id: "bildgr-1", family: "BildGroesse", method: "maus", title: "Ein Bild verkleinern",
    ribbonDemo: ["bild-klein"],
    erklaerung: "Klickt ein Bild einmal an, um es auszuwählen (ihr erkennt das am blauen Rahmen) — danach wirken die Größen-Buttons darauf.",
    aufgabe: "Klicke das Bild an und stelle die Größe auf „Klein“.",
    hint: "Erst das Bild anklicken (blauer Rahmen erscheint), dann „Klein“ klicken.",
    paragraphs: ["Dieses Bild ist noch zu groß für die Vorschau:"],
    needsPlaceholderImage: true,
    demo: { vorher: "🖼️ (groß)", nachher: "🖼️ (klein)" },
    check: (ctx) => ctx.imageWidth === 80,
  });
  missions.push({
    id: "bildgr-2", family: "BildGroesse", method: "maus", title: "Ein Bild mittelgroß stellen",
    ribbonDemo: ["bild-mittel"],
    erklaerung: "Für die meisten Artikelbilder passt eine mittlere Größe am besten.",
    aufgabe: "Klicke das Bild an und stelle die Größe auf „Mittel“.",
    hint: "Erst das Bild anklicken, dann „Mittel“ klicken.",
    paragraphs: ["Dieses Bild soll eine mittlere Größe bekommen:"],
    needsPlaceholderImage: true,
    demo: { vorher: "🖼️ (groß)", nachher: "🖼️ (mittel)" },
    check: (ctx) => ctx.imageWidth === 160,
  });
  missions.push({
    id: "bildgr-3", family: "BildGroesse", method: "maus", title: "Ein Bild vergrößern",
    ribbonDemo: ["bild-gross"],
    erklaerung: "Für ein Titelbild darf es auch mal richtig groß sein.",
    aufgabe: "Klicke das Bild an und stelle die Größe auf „Groß“.",
    hint: "Erst das Bild anklicken, dann „Groß“ klicken.",
    paragraphs: ["Dieses Titelbild darf ruhig groß sein:"],
    needsPlaceholderImage: true,
    demo: { vorher: "🖼️ (mittel)", nachher: "🖼️ (groß)" },
    check: (ctx) => ctx.imageWidth === 260,
  });

  // ---------------------------------------------------------------
  // Kopfzeile
  // ---------------------------------------------------------------
  missions.push({
    id: "kopf-1", family: "Kopfzeile", method: "beides", title: "Einen Titel in die Kopfzeile eintragen",
    ribbonDemo: ["btn-kopfzeile"],
    erklaerung: "In echtem Word aktiviert ihr die Kopfzeile mit einem Doppelklick ganz oben auf der Seite. Hier geht auch ein einfacher Klick auf „Kopfzeile“ im Menüband.",
    aufgabe: "Trage in die Kopfzeile den Titel „Schülerzeitung Ausgabe 3“ ein.",
    hint: "Doppelklick in den gestrichelten Bereich ganz oben, dann tippen.",
    paragraphs: ["Der Hauptartikel beginnt hier."],
    demo: { vorher: "(leere Kopfzeile)", nachher: "Schülerzeitung Ausgabe 3" },
    check: (ctx) => ctx.headerText === "Schülerzeitung Ausgabe 3",
  });
  missions.push({
    id: "kopf-2", family: "Kopfzeile", method: "beides", title: "Ein Datum in die Kopfzeile eintragen",
    ribbonDemo: ["btn-kopfzeile"],
    erklaerung: "Auch das Erscheinungsdatum gehört oft in die Kopfzeile.",
    aufgabe: "Trage in die Kopfzeile „Oktober 2026“ ein.",
    hint: "Doppelklick oben, dann tippen.",
    paragraphs: ["Der Hauptartikel beginnt hier."],
    demo: { vorher: "(leere Kopfzeile)", nachher: "Oktober 2026" },
    check: (ctx) => ctx.headerText === "Oktober 2026",
  });
  missions.push({
    id: "kopf-3", family: "Kopfzeile", method: "beides", title: "Einen Rubrik-Namen in die Kopfzeile eintragen",
    ribbonDemo: ["btn-kopfzeile"],
    erklaerung: "So wissen Lesende sofort, in welcher Rubrik sie sich befinden.",
    aufgabe: "Trage in die Kopfzeile „Wissen & Aktuelles“ ein.",
    hint: "Doppelklick oben, dann tippen.",
    paragraphs: ["Der Hauptartikel beginnt hier."],
    demo: { vorher: "(leere Kopfzeile)", nachher: "Wissen & Aktuelles" },
    check: (ctx) => ctx.headerText === "Wissen & Aktuelles",
  });

  // ---------------------------------------------------------------
  // Fußzeile
  // ---------------------------------------------------------------
  missions.push({
    id: "fuss-1", family: "Fusszeile", method: "beides", title: "Eine Seitenangabe in die Fußzeile eintragen",
    ribbonDemo: ["btn-fusszeile"],
    erklaerung: "Die Fußzeile aktiviert ihr per Doppelklick ganz unten auf der Seite — oder per Klick auf „Fußzeile“ im Menüband.",
    aufgabe: "Trage in die Fußzeile „Seite 1“ ein.",
    hint: "Doppelklick in den gestrichelten Bereich ganz unten, dann tippen.",
    paragraphs: ["Der Hauptartikel endet hier."],
    demo: { vorher: "(leere Fußzeile)", nachher: "Seite 1" },
    check: (ctx) => ctx.footerText === "Seite 1",
  });
  missions.push({
    id: "fuss-2", family: "Fusszeile", method: "beides", title: "Einen Weiterlese-Hinweis in die Fußzeile eintragen",
    ribbonDemo: ["btn-fusszeile"],
    erklaerung: "Ein Hinweis in der Fußzeile leitet zur nächsten Seite weiter.",
    aufgabe: "Trage in die Fußzeile „Weiter auf Seite 2“ ein.",
    hint: "Doppelklick unten, dann tippen.",
    paragraphs: ["Der Hauptartikel endet hier."],
    demo: { vorher: "(leere Fußzeile)", nachher: "Weiter auf Seite 2" },
    check: (ctx) => ctx.footerText === "Weiter auf Seite 2",
  });
  missions.push({
    id: "fuss-3", family: "Fusszeile", method: "beides", title: "Einen Copyright-Hinweis in die Fußzeile eintragen",
    ribbonDemo: ["btn-fusszeile"],
    erklaerung: "Auch Copyright-Hinweise stehen meist klein in der Fußzeile.",
    aufgabe: "Trage in die Fußzeile „© Schülerzeitungs-Redaktion“ ein.",
    hint: "Doppelklick unten, dann tippen.",
    paragraphs: ["Der Hauptartikel endet hier."],
    demo: { vorher: "(leere Fußzeile)", nachher: "© Schülerzeitungs-Redaktion" },
    check: (ctx) => ctx.footerText === "© Schülerzeitungs-Redaktion",
  });

  // ---------------------------------------------------------------
  // Textfeld
  // ---------------------------------------------------------------
  missions.push({
    id: "textfeld-1", family: "Textfeld", method: "maus", title: "Ein Zitat in ein Textfeld schreiben",
    ribbonDemo: ["btn-textfeld"],
    erklaerung: "Ein Textfeld hebt eine kurze Aussage optisch vom restlichen Text ab — ideal für Zitate.",
    aufgabe: "Setze den Cursor ans Zeilenende, füge ein Textfeld ein und tippe hinein: „Bildung verändert die Welt.“",
    hint: "Ans Zeilenende klicken, „▭ Textfeld“ klicken, dann direkt hineintippen.",
    paragraphs: ["Zitat der Woche:"],
    demo: { vorher: "Zitat der Woche:", nachher: "Zitat der Woche: [▭ Bildung verändert die Welt.]" },
    check: (ctx) => ctx.textboxText().includes("Bildung verändert die Welt."),
  });
  missions.push({
    id: "textfeld-2", family: "Textfeld", method: "maus", title: "Einen Hinweis in ein Textfeld schreiben",
    ribbonDemo: ["btn-textfeld"],
    erklaerung: "Auch wichtige organisatorische Hinweise lassen sich so hervorheben.",
    aufgabe: "Setze den Cursor ans Zeilenende, füge ein Textfeld ein und tippe hinein: „Redaktionssitzung am Montag.“",
    hint: "Ans Zeilenende klicken, „▭ Textfeld“ klicken, dann tippen.",
    paragraphs: ["Wichtiger Hinweis:"],
    demo: { vorher: "Wichtiger Hinweis:", nachher: "Wichtiger Hinweis: [▭ Redaktionssitzung am Montag.]" },
    check: (ctx) => ctx.textboxText().includes("Redaktionssitzung am Montag."),
  });
  missions.push({
    id: "textfeld-3", family: "Textfeld", method: "maus", title: "Eine Umfrage in ein Textfeld schreiben",
    ribbonDemo: ["btn-textfeld"],
    erklaerung: "So könnt ihr Leserinnen und Leser direkt im Artikel zu einer Umfrage einladen.",
    aufgabe: "Setze den Cursor ans Zeilenende, füge ein Textfeld ein und tippe hinein: „Wie gefällt euch die neue Ausgabe?“",
    hint: "Ans Zeilenende klicken, „▭ Textfeld“ klicken, dann tippen.",
    paragraphs: ["Kurzumfrage:"],
    demo: { vorher: "Kurzumfrage:", nachher: "Kurzumfrage: [▭ Wie gefällt euch die neue Ausgabe?]" },
    check: (ctx) => ctx.textboxText().includes("Wie gefällt euch die neue Ausgabe?"),
  });

  // ---------------------------------------------------------------
  // Labels je Familie
  // ---------------------------------------------------------------
  const familyLabels = {
    Symbole: "Symbole", BildEinfuegen: "Bild einfügen",
    BildGroesse: "Bildgröße ändern", Kopfzeile: "Kopfzeile", Fusszeile: "Fußzeile", Textfeld: "Textfeld",
  };
  missions.forEach(m => { m.baustein = "E"; m.bausteinLabel = "Einfügen – " + familyLabels[m.family]; });

  // ---------------------------------------------------------------
  // Durchmischen: Round-Robin über alle 7 Familien
  // ---------------------------------------------------------------
  function chunk3(arr) {
    const out = [];
    for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
    return out;
  }
  function roundRobin(groups) {
    const out = [];
    const maxLen = Math.max(...groups.map(g => g.length));
    for (let round = 0; round < maxLen; round++) {
      groups.forEach(g => { if (g[round]) out.push(g[round]); });
    }
    return out;
  }
  const interleaved = roundRobin(chunk3(missions));

  window.InsertEngine.start(interleaved, {
    familyLabel: "Einfügen",
    startNumber: 1,
    totalCount: 18,
    onComplete: {
      title: "Baustein E abgeschlossen! 🎉",
      text: "Du hast alle 18 Missionen zum Einfügen-Modul gemeistert — Symbole, Bild einfügen und skalieren, Kopf-/Fußzeile und Textfeld.",
    },
  });
})();
