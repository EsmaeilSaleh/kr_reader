const chapter8 = {
    title: "Chapter 8: The UNIX System Interface",
    sections: [
        {
            id: "8.1",
            title: "File Descriptors",
            summary: `
📂 **Low-Level I/O**

This section introduces UNIX file descriptors and explains the difference between high-level I/O (like \`fopen\`) and low-level I/O (like \`open\`, \`read\`, \`write\`).

🧠 **Key Concepts:**
- File descriptors are small integers (0 for stdin, 1 for stdout, 2 for stderr).
- \`open()\` returns a file descriptor for a given file.
- \`read()\` and \`write()\` operate on file descriptors directly.

\`\`\`c
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    char buf[100];
    int fd = open("file.txt", O_RDONLY);
    int n = read(fd, buf, 100);
    write(1, buf, n); // write to stdout
    close(fd);
    return 0;
}
\`\`\`
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
            title: "Error Handling",
            summary: `
🚨 **Handling Errors Manually**

In UNIX, system calls return -1 on error, and you must check manually. This section covers \`errno\`, \`perror()\`, and error checking patterns.

🧠 **Key Concepts:**
- Always check return values of system calls.
- \`perror()\` prints a human-readable error.
- Use \`exit(1)\` on fatal errors.

\`\`\`c
#include <stdio.h>
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
}
\`\`\`
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
            title: "Random Access",
            summary: `
📍 **Using \`lseek()\` for File Positioning**

This section explains how to move around in a file using \`lseek()\`.

🧠 **Key Concepts:**
- \`lseek(fd, offset, whence)\` moves the file position.
- \`SEEK_SET\`, \`SEEK_CUR\`, \`SEEK_END\` control from where you move.
- Useful for modifying files without reading the whole thing.

\`\`\`c
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int fd = open("file.txt", O_RDWR);
    lseek(fd, 10, SEEK_SET);
    write(fd, "X", 1);
    close(fd);
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
            title: "Example: An Implementation of fopen and getc",
            summary: `
🧪 **Recreating Standard Functions**

This section provides a low-level implementation of \`fopen\`, \`getc\`, and related I/O buffering mechanics, showing how standard I/O can be built using system calls.

🧠 **Key Concepts:**
- Structure for file buffering (\`_iobuf\`)
- File open modes and bit flags
- Using \`read()\` internally for character access
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
            title: "Example: A Simple Implementation of printf",
            summary: `
🖨️ **Minimal printf Implementation**

Demonstrates a simplified version of \`printf\` that can format strings and numbers using variadic arguments and write them to standard output.

🧠 **Key Concepts:**
- Variadic functions using \`stdarg.h\`
- Converting numbers to strings
- Writing formatted strings to file descriptors
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
            title: "Low-Level File Copy",
            summary: `
📋 **Rewriting cp with read/write**

This section shows how to implement a basic file copy utility using low-level system calls instead of relying on shell utilities.

🧠 **Key Concepts:**
- Using \`open()\`, \`read()\`, and \`write()\` to manually copy files
- Buffer handling and looped reads
- File permission flags in \`open()\`
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
            title: "File Permissions and umask",
            summary: `
🔒 **Controlling File Access**

Introduces how file permissions work in UNIX and how to use \`umask()\` to control default permissions of new files.

🧠 **Key Concepts:**
- Permission bits: read, write, execute for user/group/others
- Octal representation: \`0644\`, \`0755\`, etc.
- \`umask()\` and its effect on file creation
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