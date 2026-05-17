export interface User {
  id: string
  name: string
  email: string
  role: "student" | "tutor"
}

export interface Course {
  id: string
  name: string
  code: string
  description: string
  color: string
}

export interface Note {
  id: string
  courseId: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Assessment {
  id: string
  courseId: string
  title: string
  description: string
  type: "quiz" | "assignment" | "test" // Three types of assessments
  questions: Question[]
  timeLimit?: number // For quiz/test: minutes, for assignment: days
  dueDate?: string // For assignments: absolute deadline
  createdAt: string
}

export interface Question {
  id: string
  type: "multiple-choice" | "text" | "file"
  question: string
  points: number
  options?: string[] // For multiple-choice
  correctAnswer?: number // For multiple-choice
  explanation?: string
  acceptedFileTypes?: string[] // For file uploads
}

export interface AssessmentAttempt {
  id: string
  assessmentId: string
  userId: string
  answers: Answer[]
  score: number | null // null if pending grading
  totalQuestions: number
  startedAt: string
  completedAt: string
  gradedAt?: string
  gradedBy?: string
  status: "submitted" | "graded" | "pending"
}

export interface Answer {
  questionId: string
  type: "multiple-choice" | "text" | "file"
  value: number | string | FileSubmission // multiple-choice: number, text: string, file: FileSubmission
  isCorrect?: boolean // For auto-graded questions
  pointsAwarded?: number
  feedback?: string // Tutor feedback
}

export interface FileSubmission {
  fileName: string
  fileType: string
  fileSize: number
  fileUrl: string // In production, this would be a real URL
  uploadedAt: string
}

// Dummy courses
export const dummyCourses: Course[] = [
  {
    id: "1",
    name: "Introduction to Computer Science",
    code: "CS101",
    description: "Fundamentals of programming and computer science concepts",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Data Structures and Algorithms",
    code: "CS201",
    description: "Learn essential data structures and algorithmic techniques",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Web Development",
    code: "CS301",
    description: "Build modern web applications with HTML, CSS, and JavaScript",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Database Systems",
    code: "CS202",
    description: "Relational databases, SQL, and database design principles",
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "4th Grade English",
    code: "ENG4",
    description: "Fun activities to learn grammar, nouns, verbs, and more!",
    color: "bg-pink-500",
  },
  {
    id: "6",
    name: "Parallel Computing",
    code: "CS280",
    description: "Foundations of parallel architectures, algorithms, and shared-memory programming with OpenMP",
    color: "bg-indigo-500",
  },
]

// Dummy notes
export const dummyNotes: Note[] = [
  {
    id: "1",
    courseId: "1",
    title: "Variables and Data Types",
    content: `# Variables and Data Types

## What are Variables?

Variables are containers for storing data values. In programming, we use variables to hold information that can be referenced and manipulated.

## Common Data Types

### 1. Numbers
- **Integers**: Whole numbers (e.g., 42, -7, 0)
- **Floats**: Decimal numbers (e.g., 3.14, -0.5)

### 2. Strings
Text data enclosed in quotes: "Hello, World!"

### 3. Booleans
True or false values used for logical operations

## Example Code

\`\`\`python
# Integer
age = 25

# String
name = "Alice"

# Boolean
is_student = True
\`\`\`
`,
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-01-01T10:00:00Z",
  },
  {
    id: "2",
    courseId: "1",
    title: "Control Flow",
    content: `# Control Flow

## Conditional Statements

Use if-else statements to make decisions in your code.

\`\`\`python
if temperature > 30:
    print("It's hot!")
elif temperature > 20:
    print("It's warm")
else:
    print("It's cold")
\`\`\`

## Loops

### For Loops
Iterate over a sequence:

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

### While Loops
Repeat while a condition is true:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`
`,
    createdAt: "2026-01-02T10:00:00Z",
    updatedAt: "2026-01-02T10:00:00Z",
  },
  {
    id: "3",
    courseId: "2",
    title: "Arrays and Lists",
    content: `# Arrays and Lists

## What is an Array?

An array is a collection of elements stored at contiguous memory locations.

## Key Operations

1. **Access**: O(1) - Direct index access
2. **Search**: O(n) - Linear search
3. **Insert**: O(n) - May need to shift elements
4. **Delete**: O(n) - May need to shift elements

## Python List Example

\`\`\`python
# Creating a list
fruits = ["apple", "banana", "cherry"]

# Accessing elements
print(fruits[0])  # "apple"

# Adding elements
fruits.append("orange")

# Removing elements
fruits.remove("banana")
\`\`\`
`,
    createdAt: "2026-01-03T10:00:00Z",
    updatedAt: "2026-01-03T10:00:00Z",
  },
]

export const dummyAssessments: Assessment[] = [
  {
    id: "pc-test-1",
    courseId: "6",
    title: "Practice Test 1",
    description:
      "Practice test covering PRAM models, multicore architecture, Amdahl's law, cache coherency, interconnection networks, parallel algorithm design, OpenMP (parallel/for/sections/tasks, data scoping, reductions, synchronization), memory hierarchy and peak performance, false sharing, and race conditions. Total: 55 marks.",
    type: "test",
    timeLimit: 130,
    createdAt: "2026-05-18T10:00:00Z",
    questions: [
      {
        id: "pc1-q1",
        type: "multiple-choice",
        question:
          "Why is the CRCW-PRAM model generally considered more capable than EREW-PRAM and CREW-PRAM?",
        points: 2,
        options: [
          "It needs fewer processing elements for the same problem",
          "It avoids the need for shared memory altogether",
          "It can simulate the weaker PRAM variants without asymptotic slowdown",
          "It removes the need for any synchronization primitive",
        ],
        correctAnswer: 2,
        explanation:
          "CRCW can emulate CREW and EREW without asymptotic loss; the converse is not generally true.",
      },
      {
        id: "pc1-q2",
        type: "multiple-choice",
        question:
          "Which combination best explains why CPU vendors moved away from chasing higher single-core clock speeds toward many-core designs?",
        points: 3,
        options: [
          "Cheaper inter-core coherence traffic AND compilers solving auto-parallelization",
          "Diminishing returns from instruction-level parallelism AND the thermal/leakage wall on deeply scaled transistors",
          "Programmers demanding new paradigms AND cheaper inter-core coherence traffic",
          "Compilers solving auto-parallelization AND diminishing returns from instruction-level parallelism",
        ],
        correctAnswer: 1,
        explanation:
          "ILP returns are diminishing and the thermal/leakage wall blocks further clock scaling. Coherence traffic has become more expensive, not cheaper, and compilers have not solved auto-parallelization.",
      },
      {
        id: "pc1-q3",
        type: "multiple-choice",
        question: "Which scenario best illustrates a cache coherency problem?",
        points: 2,
        options: [
          "A thread reads a freshly allocated buffer and gets a page fault",
          "A core's load incurs a miss because the block has never been accessed",
          "Two cores cache the same line; one writes, the other later reads the old value",
          "A write-through cache flushes the entire cache to DRAM after every store",
        ],
        correctAnswer: 2,
        explanation:
          "The textbook coherence problem: one cache holds a stale copy after another core's write.",
      },
      {
        id: "pc1-q4",
        type: "multiple-choice",
        question:
          "Considering a 4×4×4 3D torus, which group of statements about interconnection networks is correct?",
        points: 3,
        options: [
          "Ring and fat tree both have bisection width 2; a bus is performance-scalable",
          "A 64-node hypercube and the 4×4×4 3D torus have the same bisection width; 2D torus and 3D torus are both regular",
          "A bus is performance-scalable; 2D torus is not a regular network",
          "Ring bisection width is 1; 3D torus is not regular",
        ],
        correctAnswer: 1,
        explanation:
          "64-node hypercube bisection is 32; the 4×4×4 3D torus also has bisection 32 (2·4·4). Both 2D and 3D tori are regular.",
      },
      {
        id: "pc1-q5",
        type: "multiple-choice",
        question:
          "Which group of statements about shared-memory vs distributed-memory programming is correct?",
        points: 3,
        options: [
          "Distributed memory requires explicit communication, AND shared memory requires careful consistency management",
          "The OS auto-coordinates updates in distributed memory, AND shared memory scales best at very large processor counts",
          "Distributed memory requires explicit communication, AND shared memory scales best at very large processor counts",
          "The OS auto-coordinates updates in distributed memory, AND shared memory requires careful consistency management",
        ],
        correctAnswer: 0,
        explanation:
          "Programmers must express communication explicitly in distributed memory, and consistency must be managed carefully in shared memory. The OS does not magically synchronize distributed nodes, and shared memory does not scale best at very high processor counts.",
      },
      {
        id: "pc1-q6",
        type: "multiple-choice",
        question:
          "What is the primary goal of the task assignment step in parallel algorithm design?",
        points: 2,
        options: [
          "Pick the target hardware before any decomposition",
          "Map tasks to threads/processes so as to balance load and minimize idle time",
          "Define the wire-level protocol for inter-node messaging",
          "Force a strictly sequential order to eliminate race conditions",
        ],
        correctAnswer: 1,
        explanation:
          "Assignment is about distributing work for load balance and reduced idle time.",
      },
      {
        id: "pc1-q7",
        type: "multiple-choice",
        question:
          "Given:\n\nint num_threads;\nomp_set_dynamic(1);\nomp_set_num_threads(12);\n#pragma omp parallel private(num_threads)\n{\n    num_threads = omp_get_num_threads();\n}\n\nWhat is the value of num_threads observed by thread 0?",
        points: 2,
        options: [
          "Exactly 12",
          "Exactly 1",
          "Some value ≤ 12 (the runtime may give fewer threads)",
          "Exactly 0",
        ],
        correctAnswer: 2,
        explanation:
          "With omp_set_dynamic(1) the runtime may grant fewer threads than requested; the team size is only bounded above by 12.",
      },
      {
        id: "pc1-q8",
        type: "multiple-choice",
        question:
          "Given:\n\n#pragma omp parallel num_threads(4)\n#pragma omp for schedule(static, 1)\nfor (int i = 0; i < 18; i++) { ... }\n\nWhich iterations end up on thread 2?",
        points: 2,
        options: ["8, 9, 10, 11, 12", "2, 6, 10, 14", "2, 3, 4, 5", "2, 6, 10, 14, 18"],
        correctAnswer: 1,
        explanation:
          "schedule(static, 1) round-robins one iteration at a time. Thread 2 picks 2, 6, 10, 14 — iteration 18 does not exist since the loop bound is i < 18.",
      },
      {
        id: "pc1-q9",
        type: "multiple-choice",
        question:
          "Without a collapse clause, a regular OpenMP `for` construct can:",
        points: 2,
        options: [
          "Parallelize only the immediately following loop",
          "Parallelize an arbitrary number of nested loops automatically",
          "Parallelize only loops whose body is wrapped in `#pragma omp critical`",
          "Parallelize all loops marked private",
        ],
        correctAnswer: 0,
        explanation:
          "Without collapse, only the immediately following loop is parallelized.",
      },
      {
        id: "pc1-q10",
        type: "multiple-choice",
        question:
          "Which statement best describes the difference between the OpenMP `sections`/`section` construct and the `task` construct?",
        points: 2,
        options: [
          "`task` requires being inside a parallel region; `sections` does not",
          "`sections` supports recursive parallelism while `task` does not",
          "`task` creates units of work that can run asynchronously and out of order; `sections` statically assigns each section to a thread for immediate execution",
          "`task` guarantees the definition order of tasks; `sections` does not",
        ],
        correctAnswer: 2,
        explanation:
          "Tasks are deferrable units of work executed by any thread in the team; sections are statically scheduled across the team.",
      },
      {
        id: "pc1-q11",
        type: "multiple-choice",
        question:
          "Which of the following statements about race conditions is INCORRECT?",
        points: 2,
        options: [
          "They typically arise when threads concurrently update the same shared variable",
          "They are primarily caused by the hardware's cache-coherence protocol",
          "They can produce incorrect or non-deterministic results",
          "Appropriate synchronization (e.g., critical, atomic) can eliminate them",
        ],
        correctAnswer: 1,
        explanation:
          "Race conditions are caused by unsynchronized access to shared state — not by the coherence protocol, which is what makes the problem observable.",
      },
      {
        id: "pc1-q12",
        type: "multiple-choice",
        question:
          "True or False: the following loop has a loop-carried dependency.\n\nfor (int i = 0; i < n; i++) {\n    x[i] = a + i * h;\n    y[i] = exp(x[i]);\n}",
        points: 1,
        options: ["True", "False"],
        correctAnswer: 1,
        explanation:
          "Each iteration writes only x[i] and y[i]; y[i] depends on x[i] from the same iteration. No iteration depends on any other.",
      },
      {
        id: "pc1-q13",
        type: "multiple-choice",
        question:
          "True or False: in an EREW-PRAM, simultaneous reads of the same memory location by different processing elements are serialized.",
        points: 1,
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "EREW = Exclusive Read, Exclusive Write — concurrent accesses (read or write) to the same location must be serialized.",
      },
      {
        id: "pc1-q14",
        type: "multiple-choice",
        question:
          "Given:\n\nint k, x = 5, y = 5;\nconst int N = 8;\n#pragma omp parallel for private(k)\nfor (k = 1; k <= N; k++) {\n    x = y * k;\n}\nprintf(\"x=%d (expected x=%d)\\n\", x, y * N);\n\nWhich single change makes the printed value of x deterministic and equal to y*N?",
        points: 2,
        options: [
          "Add private(x)",
          "Add lastprivate(x)",
          "Add reduction(*:x)",
          "Add shared(x)",
        ],
        correctAnswer: 1,
        explanation:
          "lastprivate(x) copies out the value assigned in the logically last iteration (k = N), reproducing the sequential result.",
      },
      {
        id: "pc1-q15",
        type: "multiple-choice",
        question:
          "Which of the following parallel `for` parallelizations is correct?",
        points: 2,
        options: [
          "#pragma omp parallel for reduction(+:dotp)\n  for (int i = 0; i < n; i++) dotp += a[i] * b[i];",
          "#pragma omp parallel for\n  for (int i = 0; i < n; i++) { a[i] = work(i); if (a[i] < b[i]) break; }",
          "#pragma omp parallel for\n  for (int i = k; i < n; i++) a[i] = a[i] + a[i-k];",
          "#pragma omp parallel for\n  for (int i = 1; i < 100; i++) a[i] = i * a[i-1];",
        ],
        correctAnswer: 0,
        explanation:
          "The dot-product reduction is the only safe option: `break` is illegal in a parallel for, and (c) and (d) have loop-carried dependencies on prior iterations.",
      },
      {
        id: "pc1-q16",
        type: "text",
        question:
          "Consider:\n\nint a = 1;\nint main(int argc, char **argv) {\n    int b = 2, c = 3;\n    omp_set_nested(1);\n    #pragma omp parallel num_threads(2) shared(a, b, c)\n    {\n        #pragma omp parallel num_threads(3)\n        {\n            int d = 4;\n            #pragma omp single\n            #pragma omp task firstprivate(a)\n            {\n                int e, f;\n                e = a + c;\n                f = b + c;\n            }\n        }\n    }\n}\n\n(a) What is the value of e inside the task? Justify briefly.\n(b) How many task constructs are generated across the whole program? Justify briefly.",
        points: 4,
        explanation:
          "(a) e = 4. `a` is firstprivate so the task sees a = 1; c is inherited shared from the outer region as c = 3; thus e = 1 + 3 = 4. (b) 2 tasks. The outer region has 2 threads; each spawns an inner parallel of 3 threads but `single` restricts task creation to one thread per inner team, so 2 × 1 = 2 tasks total.",
      },
      {
        id: "pc1-q17",
        type: "text",
        question:
          "The serial loop below is parallelized with OpenMP. State the data-scoping clauses that should follow `#pragma omp parallel` to produce the same result as the serial version, and briefly justify each choice.\n\nfloat result = 0.0f, x;\nint i;\n#pragma omp parallel default(none)\n{\n    int id = omp_get_thread_num();\n    int nthr = omp_get_num_threads();\n    for (i = id; i < N; i += nthr) {\n        x = heavy_work(i);\n        #pragma omp critical\n        result += combine(x);\n    }\n}",
        points: 3,
        explanation:
          "Use: shared(result) private(x, i). `result` must be shared so the critical accumulation has a single global target. `x` must be private so threads don't overwrite each other's intermediate value. `i` must be private since each thread uses its own loop induction variable. `id` and `nthr` are already implicitly private (declared inside the parallel region).",
      },
      {
        id: "pc1-q18",
        type: "text",
        question:
          "A workstation has a 6-core CPU running at 2.4 GHz. Each core can retire 4 floating-point operations per clock cycle. What is the theoretical peak performance in GFLOPS?",
        points: 1,
        explanation:
          "6 cores × 2.4 × 10^9 cycles/s × 4 FLOPs/cycle = 57.6 × 10^9 FLOPs/s = 57.6 GFLOPS.",
      },
      {
        id: "pc1-q19",
        type: "text",
        question:
          "Consider a memory system with 8 GB DRAM and a 128 KB L1 cache. The CPU runs at 2.5 GHz and can issue 4 FLOPs per cycle (floats are 4 bytes). DRAM latency l_DRAM = 25 ns, L1 latency l_L1 = 0.5 ns. Each memory cycle the processor fetches 64 bytes. The memory bus delivers 16 GB/s.\n\n(a) Compute the theoretical peak performance of the CPU in GFLOPS.\n(b) For a vector-vector dot product, what is the peak achievable performance in GFLOPS considering only l_DRAM? Show your working.",
        points: 3,
        explanation:
          "(a) 2.5 GHz × 4 FLOPs/cycle = 10 GFLOPS. (b) A 64-byte line holds 16 floats. To advance the dot product by 16 iterations you must fetch one line from a and one from b — 2 lines × 25 ns = 50 ns, during which the CPU performs 16 mults + 16 adds = 32 FLOPs. Peak achievable = 32 FLOPs / 50 ns = 0.64 GFLOPS.",
      },
      {
        id: "pc1-q20",
        type: "text",
        question:
          "A problem runs in T(P_F) seconds on P_F fast CPUs (CPU-F). A fraction f of the total time is non-parallelizable; the parallel portion exhibits linear speedup. Derive a closed-form expression for T(1), the time on a single CPU-F, in terms of f, P_F, and T(P_F).",
        points: 3,
        explanation:
          "Setup: T(P_F) = f · T(1) + (1 − f) · T(1) / P_F = T(1) · [f + (1 − f)/P_F]. Solve for T(1): T(1) = T(P_F) / [f + (1 − f)/P_F] = T(P_F) · P_F / [f · P_F + (1 − f)].",
      },
      {
        id: "pc1-q21",
        type: "text",
        question:
          "A program that does 4 seconds of work on one processor has been benchmarked and 0.4 seconds is purely serial (initialization and I/O). What is the minimum number of processors required to reach a speedup of 6? Round up to the nearest integer.",
        points: 2,
        explanation:
          "Serial fraction f = 0.4/4 = 0.10, parallel fraction 0.90. Amdahl: S = 1 / (0.10 + 0.90/P). Setting S = 6 gives 0.10 + 0.90/P = 1/6, so 0.90/P ≈ 0.06667, P ≈ 13.5. Round up to P = 14.",
      },
      {
        id: "pc1-q22",
        type: "text",
        question:
          "Consider a distributed-memory machine of P = 2^n nodes connected as a hypercube. One node holds a value that must be broadcast to all others.\n\n(a) Describe an efficient broadcast algorithm that exploits the hypercube structure.\n(b) State its communication time complexity and briefly justify whether it is efficient.",
        points: 4,
        explanation:
          "(a) Recursive doubling: at step i (i = 0..n−1), every node that already has the data sends it across its dimension-i link to the partner that differs only in bit i. After step 0 nodes {0, 1} have it; after step 1 {0, 1, 2, 3}; after step n − 1 all 2^n nodes have it. (b) O(log P) = O(n). This is asymptotically optimal because any broadcast needs Ω(diameter) time, and the hypercube has diameter log P.",
      },
      {
        id: "pc1-q23",
        type: "multiple-choice",
        question:
          "A two-thread histogram is implemented as below. Cache lines are 64 bytes, int is 4 bytes, N is very large.\n\n#define NUM_BINS    8\n#define NUM_THREADS 2\nfloat input[N];\nint   histogram_bins[NUM_BINS];\nint   partial_bins[NUM_THREADS][NUM_BINS];   /* zero-initialized */\n\n#pragma omp parallel num_threads(NUM_THREADS)\n{\n    int k = omp_get_thread_num();\n    #pragma omp for\n    for (int i = 0; i < N; i++)\n        partial_bins[k][bin_func(input[i])]++;\n}\nfor (int i = 0; i < NUM_BINS; i++)\n    histogram_bins[i] = partial_bins[0][i] + partial_bins[1][i];\n\nSpeedup is far below 2×. Which statement best diagnoses and fixes the problem?",
        points: 4,
        options: [
          "Race condition on partial_bins[k]; wrap the update in #pragma omp critical",
          "False sharing on partial_bins (the whole 2×8×4 = 64-byte array is one cache line); give each thread a stack-local int partial[NUM_BINS] and merge after the parallel region",
          "Cache miss thrashing on input[]; add software prefetches for input[i+8]",
          "Insufficient parallelism; raise NUM_THREADS to match the number of bins",
        ],
        correctAnswer: 1,
        explanation:
          "partial_bins occupies exactly one 64-byte cache line, so both threads write the same line every iteration — classic false sharing. There is no race (each thread writes its own row). Giving each thread a stack-local buffer puts the per-thread accumulators on disjoint cache lines.",
      },
      {
        id: "pc1-q24",
        type: "file",
        question:
          "The serial function below returns the maximum element of an n-element array:\n\nint max_array(const int *d, int n) {\n    int max = INT_MIN;\n    for (int i = 0; i < n; i++)\n        if (d[i] > max) max = d[i];\n    return max;\n}\n\nA broken parallelization is:\n\nint max_array_omp(const int *d, int n) {\n    int max = INT_MIN;\n    #pragma omp parallel\n    #pragma omp for schedule(static)\n    for (int i = 0; i < n; i++)\n        if (d[i] > max) max = d[i];\n    return max;\n}\n\n(a) Explain in one or two sentences why the parallelization is incorrect.\n(b) Provide TWO distinct correct OpenMP implementations of max_array_omp that always return the true maximum and can achieve speedup > 1 for large n. Briefly note the trade-off. Upload your .c file.",
        points: 5,
        acceptedFileTypes: [".c", ".cpp", ".txt"],
        explanation:
          "(a) The shared variable `max` is read and updated without synchronization — a race condition that can lose updates. (b) Implementation 1: #pragma omp parallel for reduction(max:m). Implementation 2: each thread keeps a local max via a private accumulator inside `#pragma omp parallel { ... }` and merges with a single #pragma omp critical at the end. Trade-off: the reduction form is shorter and lets the runtime pick an efficient tree; the explicit local+critical form is useful when no built-in reduction operator fits or you want per-thread inspection.",
      },
      {
        id: "pc1-q25",
        type: "file",
        question:
          "You are given a singly linked list whose nodes hold an int. The sequential count of prime payloads is:\n\nstruct Node { int value; struct Node *next; };\n\nint seq_count_prime(struct Node *head) {\n    int count = 0;\n    for (struct Node *p = head; p != NULL; p = p->next)\n        if (is_prime(p->value)) count++;\n    return count;\n}\n\nWrite an OpenMP-parallel version par_count_prime(struct Node *head) that returns the same value. You may assume is_prime is thread-safe and the list is not modified during the count. Correctness is required; speedup > 1 is NOT required. Briefly justify your choice of OpenMP constructs (1–2 sentences). Upload your .c file.",
        points: 5,
        acceptedFileTypes: [".c", ".cpp", ".txt"],
        explanation:
          "Walking a singly linked list is inherently sequential, so a single thread does the walk inside `#pragma omp single` and spawns one `#pragma omp task firstprivate(p)` per node. Inside each task, an `#pragma omp atomic` (or a reduction-style local counter aggregated at the end) updates the shared count. The implicit taskwait at the end of `single` ensures all tasks finish before the count is returned.",
      },
    ],
  },
  {
    id: "4",
    courseId: "1",
    title: "Real Number System Quiz",
    description: "Test your knowledge of number sets, symbols, and classifications in the real number system",
    type: "quiz",
    timeLimit: 25, // 25 minutes
    createdAt: "2026-02-04T10:00:00Z",
    questions: [
      // Symbol Recognition Questions
      {
        id: "rns-1",
        type: "multiple-choice",
        question: "What does the symbol ℕ represent?",
        points: 5,
        options: ["Rational Numbers", "Natural Numbers", "Negative Numbers", "Non-real Numbers"],
        correctAnswer: 1,
        explanation: "ℕ represents the Natural Numbers (counting numbers): 1, 2, 3, 4, ...",
      },
      {
        id: "rns-2",
        type: "multiple-choice",
        question: "What does the symbol ℤ represent?",
        points: 5,
        options: ["Zero only", "Integers", "Irrational Numbers", "Whole Numbers"],
        correctAnswer: 1,
        explanation: "ℤ represents the Integers: ..., -3, -2, -1, 0, 1, 2, 3, ... (from German 'Zahlen' meaning numbers)",
      },
      {
        id: "rns-3",
        type: "multiple-choice",
        question: "What does the symbol ℚ represent?",
        points: 5,
        options: ["Quadratic Numbers", "Quaternions", "Rational Numbers", "Quantitative Numbers"],
        correctAnswer: 2,
        explanation: "ℚ represents Rational Numbers - numbers that can be expressed as a fraction p/q where p and q are integers and q ≠ 0 (from 'Quotient')",
      },
      {
        id: "rns-4",
        type: "multiple-choice",
        question: "What does the symbol ℝ represent?",
        points: 5,
        options: ["Radical Numbers", "Real Numbers", "Rational Numbers", "Regular Numbers"],
        correctAnswer: 1,
        explanation: "ℝ represents the Real Numbers - all rational and irrational numbers on the number line",
      },
      {
        id: "rns-5",
        type: "multiple-choice",
        question: "What does the symbol 𝕎 (or sometimes W) represent?",
        points: 5,
        options: ["Whole Numbers", "Wild Numbers", "Weighted Numbers", "Wave Numbers"],
        correctAnswer: 0,
        explanation: "𝕎 represents Whole Numbers: 0, 1, 2, 3, 4, ... (Natural numbers plus zero)",
      },
      {
        id: "rns-6",
        type: "multiple-choice",
        question: "Which symbol represents Irrational Numbers?",
        points: 5,
        options: ["ℚ", "ℚ' or ℝ\\ℚ", "𝕀", "Both B and C are commonly used"],
        correctAnswer: 3,
        explanation: "Irrational numbers are often written as ℚ' (Q complement), ℝ\\ℚ (R minus Q), or sometimes 𝕀. There's no single universal symbol like there is for other sets.",
      },
      // Classification Questions
      {
        id: "rns-7",
        type: "multiple-choice",
        question: "Which of the following categories does the number 7 belong to? (Select the MOST specific)",
        points: 5,
        options: ["Real only", "Rational only", "Integer only", "Natural Number"],
        correctAnswer: 3,
        explanation: "7 is a Natural Number (and therefore also a Whole Number, Integer, Rational Number, and Real Number - but Natural is most specific)",
      },
      {
        id: "rns-8",
        type: "multiple-choice",
        question: "Which categories does the number -5 belong to?",
        points: 5,
        options: [
          "Natural, Whole, Integer, Rational, Real",
          "Integer, Rational, Real only",
          "Whole, Integer, Rational, Real",
          "Rational, Real only"
        ],
        correctAnswer: 1,
        explanation: "-5 is an Integer (negative whole number), which makes it also Rational and Real. It is NOT Natural (no negatives) or Whole (no negatives).",
      },
      {
        id: "rns-9",
        type: "multiple-choice",
        question: "Which categories does the number 0 belong to?",
        points: 5,
        options: [
          "Whole, Integer, Rational, Real only",
          "Natural, Whole, Integer, Rational, Real",
          "Integer, Rational, Real only",
          "Rational, Real only"
        ],
        correctAnswer: 0,
        explanation: "0 is a Whole Number, Integer, Rational (0/1), and Real. It is NOT a Natural Number (Natural numbers start at 1).",
      },
      {
        id: "rns-10",
        type: "multiple-choice",
        question: "Which categories does the number 3/4 belong to?",
        points: 5,
        options: [
          "Real only",
          "Rational, Real only",
          "Integer, Rational, Real",
          "Natural, Whole, Integer, Rational, Real"
        ],
        correctAnswer: 1,
        explanation: "3/4 = 0.75 is Rational (it's a fraction of integers) and Real. It's NOT an Integer, Whole, or Natural because it's not a whole number.",
      },
      {
        id: "rns-11",
        type: "multiple-choice",
        question: "Which categories does √2 belong to?",
        points: 5,
        options: [
          "Rational, Real",
          "Irrational, Real",
          "Integer, Rational, Real",
          "Non-real"
        ],
        correctAnswer: 1,
        explanation: "√2 ≈ 1.41421356... is Irrational (cannot be expressed as a fraction, decimal never terminates or repeats) and Real.",
      },
      {
        id: "rns-12",
        type: "multiple-choice",
        question: "Which categories does π (pi) belong to?",
        points: 5,
        options: [
          "Rational, Real",
          "Irrational, Real",
          "Non-real",
          "Integer, Rational, Real"
        ],
        correctAnswer: 1,
        explanation: "π ≈ 3.14159... is Irrational (its decimal expansion never terminates or repeats) and Real.",
      },
      {
        id: "rns-13",
        type: "multiple-choice",
        question: "Which categories does √(-1) belong to?",
        points: 5,
        options: [
          "Irrational, Real",
          "Rational, Real",
          "Non-real (Imaginary)",
          "Integer"
        ],
        correctAnswer: 2,
        explanation: "√(-1) = i is Non-real (Imaginary). You cannot take the square root of a negative number and get a real result.",
      },
      {
        id: "rns-14",
        type: "multiple-choice",
        question: "Which categories does -2.5 belong to?",
        points: 5,
        options: [
          "Integer, Rational, Real",
          "Rational, Real only",
          "Irrational, Real",
          "Whole, Integer, Rational, Real"
        ],
        correctAnswer: 1,
        explanation: "-2.5 = -5/2 is Rational (can be written as a fraction) and Real. It's NOT an Integer because it's not a whole number.",
      },
      {
        id: "rns-15",
        type: "multiple-choice",
        question: "Which number is both Rational AND an Integer?",
        points: 5,
        options: [
          "2/3",
          "√4",
          "π",
          "1.5"
        ],
        correctAnswer: 1,
        explanation: "√4 = 2, which is an Integer. All integers are also Rational (2 = 2/1). The others: 2/3 and 1.5 are rational but not integers; π is irrational.",
      },
      {
        id: "rns-16",
        type: "multiple-choice",
        question: "Which statement about the relationship between number sets is TRUE?",
        points: 5,
        options: [
          "All Rational numbers are Integers",
          "All Integers are Natural numbers",
          "All Natural numbers are Real numbers",
          "All Irrational numbers are Rational"
        ],
        correctAnswer: 2,
        explanation: "All Natural numbers ARE Real numbers. The hierarchy is: ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ ⊂ ℝ (Natural ⊂ Whole ⊂ Integer ⊂ Rational ⊂ Real)",
      },
      {
        id: "rns-17",
        type: "multiple-choice",
        question: "The decimal 0.333... (repeating) is classified as:",
        points: 5,
        options: [
          "Irrational because it goes on forever",
          "Rational because it equals 1/3",
          "Non-real",
          "Natural"
        ],
        correctAnswer: 1,
        explanation: "0.333... = 1/3, which is Rational. A repeating decimal is ALWAYS rational because it can be expressed as a fraction.",
      },
      {
        id: "rns-18",
        type: "multiple-choice",
        question: "Which of these is an Irrational number?",
        points: 5,
        options: [
          "√9",
          "√5",
          "4/7",
          "0.125"
        ],
        correctAnswer: 1,
        explanation: "√5 ≈ 2.236... is irrational (non-repeating, non-terminating decimal). √9 = 3 (integer), 4/7 is a fraction (rational), 0.125 = 1/8 (rational).",
      },
    ],
  },
  {
    id: "6",
    courseId: "1",
    title: "Punctuation & Punctuation Marks Test",
    description: "Test your knowledge of punctuation marks and how to use them in sentences. This test will be marked by your tutor.",
    type: "test",
    timeLimit: 40, // 40 minutes
    createdAt: "2026-03-05T10:00:00Z",
    questions: [
      // ===== IDENTIFY THE PUNCTUATION MARK (8 questions) =====
      {
        id: "punct-1",
        type: "multiple-choice",
        question: "What is this punctuation mark called: .",
        points: 2,
        options: ["Comma", "Period (Full stop)", "Question mark", "Exclamation mark"],
        correctAnswer: 1,
      },
      {
        id: "punct-2",
        type: "multiple-choice",
        question: "What is this punctuation mark called: ?",
        points: 2,
        options: ["Period", "Exclamation mark", "Question mark", "Comma"],
        correctAnswer: 2,
      },
      {
        id: "punct-3",
        type: "multiple-choice",
        question: "What is this punctuation mark called: !",
        points: 2,
        options: ["Question mark", "Period", "Comma", "Exclamation mark"],
        correctAnswer: 3,
      },
      {
        id: "punct-4",
        type: "multiple-choice",
        question: "What is this punctuation mark called: ,",
        points: 2,
        options: ["Period", "Comma", "Apostrophe", "Colon"],
        correctAnswer: 1,
      },
      {
        id: "punct-5",
        type: "multiple-choice",
        question: "What is this punctuation mark called: '",
        points: 2,
        options: ["Comma", "Quotation mark", "Apostrophe", "Period"],
        correctAnswer: 2,
      },
      {
        id: "punct-6",
        type: "multiple-choice",
        question: "What are these punctuation marks called: \" \"",
        points: 2,
        options: ["Apostrophes", "Quotation marks (Speech marks)", "Commas", "Brackets"],
        correctAnswer: 1,
      },
      {
        id: "punct-7",
        type: "multiple-choice",
        question: "What is this punctuation mark called: :",
        points: 2,
        options: ["Semicolon", "Comma", "Colon", "Period"],
        correctAnswer: 2,
      },
      {
        id: "punct-8",
        type: "multiple-choice",
        question: "What is this punctuation mark called: -",
        points: 2,
        options: ["Underscore", "Dash", "Hyphen", "Line"],
        correctAnswer: 2,
      },
      // ===== WHAT PUNCTUATION IS NEEDED (8 questions) =====
      {
        id: "punct-9",
        type: "multiple-choice",
        question: "What punctuation mark ends this sentence: 'I love ice cream__'",
        points: 2,
        options: ["Question mark (?)", "Exclamation mark (!)", "Period (.)", "Comma (,)"],
        correctAnswer: 2,
      },
      {
        id: "punct-10",
        type: "multiple-choice",
        question: "What punctuation mark ends this sentence: 'What time is it__'",
        points: 2,
        options: ["Period (.)", "Question mark (?)", "Exclamation mark (!)", "Comma (,)"],
        correctAnswer: 1,
      },
      {
        id: "punct-11",
        type: "multiple-choice",
        question: "What punctuation mark ends this sentence: 'Watch out__'",
        points: 2,
        options: ["Period (.)", "Comma (,)", "Question mark (?)", "Exclamation mark (!)"],
        correctAnswer: 3,
      },
      {
        id: "punct-12",
        type: "multiple-choice",
        question: "Which sentence has the CORRECT punctuation?",
        points: 2,
        options: [
          "Where is my book.",
          "Where is my book?",
          "Where is my book!",
          "Where is my book,"
        ],
        correctAnswer: 1,
      },
      {
        id: "punct-13",
        type: "multiple-choice",
        question: "Which sentence has the CORRECT punctuation?",
        points: 2,
        options: [
          "I have a dog a cat and a fish.",
          "I have a dog, a cat, and a fish.",
          "I have, a dog a cat and a fish.",
          "I have a dog a cat, and a fish."
        ],
        correctAnswer: 1,
      },
      {
        id: "punct-14",
        type: "multiple-choice",
        question: "What punctuation shows that something belongs to someone (like 'the dog's ball')?",
        points: 2,
        options: ["Comma", "Period", "Apostrophe", "Question mark"],
        correctAnswer: 2,
      },
      {
        id: "punct-15",
        type: "multiple-choice",
        question: "Which sentence uses the apostrophe correctly?",
        points: 2,
        options: [
          "The cats toy is red.",
          "The cat's toy is red.",
          "The cats' toy is red.",
          "The cat,s toy is red."
        ],
        correctAnswer: 1,
      },
      {
        id: "punct-16",
        type: "multiple-choice",
        question: "Which sentence shows someone is speaking?",
        points: 2,
        options: [
          "Mom said come here.",
          "Mom said, \"Come here.\"",
          "Mom said 'come here'",
          "Mom said: come here."
        ],
        correctAnswer: 1,
      },
      // ===== FIX THE SENTENCE - Write in answers (14 questions) =====
      {
        id: "punct-17",
        type: "text",
        question: "Add the correct punctuation at the end: 'The sun is shining today'",
        points: 3,
      },
      {
        id: "punct-18",
        type: "text",
        question: "Add the correct punctuation at the end: 'Can I have some water'",
        points: 3,
      },
      {
        id: "punct-19",
        type: "text",
        question: "Add the correct punctuation at the end: 'Wow that was amazing'",
        points: 3,
      },
      {
        id: "punct-20",
        type: "text",
        question: "Rewrite this sentence with correct punctuation: 'i went to the shop'",
        points: 4,
      },
      {
        id: "punct-21",
        type: "text",
        question: "Add commas where needed: 'I bought apples oranges bananas and grapes'",
        points: 4,
      },
      {
        id: "punct-22",
        type: "text",
        question: "Rewrite this sentence with the correct apostrophe: 'The dogs bone is under the table'",
        points: 4,
      },
      {
        id: "punct-23",
        type: "text",
        question: "Rewrite this sentence with correct punctuation: 'my friend tom has a new bike'",
        points: 4,
      },
      {
        id: "punct-24",
        type: "text",
        question: "Add the correct punctuation: 'Sarah asked where are you going'",
        points: 4,
      },
      {
        id: "punct-25",
        type: "text",
        question: "Add commas where needed: 'On Monday we have maths English and science'",
        points: 4,
      },
      {
        id: "punct-26",
        type: "text",
        question: "Rewrite with correct punctuation: 'the girls shoes are pink'",
        points: 4,
      },
      {
        id: "punct-27",
        type: "text",
        question: "Add punctuation to this dialogue: 'Dad said lets go to the park'",
        points: 5,
      },
      {
        id: "punct-28",
        type: "text",
        question: "Fix all the punctuation in this sentence: 'do you want to come to my party on saturday'",
        points: 5,
      },
      {
        id: "punct-29",
        type: "text",
        question: "Add commas and a period: 'I like red blue green and yellow'",
        points: 4,
      },
      {
        id: "punct-30",
        type: "text",
        question: "Rewrite with all correct punctuation: 'james said i cant wait for the holidays'",
        points: 5,
      },
    ],
  },
  {
    id: "5",
    courseId: "1",
    title: "Real Numbers & Ratios Test",
    description: "Comprehensive test covering the real number system and ratios. This test will be manually graded by your tutor.",
    type: "test",
    timeLimit: 30, // 30 minutes
    createdAt: "2026-02-05T10:00:00Z",
    questions: [
      // ===== REAL NUMBER SYSTEM QUESTIONS (18 questions) =====
      // Symbol Recognition Questions
      {
        id: "test-1",
        type: "multiple-choice",
        question: "What does the symbol ℤ represent?",
        points: 3,
        options: ["Natural Numbers", "Integers", "Rational Numbers", "Whole Numbers"],
        correctAnswer: 1,
      },
      {
        id: "test-2",
        type: "multiple-choice",
        question: "What does the symbol ℕ represent?",
        points: 3,
        options: ["Non-real Numbers", "Negative Numbers", "Natural Numbers", "Neutral Numbers"],
        correctAnswer: 2,
      },
      {
        id: "test-3",
        type: "multiple-choice",
        question: "What does the symbol ℝ represent?",
        points: 3,
        options: ["Real Numbers", "Rational Numbers", "Radical Numbers", "Repeating Numbers"],
        correctAnswer: 0,
      },
      {
        id: "test-4",
        type: "multiple-choice",
        question: "What does the symbol ℚ represent?",
        points: 3,
        options: ["Quaternions", "Rational Numbers", "Quadratic Numbers", "Quality Numbers"],
        correctAnswer: 1,
      },
      {
        id: "test-5",
        type: "multiple-choice",
        question: "What does the symbol 𝕎 represent?",
        points: 3,
        options: ["Weird Numbers", "Whole Numbers", "Wave Numbers", "Wild Numbers"],
        correctAnswer: 1,
      },
      {
        id: "test-6",
        type: "multiple-choice",
        question: "Which notation is commonly used for Irrational Numbers?",
        points: 3,
        options: ["ℕ'", "ℚ' or ℝ\\ℚ", "ℤ'", "𝕎'"],
        correctAnswer: 1,
      },
      // Classification Questions
      {
        id: "test-7",
        type: "multiple-choice",
        question: "Which of the following categories does the number 12 belong to? (Select the MOST specific)",
        points: 3,
        options: ["Real only", "Rational only", "Integer only", "Natural Number"],
        correctAnswer: 3,
      },
      {
        id: "test-8",
        type: "multiple-choice",
        question: "Which categories does the number -8 belong to?",
        points: 3,
        options: [
          "Natural, Whole, Integer, Rational, Real",
          "Integer, Rational, Real only",
          "Whole, Integer, Rational, Real",
          "Rational, Real only"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-9",
        type: "multiple-choice",
        question: "Which categories does the number 5/8 belong to?",
        points: 3,
        options: [
          "Real only",
          "Rational, Real only",
          "Integer, Rational, Real",
          "Natural, Whole, Integer, Rational, Real"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-10",
        type: "multiple-choice",
        question: "Which categories does √3 belong to?",
        points: 3,
        options: [
          "Rational, Real",
          "Irrational, Real",
          "Integer, Rational, Real",
          "Non-real"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-11",
        type: "multiple-choice",
        question: "Which categories does √(-4) belong to?",
        points: 3,
        options: [
          "Irrational, Real",
          "Rational, Real",
          "Non-real (Imaginary)",
          "Integer"
        ],
        correctAnswer: 2,
      },
      {
        id: "test-12",
        type: "multiple-choice",
        question: "Which categories does -3.75 belong to?",
        points: 3,
        options: [
          "Integer, Rational, Real",
          "Rational, Real only",
          "Irrational, Real",
          "Whole, Integer, Rational, Real"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-13",
        type: "multiple-choice",
        question: "Which number is both Rational AND an Integer?",
        points: 3,
        options: [
          "5/6",
          "√16",
          "π",
          "2.75"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-14",
        type: "multiple-choice",
        question: "The decimal 0.666... (repeating) is classified as:",
        points: 3,
        options: [
          "Irrational because it goes on forever",
          "Rational because it equals 2/3",
          "Non-real",
          "Natural"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-15",
        type: "multiple-choice",
        question: "Which of these is an Irrational number?",
        points: 3,
        options: [
          "√25",
          "√7",
          "3/5",
          "0.25"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-16",
        type: "multiple-choice",
        question: "Which statement about number sets is TRUE?",
        points: 3,
        options: [
          "All Integers are Natural numbers",
          "All Rational numbers are Integers",
          "All Whole numbers are Real numbers",
          "All Irrational numbers are Rational"
        ],
        correctAnswer: 2,
      },
      {
        id: "test-17",
        type: "multiple-choice",
        question: "Which categories does the number 0 belong to?",
        points: 3,
        options: [
          "Natural, Whole, Integer, Rational, Real",
          "Whole, Integer, Rational, Real only",
          "Integer, Rational, Real only",
          "Rational, Real only"
        ],
        correctAnswer: 1,
      },
      {
        id: "test-18",
        type: "multiple-choice",
        question: "Which categories does e (Euler's number ≈ 2.718...) belong to?",
        points: 3,
        options: [
          "Rational, Real",
          "Irrational, Real",
          "Integer, Rational, Real",
          "Non-real"
        ],
        correctAnswer: 1,
      },
      // ===== RATIO QUESTIONS (15 questions) =====
      // Simple Ratios (5 questions)
      {
        id: "ratio-1",
        type: "text",
        question: "Simplify the ratio 42:60 to its simplest form.",
        points: 4,
      },
      {
        id: "ratio-2",
        type: "text",
        question: "Simplify the ratio 36:48 to its simplest form.",
        points: 4,
      },
      {
        id: "ratio-3",
        type: "text",
        question: "Simplify the ratio 75:100 to its simplest form.",
        points: 4,
      },
      {
        id: "ratio-4",
        type: "text",
        question: "Simplify the ratio 24:36:60 to its simplest form.",
        points: 4,
      },
      {
        id: "ratio-5",
        type: "text",
        question: "Simplify the ratio 150:225 to its simplest form.",
        points: 4,
      },
      // Unit Conversion Ratios (5 questions)
      {
        id: "ratio-6",
        type: "text",
        question: "Express the ratio 6m : 50cm in simplest form. (Hint: convert to the same units first)",
        points: 5,
      },
      {
        id: "ratio-7",
        type: "text",
        question: "Express the ratio 45 minutes : 2 hours in simplest form.",
        points: 5,
      },
      {
        id: "ratio-8",
        type: "text",
        question: "Express the ratio 800g : 2kg in simplest form.",
        points: 5,
      },
      {
        id: "ratio-9",
        type: "text",
        question: "Express the ratio 1.5 hours : 45 minutes in simplest form.",
        points: 5,
      },
      {
        id: "ratio-10",
        type: "text",
        question: "Express the ratio 250ml : 1 litre in simplest form.",
        points: 5,
      },
      // Story/Word Problems (5 questions)
      {
        id: "ratio-11",
        type: "text",
        question: "Two numbers are in the ratio 8:5. If the smaller number is 120, find the bigger number. Show your working.",
        points: 6,
      },
      {
        id: "ratio-12",
        type: "text",
        question: "Four pens cost R60. How much do 15 pens cost? Show your working.",
        points: 6,
      },
      {
        id: "ratio-13",
        type: "text",
        question: "Sean and Dan buy gold coins costing R2400. Dan contributes R1800 and Sean contributes the balance. If they receive 30 coins in total, how many coins should each person receive based on their contribution ratio? Show your working.",
        points: 8,
      },
      {
        id: "ratio-14",
        type: "text",
        question: "A recipe requires flour and sugar in the ratio 5:2. If you use 350g of flour, how many grams of sugar do you need? Show your working.",
        points: 6,
      },
      {
        id: "ratio-15",
        type: "text",
        question: "Three friends share prize money in the ratio 3:4:5. If the total prize is R3600, how much does each friend receive? Show your working.",
        points: 8,
      },
    ],
  },
  {
    id: "1",
    courseId: "1",
    title: "Python Basics Quiz",
    description: "Test your understanding of Python fundamentals",
    type: "quiz",
    timeLimit: 30, // 30 minutes
    createdAt: "2026-01-01T10:00:00Z",
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "What is the correct way to declare a variable in Python?",
        points: 10,
        options: ["var x = 5", "int x = 5", "x = 5", "let x = 5"],
        correctAnswer: 2,
        explanation: "In Python, you simply assign a value to a variable name without declaring its type.",
      },
      {
        id: "2",
        type: "text",
        question: "Explain the difference between a list and a tuple in Python. Provide examples.",
        points: 15,
        explanation: "Lists are mutable and use [], tuples are immutable and use ().",
      },
      {
        id: "3",
        type: "file",
        question:
          "Write a Python function that takes a list of numbers and returns the sum of all even numbers. Upload your .py file.",
        points: 25,
        acceptedFileTypes: [".py", ".txt"],
      },
    ],
  },
  {
    id: "2",
    courseId: "2",
    title: "Data Structures Assignment",
    description: "Implement various data structures",
    type: "assignment",
    timeLimit: 7, // 7 days
    dueDate: "2026-01-15T23:59:59Z",
    createdAt: "2026-01-02T10:00:00Z",
    questions: [
      {
        id: "1",
        type: "text",
        question: "Describe how a hash table handles collisions. Mention at least two collision resolution techniques.",
        points: 20,
        explanation: "Common techniques include chaining and open addressing.",
      },
      {
        id: "2",
        type: "file",
        question: "Implement a binary search tree with insert and search methods. Upload your implementation.",
        points: 30,
        acceptedFileTypes: [".py", ".java", ".cpp", ".js", ".txt"],
      },
    ],
  },
  {
    id: "3",
    courseId: "2",
    title: "Midterm Test",
    description: "Comprehensive test covering data structures and algorithms",
    type: "test",
    timeLimit: 120, // 120 minutes
    createdAt: "2026-01-03T10:00:00Z",
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "What is the time complexity of accessing an element in an array by index?",
        points: 10,
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 0,
        explanation:
          "Array access by index is constant time O(1) because arrays store elements at contiguous memory locations.",
      },
      {
        id: "2",
        type: "text",
        question: "Explain the differences between BFS and DFS. When would you use each?",
        points: 20,
      },
      {
        id: "3",
        type: "file",
        question: "Implement a sorting algorithm of your choice. Analyze its time complexity.",
        points: 30,
        acceptedFileTypes: [".py", ".java", ".cpp", ".js"],
      },
    ],
  },
  {
    id: "5",
    courseId: "5",
    title: "Noun Detective Quiz 🔍",
    description: "Can you identify different types of nouns? Test your skills with common nouns, proper nouns, plural nouns, countable & uncountable nouns, and pronouns!",
    type: "quiz",
    timeLimit: 20,
    createdAt: "2026-03-03T10:00:00Z",
    questions: [
      // Common vs Proper Nouns
      {
        id: "noun-1",
        type: "multiple-choice",
        question: "Which word is a PROPER noun?",
        points: 5,
        options: ["dog", "city", "Texas", "teacher"],
        correctAnswer: 2,
        explanation: "'Texas' is a proper noun because it names a specific place. Proper nouns always start with a capital letter!",
      },
      {
        id: "noun-2",
        type: "multiple-choice",
        question: "Which word is a COMMON noun?",
        points: 5,
        options: ["Monday", "Sarah", "book", "Amazon"],
        correctAnswer: 2,
        explanation: "'book' is a common noun - it's a general name for any book, not a specific one.",
      },
      {
        id: "noun-3",
        type: "multiple-choice",
        question: "In the sentence 'My friend Emma loves pizza from Italy,' which word is a COMMON noun?",
        points: 5,
        options: ["Emma", "pizza", "Italy", "My"],
        correctAnswer: 1,
        explanation: "'pizza' is a common noun. 'Emma' and 'Italy' are proper nouns (specific names).",
      },
      {
        id: "noun-4",
        type: "multiple-choice",
        question: "How many PROPER nouns are in this sentence: 'Last December, Jake visited Disney World in Florida.'",
        points: 5,
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "There are 4 proper nouns: December, Jake, Disney World, and Florida. They all name specific things!",
      },
      // Plural Nouns
      {
        id: "noun-5",
        type: "multiple-choice",
        question: "What is the correct PLURAL form of 'child'?",
        points: 5,
        options: ["childs", "childes", "children", "childern"],
        correctAnswer: 2,
        explanation: "'children' is the correct plural. This is an irregular plural - it doesn't just add -s or -es!",
      },
      {
        id: "noun-6",
        type: "multiple-choice",
        question: "Which plural noun is spelled CORRECTLY?",
        points: 5,
        options: ["tooths", "mouses", "geese", "foots"],
        correctAnswer: 2,
        explanation: "'geese' is correct! The plurals should be: teeth, mice, geese, feet. These are all irregular plurals.",
      },
      {
        id: "noun-7",
        type: "multiple-choice",
        question: "What is the plural of 'box'?",
        points: 5,
        options: ["boxs", "boxes", "boxies", "boxen"],
        correctAnswer: 1,
        explanation: "'boxes' is correct. Words ending in -x add -es to form the plural.",
      },
      {
        id: "noun-8",
        type: "multiple-choice",
        question: "What is the plural of 'butterfly'?",
        points: 5,
        options: ["butterflys", "butterflyes", "butterflies", "butterfly"],
        correctAnswer: 2,
        explanation: "'butterflies' is correct. When a word ends in a consonant + y, change the y to i and add -es.",
      },
      // Countable vs Uncountable Nouns
      {
        id: "noun-9",
        type: "multiple-choice",
        question: "Which noun is UNCOUNTABLE (you can't count it with numbers)?",
        points: 5,
        options: ["apple", "cookie", "water", "pencil"],
        correctAnswer: 2,
        explanation: "'water' is uncountable - you can't say 'one water, two waters.' You say 'some water' or 'a glass of water.'",
      },
      {
        id: "noun-10",
        type: "multiple-choice",
        question: "Which noun is COUNTABLE?",
        points: 5,
        options: ["homework", "music", "elephant", "rice"],
        correctAnswer: 2,
        explanation: "'elephant' is countable - you can say 'one elephant, two elephants.' The others are uncountable!",
      },
      {
        id: "noun-11",
        type: "multiple-choice",
        question: "Which sentence uses an UNCOUNTABLE noun correctly?",
        points: 5,
        options: [
          "I need three informations.",
          "She gave me some advice.",
          "He has many furnitures.",
          "We bought five breads."
        ],
        correctAnswer: 1,
        explanation: "'She gave me some advice' is correct. 'Advice' is uncountable - you can't count it with numbers!",
      },
      {
        id: "noun-12",
        type: "multiple-choice",
        question: "Which word is UNCOUNTABLE?",
        points: 5,
        options: ["chair", "happiness", "dog", "flower"],
        correctAnswer: 1,
        explanation: "'happiness' is uncountable - it's a feeling/idea that you can't count. You say 'some happiness' not 'three happinesses.'",
      },
      // Pronouns
      {
        id: "noun-13",
        type: "multiple-choice",
        question: "Which word is a PRONOUN?",
        points: 5,
        options: ["run", "beautiful", "they", "quickly"],
        correctAnswer: 2,
        explanation: "'they' is a pronoun - it replaces a noun. 'run' is a verb, 'beautiful' is an adjective, 'quickly' is an adverb.",
      },
      {
        id: "noun-14",
        type: "multiple-choice",
        question: "In the sentence 'Maya finished her homework, and she was proud of herself,' which words are pronouns?",
        points: 5,
        options: [
          "Maya and homework",
          "her, she, and herself",
          "finished and proud",
          "was and of"
        ],
        correctAnswer: 1,
        explanation: "'her,' 'she,' and 'herself' are all pronouns that refer back to Maya.",
      },
      {
        id: "noun-15",
        type: "multiple-choice",
        question: "Which pronoun correctly completes this sentence: '______ are going to the park.'",
        points: 5,
        options: ["Him", "Her", "We", "Me"],
        correctAnswer: 2,
        explanation: "'We' is correct because it's a subject pronoun. 'Him,' 'Her,' and 'Me' are object pronouns.",
      },
      {
        id: "noun-16",
        type: "multiple-choice",
        question: "What type of pronoun is 'everyone'?",
        points: 5,
        options: ["Personal pronoun", "Indefinite pronoun", "Possessive pronoun", "Reflexive pronoun"],
        correctAnswer: 1,
        explanation: "'everyone' is an indefinite pronoun - it refers to people in general, not specific individuals.",
      },
      // Mixed Review
      {
        id: "noun-17",
        type: "multiple-choice",
        question: "Which sentence contains a PROPER noun, a COMMON noun, and a PRONOUN?",
        points: 5,
        options: [
          "The dog ran fast.",
          "She visited Paris with her family.",
          "Books are interesting.",
          "They played games."
        ],
        correctAnswer: 1,
        explanation: "'She visited Paris with her family' has: She (pronoun), Paris (proper noun), family (common noun).",
      },
      {
        id: "noun-18",
        type: "multiple-choice",
        question: "Read: 'The children brought their lunches to the classroom.' How many PLURAL nouns are there?",
        points: 5,
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
        explanation: "There are 3 plural nouns: children, lunches, and... wait, that's 2! Plus 'their' modifies lunches. Actually it's: children, lunches = 2. Trick question - 'classroom' is singular!",
      },
      {
        id: "noun-19",
        type: "multiple-choice",
        question: "Which group contains ONLY uncountable nouns?",
        points: 5,
        options: [
          "milk, bread, sugar",
          "cat, water, homework",
          "love, air, money",
          "apple, music, sand"
        ],
        correctAnswer: 2,
        explanation: "'love, air, money' are ALL uncountable. In other options: cat and apple are countable, and bread can be countable (loaves).",
      },
      {
        id: "noun-20",
        type: "multiple-choice",
        question: "Bonus Challenge! 🌟 In the sentence 'Dr. Smith gave the students their homework about volcanoes in Hawaii,' how many total NOUNS are there (including proper nouns)?",
        points: 10,
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
        explanation: "There are 5 nouns: Dr. Smith (proper), students (common), homework (common), volcanoes (common), Hawaii (proper). 'their' is a pronoun!",
      },
    ],
  },
]

export const dummyAssessmentAttempts: AssessmentAttempt[] = [
  {
    id: "1",
    assessmentId: "1",
    userId: "user1",
    answers: [
      {
        questionId: "1",
        type: "multiple-choice",
        value: 2,
        isCorrect: true,
        pointsAwarded: 10,
      },
      {
        questionId: "2",
        type: "text",
        value:
          "Lists are mutable, meaning they can be changed after creation, and are defined with square brackets []. Tuples are immutable and defined with parentheses (). Example: my_list = [1, 2, 3] vs my_tuple = (1, 2, 3)",
        pointsAwarded: 13,
        feedback: "Good explanation! Could mention performance differences.",
      },
      {
        questionId: "3",
        type: "file",
        value: {
          fileName: "sum_evens.py",
          fileType: "text/x-python",
          fileSize: 245,
          fileUrl: "blob:sum_evens_user1_123456.py",
          uploadedAt: "2026-01-01T11:45:00Z",
        },
        pointsAwarded: 23,
        feedback: "Well structured code. Minor issue: no input validation.",
      },
    ],
    score: 92,
    totalQuestions: 3,
    startedAt: "2026-01-01T11:30:00Z",
    completedAt: "2026-01-01T12:00:00Z",
    gradedAt: "2026-01-01T14:30:00Z",
    gradedBy: "tutor1",
    status: "graded",
  },
  {
    id: "2",
    assessmentId: "2",
    userId: "user1",
    answers: [
      {
        questionId: "1",
        type: "text",
        value:
          "Hash tables handle collisions using chaining (linked lists) or open addressing (linear probing, quadratic probing).",
        feedback: '',
      },
      {
        questionId: "2",
        type: "file",
        value: {
          fileName: "binary_search_tree.py",
          fileType: "text/x-python",
          fileSize: 1024,
          fileUrl: "blob:bst_user1_789012.py",
          uploadedAt: "2026-01-02T13:30:00Z",
        },
      },
    ],
    score: null,
    totalQuestions: 2,
    startedAt: "2026-01-02T13:00:00Z",
    completedAt: "2026-01-02T14:00:00Z",
    status: "pending",
  },
]
