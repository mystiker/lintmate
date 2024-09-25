import { RuleJson } from './json-rule.type.js';

// Funktion, um eine Datei zu verarbeiten (ohne Umwandlungslogik, nur als Platzhalter)
export function convertMarkdownToJSON(fileContent: string): RuleJson {
    // Titel extrahieren
    const titleMatch = fileContent.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1] : '';

    // Regeltyp extrahieren
    const ruleTypeMatch = fileContent.match(/rule_type:\s*(.+)/);
    const ruleType = ruleTypeMatch ? ruleTypeMatch[1] : '';

    // Links für 'further_reading' extrahieren
    const linksMatch = fileContent.match(/further_reading:\s*\n- (.+)\n- (.+)/);
    const links = linksMatch ? [linksMatch[1], linksMatch[2]] : [];

    // Beschreibung extrahieren (nach Frontmatter)
    const descriptionMatch = fileContent.match(
        /\n\n([\s\S]*?)\n\n## Rule Details/,
    );
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    // Korrekte Code-Beispiele extrahieren
    const correctExamples = [];
    const correctRegex = /:::correct[\s\S]*?```js\n([\s\S]*?)```/g;
    let correctMatch;
    while ((correctMatch = correctRegex.exec(fileContent)) !== null) {
        correctExamples.push(correctMatch[1].trim());
    }

    // Falsche Code-Beispiele extrahieren
    const incorrectExamples = [];
    const incorrectRegex = /:::incorrect[\s\S]*?```js\n([\s\S]*?)```/g;
    let incorrectMatch;
    while ((incorrectMatch = incorrectRegex.exec(fileContent)) !== null) {
        incorrectExamples.push(incorrectMatch[1].trim());
    }

    // JSON-Objekt zurückgeben
    return {
        title,
        rule_type: ruleType,
        description,
        correct_examples: correctExamples,
        incorrect_examples: incorrectExamples,
        rule_details:
            'This rule aims to reduce the usage of variables outside of their binding context and emulate traditional block scope from other languages.',
        options: [],
        fixable: 'No',
        links,
    };
}
