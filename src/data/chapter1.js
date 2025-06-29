const chapter1 = {
    title: "Chapter 1: A Tutorial Introduction",
    sections: [
        {
            id: "1.1",
            title: "Getting Started",
            summary: `
👋 **Welcome!** This section introduces the structure of a basic C program using the classic \`Hello, World\` example.

A C program is made up of functions. The main one is called \`main()\`, and it's where your program starts running.

The function \`printf()\` is used to print text to the screen. It comes from the standard library \`<stdio.h>\`, which we include at the top with \`#include <stdio.h>\`.

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
- 📘 \`#include <stdio.h>\` → gives access to \`printf()\`
- 🎯 \`main(void)\` → your program’s entry point
- 🖨️ \`printf(...)\` → prints text
- ↩️ \`\\n\` → moves to the next line
- ✅ \`return 0;\` → tells the system everything went well

✅ You've just written your first valid C program!
`,
            code: `#include <stdio.h>

int main(void)
{
    printf("hello, world\\n");
    return 0;
}`
        }
    ]
};

export default chapter1;