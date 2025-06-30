

const chapter2 = {
    title: "Chapter 2: Types, Operators, and Expressions",
    sections: [
        {
            id: "2.1",
            title: "Variable Names",
            summary: "Variable names in C must begin with a letter or underscore and can contain letters, digits, and underscores. They are case-sensitive. Avoid using C keywords (like int, float, return) as variable names. Use descriptive names and follow naming conventions such as lowercase_with_underscores.",
            code: `int count = 0;
float total_value = 0.0;`
        },
        {
            id: "2.2",
            title: "Data Types and Sizes",
            summary: "C provides several basic data types: int (integer), char (character), float (single-precision floating-point), double (double-precision floating-point), and short (short integer). The exact size (in bytes) of each type depends on the platform and compiler.",
            code: `printf("int: %lu bytes\\n", sizeof(int));
printf("char: %lu bytes\\n", sizeof(char));`
        },
        {
            id: "2.3",
            title: "Constants",
            summary: "Constants in C can be character ('A'), integer (42), floating-point (3.14), or symbolic (using #define or const). Symbolic constants make code more readable and maintainable.",
            code: `#define PI 3.14159
const int MAX = 100;`
        },
        {
            id: "2.4",
            title: "Declarations",
            summary: "Declarations specify the type and name of variables. Multiple variables can be declared in one statement, and variables can be initialized at the time of declaration.",
            code: `int a = 5, b = 10;
float ratio = 0.75;`
        },
        {
            id: "2.5",
            title: "Arithmetic Operators",
            summary: "C supports arithmetic operators: + (addition), - (subtraction), * (multiplication), / (division), and % (modulus for integers). Operator precedence determines the order of evaluation in expressions.",
            code: `int result = (3 + 5) * 2;`
        },
        {
            id: "2.6",
            title: "Relational and Logical Operators",
            summary: "Relational operators (<, <=, >, >=, ==, !=) compare values. Logical operators (&& for AND, || for OR, ! for NOT) are used to combine or invert boolean expressions, commonly in conditions.",
            code: `if (a > 0 && b < 10)
    printf("Valid range\\n");`
        },
        {
            id: "2.7",
            title: "Type Conversions",
            summary: "C automatically promotes types in expressions (implicit conversion), but you can force a conversion using a cast (explicit conversion). Be mindful of type promotion rules to avoid unexpected results.",
            code: `float f = (float) 5 / 2;`
        },
        {
            id: "2.8",
            title: "Increment and Decrement Operators",
            summary: "The ++ and -- operators increase or decrease a variable by one. Prefix (++a) increments before the value is used; postfix (a++) increments after the value is used in the expression.",
            code: `int a = 5;
printf("%d %d", ++a, a++);`
        },
        {
            id: "2.9",
            title: "Bitwise Operators",
            summary: "Bitwise operators perform operations at the bit level: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift). They are useful for low-level programming and manipulating flags.",
            code: `int flags = 0xF0;
flags = flags & 0x0F;`
        },
        {
            id: "2.10",
            title: "Assignment Operators and Expressions",
            summary: "C provides combined assignment operators like +=, -=, *=, /=, and %= to simplify expressions. For example, x += 3 is equivalent to x = x + 3.",
            code: `int x = 5;
x += 3; // x becomes 8`
        },
        {
            id: "2.11",
            title: "Conditional Expressions",
            summary: "The ternary operator ( ? : ) allows you to write concise conditional expressions. It is a shorthand for simple if-else statements.",
            code: `int min = (a < b) ? a : b;`
        },
        {
            id: "2.12",
            title: "Precedence and Order of Evaluation",
            summary: "Operator precedence determines the order in which operators are evaluated in an expression. Multiplication and division have higher precedence than addition and subtraction.",
            code: `int result = a + b * c; // Multiplication happens first`
        }
    ]
};

export default chapter2;