

const chapter6 = {
    title: "Chapter 6: Structures",
    sections: [
        {
            id: "6.1",
            title: "Basics of Structures",
            summary: `🧱 **Structures in C**
Structures let you group variables of different types together under one name.

You can define a structure, declare variables of that type, and access their members using the \`.\` operator.

This is useful for representing complex data like points, rectangles, employees, etc.`,
            code: `struct point {
    int x;
    int y;
};

struct point p1;
p1.x = 10;
p1.y = 20;`
        },
        {
            id: "6.2",
            title: "Structures and Functions",
            summary: `🔧 **Passing Structures to Functions**
Structures can be passed to functions as arguments or returned from functions.
You can pass the whole structure (by value) or a pointer to it (for efficiency).

Example: Passing a \`struct point\` to a function to compute distance.`,
            code: `double dist(struct point p1, struct point p2) {
    int dx = p1.x - p2.x;
    int dy = p1.y - p2.y;
    return sqrt(dx*dx + dy*dy);
}

struct point origin = {0, 0};
struct point p = {3, 4};
double d = dist(origin, p); // d == 5.0`
        },
        {
            id: "6.3",
            title: "Arrays of Structures",
            summary: `🗂️ **Arrays of Structures**
You can create arrays whose elements are structures. This is handy for managing collections of related records, like an address book or a list of points.`,
            code: `struct point {
    int x;
    int y;
};

struct point points[3];
points[0].x = 1;
points[0].y = 2;`
        },
        {
            id: "6.4",
            title: "Pointers to Structures",
            summary: `➡️ **Pointers to Structures**
You can use pointers to structures, which is especially useful for functions and dynamic data structures.
Access members via pointer using the \`->\` operator.

Example:`,
            code: `struct point {
    int x;
    int y;
};

struct point pt = {5, 7};
struct point *pp = &pt;
printf("%d %d\\n", pp->x, pp->y); // prints 5 7`
        },
        {
            id: "6.5",
            title: "Self-referential Structures",
            summary: `🔄 **Self-referential Structures**
Structures can contain pointers to structures of the same type. This is key for building linked lists, trees, etc.

Example: Linked list node definition.`,
            code: `struct node {
    int data;
    struct node *next;
};

struct node a, b;
a.data = 1;
a.next = &b;
b.data = 2;
b.next = NULL;`
        },
        {
            id: "6.6",
            title: "Table Lookup",
            summary: `🔍 **Table Lookup with Structures**
Structures are often used for table-driven programming, such as implementing a lookup table for reserved words.
You can use arrays of structures and search them with loops or binary search.`,
            code: `struct key {
    char *word;
    int count;
} keytab[] = {
    {"auto", 0},
    {"break", 0},
    {"case", 0}
    // ...
};
// Linear search for a word in keytab
int nkeys = sizeof keytab / sizeof keytab[0];
for (int i = 0; i < nkeys; i++) {
    if (strcmp(keytab[i].word, "case") == 0)
        keytab[i].count++;
}`
        },
        {
            id: "6.7",
            title: "Typedef",
            summary: `🏷️ **typedef for Structures**
The \`typedef\` keyword lets you create an alias for a type, making code more readable and easier to maintain.
It's often used to simplify structure declarations.

Example:`,
            code: `typedef struct point {
    int x;
    int y;
} Point;

Point p = {1, 2};`
        }
    ]
};

export default chapter6;