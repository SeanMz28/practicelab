# Parallel Computing — Practice Test 1 — Marking Memo

**Total: 55 marks**

---

## Section A — MCQ / MAQ

### Q1 (2) — **c. It can simulate the weaker PRAM variants without asymptotic slowdown**
CRCW can emulate CREW and EREW with no asymptotic loss, so it is at least as
powerful; the converse is not generally true.

### Q2 (3) — **a, b, d** (penalise c)
ILP returns are diminishing, the thermal/leakage wall blocks clock-scaling, and
compilers have made parallel programming somewhat easier. Intercore coordination
has gotten *harder*, not cheaper, with more cores — so (c) is wrong.

### Q3 (2) — **c. Two cores cache the same line; one writes, the other later reads the old value**
This is the textbook cache-coherence problem. (a) is a fault, (b) is a cold miss,
(d) is over-broad and not what coherence protocols actually do.

### Q4 (3) — **a, c** (penalise b, d)
2D and 3D torus are regular networks. A 64-node hypercube has bisection width 32;
a 4×4×4 3D torus also has bisection width 32 (2 × 4 × 4). A ring has bisection
width 2 but a fat tree's bisection width depends on its construction and is
generally not 2. A bus is *not* performance-scalable.

### Q5 (3) — **a, c** (penalise b, d)
Distributed memory requires explicit message passing; shared memory needs careful
consistency management. The OS does not magically coordinate updates across nodes
in distributed memory, and shared-memory systems do not scale better at very
large processor counts.

### Q6 (2) — **b. Map tasks to threads/processes to balance load and minimize idle time**
This is the goal of the assignment step. (a) belongs to platform selection,
(c) to the orchestration step, (d) contradicts the point of parallelism.

### Q7 (2) — **c. Some value ≤ 12**
With `omp_set_dynamic(1)` the runtime is free to give fewer threads than the
request. Thread 0 only ever sees one assignment, but its size is bounded above
by the request, not guaranteed to equal it.

### Q8 (2) — **b. 2, 6, 10, 14**
`schedule(static, 1)` with 4 threads round-robins iterations.
Thread 2 picks up iterations 2, 6, 10, 14 (iteration 18 doesn't exist since
the upper bound is `< 18`).

### Q9 (2) — **a. Only the outermost loop**
Without `collapse`, a `for` construct parallelizes the immediately following
loop only.

### Q10 (2) — **c. Tasks are asynchronous, sections are statically assigned**
`task` units may run later, by any thread; `sections` statically hands each
section to one thread in the team for immediate execution.

### Q11 (2) — **b. Caused by the cache-coherence protocol**
Race conditions are caused by unsynchronized access to shared state, not by
coherence (coherence is in fact what *makes the problem visible*). The other
statements are accurate.

### Q12 (1) — **False**
Each iteration reads only `i` and writes `x[i]` and `y[i]`. `y[i]` depends on
`x[i]` from the *same* iteration. No loop-carried dependency.

### Q13 (1) — **True**
EREW = Exclusive Read, Exclusive Write. Simultaneous reads of the same location
must be serialized.

### Q14 (2) — **b. `lastprivate(x)`**
We want the value `x` would take after the last iteration of the sequential
loop, i.e. iteration `k = N`. `lastprivate(x)` copies out the value from the
logically last iteration. `reduction(*:x)` would produce a product over threads;
`private`/`shared` either leave `x` unchanged or race.

---

## Section B — Code Analysis

### Q15 (2) — **a. The dot-product reduction**
- **a** is correct: `reduction(+:dotp)` gives each thread a private accumulator
  and combines safely at the end.
- **b** is illegal: you can't `break` from a parallel `for`.
- **c** has a loop-carried dependency on `a[i-k]`.
- **d** has a loop-carried dependency on `a[i-1]`.

### Q16 (4)

(a) **`e = 4`** (2 marks).
`a` enters the task by `firstprivate(a)` with the value visible at task
creation, which is the file-scope `a = 1`. Inside the task, `c = 3` is shared
from the outer parallel region, so `e = a + c = 1 + 3 = 4`.

(b) **2 tasks** (2 marks).
The outer parallel region has 2 threads. Inside each, the inner parallel region
spawns 3 threads, but `#pragma omp single` ensures only *one* of those 3 threads
executes the `task` construct. Two outer teams × one task each = **2 tasks**.

### Q17 (3)

```c
#pragma omp parallel default(none) shared(result) private(x)
```

- `result` must be **shared** so that the `critical` accumulation has a single
  global target. (1 mark)
- `x` must be **private** — otherwise threads overwrite each other's
  intermediate value of `x` between the `heavy_work` call and the `combine`
  call. (1 mark)
- `i`, `id`, `nthr` are declared inside the parallel region (or are loop
  control) so they are already implicitly private; `N` and the function names
  are not data being assigned to. (1 mark for explicitly addressing `default(none)`
  and naming `result`/`x` correctly.)

---

## Section C — Performance & Memory

### Q18 (1) — **57.6 GFLOPS**
6 cores × 2.4 × 10⁹ cycles/s × 4 FLOPs/cycle = 57.6 × 10⁹ FLOPs/s.

### Q19 (3)

(a) Peak per core = 2.5 GHz × 4 FLOPs/cycle = **10 GFLOPS**. (1 mark)

(b) Dot product `c += a[i]*b[i]`. Each iteration needs one element of `a` and
one of `b`. A 64-byte cache line holds 16 floats, so two cache lines (one
from `a`, one from `b`) feed 16 iterations = **16 multiplies + 16 adds = 32 FLOPs**.

DRAM-bound time for those two lines: 2 × 25 ns = 50 ns.

Peak achievable = 32 FLOPs / 50 ns = **0.64 GFLOPS**. (2 marks — 1 for setup,
1 for the result.)

### Q20 (3)

Let `T(1)` be unknown. Time on `P_F` CPUs with linear speedup on the parallel
fraction:

```
T(P_F) = f · T(1) + (1 − f) · T(1) / P_F
       = T(1) · [ f + (1 − f)/P_F ]
```

Solve for `T(1)`:

```
T(1) = T(P_F) / [ f + (1 − f)/P_F ]
     = T(P_F) · P_F / [ f · P_F + (1 − f) ]
```

(1 mark for setting up Amdahl on `T(P_F)`, 1 mark for isolating `T(1)`,
1 mark for the simplified closed form.)

### Q21 (2) — **14 processors**
Serial fraction `f = 0.4 / 4 = 0.10`, parallel fraction `= 0.90`.

Amdahl: `S = 1 / (f + (1 − f)/P) = 1 / (0.10 + 0.90/P)`.

Set `S = 6`:

```
0.10 + 0.90/P = 1/6 ≈ 0.16667
0.90/P = 0.06667
P ≈ 13.5  →  ⌈13.5⌉ = 14
```

(1 mark for the equation, 1 mark for rounding up to 14.)

---

## Section D — Algorithm Design

### Q22 (4)

(a) **Recursive doubling on a hypercube** (3 marks).
At step `i` (for `i = 0, 1, …, n − 1`):

- Every node that already has the data sends it across its dimension-`i` link
  to the partner that differs only in bit `i`.

Initially node 0 holds the data; after step 0 nodes {0, 1} hold it; after
step 1 nodes {0, 1, 2, 3}; … after step `n − 1` all 2ⁿ nodes hold it.

(b) **Communication time complexity is `O(log P) = O(n)`** (1 mark).
This is asymptotically optimal: any broadcast on a network of diameter `D`
needs Ω(D) time, and the hypercube has diameter `log P`, so the algorithm is
efficient.

### Q23 (4) — **a, d** (penalise b, c)
- (a) **Correct.** The whole `partial_bins` array is `2 × 8 × 4 = 64` bytes,
  i.e. one 64-byte cache line. Both threads write to that single line every
  iteration → severe false sharing.
- (b) **Incorrect.** There is no race: thread `k` only ever writes
  `partial_bins[k][…]`.
- (c) **Incorrect** in spirit: `NUM_BINS` is dictated by the application, not
  a tunable. Even if you set it to 16 to align rows on separate cache lines,
  you'd be changing the algorithm's semantics.
- (d) **Correct.** A stack-local `int partial[NUM_BINS]` per thread lives on
  each thread's own stack frame, so updates can never collide on the same
  cache line. Merge with `omp critical`, `atomic`, or a serial reduce after
  the parallel region.

---

## Section E — `max_array_omp` (Q24, 5 marks)

(a) (1 mark) The shared variable `max` is read and written by all threads
without synchronization. This is a textbook race condition — updates can be
lost and the function can return a value smaller than the true maximum.

(b) (2 marks per correct implementation, capped at 4).

**Implementation 1 — `reduction(max:…)` (cleanest):**

```c
int max_array_omp(const int *d, int n) {
    int m = INT_MIN;
    #pragma omp parallel for reduction(max:m)
    for (int i = 0; i < n; i++)
        if (d[i] > m) m = d[i];
    return m;
}
```

**Implementation 2 — per-thread local max + critical merge:**

```c
int max_array_omp(const int *d, int n) {
    int m = INT_MIN;
    #pragma omp parallel
    {
        int local = INT_MIN;
        #pragma omp for nowait
        for (int i = 0; i < n; i++)
            if (d[i] > local) local = d[i];
        #pragma omp critical
        if (local > m) m = local;
    }
    return m;
}
```

**Trade-off:** Implementation 1 is shorter and lets the runtime pick the most
efficient reduction tree; Implementation 2 makes the per-thread accumulator
explicit, which is useful when the reduction operator is custom (no `reduction`
clause available) or you want to inspect per-thread results.

---

## Section F — `par_count_prime` (Q25, 5 marks)

A correct, task-based parallelization (3 marks for correctness, 1 mark for
synchronization choice, 1 mark for the justification):

```c
int par_count_prime(struct Node *head) {
    int count = 0;
    #pragma omp parallel
    {
        #pragma omp single
        {
            for (struct Node *p = head; p != NULL; p = p->next) {
                #pragma omp task firstprivate(p) shared(count)
                {
                    if (is_prime(p->value)) {
                        #pragma omp atomic
                        count++;
                    }
                }
            }
        } /* implicit taskwait at end of single */
    }
    return count;
}
```

**Justification:** Walking the list is inherently sequential (you can't reach
node `i` without dereferencing `node[i-1]->next`), so a single thread does the
walk and spawns one task per node. `firstprivate(p)` captures the current
pointer per task. `is_prime` runs in parallel across the team; the count is
updated with `atomic` to avoid a race. An equally acceptable variant copies
the list into an array first and uses `#pragma omp parallel for
reduction(+:count)` — that gives better speedup but changes the algorithm.

---

## Mark Allocation Summary

| Section | Marks |
|---|---|
| A (Q1–Q14) | 29 |
| B (Q15–Q17) | 9 |
| C (Q18–Q21) | 9 |
| D (Q22–Q23) | 8 |
| E (Q24) | 5 |
| F (Q25) | 5 |
| **Total** | **55** |

*Note on negative marking:* MAQ questions Q2, Q4, Q5, Q23 follow the convention
in past papers — partial credit for the correct subset, with a small penalty
for incorrect selections (typically `−0.5` per wrong tick), floored at 0 for
the question.
