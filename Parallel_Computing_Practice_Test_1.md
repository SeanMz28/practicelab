# Parallel Computing — Practice Test 1

**Total marks: 55 | Suggested time: 130 minutes**

Topics covered: PRAM models, multicore architecture, Amdahl's law, cache coherency,
interconnection networks, parallel algorithm design, OpenMP (parallel/for/sections/tasks,
data scoping, reductions, synchronization), memory hierarchy & peak performance, false
sharing, race conditions.

---

## Section A — Multiple Choice / Multiple Answer

### Question 1 (2 marks)
A CRCW-PRAM model is generally considered more capable than EREW-PRAM and CREW-PRAM
because:

a. It needs fewer processing elements for the same problem
b. It avoids the need for shared memory altogether
c. It can simulate the weaker PRAM variants without asymptotic slowdown
d. It removes the need for any synchronization primitive

---

### Question 2 (3 marks — MAQ, negative marks for wrong choices)
Which of the following helps explain why CPU vendors moved away from chasing higher
single-core clock speeds toward designs with many cores?

a. Diminishing returns from extracting more instruction-level parallelism
b. Heat density and current leakage in deeply scaled transistors
c. A reduction in the cost of inter-core coherence traffic
d. Compilers having solved automatic parallelization

---

### Question 3 (2 marks)
Which scenario best illustrates a *cache coherency* problem?

a. A thread reads a freshly allocated buffer and gets a page fault
b. A core's load incurs a miss because the block has never been accessed
c. Two cores cache the same line; one writes, the other later reads the old value
d. A write-through cache flushes the entire cache to DRAM after every store

---

### Question 4 (3 marks — MAQ)
Choose the statements that are **true** about interconnection networks. Assume a 3D
torus of size 4 × 4 × 4.

a. A 2D torus and a 3D torus are both regular networks
b. A ring and a fat tree both have a bisection width of 2
c. A 64-node hypercube and the 4 × 4 × 4 3D torus have the same bisection width
d. A bus interconnect scales well in performance as nodes are added

---

### Question 5 (3 marks — MAQ)
Pick the correct statement(s) regarding shared- vs distributed-memory programming.

a. In distributed memory, communication and synchronization must be expressed
   explicitly by the programmer
b. In distributed memory, the OS guarantees coherent updates across all nodes
   automatically
c. In shared memory, careful management of memory consistency is required to avoid
   data corruption
d. Shared-memory machines scale better than distributed-memory clusters for very
   large numbers of processors

---

### Question 6 (2 marks)
During the *task assignment* step of designing a parallel algorithm, the primary goal
is to:

a. Pick the target hardware before any decomposition
b. Map tasks to threads/processes so as to balance load and minimize idle time
c. Define the wire-level protocol for inter-node messaging
d. Force a strict sequential order to eliminate race conditions

---

### Question 7 (2 marks)
What is the value of `num_threads` observed by thread 0 in this snippet?

```c
int num_threads;
omp_set_dynamic(1);
omp_set_num_threads(12);
#pragma omp parallel private(num_threads)
{
    num_threads = omp_get_num_threads();
    /* ... */
}
```

a. Exactly 12
b. Exactly 1
c. Some value ≤ 12 (the runtime may give fewer threads)
d. Exactly 0

---

### Question 8 (2 marks)
Consider the loop:

```c
#pragma omp parallel num_threads(4)
#pragma omp for schedule(static, 1)
for (int i = 0; i < 18; i++) { ... }
```

Which iterations end up on thread 2? (Iterations are numbered from 0.)

a. 8, 9, 10, 11, 12
b. 2, 6, 10, 14
c. 2, 3, 4, 5
d. 2, 6, 10, 14, 18

---

### Question 9 (2 marks)
A regular `for` construct without a `collapse` clause can:

a. Parallelize only the outermost loop
b. Parallelize an arbitrary number of nested loops automatically
c. Parallelize only loops whose body is enclosed in `#pragma omp critical`
d. Parallelize all loops marked `private`

---

### Question 10 (2 marks)
Which best describes the difference between OpenMP `sections`/`section` and `task`?

a. `task` requires being inside a `parallel` region; `sections` does not
b. `sections` allows recursive parallelism, but `task` does not
c. `task` creates units of work that can run asynchronously and out of order;
   `sections` statically assigns each section to a thread in the team
d. `task` guarantees the order tasks were defined; `sections` does not

---

### Question 11 (2 marks)
Which of the following is the **incorrect** statement about race conditions?

a. They typically arise when threads in a team concurrently update the same
   shared variable
b. They are primarily caused by the hardware's cache-coherence protocol
c. They can produce incorrect or non-deterministic results
d. Appropriate synchronization (e.g., `critical`, `atomic`) can eliminate them

---

### Question 12 (1 mark)
True or false: the following loop has a loop-carried dependency.

```c
for (int i = 0; i < n; i++) {
    x[i] = a + i * h;
    y[i] = exp(x[i]);
}
```

---

### Question 13 (1 mark)
True or false: in an EREW-PRAM, simultaneous reads to the same memory location by
different processing elements are serialized.

---

### Question 14 (2 marks)
Given:

```c
int k, x = 5, y = 5;
const int N = 8;
#pragma omp parallel for private(k)
for (k = 1; k <= N; k++) {
    x = y * k;
}
printf("x=%d (expected x=%d)\n", x, y * N);
```

Which single change makes the printed value of `x` deterministic and equal to `y*N`?

a. Add `private(x)` to the `parallel for`
b. Add `lastprivate(x)` to the `parallel for`
c. Add `reduction(*:x)` to the `parallel for`
d. Add `shared(x)` to the `parallel for`

---

## Section B — Code Analysis

### Question 15 (2 marks)
Which of the following parallel `for` parallelizations is **correct**?

a.
```c
#pragma omp parallel for reduction(+:dotp)
for (int i = 0; i < n; i++)
    dotp += a[i] * b[i];
```

b.
```c
#pragma omp parallel for
for (int i = 0; i < n; i++) {
    a[i] = compute(i);
    if (a[i] < b[i]) break;
}
```

c.
```c
#pragma omp parallel for
for (int i = k; i < n; i++)
    a[i] = a[i] + a[i - k];
```

d.
```c
#pragma omp parallel for
for (int i = 1; i < 100; i++)
    a[i] = i * a[i - 1];
```

---

### Question 16 (4 marks)
Consider:

```c
int a = 1;
int main(int argc, char **argv) {
    int b = 2, c = 3;
    omp_set_nested(1);
    #pragma omp parallel num_threads(2) shared(a,b,c)
    {
        #pragma omp parallel num_threads(3)
        {
            int d = 4;
            #pragma omp single
            #pragma omp task firstprivate(a)
            {
                int e, f;
                e = a + c;     /* (i) */
                f = b + c;     /* (ii) */
            }
        }
    }
}
```

(a) What is the value of `e` inside the task? Justify briefly. **(2 marks)**

(b) How many `task` constructs are *generated* across the whole program?
    Justify briefly. **(2 marks)**

---

### Question 17 (3 marks)
The serial loop below is parallelized using OpenMP. State the data-scoping clauses
that should follow `#pragma omp parallel` to produce the same result as the serial
version, and briefly justify each choice.

```c
float result = 0.0f, x;
int i;
#pragma omp parallel default(none)
{
    int id   = omp_get_thread_num();
    int nthr = omp_get_num_threads();
    for (i = id; i < N; i += nthr) {
        x = heavy_work(i);
        #pragma omp critical
        result += combine(x);
    }
}
```

---

## Section C — Performance & Memory Hierarchy

### Question 18 (1 mark)
A workstation has a 6-core CPU running at 2.4 GHz. Each core can retire 4 floating-
point operations per clock cycle. What is the theoretical peak performance in GFLOPS?

---

### Question 19 (3 marks)
Consider a memory system with 8 GB DRAM and a 128 KB L1 cache. The CPU runs at
2.5 GHz and can issue 4 FLOPs per cycle (floats are 4 bytes). DRAM latency is
`l_DRAM = 25 ns`, L1 latency is `l_L1 = 0.5 ns`. Each memory cycle the processor
fetches 64 bytes. The memory bus delivers 16 GB/s.

(a) Compute the theoretical peak performance of the CPU in GFLOPS. **(1 mark)**

(b) For a vector-vector dot product, what is the peak achievable performance in
    GFLOPS if only `l_DRAM` is considered? Show your working. **(2 marks)**

---

### Question 20 (3 marks)
Suppose a problem runs in `T(P_F)` seconds on `P_F` fast CPUs (CPU-F), and a fraction
`f` of the total time is non-parallelizable. The parallel portion exhibits linear
speedup. Derive a closed-form expression for `T(1)`, the time on a single CPU-F, in
terms of `f`, `P_F`, and `T(P_F)`.

---

### Question 21 (2 marks)
A program that does 4 seconds of work on one processor has been benchmarked and 0.4
seconds is purely serial (initialization and I/O). What is the minimum number of
processors required to reach a (strong) speedup of 6? Round up to the nearest
integer.

---

## Section D — Parallel Algorithm Design

### Question 22 (4 marks)
Consider a distributed-memory machine of `P = 2^n` nodes connected as a hypercube.
One node holds a value that must be broadcast to all others.

(a) Describe an efficient broadcast algorithm that exploits the hypercube structure.
    **(3 marks)**

(b) State the communication time complexity of your algorithm and briefly justify
    whether it is efficient. **(1 mark)**

---

### Question 23 (4 marks — MAQ, negative marks for wrong choices)
A two-thread histogram is implemented as below. Cache lines are 64 bytes,
`int` is 4 bytes, and `N` is very large.

```c
#define NUM_BINS    8
#define NUM_THREADS 2
float input[N];
int   histogram_bins[NUM_BINS];
int   partial_bins[NUM_THREADS][NUM_BINS];   /* zero-initialized */

#pragma omp parallel num_threads(NUM_THREADS)
{
    int k = omp_get_thread_num();
    #pragma omp for
    for (int i = 0; i < N; i++)
        partial_bins[k][bin_func(input[i])]++;
}
for (int i = 0; i < NUM_BINS; i++)
    histogram_bins[i] = partial_bins[0][i] + partial_bins[1][i];
```

Speedup is far below 2×. Pick the correct statement(s):

a. The poor performance is caused primarily by *false sharing* on `partial_bins`
b. The poor performance is caused by a data race on `partial_bins[k][...]`
c. Increasing `NUM_BINS` to at least 16 would, on its own, eliminate the problem
d. Giving each thread a stack-local `int partial[NUM_BINS]` and merging at the end
   (with appropriate synchronization) would remove the bottleneck

---

## Section E — OpenMP Programming Question

### Question 24 (5 marks)
The serial function below returns the maximum element of an `n`-element array.

```c
int max_array(const int *d, int n) {
    int max = INT_MIN;
    for (int i = 0; i < n; i++)
        if (d[i] > max) max = d[i];
    return max;
}
```

A student's attempt at parallelizing it is broken:

```c
int max_array_omp(const int *d, int n) {
    int max = INT_MIN;
    #pragma omp parallel
    #pragma omp for schedule(static)
    for (int i = 0; i < n; i++)
        if (d[i] > max) max = d[i];
    return max;
}
```

(a) Explain in one or two sentences why the student's version is incorrect.
    **(1 mark)**

(b) Provide **two distinct** correct OpenMP implementations of `max_array_omp` that
    (i) always return the true maximum, and (ii) can achieve a speedup greater than
    1 for large `n`. Write each as a complete C function in the same style as the
    serial code. Briefly note the trade-off between the two. **(4 marks)**

---

## Section F — Linked-List Programming Question

### Question 25 (5 marks)
You are given a singly linked list whose nodes hold an `int`. Below is a sequential
function that counts how many of the integer payloads are prime:

```c
struct Node { int value; struct Node *next; };

int seq_count_prime(struct Node *head) {
    int count = 0;
    for (struct Node *p = head; p != NULL; p = p->next)
        if (is_prime(p->value)) count++;
    return count;
}
```

Write an OpenMP-parallel version `par_count_prime(struct Node *head)` that returns
the same value. You may assume `is_prime` is thread-safe and that the list is not
modified during the count. Your code must be **correct**; achieving a speedup > 1
is **not** required (in fact, traversal of a singly linked list is inherently
sequential — exploit task parallelism for the `is_prime` checks).

Briefly justify your choice of OpenMP constructs in one or two sentences.

---

## End of Practice Test 1
