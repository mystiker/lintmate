import { convertMarkdownToJSON } from './convert-markdown-to-json.js';
import * as fs from 'fs';
import * as path from 'path';

describe('convertMarkdownToJSON', () => {
    it('should correctly convert block-scoped-var.md to JSON', () => {
        // Beispielinhalt der Markdown-Datei (simuliert den Inhalt von block-scoped-var.md)
        const filePath = path.join(
            __dirname,
            '../rules',
            'block-scoped-var.md',
        );
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Umwandlung in JSON
        const result = convertMarkdownToJSON(fileContent);

        // Erwartete Ausgabe
        const expected = {
            title: 'block-scoped-var',
            rule_type: 'suggestion',
            description:
                'The `block-scoped-var` rule generates warnings when variables are used outside of the block in which they were defined. This emulates C-style block scope.',
            correct_examples: [
                `function doIf() {\n    var build;\n\n    if (true) {\n        build = true;\n    }\n\n    console.log(build);\n}\n\nfunction doIfElse() {\n    var build;\n\n    if (true) {\n        build = true;\n    } else {\n        build = false;\n    }\n}\n\nfunction doTryCatch() {\n    var build;\n    var f;\n\n    try {\n        build = 1;\n    } catch (e) {\n        f = build;\n    }\n}\n\nfunction doFor() {\n    for (var x = 1; x < 10; x++) {\n        var y = f(x);\n        console.log(y);\n    }\n}\n\nclass C {\n    static {\n        var build = false;\n        if (something) {\n            build = true;\n        }\n    }\n}`,
            ],
            incorrect_examples: [
                `function doIf() {\n    if (true) {\n        var build = true;\n    }\n\n    console.log(build);\n}\n\nfunction doIfElse() {\n    if (true) {\n        var build = true;\n    } else {\n        var build = false;\n    }\n}\n\nfunction doTryCatch() {\n    try {\n        var build = 1;\n    } catch (e) {\n        var f = build;\n    }\n}\n\nfunction doFor() {\n    for (var x = 1; x < 10; x++) {\n        var y = f(x);\n    }\n    console.log(y);\n}\n\nclass C {\n    static {\n        if (something) {\n            var build = true;\n        }\n        build = false;\n    }\n}`,
            ],
            rule_details:
                'This rule aims to reduce the usage of variables outside of their binding context and emulate traditional block scope from other languages.',
            options: [],
            fixable: 'No',
            links: [
                'https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html',
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting',
            ],
        };

        // Vergleich der Ausgabe
        expect(result).toEqual(expected);
    });
});
