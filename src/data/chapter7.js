const chapter7 = {
    intro: `
📘 **Chapter 7 — Input and Output**

This chapter explores how C handles input and output through its standard library, giving you the tools to read and write both characters and formatted data.

🔑 **What You’ll Learn**
- The difference between standard and low-level I/O
- How to use functions like \`getchar()\`, \`putchar()\`, \`printf()\`, \`scanf()\`
- How to manage files using file pointers
- How to handle errors gracefully with \`stderr\` and \`exit()\`
- How to deal with flexible arguments using \`<stdarg.h>\`
- Useful miscellaneous I/O functions for more advanced use

⚙️ This chapter is essential for writing practical C programs that interact with users, files, and the operating system.
`,
    title: 'Chapter 7 — Input and Output',
    sections: [
        {
            id: '7.1',
            title: 'Standard Input and Output',
            summary: `
📘 **Standard I/O Overview**

C's standard input/output library (\`stdio.h\`) provides buffered I/O functions like \`getchar()\`, \`putchar()\`, \`getchar()\`, \`putc()\`, etc.

🧱 **Why use stdio?**
- Simpler than low-level system calls
- Works across all platforms
- Efficient due to buffering

🔍 **Key Functions**
- \`getchar()\` — reads the next character from stdin
- \`putchar(c)\` — writes character \`c\` to stdout

🧪 These functions are used in most basic C programs for reading and writing characters.
`,
            code: `#include <stdio.h>

int main() {
    int c;

    // Read characters until EOF (Ctrl+D / Ctrl+Z)
    while ((c = getchar()) != EOF) {
        putchar(c);
    }

    return 0;
}`
        },
        {
            id: '7.2',
            title: 'Formatted Output — printf',
            summary: `
🖨️ **Formatted Output with printf**

\`printf()\` is a powerful function for printing values in specific formats.

🎯 **Usage Example**
\`\`\`c
printf("Number: %d, Float: %.2f\\n", 42, 3.14);
\`\`\`

📌 **Format Specifiers**
- \`%d\` – integer
- \`%f\` – floating point
- \`%s\` – string
- \`%c\` – character

💡 You can control width, precision, padding, etc. Great for neat output!
`,
            code: `#include <stdio.h>

int main() {
    int i = 10;
    float f = 3.1415;
    char str[] = "hello";

    printf("Integer: %d\\n", i);
    printf("Float: %.2f\\n", f);
    printf("String: %s\\n", str);
    printf("Character: %c\\n", str[0]);

    return 0;
}`
        },
        {
            id: '7.3',
            title: 'Variable-length Argument Lists',
            summary: `
🧵 **7.3 Variable-length Argument Lists**

Sometimes you want a function to accept any number of arguments, like \`printf\`.

C provides a way to handle this using macros in \`<stdarg.h>\`.

🔹 **Key Macros**
- \`va_list\` – type to hold the information needed
- \`va_start\` – initializes the list
- \`va_arg\` – retrieves the next argument
- \`va_end\` – cleans up

🔧 **Example**
\`\`\`c
#include <stdarg.h>

int sum(int count, ...) {
    va_list ap;
    int i, total = 0;

    va_start(ap, count);
    for (i = 0; i < count; i++)
        total += va_arg(ap, int);
    va_end(ap);

    return total;
}
\`\`\`

💡 This function takes any number of integer arguments and returns their sum.

🛠️ Use this only when necessary. Typed arguments are safer and more predictable.
`,
            code: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list ap;
    int i, total = 0;

    va_start(ap, count);
    for (i = 0; i < count; i++)
        total += va_arg(ap, int);
    va_end(ap);

    return total;
}

int main() {
    printf("Sum: %d\\n", sum(4, 10, 20, 30, 40));
    return 0;
}`
        },
        {
            id: '7.4',
            title: 'Formatted Input — scanf',
            summary: `
📥 **Formatted Input with scanf**

\`scanf()\` reads input based on format specifiers.

🎯 **Example**
\`\`\`c
int x; float y;
scanf("%d %f", &x, &y);
\`\`\`

🧷 **Common Specifiers**
- \`%d\` – read integer
- \`%f\` – read float
- \`%s\` – read string

⚠️ **Be careful!**
- It stops at whitespace.
- Input types must match the format string.
- Always check return value for successful reads.
`,
            code: `#include <stdio.h>

int main() {
    int i;
    float f;
    char str[100];

    printf("Enter an integer, a float, and a string: ");
    scanf("%d %f %s", &i, &f, str);

    printf("You entered: %d, %.2f, %s\n", i, f, str);
    return 0;
}`
        },
        {
            id: '7.5',
            title: 'File Access',
            summary: `
📂 **Working with Files**

C provides ways to read/write files using file pointers.

📌 **Open a file**
\`\`\`c
FILE *fp = fopen("file.txt", "r");
\`\`\`

🔍 **Functions**
- \`fopen()\` – open file
- \`fclose()\` – close file
- \`getc(fp)\` – read char
- \`putc(c, fp)\` – write char

⚠️ Always check if \`fp == NULL\` to handle file errors.
`,
            code: `#include <stdio.h>

int main() {
    FILE *fp;
    int c;

    fp = fopen("file.txt", "r");
    if (fp == NULL) {
        printf("Failed to open file.\n");
        return 1;
    }

    while ((c = getc(fp)) != EOF) {
        putchar(c);
    }

    fclose(fp);
    return 0;
}`
        },
        {
            id: '7.6',
            title: 'Error Handling — stderr and Exit',
            summary: `
🚨 **Handling Errors**

Use \`stderr\` to print error messages, and \`exit()\` to stop the program.

🎯 **Example**
\`\`\`c
fprintf(stderr, "Error opening file!\\n");
exit(1);
\`\`\`

🧠 \`stderr\` is separate from \`stdout\` and always visible even when output is redirected.

✅ **Use exit codes**
- \`exit(0)\` — success
- \`exit(1)\` or higher — error
`,
            code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fp = fopen("file.txt", "r");

    if (fp == NULL) {
        fprintf(stderr, "Error opening file!\n");
        exit(1);
    }

    // Process file...

    fclose(fp);
    return 0;
}`
        },
        {
            id: '7.7',
            title: 'Line Input and Output',
            summary: `
📥 **Reading and Writing Lines**

Use \`fgets()\` and \`fputs()\` for entire lines.

📝 **Example**
\`\`\`c
char buf[100];
fgets(buf, 100, stdin);
fputs(buf, stdout);
\`\`\`

🧠 Unlike \`scanf()\`, \`fgets()\` handles spaces well and avoids buffer overflow when used carefully.

👍 Best for reading user input safely!
`,
            code: `#include <stdio.h>

int main() {
    char buf[100];

    printf("Enter a line of text: ");
    if (fgets(buf, sizeof(buf), stdin) != NULL) {
        fputs("You entered: ", stdout);
        fputs(buf, stdout);
    }

    return 0;
}`
        },
        {
            id: '7.8',
            title: 'Miscellaneous Functions',
            summary: `
🧰 **7.8 Miscellaneous Functions**

This section highlights a variety of useful standard library functions in C that don't fit neatly into previous categories.

🔤 **7.8.1 String Operations**
Functions like \`strlen\`, \`strcpy\`, \`strcat\`, and \`strcmp\` help manipulate strings efficiently.
- \`strlen\` gets the length of a string.
- \`strcpy\` copies one string to another.
- \`strcat\` appends one string to the end of another.
- \`strcmp\` compares two strings and tells if they are equal or which is greater.

🔍 **7.8.2 Character Class Testing and Conversion**
Header \`<ctype.h>\` provides functions like:
- \`isdigit(c)\` checks if \`c\` is a digit (0-9).
- \`isalpha(c)\` checks if \`c\` is a letter (A-Z or a-z).
- \`toupper(c)\` converts a lowercase letter to uppercase.
- \`tolower(c)\` converts an uppercase letter to lowercase.

🔁 **7.8.3 ungetc**
The \`ungetc(c, fp)\` function puts a character back into the input stream \`fp\`. This is useful when you read one character too many and want to "undo" that read, for example when parsing input.

⚙️ **7.8.4 Command Execution**
The \`system()\` function lets you run shell commands from your C program just like typing them in the terminal. For example, \`system("ls")\` lists files in the current directory.

💾 **7.8.5 Storage Management**
Functions like \`malloc\`, \`calloc\`, and \`free\` manage dynamic memory:
- \`malloc\` allocates a block of memory of a given size.
- \`calloc\` allocates memory and initializes it to zero.
- \`free\` releases previously allocated memory.
These are important for creating data structures whose size can change at runtime.

➕ **7.8.6 Mathematical Functions**
The \`<math.h>\` library includes functions like:
- \`sqrt(x)\` computes the square root of \`x\`.
- \`pow(x, y)\` raises \`x\` to the power \`y\`.
- \`sin(x)\`, \`cos(x)\`, \`log(x)\` perform trigonometric and logarithmic calculations.
These help perform common math operations easily.

🎲 **7.8.7 Random Number Generation**
The \`rand()\` function generates pseudo-random numbers. To get different sequences each time you run your program, you use \`srand()\` to seed the generator, typically with the current time. Without seeding, \`rand()\` produces the same sequence every run.

💡 These functions enhance program flexibility and capability across tasks like input processing, memory management, and system interaction.
`,
            code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

int main() {
    // String operation
    char msg[100] = "Hello ";
    strcat(msg, "world!");
    printf("%s\\n", msg);

    // Character class test
    char ch = 'A';
    if (isalpha(ch)) printf("%c is a letter\\n", ch);
    printf("Lowercase: %c\\n", tolower(ch));

    // Run shell command
    system("echo Listing current dir:");
    system("ls");

    // Random number
    srand(42);  // Seed
    printf("Random: %d\\n", rand());

    // Math
    printf("sqrt(16) = %.2f\\n", sqrt(16));

    return 0;
}`
        }
    ],
};

export default chapter7;