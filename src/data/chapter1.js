const chapter1 = {
    title: "Chapter 1: A Tutorial Introduction",
    sections: [
        {
            id: "1.1",
            title: "Getting Started",
            summary: `
👋 **Welcome!** This section introduces the structure of a basic C program using the classic \`Hello, World\` example.

A C program is made up of functions. The main one is called \`main()\`, and it's where your program starts running. The function \`printf()\` is used to print text to the screen. It comes from the standard library \`<stdio.h>\`, which we include at the top with \`#include <stdio.h>\`.

---

  
\`\`\`c
#include <stdio.h>

int main(void)
{
    printf("hello, world\\n");
    return 0;
}
\`\`\`

🧠 **Let’s break it down:**

-  \`#include <stdio.h>\` → gives access to \`printf()\`
-  \`main(void)\` → your program’s entry point
-  \`printf(...)\` → prints text
-  \`\\n\` → moves to the next line
-  \`return 0;\` → tells the system everything went well

You've just written your first valid C program!
`,
            code: `#include <stdio.h>

int main(void)
{
    printf("hello, world\\n");
    return 0;
}`
        },
        {
            id: "1.2",
            title: "Variables and Arithmetic Expressions",
            summary: `
🔢 **Working with Numbers**

This section introduces variables and arithmetic expressions in C. You'll learn how to store data and perform calculations using operators like \`+\`, \`-\`, \`*\`, and \`/\`.

C requires variables to be declared before use, and their type (like \`int\`) determines what kind of data they can store. Arithmetic expressions follow familiar math rules, but be mindful of integer division and operator precedence.

\`\`\`c
#include <stdio.h>

int main(void)
{
    int a, b, sum;

    a = 5;
    b = 3;
    sum = a + b;

    printf("Sum: %d\\n", sum);
    return 0;
}
\`\`\`

🧠 **Key concepts:**

- \`int\` declares integer variables
- \`=\` assigns a value
- \`+\`, \`-\`, \`*\`, \`/\` perform arithmetic
- \`%d\` is used in \`printf\` to format integers

Try changing the values and operations to see how the output changes!
`,
            code: `#include <stdio.h>

int main(void)
{
    int a, b, sum;

    a = 5;
    b = 3;
    sum = a + b;

    printf("Sum: %d\\n", sum);
    return 0;
}`
        },
        {
            id: "1.3",
            title: "The For Statement",
            summary: `
🔁 **Looping with \`for\`**

This section introduces the \`for\` loop — a powerful way to repeat actions in C.

A \`for\` loop is typically used when you know in advance how many times you want to repeat something. It has three parts: initialization, condition, and increment.

\`\`\`c
#include <stdio.h>

int main(void)
{
    int i;

    for (i = 0; i < 10; i++)
        printf("%d\\n", i);

    return 0;
}
\`\`\`

🧠 **Key concepts:**

- \`for (init; condition; update)\` is the structure
- \`i = 0;\` starts the loop
- \`i < 10;\` keeps it going
- \`i++;\` increases \`i\` after each loop

This prints numbers 0 through 9. Try changing the range or adding more actions inside the loop!
`,
            code: `#include <stdio.h>

int main(void)
{
    int i;

    for (i = 0; i < 10; i++)
        printf("%d\\n", i);

    return 0;
}`
        },
        {
            id: "1.4",
            title: "Symbolic Constants",
            summary: `
🔤 **Using Constants for Readability**

This section introduces symbolic constants in C using the \`#define\` directive. Symbolic constants make your code more readable and easier to maintain by giving meaningful names to fixed values.

\`\`\`c
#include <stdio.h>

#define PI 3.14159

int main(void)
{
    printf("The value of PI is %f\\n", PI);
    return 0;
}
\`\`\`

🧠 **Key concepts:**

- \`#define\` is a preprocessor directive that creates symbolic constants.
- \`PI\` is replaced by \`3.14159\` before the code is compiled.
- Using symbolic names makes code clearer and simplifies future updates.

Try defining other constants like MAX, MIN, or even messages!
`,
            code: `#include <stdio.h>

#define PI 3.14159

int main(void)
{
    printf("The value of PI is %f\\n", PI);
    return 0;
}`
        },
        {
            id: "1.5",
            title: "Character Input and Output",
            summary: `
⌨️ **Reading and Writing Characters**

This section introduces the basic building blocks of user input and output: reading and writing single characters using \`getchar()\` and \`putchar()\`.

\`\`\`c
#include <stdio.h>

int main(void)
{
    int c;

    c = getchar();   // Read a character
    putchar(c);      // Write it back
    return 0;
}
\`\`\`

🧠 **Key concepts:**

- \`getchar()\` reads a single character from standard input
- \`putchar(c)\` writes the character back to standard output
- This code echoes the typed character

You can build on this by using loops to handle full lines or more characters.
`,
            code: `#include <stdio.h>

int main(void)
{
    int c;

    c = getchar();
    putchar(c);
    return 0;
}`
        }
    ]
};

export default chapter1;