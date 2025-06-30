const chapter8 = {
    intro: `
📘 **Chapter 8: The UNIX System Interface**

Welcome to the world of UNIX programming! In this chapter, we’ll dive deep into how C programs communicate directly with the operating system. You'll learn what happens behind the scenes when reading from files, writing to output, or allocating memory — all without relying on standard libraries.

Instead of using higher-level functions like \`fopen()\` or \`printf()\`, we’ll use system calls like \`open()\`, \`read()\`, \`write()\`, and even build our own versions of those functions.

### 🔍 What You'll Discover

- What file descriptors are and how UNIX treats everything as a file
- How to use \`read()\` and \`write()\` for direct I/O
- Opening, creating, and deleting files with system calls
- How to use \`lseek()\` to jump around in a file like an array
- Building your own \`fopen()\` and \`getc()\` from scratch
- Listing files in a directory without using \`ls\`
- Writing your own \`malloc()\` and \`free()\` to manage memory manually

This chapter gives you low-level superpowers 💪. By the end, you’ll understand how files and memory work under the hood — and be able to build your own tools that talk directly to the OS!
`,
    title: "Chapter 8: The UNIX System Interface",
    sections: [
        {
            id: "8.1",
            title: "File Descriptors",
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
            title: "Low Level I/O - Read and Write",
            summary: `
📥 **Low-Level I/O: Read and Write**

UNIX provides two core system calls to handle low-level input and output: \`read()\` and \`write()\`. These are used when working directly with file descriptors (e.g., \`0\`, \`1\`, \`2\`, or any returned from \`open()\`).

🧠 **Basic Usage**
- \`read(int fd, void *buf, size_t count)\` reads up to \`count\` bytes into \`buf\` from the file described by \`fd\`.
- \`write(int fd, const void *buf, size_t count)\` writes up to \`count\` bytes from \`buf\` to the file.

🔄 Both functions return:
- Number of bytes read or written
- \`0\` for end of file (read)
- \`-1\` on error (always check this!)

💡 **Standard Practice**
- Always check the return values of \`read\` and \`write\`.
- Use \`perror()\` or \`strerror(errno)\` to debug errors.

📌 **Buffering Tips**
- It's common to use a buffer size like \`1024\` or \`4096\` for performance.
- If \`read()\` returns fewer bytes than requested, loop until you're done.

📦 **Example Workflow**
You can implement file copying like this:
\`\`\`c
#include <fcntl.h>
#include <unistd.h>

char buf[1024];
int in = open("in.txt", O_RDONLY);
int out = open("out.txt", O_WRONLY | O_CREAT, 0644);
int n;
while ((n = read(in, buf, 1024)) > 0)
    write(out, buf, n);
close(in);
close(out);
\`\`\`

🔁 **Advanced: getchar() with read**
Buffered versions of \`getchar()\` can be built using \`read()\` under the hood.

This approach gives you full control over performance and I/O behavior.
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
            title: "Open, Creat, Close, Unlink",
            summary: `
📂 **Open, Creat, Close, Unlink**

In UNIX, to handle files beyond the standard input, output, and error, you must explicitly open them using system calls. Two key ones are \`open()\` and \`creat()\`.

### 🔓 \`open()\` System Call

\`\`\`c
#include <fcntl.h>

int fd;
int open(char *name, int flags, int perms);

fd = open(name, flags, perms);
\`\`\`

- \`name\`: the file path.
- \`flags\`: how you want to open the file.
- \`perms\`: the permission bits for new files (ignored if file exists).

🔧 Common \`flags\` values:
- \`O_RDONLY\` → open for reading
- \`O_WRONLY\` → open for writing
- \`O_RDWR\`   → open for both reading and writing

💡 If the file doesn't exist, \`open()\` returns \`-1\`. Always check the return value.

### 🛠️ \`creat()\` — Creating Files

\`\`\`c
int creat(char *name, int perms);
\`\`\`

- This is similar to calling \`open(name, O_WRONLY | O_CREAT | O_TRUNC, perms);\`

- If the file exists, it's truncated (cleared).
- If not, it's created with the given permissions.

### 🧰 Real Example – Copy File

\`\`\`c
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#define PERMS 0666  // RW for owner, group, others

void error(char *msg, ...) {
    va_list args;
    va_start(args, msg);
    fprintf(stderr, "error: ");
    vfprintf(stderr, msg, args);
    fprintf(stderr, "\n");
    va_end(args);
    exit(1);
}

int main(int argc, char *argv[]) {
    int in, out, n;
    char buf[BUFSIZ];

    if (argc != 3)
        error("Usage: cp from to");

    if ((in = open(argv[1], O_RDONLY)) == -1)
        error("can't open %s", argv[1]);

    if ((out = creat(argv[2], PERMS)) == -1)
        error("can't create %s", argv[2]);

    while ((n = read(in, buf, BUFSIZ)) > 0)
        if (write(out, buf, n) != n)
            error("write error on file %s", argv[2]);

    return 0;
}
\`\`\`

### ❌ \`unlink()\` — Delete a File

- \`unlink(char *name)\` deletes a file from the filesystem (like \`rm\` in the shell).
- It’s the low-level equivalent of \`remove()\`.

### 💡 Notes

- There is often a limit (~20) on the number of simultaneously open files.
- Always close files when done to avoid leaks and descriptor exhaustion.
- Use \`close(fd)\` to free the file descriptor.

These tools give you fine control over how files are created, read, written to, and deleted.
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
            title: "Random Access - Lseek",
            summary: `
🎯 **Random Access with lseek**

Normally, \`read\` and \`write\` move sequentially through a file. But if you want to jump around in a file, use \`lseek()\`:

\`\`\`c
long lseek(int fd, long offset, int origin);
\`\`\`

It changes the file position for descriptor \`fd\` by \`offset\`, starting from:
- \`0\`: beginning of file (\`SEEK_SET\`)
- \`1\`: current position (\`SEEK_CUR\`)
- \`2\`: end of file (\`SEEK_END\`)

🧭 **Example: append to end**
\`\`\`c
lseek(fd, 0L, 2);
\`\`\`

This is like shell redirection \`>>\` or using mode \`"a"\` in \`fopen()\`.

🔁 **Rewind to beginning**
\`\`\`c
lseek(fd, 0L, 0);
\`\`\`

You can also write \`(long) 0\` or just \`0\` if \`lseek\` is declared properly.

💡 **Treat file like an array**
Use \`lseek\` to jump to any byte. Example: a function to read \`n\` bytes from any position:

\`\`\`c
#include "syscalls.h"

int get(int fd, long pos, char *buf, int n)
{
    if (lseek(fd, pos, 0) >= 0)
        return read(fd, buf, n);
    else
        return -1;
}
\`\`\`

🔍 \`lseek\` returns the new position, or \`-1\` on error.

🧪 \`fseek()\` is similar but works on \`FILE *\` instead of a file descriptor.

This gives you full random access power—treat files like memory arrays.
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
            title: "Example - An implementation of Fopen and Getc",
            summary: `
🧪 **An Implementation of fopen and getc**

Let’s explore how some of the standard input/output functions like \`fopen\` and \`getc\` work behind the scenes by building a simplified version from scratch.

---

📂 **What is a FILE structure?**

In C, when you use \`fopen\`, you don’t get a plain file descriptor. Instead, you get a \`FILE *\` pointer. This pointer points to a structure that keeps track of things like:

- \`cnt\`: how many characters are left in the buffer
- \`ptr\`: where we are currently reading from
- \`base\`: the beginning of the buffer
- \`flag\`: tells us if the file is readable, writable, or has hit end-of-file
- \`fd\`: the file descriptor (a number from \`open()\`)

\`\`\`c
typedef struct _iobuf {
    int cnt;
    char *ptr;
    char *base;
    int flag;
    int fd;
} FILE;
\`\`\`

---

🔘 **Flags that tell us what's happening**

\`\`\`c
enum _flags {
    _READ  = 01,  // file open for reading
    _WRITE = 02,  // file open for writing
    _UNBUF = 04,  // file is unbuffered
    _EOF   = 010, // end of file reached
    _ERR   = 020  // error occurred
};
\`\`\`

These flags are stored in each \`FILE\` struct so we know how to handle it.

---

🎯 **Standard streams defined as macros**

\`\`\`c
#define stdin  (&_iob[0])
#define stdout (&_iob[1])
#define stderr (&_iob[2])
\`\`\`

These point to pre-initialized entries in a global \`_iob\` array, one for input, one for output, and one for error messages.

---

📥 **How does \`getc\` work?**

This macro shows how \`getc\` uses buffering:

\`\`\`c
#define getc(p) (--(p)->cnt >= 0 ? (unsigned char)*(p)->ptr++ : _fillbuf(p))
\`\`\`

It checks if we still have characters left in the buffer. If not, it calls \`_fillbuf()\` to refill the buffer from the file.

---

🛠 **Implementing \`fopen\`**

Here’s how you might implement a simplified version of \`fopen\`:

\`\`\`c
FILE *fopen(char *name, char *mode)
{
    ...
}
\`\`\`

This function:
- Validates the mode ('r', 'w', 'a')
- Finds a free slot in \`_iob\`
- Opens or creates the file depending on the mode
- Initializes the \`FILE\` structure

---

🔁 **Filling the buffer: \`_fillbuf()\`**

When we run out of characters in the buffer, \`_fillbuf()\` is called:

\`\`\`c
int _fillbuf(FILE *fp) {
    ...
}
\`\`\`

It checks if the file is readable, allocates a buffer if needed, and fills it with new data using \`read()\`. It also updates flags like \`_EOF\` or \`_ERR\`.

---

📌 **Takeaway**

This section helps you understand how basic file operations like \`fopen\` and \`getc\` really work underneath. It's all about managing file descriptors, buffers, and flags—things you don’t see when using the standard library, but that are essential to how it functions.
`,
            code: `#define NULL 0
#define EOF (-1)
#define BUFSIZ 1024
#define OPEN_MAX 20

FILE _iob[OPEN_MAX] = {
    { 0, (char *) 0, (char *) 0, _READ, 0 },
    { 0, (char *) 0, (char *) 0, _WRITE, 1 },
    { 0, (char *) 0, (char *) 0, _WRITE | _UNBUF, 2 }
};
`
        },
        {
            id: "8.6",
            title: "Example - Listing Directories",
            summary: `
📂 **Listing Directories with Low-Level I/O**

In this section, we explore how to use basic system calls like \`open()\`, \`read()\`, and \`write()\` to perform file I/O operations. While this example mimics copying files, it’s a stepping stone to understanding how to list directories as well.

### 🧱 File Copying: Step-by-Step

1. **Open the Input File**  
   - The file \`"input.txt"\` is opened with \`O_RDONLY\` for reading.  
   - If the file does not exist or cannot be opened, \`open()\` will return \`-1\`, and the program should handle that error.

2. **Open/Create the Output File**  
   - The file \`"output.txt"\` is opened with \`O_WRONLY\`, and the flags \`O_CREAT | O_TRUNC\`.  
   - \`O_CREAT\` means the file will be created if it doesn’t exist.  
   - \`O_TRUNC\` ensures the file is emptied if it already exists.  
   - Permissions are set to \`0644\` (owner can read/write, others can read).

3. **Read and Write in a Loop**  
   - A buffer \`char buf[512]\` temporarily holds data.  
   - The loop reads up to 512 bytes at a time from the input file and writes them to the output file.  
   - This continues until \`read()\` returns 0 (end of file) or -1 (error).

4. **Close File Descriptors**  
   - \`close(in)\` and \`close(out)\` ensure we release resources.  
   - Always close your file descriptors to prevent file descriptor leaks.

### 🧠 Why This Matters

This example may look simple, but it reveals key low-level behaviors:
- Unlike \`fread\` or \`fwrite\`, you directly control how many bytes to read/write.
- You must manage your own buffer and loop to ensure the full file is processed.
- This is the foundation for building tools like \`cat\`, \`cp\`, or even directory traversal utilities.

### 🛠️ How This Relates to Listing Directories

To list directories, you’d follow a similar pattern:
- Open the directory using \`opendir()\` (or \`open()\` with \`O_RDONLY\` and directory path).
- Read entries using \`readdir()\` or parse the raw bytes.
- Print names or metadata using \`write()\` or standard output functions.

Understanding file I/O lays the groundwork for more advanced directory handling in UNIX.

---
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
}
`
        },
        {
            id: "8.7",
            title: "Example - A Storage Allocator",
            summary: `
🧵 **Example – A Storage Allocator**

This section walks you through how to build your own version of \`malloc\` and \`free\` — the functions used to **dynamically allocate and free memory** in C.

---

### 📦 **What's the Goal?**

To understand:
- How memory allocation works under the hood.
- How you could implement your own \`malloc()\` and \`free()\` using a **free list** — a linked list of unused memory blocks.
- Why this matters: writing your own allocator helps you understand memory layout, fragmentation, and low-level memory management.

---

### 🧠 **Key Concepts**

#### 🔹 \`malloc(n)\`
Allocates a block of memory of \`n\` bytes.

#### 🔹 \`free(p)\`
Returns the previously allocated block \`p\` back to the system.

Behind the scenes, you need to keep track of:
- **How big each block is**
- **Which blocks are free**
- **Where the next free block is**

This is done using a **linked list** of block headers.

---

### 🧱 **Building Blocks**

Each block in memory includes a header:

\`\`\`c
typedef long Align; // for alignment to long boundaries

union header {
    struct {
        union header *next; // pointer to next block in free list
        unsigned size;      // size of the block (in header units)
    } s;
    Align x; // force alignment
};

typedef union header Header;
\`\`\`

- The \`union\` ensures that the block is **properly aligned**.
- Each block stores its **size** and a **pointer to the next free block**.

---

### 🔁 **How \`malloc\` Works**

1. Adjust the requested number of bytes to fit into \`Header\` units (for alignment).
2. Search the **free list** for a block that’s big enough.
3. If found:
   - If it’s an exact fit, remove it from the list.
   - If it’s bigger, split it and return the leftover to the list.
4. If no block is big enough, request more memory from the system using \`sbrk()\` (or similar).
5. Add the new memory to the free list and retry the allocation.

---

### 🧹 **How \`free\` Works**

When you call \`free(p)\`:

1. It finds where in the memory \`p\` belongs.
2. It walks through the free list to insert the block back in the right place (sorted by address).
3. If adjacent free blocks exist, it **merges** them (to avoid fragmentation).

---

### 🧰 **System Call: \`sbrk()\`**

To get more memory from the operating system, the book uses:

\`\`\`c
morecore(nu) {
    char *cp, *sbrk(int);
    Header *up;

    cp = sbrk(nu * sizeof(Header));
    ...
}
\`\`\`

\`sbrk()\` expands the heap. But since it's not portable or modern anymore, it's mostly for educational purposes.

---

### ⚖️ **Why Manage Memory This Way?**

✅ Understand how C allocators work  
✅ Useful for embedded systems or constrained environments  
✅ Helps you learn about memory fragmentation, alignment, and performance

❌ You need to **manually** manage all edge cases  
❌ Error-prone — bugs here can crash your program or corrupt memory

---

### 🔍 **Takeaway**

This example builds a foundational \`malloc\` and \`free\`, teaching:

- **Memory management without libraries**
- **Linked lists and block splitting**
- **Pointer arithmetic and structure padding**

You see how **heap memory** is just a big chunk of space that you carve up and manage yourself. It's powerful — and dangerous — if you get it wrong.
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