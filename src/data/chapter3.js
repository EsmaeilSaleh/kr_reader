

const chapter3 = {
    intro: `
🔍 **What You’ll Learn in Chapter 3: Control Flow**

This chapter teaches how a program decides *what to do next*. It's all about making decisions, repeating actions, and jumping around your code.

🚦 **Decisions with \`if\`, \`else\`, and \`switch\`**
- Choose different actions based on conditions.
- Group multiple actions using \`{}\` blocks.

🔁 **Loops: Doing Things Repeatedly**
- Use \`while\`, \`do-while\`, and \`for\` loops to repeat code.
- Learn how to skip parts or exit early with \`break\` and \`continue\`.

⚠️ **\`goto\`: Use with Caution**
- Jump anywhere in your code—but it can get messy.

By the end of this chapter, you'll write code that reacts, repeats, and makes decisions just like a real program should.
`,
    title: "Control Flow",
    sections: [
        {
            id: "3.1",
            title: "Statements and Blocks",
            summary: `
🧱 **Statements and Blocks**

In C, a group of statements can be grouped using braces \`{ }\` to form a block.

This allows you to:
- Use multiple statements where only one is expected (e.g., after an \`if\`)
- Control scope of variables

Example:
\`\`\`c
if (n > 0) {
    printf("Positive\\n");
    n--;
}
\`\`\`
`,
            code: `if (n > 0) {
    printf("Positive\\n");
    n--;
}`
        },
        {
            id: "3.2",
            title: "if-else",
            summary: `
🔀 **if-else**

The \`if-else\` statement chooses between two paths.

\`\`\`c
if (condition)
    statement1;
else
    statement2;
\`\`\`

Braces \`{ }\` help avoid errors with nested or ambiguous conditions.

Use \`else if\` to create multi-way decisions.
`,
            code: `if (x > 0)
    printf("Positive\\n");
else if (x < 0)
    printf("Negative\\n");
else
    printf("Zero\\n");`
        },
        {
            id: "3.3",
            title: "else-if",
            summary: `
🔁 **else-if Chains**

You can chain multiple \`else if\` statements to check multiple conditions in order.

Example:
\`\`\`c
if (score >= 90)
    grade = 'A';
else if (score >= 80)
    grade = 'B';
else if (score >= 70)
    grade = 'C';
else
    grade = 'F';
\`\`\`

The first condition that matches will be executed.
`,
            code: `if (score >= 90)
    grade = 'A';
else if (score >= 80)
    grade = 'B';
else if (score >= 70)
    grade = 'C';
else
    grade = 'F';`
        },
        {
            id: "3.4",
            title: "switch",
            summary: `
🔄 **switch Statement**

The \`switch\` provides a cleaner way to compare a single variable against multiple values.

Example:
\`\`\`c
switch (c) {
case 'a':
case 'A':
    printf("Letter A\\n");
    break;
case 'b':
    printf("Letter B\\n");
    break;
default:
    printf("Other\\n");
    break;
}
\`\`\`

Don't forget the \`break\` statement to avoid fallthrough.
`,
            code: `switch (c) {
case 'a':
case 'A':
    printf("Letter A\\n");
    break;
case 'b':
    printf("Letter B\\n");
    break;
default:
    printf("Other\\n");
    break;
}`
        },
        {
            id: "3.5",
            title: "Loops - while and for",
            summary: `
🔁 **Loops: while and for**

Loops let you repeat code.

\`while\` checks the condition before each loop:
\`\`\`c
while (i < 10) {
    printf("%d\\n", i);
    i++;
}
\`\`\`

\`for\` is concise for counted loops:
\`\`\`c
for (i = 0; i < 10; i++)
    printf("%d\\n", i);
\`\`\`
`,
            code: `int i = 0;
while (i < 10) {
    printf("%d\\n", i);
    i++;
}

// or

for (int i = 0; i < 10; i++)
    printf("%d\\n", i);`
        },
        {
            id: "3.6",
            title: "do-while",
            summary: `
🔂 **do-while Loop**

Unlike \`while\`, the \`do-while\` loop runs the body first, then checks the condition.

Use it when the loop body must run at least once.

\`\`\`c
do {
    printf("%d\\n", i);
    i++;
} while (i < 10);
\`\`\`
`,
            code: `int i = 0;
do {
    printf("%d\\n", i);
    i++;
} while (i < 10);`
        },
        {
            id: "3.7",
            title: "break and continue",
            summary: `
⛔ **break and continue**

- \`break\` exits the loop immediately.
- \`continue\` skips to the next iteration.

Example:
\`\`\`c
for (i = 0; i < 10; i++) {
    if (i == 5)
        continue;
    if (i == 8)
        break;
    printf("%d\\n", i);
}
\`\`\`
`,
            code: `for (int i = 0; i < 10; i++) {
    if (i == 5)
        continue;
    if (i == 8)
        break;
    printf("%d\\n", i);
}`
        },
        {
            id: "3.8",
            title: "goto and labels",
            summary: `
⚠️ **goto and Labels**

\`goto\` jumps to a labeled statement. Use it rarely — it makes code harder to follow.

\`\`\`c
goto label;

...

label:
    statement;
\`\`\`

Use it only for special cases like breaking out of deeply nested loops or error handling in low-level code.
`,
            code: `if (error)
    goto cleanup;

// ...

cleanup:
    free(resources);`
        }
    ]
};

export default chapter3;