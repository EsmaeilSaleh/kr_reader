

const chapter5 = {
    title: "Pointers and Arrays",
    intro: `
🧠 **Pointers and Arrays** – What’s this chapter about?

This chapter introduces two of the most important low-level concepts in C: **pointers** and **arrays**. Understanding them is crucial for working with memory, functions, and data structures.

You’ll learn:

- What pointers are and how they work.
- How arrays relate to pointers.
- How pointer arithmetic lets you move through memory.
- How functions can use pointers to change values.
- How C strings are really just pointers to characters.

By the end, you'll be comfortable using pointers to write flexible and efficient C code.
`,
    sections: [
        {
            id: "5.1",
            title: "Pointers and Addresses",
            summary: `
🔗 **Pointers and Addresses**

A pointer is a variable that stores the memory address of another variable. Declared with \`*\`, it can be used to indirectly access and manipulate values.

\`\`\`c
int x = 10;
int *p = &x;
\`\`\`

- \`&x\`: address of x
- \`*p\`: value pointed to by p (10)

📌 Pointer types must match the type of the variable they point to.
`,
            code: `int x = 5;
int *p = &x;
printf("%d\\n", *p); // prints 5`
        },
        {
            id: "5.2",
            title: "Pointers and Function Arguments",
            summary: `
📨 **Pointers and Function Arguments**

Passing by value copies data. To modify original data, pass pointers:

\`\`\`c
void swap(int *px, int *py) {
  int temp = *px;
  *px = *py;
  *py = temp;
}
\`\`\`

Call it with:

\`\`\`c
swap(&a, &b);
\`\`\`

Now the original variables \`a\` and \`b\` are changed.
`,
            code: `void swap(int *px, int *py) {
  int temp = *px;
  *px = *py;
  *py = temp;
}`
        },
        {
            id: "5.3",
            title: "Pointers and Arrays",
            summary: `
🧮 **Pointers and Arrays**

Array names are pointers to their first element. So \`a[i]\` is equivalent to \`*(a + i)\`.

\`\`\`c
int a[5] = {1,2,3,4,5};
int *p = a;
printf("%d", *(p + 2)); // prints 3
\`\`\`

- You can use pointer arithmetic to walk through an array.
`,
            code: `int a[5] = {10, 20, 30, 40, 50};
int *p = a;
for (int i = 0; i < 5; i++)
  printf("%d\\n", *(p + i));`
        },
        {
            id: "5.4",
            title: "Address Arithmetic",
            summary: `
➕ **Address Arithmetic**

You can add/subtract integers from pointers, or subtract pointers.

\`\`\`c
*(a + i) == a[i]
\`\`\`

But you can’t add two pointers.

Also:
- Pointers must point to elements of the same array when subtracting.
- Dangerous to access memory outside bounds.
`,
            code: `int arr[3] = {7, 8, 9};
int *start = arr;
int *end = arr + 2;
int diff = end - start; // 2`
        },
        {
            id: "5.5",
            title: "Character Pointers and Functions",
            summary: `
📜 **Character Pointers and Functions**

String literals like \`"hello"\` are stored as \`char *\`.

\`\`\`c
char *s = "hello";
\`\`\`

Used with functions:

\`\`\`c
int strlen(char *s) {
  int n = 0;
  while (*s++)
    n++;
  return n;
}
\`\`\`

String functions use pointer traversal.
`,
            code: `int strlen(char *s) {
  int n = 0;
  while (*s++)
    n++;
  return n;
}`
        },
    ]
};

export default chapter5;