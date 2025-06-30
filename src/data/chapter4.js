

const chapter4 = {
    intro: `
  🚀 **Chapter 4: Functions and Program Structure**

  In this chapter, you'll explore one of C’s most powerful features—functions. Functions let you organize code into logical blocks, making programs easier to read, write, and maintain.

  🧩 **What you’ll learn:**
  - How to define and call functions
  - The difference between local and global variables
  - How data is passed to functions
  - Best practices for modular and clean code

  🛠️ Whether it's breaking large problems into smaller tasks or managing state with global variables, functions are the heart of structured programming in C.
  `,
    title: "Chapter 4 – Functions and Program Structure",
    sections: [
        {
            id: "4.1",
            title: "Basics of Functions",
            summary: `
🔧 **Functions: Building Blocks of C**

Functions let you encapsulate a task into a reusable unit. You define it once, and call it whenever you need.

🧱 **Structure of a function:**
\`\`\`c
return_type function_name(parameter_list) {
    // body
}
\`\`\`

Example:
\`\`\`c
int square(int x) {
    return x * x;
}
\`\`\`

✅ Helps with modularity, reuse, and clarity.

💡 **Why use functions?**
- Break a problem into smaller tasks
- Avoid repetition
- Make code cleaner and more maintainable
`,
            code: `
#include <stdio.h>

int power(int base, int n) {
    int i, p;
    p = 1;
    for (i = 1; i <= n; ++i)
        p = p * base;
    return p;
}
`
        },
        {
            id: "4.2",
            title: "Function Arguments",
            summary: `
📦 **Function Arguments**

In C, arguments are passed by value—meaning the function gets a *copy* of each argument.

\`\`\`c
void swap(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
}
\`\`\`

😮 This won’t swap values in the caller! Use pointers if you want to modify variables in the calling function.

🔁 **Call by value** vs **Call by reference**:
- Value: copy passed → original unchanged
- Reference (via pointers): original can be changed
`,
            code: `
void swap(int *px, int *py) {
    int temp = *px;
    *px = *py;
    *py = temp;
}
`
        },
        {
            id: "4.3",
            title: "External Variables",
            summary: `
🌍 **External Variables (Globals)**

Variables declared outside any function are *external* and accessible across functions.

\`\`\`c
int global_count = 0;

void increment() {
    global_count++;
}
\`\`\`

You can share state across functions, but use sparingly—global variables can make code harder to reason about.

📌 Use \`extern\` to declare external variables in other files.

🚫 Overusing globals leads to tight coupling and side effects.
`,
            code: `
#include <stdio.h>

int sp = 0;
double val[100];

void push(double f) {
    val[sp++] = f;
}

double pop(void) {
    return val[--sp];
}
`
        }
    ]
};

export default chapter4;