const chapter7 = {
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
            id: '7.4',
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
            id: '7.5',
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
            id: '7.6',
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
            id: '7.7',
            title: 'Miscellaneous Functions',
            summary: `
🧪 **Lesser-Known Functions**

Explore advanced I/O features:

- \`ungetc(c, fp)\` – push a character back into input stream
- \`fflush(fp)\` – flush output buffer (useful before reading input)
- \`tmpfile()\` – create a temporary file
- \`setbuf()\`, \`setvbuf()\` – customize buffering behavior

📌 These are useful in special I/O situations.
`,
            code: `#include <stdio.h>

int main() {
    FILE *fp;
    int c;

    // Using tmpfile
    fp = tmpfile();
    if (fp == NULL) {
        perror("tmpfile");
        return 1;
    }

    fputs("Hello, temporary file!\n", fp);
    rewind(fp);  // Go back to beginning of file

    // Using ungetc
    while ((c = getc(fp)) != EOF) {
        if (c == 'H') {
            ungetc('*', fp);  // Push back a char
            c = getc(fp);     // Read it again
        }
        putchar(c);
    }

    fclose(fp);
    return 0;
}`
        }
    ],
};

export default chapter7;