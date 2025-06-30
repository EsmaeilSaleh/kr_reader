const chapter8 = {
    title: "Chapter 8: The UNIX System Interface",
    sections: [
        {
            id: "8.1",
            title: "8.1 File Descriptors",
            summary: `
📂 **File Descriptors**

In UNIX, everything is treated as a file—even devices like keyboards and screens. When a program runs, it interacts with these "files" using special numbers called **file descriptors**.

🔢 **The Standard Descriptors:**
- \`0\` → **Standard Input** (keyboard)
- \`1\` → **Standard Output** (screen)
- \`2\` → **Standard Error** (error messages)

These descriptors are opened automatically when your program runs. So even without explicitly opening files, you can read from input or write to output using these.

📘 **Opening Files:**
Before reading/writing a file, you must open it using a system call like \`open("file.txt", O_RDONLY)\`. This returns a file descriptor—just a small non-negative integer that refers to that open file.

🛠️ **Why File Descriptors?**
Rather than passing around full file paths or names, UNIX uses these integers. The OS keeps track of which descriptor maps to which file, along with other info like permissions and current offset.

🌀 **Redirection with \`<\` and \`>\`:**
The shell can reassign these file descriptors:
- \`< input.txt\` tells the shell to make \`stdin\` come from a file
- \`> output.txt\` redirects \`stdout\` to a file
- \`2> errors.log\` sends error messages to a file

The program itself is unaware of these redirections—it just reads from \`0\` and writes to \`1\` or \`2\`.

🧠 **Key Concepts Recap:**
- File descriptors are how UNIX handles input/output
- Descriptors 0, 1, and 2 are standard and always open
- You can open more files and get descriptors like 3, 4, etc.
- Descriptors can be reassigned using shell redirection

This system makes I/O flexible, powerful, and unified across all types of input and output.
`,
            code: `#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    char buf[100];
    int fd = open("file.txt", O_RDONLY);
    int n = read(fd, buf, 100);
    write(1, buf, n);
    close(fd);
    return 0;
}`
        },
        {
            id: "8.2",
            title: "8.2 Low Level I/O - Read and Write",
            summary: `
🔍 **Read and Write**

Details how to use the \`read()\` and \`write()\` system calls and emphasizes the importance of error handling.

🧠 **Key Concepts:**
- \`read()\` and \`write()\` return bytes or -1 on error
- Use \`perror()\` and check return values
`,
            code: `#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>

int main(void)
{
    int fd = open("notfound.txt", O_RDONLY);
    if (fd == -1) {
        perror("open failed");
        exit(1);
    }
    close(fd);
    return 0;
}`
        },
        {
            id: "8.3",
            title: "8.3 Open, Creat, Close, Unlink",
            summary: `
🔧 **Working with File Operations**

This section explains how to use \`open\`, \`creat\`, \`close\`, and \`unlink\` system calls to manage file creation and deletion.

🧠 **Key Concepts:**
- \`open()\` creates or opens a file.
- \`creat()\` is a simplified version of \`open\` for file creation.
- \`close()\` closes a file descriptor.
- \`unlink()\` deletes a file from the filesystem.

\`\`\`c
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int fd = creat("example.txt", 0644);
    write(fd, "hello\n", 6);
    close(fd);
    unlink("example.txt");
    return 0;
}
\`\`\`
`,
            code: `#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int fd = open("file.txt", O_RDWR);
    lseek(fd, 10, SEEK_SET);
    write(fd, "X", 1);
    close(fd);
    return 0;
}`
        },
        {
            id: "8.4",
            title: "8.4 Random Access - Lseek",
            summary: `
🎯 **Random Access with Lseek**

Explains how to reposition the file offset using \`lseek()\` for random file access.

🧠 **Key Concepts:**
- \`lseek(fd, offset, SEEK_SET/SEEK_CUR/SEEK_END)\`
- Useful for modifying file content at arbitrary positions
`,
            code: `#define NULL 0
#define EOF (-1)
#define OPEN_MAX 20

typedef struct _iobuf {
    int cnt;
    char *ptr;
    char *base;
    int flag;
    int fd;
} FILE;

extern FILE _iob[OPEN_MAX];

#define stdin  (&_iob[0])
#define stdout (&_iob[1])
#define stderr (&_iob[2])

enum _flags {
    _READ  = 01,
    _WRITE = 02,
    _UNBUF = 04,
    _EOF   = 010,
    _ERR   = 020
};

// fopen, getc, putc definitions follow...
`
        },
        {
            id: "8.5",
            title: "8.5 Example - An implementation of Fopen and Getc",
            summary: `
🧪 **An Implementation of fopen and getc**

Demonstrates how standard I/O operations like \`fopen\` and \`getc\` are built on top of low-level system calls.

🧠 **Key Concepts:**
- File buffering
- Custom implementation of standard I/O library
`,
            code: `#include <stdarg.h>
#include <unistd.h>

void minprintf(char *fmt, ...)
{
    va_list ap;
    char *p, *sval;
    int ival;
    va_start(ap, fmt);
    for (p = fmt; *p; p++) {
        if (*p != '%') {
            write(1, p, 1);
            continue;
        }
        switch (*++p) {
        case 'd':
            ival = va_arg(ap, int);
            // convert int to string and write
            break;
        case 's':
            sval = va_arg(ap, char *);
            // write string
            break;
        }
    }
    va_end(ap);
}
`
        },
        {
            id: "8.6",
            title: "8.6 Example - Listing Directories",
            summary: `
📋 **Listing Directories**

Uses low-level I/O to read and write file content and simulate directory listing.

🧠 **Key Concepts:**
- File copy using \`read()\` and \`write()\`
- Managing file descriptors and buffer loops
`,
            code: `#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>

int main(void)
{
    char buf[512];
    int in = open("input.txt", O_RDONLY);
    int out = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    int n;

    while ((n = read(in, buf, sizeof(buf))) > 0)
        write(out, buf, n);

    close(in);
    close(out);
    return 0;
}`
        },
        {
            id: "8.7",
            title: "8.7 Example - A Storage Allocator",
            summary: `
🔒 **A Storage Allocator**

Introduces UNIX file permission concepts and how \`umask()\` modifies default permissions.

🧠 **Key Concepts:**
- File creation masks
- Permissions (rwx) in octal
`,
            code: `#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void)
{
    umask(022); // default mask
    int fd = open("newfile.txt", O_CREAT | O_WRONLY, 0777);
    if (fd < 0) {
        perror("open");
        return 1;
    }
    write(fd, "hello\\n", 6);
    close(fd);
    return 0;
}`
        }
    ]
};

export default chapter8;