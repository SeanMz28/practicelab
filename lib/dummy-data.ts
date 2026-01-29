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
        feedback: null,
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
