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
  type: "multiple-choice" | "text" | "file" | "ordered-list" | "memory-verse" | "spelling" | "multi-select" | "matching"
  question: string
  points: number
  options?: string[] // For multiple-choice, multi-select, and matching (the draggable answers)
  correctAnswer?: number // For multiple-choice
  correctOptions?: number[] // For multi-select: indices of every option to pick
  matchPrompts?: string[] // For matching: the fields answers are dropped into
  correctMatches?: number[] // For matching: for each prompt, the index of its option
  correctText?: string // For memory scripture
  correctAnswers?: string[] // For ordered lists
  orderedListHint?: string // Optional prompt shown while entering ordered-list items
  answerLayout?: "paired" // Show each ordered-list answer as a pair of fields
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
  type: "multiple-choice" | "text" | "file" | "ordered-list" | "memory-verse" | "spelling" | "multi-select" | "matching"
  value: number | string | string[] | number[] | FileSubmission
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
  {
    id: "7",
    name: "Cyber Security",
    code: "CYBR401",
    description: "Security engineering principles: Least Privilege, Fail-Safe Defaults, Zero Trust, and the named traps.",
    color: "bg-red-500",
  },
  {
    id: "8",
    name: "Bible Studies",
    code: "BIBLE101",
    description: "Bible studies focused on building a deeper relationship with God.",
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
  {
    id: "word-of-god-notes",
    courseId: "8",
    title: "The Word of God",
    content: `# The Word of God

> **Purpose:** To help you decide to make the Bible your standard for life and to build a conviction about what the Bible says about itself.

## Opening Discussion

- What is your viewpoint of the Bible?
- Do you believe it is the divine Word of God?
- Consider the validity of the Bible.

## Facts About the Bible

- The Bible contains **66 books** written by approximately **40 authors**.
- It was written in three languages: **Hebrew, Aramaic, and Greek**.
- It was written on three continents: **Africa, Asia, and Europe**.
- Approximately 400 Old Testament prophecies about Jesus were fulfilled in the New Testament.
- The Bible was written over a period of approximately **1,500 years**.
- The study notes that archaeological discoveries have supported, rather than contradicted, the Bible.
- More than 40,000 ancient copies exist—more than for any other ancient manuscript.
- Scientific examples referenced in the study:
  - **Isaiah 40:22:** The Earth is a sphere.
  - **Isaiah 55:10–11:** The water cycle.
  - **Job 26:7:** The Earth floats freely in space.

### The Ruler Illustration

If someone asked you to determine the length of a Bible in inches or centimetres, you would need a fixed standard of measurement, such as a ruler. Anything else would only be a guess.

**Question:** What is the standard of measurement in your life?

## 2 Timothy 3:16–17

- Do you believe that all Scripture is from God?
- The Bible is useful for **teaching, rebuking, correcting, and training in righteousness**.
- To be thoroughly equipped, we need to use the Bible and allow it to affect our lives.
- The Bible is an absolute. Are you ready to make it an absolute in your life?

## Hebrews 4:12–13

- The Word of God is not dead; it remains relevant because it exposes the human heart, which has not changed.
- People still struggle with lust, deceit, pride, and other sins, just as people did 2,000 years ago.
- The Bible is like a double-edged sword. Although the process may hurt, it cuts sin out of us.
- It cuts through the layers of the heart to expose the truth, like a scalpel removing cancer.

**Question:** Are you willing to allow the Bible to cut your heart so that you can be healed?

## Three Things That Take Away From God's Word

### 1. Interpretation — 2 Peter 1:19–21

- The Bible is meant to be read and applied, not changed to suit our opinions.
- Consider a doctor who gives a prescription, but the pharmacist decides to change it.
- It is not about who is right, but **what is right**.
- The Word determines how a church should be.

### 2. Emotions — John 8:31–32

- Individual emotions and rationalising the Bible can pull us away from the truth.
- Being stopped for speeding but not feeling as though you were speeding does not make you innocent.
- Merely saying or feeling that you believe does not replace holding to Scripture.
- A person can be sincerely wrong.

**Question:** Which Scriptures are challenging for you to obey?

### 3. Traditions — Mark 7:1–13

- We must choose the truth of God's Word over religious or cultural tradition.
- Worship based on tradition that supersedes God's Word is worship in vain.
- The Jewish tradition of Corban allowed money to be given to the synagogue instead of being used to provide for one's parents, thereby dishonouring them.

**Question:** Are you aware of religious traditions that disobey God's Word?

## 1 Timothy 4:16

- Which is more important: life or doctrine? **Both are equally important.**
- Watch out for interpretations, emotions, or traditions that can stop you from obeying the Word of God.

## Acts 17:10–11

- Do you want a noble character? What do you need to do?
- Eagerly examine the Scriptures every day.
- The Bereans examined the Scriptures for themselves, and so should we.

## James 1:22–25

- Listening without trying to change leads to self-deception.
- The Word of God is a mirror: it reveals our character so that we can change it.
- Do not forget what you see. Apply the Bible by doing what it says.

**Question:** Are you willing to look intently into the Bible so that you can change and have freedom from sin?

## John 12:48

- Jesus says that His Word will judge us.
- The Bible is God's standard. Will it be your standard?

## Memory Scriptures

- **Philippians 4:13**
- **John 8:31–32**

## Challenge

Eagerly examine the Scriptures every day so that you can make God's Word your standard for life. Continue reading one or two chapters of the Gospel of John each day as you pray.
`,
    createdAt: "2026-09-12T10:00:00Z",
    updatedAt: "2026-09-12T10:00:00Z",
  },
  {
    id: "discipleship-notes",
    courseId: "8",
    title: "Discipleship",
    content: `# Discipleship

> **Purpose:** Explore how Jesus calls people to follow him, learn from him, love one another, and help others become disciples. Adapted from the supplied *Discipleship* study notes.

## The Great Commission — Matthew 28:16–20

After his resurrection, Jesus speaks to the eleven disciples in Galilee. He says that all authority in heaven and on earth has been given to him. He sends them to **make disciples of all nations**, baptize them, and teach them to obey everything he commanded. He promises to be with them always.

- The commission is addressed to disciples, who are to make and teach other disciples.
- Teaching obedience is an ongoing part of discipleship, not a one-time lesson.
- **Discuss:** How does this commission shape your priorities and the way you help others follow Jesus?

## Disciples and Christians — Acts 11:25–26

Barnabas brought Saul to Antioch, where they taught the church for a year. Acts says that **the disciples were first called Christians at Antioch**. The study uses this passage to argue that “Christian” and “disciple” describe the same followers of Jesus; it challenges the idea of a less committed category of Christian.

The other New Testament uses of “Christian” are **Acts 26:28** and **1 Peter 4:16**. Read those passages alongside Acts 11 and consider what they add.

- **Discuss:** What do you mean by “Christian” and “disciple”? Does your definition reflect the way these passages use the words?

## Jesus calls his first disciples — Mark 1:14–18

Jesus announces the good news of God's kingdom and calls Simon and Andrew away from their fishing nets to follow him. They respond at once. The study highlights **following Jesus** and **fishing for people**—helping others come to him—as parts of their new purpose. Their immediate response and abandoned nets illustrate urgency and sacrifice.

- **Discuss:** What might your “nets” be: the work, ambitions, or habits you would find hard to release?

## Following daily — Luke 9:23–26

Jesus addresses everyone who wants to be his disciple: deny yourself, take up your cross **daily**, and follow him. The study explains self-denial as choosing Jesus' will over one's own desires and ambitions. In the Roman world, a cross was an instrument of execution; the image conveys a costly, daily surrender. Jesus also warns against being ashamed of him and his words.

- **Discuss:** Where do your choices show that you follow Jesus? Where do they pull in another direction?

## Counting the cost — Luke 14:25–33

Jesus tells the large crowds to count the cost, using the examples of a builder planning a tower and a king weighing a battle. He calls for loyalty to him above family, possessions, and even one's own life. The study stresses that discipleship calls for a whole-life commitment. Read **1 Timothy 4:16** alongside this section: watch both your life and doctrine and persevere in them.

- **Discuss:** What would putting Jesus first cost you in practice? What helps you persevere?

## Learning to pray — Luke 11:1–4

When a disciple asks Jesus to teach them to pray, Jesus gives a pattern that honours the Father, asks for daily provision and forgiveness, and seeks help against temptation. The study offers **ACTS** as another prayer guide:

1. **Adoration** — praise God.
2. **Confession** — admit sin and seek forgiveness.
3. **Thanksgiving** — thank God.
4. **Supplication** — bring requests to God.

## Love in action — Matthew 22:34–40; John 13:34–35

Jesus names love for God with all your heart, soul, and mind as the greatest commandment, followed by love for your neighbour as yourself. He commands his disciples to love one another **as he loved them**; that love makes their discipleship visible to others. The study describes this love as humble service and concrete action, not merely a feeling (see **1 John 3:18**).

- **Discuss:** What specific act of love could you offer someone this week?

## Holding to Jesus' teaching — John 8:31–32

Jesus says that those who hold to his teaching are truly his disciples. The study connects discipleship with continuing to learn, obey, and imitate him. A disciple is a **learner, follower, and apprentice of Jesus Christ**. Return to Matthew 28:18–20: disciples who are taught to obey are also sent to make disciples.

- **Reflect:** Would your daily life be recognisable as that of a disciple of Jesus? What is one next step?

### Closing questions from the study

1. Would Jesus describe you as his disciple?
2. How does that shape the way you understand being a Christian?
3. What do these scriptures lead you to believe about your relationship with God today?

## Memory scriptures (NIV)

- **Mark 1:17:** “Come, follow me,” Jesus said, “and I will send you out to fish for people.” ([NIV text](https://www.biblica.com/bible/niv/mark/1/klb/))
- **John 13:34–35:** “A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AJohn+13%3A31%E2%80%9335))

## Books of the Bible: Genesis through Jeremiah

Memorize these **24 books in order**:

1. Genesis
2. Exodus
3. Leviticus
4. Numbers
5. Deuteronomy
6. Joshua
7. Judges
8. Ruth
9. 1 Samuel
10. 2 Samuel
11. 1 Kings
12. 2 Kings
13. 1 Chronicles
14. 2 Chronicles
15. Ezra
16. Nehemiah
17. Esther
18. Job
19. Psalms
20. Proverbs
21. Ecclesiastes
22. Song of Songs
23. Isaiah
24. Jeremiah
`,
    createdAt: "2026-09-14T10:00:00Z",
    updatedAt: "2026-09-14T10:00:00Z",
  },
  {
    id: "coming-of-the-kingdom-notes",
    courseId: "8",
    title: "The Coming of the Kingdom",
    content: `# The Coming of the Kingdom

> **Purpose:** Discover the purpose of God's kingdom on earth. Adapted from the supplied *The Coming of the Kingdom* study notes.

## Six questions

1. What is the kingdom of God?
2. When did the kingdom of God come — if it did?
3. How does one enter the kingdom?
4. Do the Old Testament and New Testament fit together?
5. Is it important where I go to church?
6. Is it important if I go to church?

Keep these questions in mind; the study answers each one from Scripture.

## Old Testament predictions of the kingdom

Israel was at the height of its glory under King David, around 1000 B.C. The prophets later looked ahead to a greater kingdom.

### Isaiah 2:1–4 (750 B.C.)

- In the last days, the “mountain of the Lord's temple” will be established.
- **All nations** will stream to it.
- People will be taught his ways.
- The word of the Lord will go out from **Jerusalem**.

### Daniel 2:31–45 (550 B.C.)

A large statue represents a timeline of kingdoms:

- **Head of gold:** Babylon (605 B.C. to 539 B.C.)
- **Chest and arms of silver:** Medo-Persia (539 B.C. to 331 B.C.)
- **Belly and thighs of bronze:** Greece (331 B.C. to 63 B.C.)
- **Legs of iron and feet of clay:** Rome and the mixture of nations within it (63 B.C. to 476 A.D.)

A rock strikes the statue on its feet of iron and clay, during the latter part of the Roman reign. The rock becomes a huge mountain and fills the whole earth. “In the time of those kings,” God will set up a kingdom (verse 44). Because the rock strikes the feet, **God's kingdom comes during the Roman reign**.

- **Discuss:** When exactly do you think God's kingdom came?

### Key dates to consider

- **1000 B.C.** — Israel is at the height of its glory under King David.
- **930 B.C.** — Israel splits in two: Northern Israel and the South (Judah).
- **750 B.C.** — Isaiah prophesies about the kingdom.
- **722 B.C.** — Northern Israel is taken by Assyria.
- **586 B.C.** — Southern Israel is taken by Babylon.
- **550 B.C.** — Daniel prophesies about the kingdom.

## New Testament predictions of the kingdom

### Matthew 3:1–2 (25 A.D.)

John the Baptist declares that the kingdom is near. Jesus had already been born; John was six months older. This confirms the Old Testament prophecy that the kingdom would come during the Roman reign. **Old and New Testament prophecy are united** (answer to question 4).

### Matthew 4:17 (27 A.D.)

Jesus begins his ministry and declares that the kingdom is near.

### Matthew 16:13–19

- Peter is given the **keys to the kingdom** of God.
- “Peter” in the Greek is ***petros***, which means “small stone.”
- “Rock” in the Greek is ***petra***, which means “large foundational rock.”
- The rock refers to **Jesus** (1 Corinthians 3:11).
- “Church” in the Greek is ***ekklesia***, meaning “a group called out with a common purpose.”
- **The church is God's kingdom on earth** (answer to question 1).

**Kingdom = Church**

- **King** = Jesus
- **Subjects** = Disciples
- **Law** = Bible

### Mark 9:1

- Some standing with Jesus will not “taste death” — or die — before the kingdom of God comes.
- The word “some” is significant: Judas Iscariot did not live to see the day this verse was fulfilled.
- The kingdom will come **with power**.

### John 3:1–7

Nicodemus, a Pharisee and member of the Jewish ruling council, comes to Jesus at night. To enter the kingdom, we must be **born of water and the Spirit** (answer to question 3).

- **Discuss:** What does “born again” mean? Has the kingdom come yet?

### Luke 23:50–51

Joseph of Arimathea, a council member who was waiting for the kingdom of God, asks Pilate for Jesus' body. Jesus has died, but **the kingdom still has not come**.

### Luke 24:44–49

Jesus has risen, but the kingdom still has not come. Here are **four clues** about entering the kingdom:

1. Repentance and forgiveness of sins in Jesus' name
2. To all nations
3. Starting in Jerusalem
4. Power from on high

## Fulfillment

### Acts 1:1–26

- For 40 days after his resurrection, Jesus spoke to his disciples about the kingdom.
- The disciples did not yet fully understand; they were still waiting for a physical kingdom or an earthly king.
- Judas' death is a partial fulfillment of Mark 9:1.
- The prophecies begin to be fulfilled in Acts 1 and 2.

### Acts 2:1–17

Peter's sermon highlights three clues from Luke 24:44–49:

1. **Power from on high** (verses 1–4) — fulfillment of Mark 9:1
2. **Jerusalem** (verse 5) — fulfillment of Isaiah 2:3
3. **Every nation** (verse 5) — fulfillment of Isaiah 2:2

The “last days” (verse 17) also fulfill Isaiah 2:2.

- **Discuss:** Has the kingdom come yet?

### Acts 2:22–24

Peter preaches the essential “keys” to the kingdom — truths we must believe before being born of water and the Spirit (fulfillment of John 3:5):

1. Jesus is from God.
2. Our sins put him on the cross.
3. He rose from the dead!

### Acts 2:36–41

Repentance and forgiveness of sins (verse 38) is the biblical answer for entering the kingdom (fulfillment of Luke 24:44–49). **The kingdom of God has come!** About three thousand people are born again of water and the Spirit (answer to question 2).

### Acts 2:42–47 (30 A.D.)

This is the blueprint for the church. Like the first-century disciples, we must be devoted to the **Bible, prayer, fellowship, and communion (the breaking of bread)**. The church practiced daily discipleship and evangelism (verse 46); they were taught by and imitated the ministry of Jesus (Matthew 26:55).

- Is it important where we go to church? **Yes** (answer to question 5).

### Matthew 6:33

- We must seek first the kingdom. Is it important if we go to church? **Yes** (answer to question 6).
- Our schedules should show that the meetings of the body are a priority: Sunday services, midweeks, devotionals, and Bible Talks.
- We must be willing to sacrifice to put the church — God's kingdom on earth — first in our lives.

> **Challenge:** Seek first the kingdom by being committed to the fellowship of disciples — the church!

## Memory scriptures (NIV)

- **Ezekiel 18:20:** “The one who sins is the one who will die. The child will not share the guilt of the parent, nor will the parent share the guilt of the child. The righteousness of the righteous will be credited to them, and the wickedness of the wicked will be charged against them.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AEzekiel+18%3A20))
- **Galatians 1:8:** “But even if we or an angel from heaven should preach a gospel other than the one we preached to you, let them be under God's curse!” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AGalatians+1%3A8))

## Books of the Bible: Genesis through Malachi

Memorize all **39 books of the Old Testament in order**:

1. Genesis
2. Exodus
3. Leviticus
4. Numbers
5. Deuteronomy
6. Joshua
7. Judges
8. Ruth
9. 1 Samuel
10. 2 Samuel
11. 1 Kings
12. 2 Kings
13. 1 Chronicles
14. 2 Chronicles
15. Ezra
16. Nehemiah
17. Esther
18. Job
19. Psalms
20. Proverbs
21. Ecclesiastes
22. Song of Songs
23. Isaiah
24. Jeremiah
25. Lamentations
26. Ezekiel
27. Daniel
28. Hosea
29. Joel
30. Amos
31. Obadiah
32. Jonah
33. Micah
34. Nahum
35. Habakkuk
36. Zephaniah
37. Haggai
38. Zechariah
39. Malachi
`,
    createdAt: "2026-10-06T10:00:00Z",
    updatedAt: "2026-10-06T10:00:00Z",
  },
]

const wordOfGodStudyQuiz: Assessment = {
    id: "word-of-god-study-quiz",
    courseId: "8",
    title: "Word of God Study Quiz",
    description:
      "Review the key lessons, illustrations, and scriptures from the Word of God Bible study.",
    type: "quiz",
    timeLimit: 15,
    createdAt: "2026-09-10T10:00:00Z",
    questions: [
      {
        id: "wg-q1",
        type: "multiple-choice",
        question: "What is the main purpose of the Word of God study?",
        points: 1,
        options: [
          "To memorize every book of the Bible",
          "To make the Bible your standard for life and build conviction about what it says about itself",
          "To compare different religious traditions",
          "To learn only the historical facts of the Bible",
        ],
        correctAnswer: 1,
        explanation:
          "The study's stated purpose is to help you decide to make the Bible your standard for life and build conviction about what the Bible says about itself.",
      },
      {
        id: "wg-q2",
        type: "multiple-choice",
        question: "Which set of facts about the Bible is given in the study?",
        points: 1,
        options: [
          "66 books, about 40 authors, and three original languages",
          "40 books, 66 authors, and two original languages",
          "66 books, one author, and one original language",
          "73 books, about 12 authors, and four original languages",
        ],
        correctAnswer: 0,
        explanation:
          "The study describes 66 books written by about 40 authors in Hebrew, Aramaic, and Greek.",
      },
      {
        id: "wg-q3",
        type: "multiple-choice",
        question: "According to the study, over approximately how many years was the Bible written?",
        points: 1,
        options: ["150 years", "500 years", "1,000 years", "1,500 years"],
        correctAnswer: 3,
        explanation:
          "The facts section says the Bible was written over an approximately 1,500-year period.",
      },
      {
        id: "wg-q4",
        type: "multiple-choice",
        question: "What does the ruler illustration teach about measuring our lives?",
        points: 1,
        options: [
          "Every person should invent a private standard",
          "Feelings are the most accurate measurement",
          "A reliable judgment requires a fixed standard, and the Bible should be that standard",
          "Standards are unnecessary when intentions are sincere",
        ],
        correctAnswer: 2,
        explanation:
          "Just as a ruler provides a trustworthy standard of length, the study calls us to use God's Word as the standard for our lives.",
      },
      {
        id: "wg-q5",
        type: "multiple-choice",
        question: "According to 2 Timothy 3:16–17, Scripture is useful for which four purposes?",
        points: 1,
        options: [
          "Teaching, rebuking, correcting, and training in righteousness",
          "Predicting, debating, entertaining, and inspiring",
          "Singing, fasting, travelling, and celebrating",
          "Reading, copying, translating, and publishing",
        ],
        correctAnswer: 0,
        explanation:
          "2 Timothy 3:16–17 teaches that Scripture is God-breathed and useful for teaching, rebuking, correcting, and training in righteousness.",
      },
      {
        id: "wg-q6",
        type: "multiple-choice",
        question: "In the study, what is needed for a person to be ‘thoroughly equipped’?",
        points: 1,
        options: [
          "Knowing many Bible facts without changing",
          "Depending only on someone else's interpretation",
          "Using the Bible and allowing it to impact their life",
          "Following whichever teaching feels easiest",
        ],
        correctAnswer: 2,
        explanation:
          "The study says we must use the Bible and allow it to impact our lives in order to be thoroughly equipped.",
      },
      {
        id: "wg-q7",
        type: "multiple-choice",
        question: "What does Hebrews 4:12–13 teach about the Word of God?",
        points: 1,
        options: [
          "It was useful only in the ancient world",
          "It is living and active and exposes the human heart",
          "It avoids addressing a person's motives",
          "It changes according to each person's emotions",
        ],
        correctAnswer: 1,
        explanation:
          "Hebrews 4 describes God's Word as living and active. The study emphasizes that it cuts through the layers of the heart and exposes the truth.",
      },
      {
        id: "wg-q8",
        type: "ordered-list",
        question:
          "Complete all three parts. For each part, write the thing that takes away from God's Word, then write its supporting scripture.",
        points: 3,
        correctAnswers: [
          "Interpretation — 2 Peter 1:19–21",
          "Emotions — John 8:31–32",
          "Traditions — Mark 7:1–13",
        ],
        answerLayout: "paired",
      },
      {
        id: "wg-q9",
        type: "multiple-choice",
        question: "What principle does the study draw from 2 Peter 1:19–21?",
        points: 1,
        options: [
          "Scripture should be changed whenever culture changes",
          "Personal opinions determine what Scripture means",
          "The Bible should be read and applied, not changed to suit our opinions",
          "Only church leaders should examine Scripture",
        ],
        correctAnswer: 2,
        explanation:
          "Under ‘Interpretation,’ the study says the Bible is meant to be read and applied rather than altered to fit our opinions.",
      },
      {
        id: "wg-q10",
        type: "multiple-choice",
        question: "According to the lesson from John 8:31–32, what shows that someone is truly a disciple of Jesus?",
        points: 1,
        options: [
          "Holding to Jesus' teaching",
          "Sincerely feeling that every belief is correct",
          "Never encountering a challenging command",
          "Following religious tradition without question",
        ],
        correctAnswer: 0,
        explanation:
          "Jesus connects discipleship with holding to his teaching. The study warns that feelings and sincerity do not replace obedience to Scripture.",
      },
      {
        id: "wg-q11",
        type: "multiple-choice",
        question: "What warning about tradition is emphasized from Mark 7:1–13?",
        points: 1,
        options: [
          "Every cultural tradition is automatically sinful",
          "Tradition is more authoritative than Scripture",
          "Traditions should never be discussed",
          "Tradition that overrides God's Word can make worship vain",
        ],
        correctAnswer: 3,
        explanation:
          "The study teaches that religious or cultural tradition must not supersede God's Word; worship built on such tradition is in vain.",
      },
      {
        id: "wg-q12",
        type: "multiple-choice",
        question: "According to 1 Timothy 4:16, which is more important: life or doctrine?",
        points: 1,
        options: [
          "Life only",
          "Doctrine only",
          "Both are equally important",
          "Neither matters if a person is sincere",
        ],
        correctAnswer: 2,
        explanation:
          "The study answers that life and doctrine are both important and must be watched closely.",
      },
      {
        id: "wg-q13",
        type: "multiple-choice",
        question: "Why are the Bereans described as noble in Acts 17:10–11?",
        points: 1,
        options: [
          "They eagerly examined the Scriptures every day for themselves",
          "They accepted every teaching without checking it",
          "They relied entirely on tradition",
          "They avoided difficult passages",
        ],
        correctAnswer: 0,
        explanation:
          "The Bereans received the message eagerly and examined the Scriptures daily. The study calls us to do the same for ourselves.",
      },
      {
        id: "wg-q14",
        type: "multiple-choice",
        question: "What illustration does James 1:22–25 use for the Word of God?",
        points: 1,
        options: [
          "A locked door that hides our character",
          "A mirror that reveals our character so we can change",
          "A map that removes the need for action",
          "A scale that compares us with other people",
        ],
        correctAnswer: 1,
        explanation:
          "The Word is compared to a mirror. We should not merely listen and forget, but look intently and do what it says.",
      },
      {
        id: "wg-q15",
        type: "multiple-choice",
        question: "According to John 12:48, what will judge a person on the last day?",
        points: 1,
        options: [
          "Popular opinion",
          "Personal feelings",
          "Religious customs",
          "The words Jesus spoke",
        ],
        correctAnswer: 3,
        explanation:
          "Jesus says that the words he spoke will judge on the last day. The study concludes by challenging us to make God's Word our standard for life.",
      },
      {
        id: "wg-q16",
        type: "memory-verse",
        question: "Write Philippians 4:13 from memory.",
        points: 1,
        correctText: "I can do all this through him who gives me strength.",
      },
      {
        id: "wg-q17",
        type: "memory-verse",
        question: "Write John 8:31–32 from memory.",
        points: 1,
        correctText:
          "To the Jews who had believed him, Jesus said, If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.",
      },
      {
        id: "wg-q18",
        type: "ordered-list",
        question:
          "Write the next eight books of the Bible, from 1 Samuel through Nehemiah, in order.",
        points: 8,
        correctAnswers: [
          "1 Samuel",
          "2 Samuel",
          "1 Kings",
          "2 Kings",
          "1 Chronicles",
          "2 Chronicles",
          "Ezra",
          "Nehemiah",
        ],
        orderedListHint: "Type the next book…",
      },
  ],
}

const discipleshipStudyQuiz: Assessment = {
  id: "discipleship-study-quiz",
  courseId: "8",
  title: "Discipleship Study Quiz",
  description:
    "Review the Discipleship study, recite Mark 1:17 and John 13:34–35 (NIV), and put Genesis through Jeremiah in order.",
  type: "quiz",
  timeLimit: 40,
  createdAt: "2026-09-14T10:00:00Z",
  questions: [
    {
      id: "ds-q1",
      type: "multiple-choice",
      question: "In Matthew 28:18–20, what does Jesus tell the eleven disciples to do?",
      points: 1,
      options: [
        "Remain in Galilee and wait for others to come to them",
        "Make disciples of all nations, baptize them, and teach them to obey his commands",
        "Teach only those who already know every command",
        "Choose a new leader before speaking to anyone else",
      ],
      correctAnswer: 1,
      explanation: "Jesus commissions his disciples to make, baptize, and teach disciples of all nations.",
    },
    {
      id: "ds-q2",
      type: "multiple-choice",
      question: "According to Acts 11:25–26, what were the disciples first called in Antioch?",
      points: 1,
      options: ["Apostles", "Prophets", "Christians", "Pharisees"],
      correctAnswer: 2,
      explanation: "Acts 11:26 says that the disciples were first called Christians at Antioch.",
    },
    {
      id: "ds-q3",
      type: "multiple-choice",
      question: "What two parts of Jesus' call does the study emphasize in Mark 1:17?",
      points: 1,
      options: [
        "Follow Jesus and fish for people",
        "Stay at home and keep fishing",
        "Build a tower and count its cost",
        "Pray and fast without helping others",
      ],
      correctAnswer: 0,
      explanation: "Jesus calls Simon and Andrew to follow him and to fish for people.",
    },
    {
      id: "ds-q4",
      type: "multiple-choice",
      question: "What do Simon and Andrew do after Jesus calls them in Mark 1:18?",
      points: 1,
      options: [
        "They ask him to return the next year",
        "They invite the whole town to a meeting first",
        "They leave their nets at once and follow him",
        "They continue fishing until evening",
      ],
      correctAnswer: 2,
      explanation: "Their immediate response and abandoned nets are the study's examples of urgency and sacrifice.",
    },
    {
      id: "ds-q5",
      type: "multiple-choice",
      question: "According to Luke 9:23, what must a person who wants to be Jesus' disciple do?",
      points: 1,
      options: [
        "Deny themselves, take up their cross daily, and follow him",
        "Gain the whole world before following him",
        "Carry a cross only when others are watching",
        "Avoid speaking about Jesus or his words",
      ],
      correctAnswer: 0,
      explanation: "Jesus describes self-denial, taking up the cross daily, and following him.",
    },
    {
      id: "ds-q6",
      type: "multiple-choice",
      question: "Why does Jesus use the tower and the king in Luke 14:28–33?",
      points: 1,
      options: [
        "To teach construction and military strategy",
        "To encourage people to count the cost of following him",
        "To show that only rulers can become disciples",
        "To say possessions are the measure of faith",
      ],
      correctAnswer: 1,
      explanation: "Both examples call listeners to consider the cost before committing to discipleship.",
    },
    {
      id: "ds-q7",
      type: "multiple-choice",
      question: "In the study, what does ACTS stand for as a prayer guide?",
      points: 1,
      options: [
        "Action, Courage, Truth, Service",
        "Adoration, Confession, Thanksgiving, Supplication",
        "Ask, Consider, Teach, Share",
        "Awareness, Commitment, Trust, Salvation",
      ],
      correctAnswer: 1,
      explanation: "ACTS is Adoration, Confession, Thanksgiving, and Supplication.",
    },
    {
      id: "ds-q8",
      type: "multiple-choice",
      question: "What are the two greatest commandments named in Matthew 22:37–40?",
      points: 1,
      options: [
        "Love God fully and love your neighbour as yourself",
        "Pray daily and never ask for help",
        "Build a tower and win a battle",
        "Learn every book name and avoid all traditions",
      ],
      correctAnswer: 0,
      explanation: "Jesus names wholehearted love for God and love for one's neighbour.",
    },
    {
      id: "ds-q9",
      type: "multiple-choice",
      question: "According to John 13:34–35, what will show others that people are Jesus' disciples?",
      points: 1,
      options: [
        "Their social standing",
        "Their love for one another",
        "Their knowledge of architecture",
        "Their ability to avoid all questions",
      ],
      correctAnswer: 1,
      explanation: "Jesus says that love for one another will identify his disciples.",
    },
    {
      id: "ds-q10",
      type: "multiple-choice",
      question: "What does Jesus say marks a true disciple in John 8:31–32?",
      points: 1,
      options: [
        "Holding to his teaching",
        "Hearing a teaching once and then forgetting it",
        "Being called a Christian by a neighbour",
        "Following only when it is convenient",
      ],
      correctAnswer: 0,
      explanation: "Jesus connects true discipleship with continuing to hold to his teaching.",
    },
    {
      id: "ds-q11",
      type: "multiple-choice",
      question: "In Luke 11:1–4, what does a disciple ask Jesus to teach them?",
      points: 1,
      options: ["How to pray", "How to fish", "How to build", "How to govern"],
      correctAnswer: 0,
      explanation: "One of the disciples asks, ‘Lord, teach us to pray.’",
    },
    {
      id: "ds-q12",
      type: "multiple-choice",
      question: "According to 1 Timothy 4:16, what should a disciple watch closely?",
      points: 1,
      options: [
        "Life and doctrine",
        "Possessions and status",
        "Only what others do",
        "Only the first day of commitment",
      ],
      correctAnswer: 0,
      explanation: "The study asks readers to watch both life and doctrine and persevere in them.",
    },
    {
      id: "ds-q13",
      type: "memory-verse",
      question: "Write Mark 1:17 from memory (NIV).",
      points: 3,
      correctText: "“Come, follow me,” Jesus said, “and I will send you out to fish for people.”",
    },
    {
      id: "ds-q14",
      type: "memory-verse",
      question: "Write John 13:34–35 from memory (NIV).",
      points: 3,
      correctText:
        "“A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.”",
    },
    {
      id: "ds-q15",
      type: "ordered-list",
      question: "Write the first eight books of the Bible, Genesis through Ruth, in order.",
      points: 8,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
      ],
      orderedListHint: "Type the next book…",
    },
    {
      id: "ds-q16",
      type: "ordered-list",
      question: "Continue the books of the Bible from 1 Samuel through Nehemiah, in order.",
      points: 8,
      correctAnswers: [
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
      ],
      orderedListHint: "Type the next book…",
    },
    {
      id: "ds-q17",
      type: "ordered-list",
      question: "Continue the books of the Bible from Esther through Jeremiah, in order.",
      points: 8,
      correctAnswers: [
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
      ],
      orderedListHint: "Type the next book…",
    },
  ],
}

const comingOfTheKingdomStudyQuiz: Assessment = {
  id: "coming-of-the-kingdom-study-quiz",
  courseId: "8",
  title: "The Coming of the Kingdom Study Quiz",
  description:
    "Review The Coming of the Kingdom study, recite Ezekiel 18:20 and Galatians 1:8 (NIV), and put Genesis through Malachi in order.",
  type: "quiz",
  timeLimit: 45,
  createdAt: "2026-10-06T10:00:00Z",
  questions: [
    {
      id: "kog-purpose",
      type: "multiple-choice",
      question: "What is the purpose of The Coming of the Kingdom study?",
      points: 1,
      options: [
        "To predict when the world will end",
        "To trace the history of the Roman Empire",
        "To discover the purpose for God's kingdom on earth",
        "To memorize the kings of Israel and Judah",
      ],
      correctAnswer: 2,
      explanation: "The study's stated purpose is to discover the purpose for God's kingdom on earth.",
    },
    {
      id: "kog-q1",
      type: "multiple-choice",
      question: "According to the study, what is the kingdom of God?",
      points: 1,
      options: [
        "A future political kingdom based in Jerusalem",
        "The church",
        "A feeling of peace inside each believer",
        "The nation of Israel at the height of King David's reign",
      ],
      correctAnswer: 1,
      explanation:
        "From Matthew 16:13–19, the study concludes that the church is God's kingdom on earth.",
    },
    {
      id: "kog-q2",
      type: "multiple-choice",
      question: "In the Kingdom = Church comparison, what do the King, the subjects, and the law correspond to?",
      points: 1,
      options: [
        "King David, Israel, and the Ten Commandments",
        "Caesar, Roman citizens, and Roman law",
        "Jesus, disciples, and the Bible",
        "Peter, the apostles, and tradition",
      ],
      correctAnswer: 2,
      explanation: "The King is Jesus, the subjects are disciples, and the law is the Bible.",
    },
    {
      id: "kog-q3",
      type: "multiple-choice",
      question: "According to Isaiah 2:1–4, where would the word of the Lord go out from?",
      points: 1,
      options: ["Babylon", "Rome", "Jerusalem", "Galilee"],
      correctAnswer: 2,
      explanation:
        "Isaiah prophesied that all nations would stream to the mountain of the Lord's temple and that the word of the Lord would go out from Jerusalem.",
    },
    {
      id: "kog-q4",
      type: "matching",
      question: "Daniel 2 statue: drag each kingdom onto the part of the statue it matches.",
      points: 4,
      matchPrompts: ["Belly and thighs of bronze", "Head of gold", "Legs of iron and feet of clay", "Chest and arms of silver"],
      options: ["Greece", "Babylon", "Rome", "Medo-Persia"],
      correctMatches: [0, 1, 2, 3],
      explanation:
        "Gold is Babylon (605–539 B.C.), silver is Medo-Persia (539–331 B.C.), bronze is Greece (331–63 B.C.), and iron and clay is Rome (63 B.C.–476 A.D.). God's kingdom strikes the statue at the feet.",
    },
    {
      id: "kog-q5",
      type: "multiple-choice",
      question: "What does the rock that strikes the statue and becomes a huge mountain represent in Daniel 2?",
      points: 1,
      options: [
        "God's kingdom",
        "The Babylonian army",
        "The return of Israel from exile",
        "The Greek empire under Alexander",
      ],
      correctAnswer: 0,
      explanation:
        "“In the time of those kings,” God sets up a kingdom (Daniel 2:44). The rock strikes the feet, so the kingdom comes during the Roman reign.",
    },
    {
      id: "kog-q6",
      type: "multiple-choice",
      question: "How does Matthew 3:1–2 show that the Old and New Testaments fit together?",
      points: 1,
      options: [
        "John the Baptist rejects Daniel's prophecy",
        "John the Baptist declares the kingdom is near during the Roman reign, as Daniel predicted",
        "John the Baptist says the kingdom will come after Rome falls",
        "John the Baptist teaches that the kingdom already came under King David",
      ],
      correctAnswer: 1,
      explanation:
        "John announces that the kingdom is near during the Roman reign, which confirms the Old Testament prophecy.",
    },
    {
      id: "kog-q7",
      type: "multiple-choice",
      question: "In Matthew 16:13–19, who is given the keys to the kingdom of God?",
      points: 1,
      options: ["John", "Peter", "James", "Paul"],
      correctAnswer: 1,
      explanation: "Jesus gives Peter the keys to the kingdom.",
    },
    {
      id: "kog-q8",
      type: "spelling",
      question: 'What is the  Greek word for Peter, which means "small stone"?',
      points: 1,
      correctAnswers: ["petros"],
    },
    {
      id: "kog-q9",
      type: "spelling",
      question: "What is the Greek word that means “large foundational rock”?",
      points: 1,
      correctAnswers: ["petra"],
    },
    {
      id: "kog-q10",
      type: "multiple-choice",
      question: "What does the “rock” in Matthew 16:18 refer to?",
      points: 1,
      options: ["Peter", "The temple", "Jesus", "The Law of Moses"],
      correctAnswer: 2,
      explanation: "The rock is Jesus, the church's only foundation (1 Corinthians 3:11).",
    },
    {
      id: "kog-q11",
      type: "spelling",
      question: "What is the Greek word for “church”",
      points: 1,
      correctAnswers: ["ekklesia", "ecclesia"],
    },
    {
      id: "kog-q12",
      type: "multiple-choice",
      question: "What does the Greek word ekklesia mean?",
      points: 1,
      options: [
        "A building set apart for worship",
        "A group called out with a common purpose",
        "A gathering of religious leaders",
        "A small stone",
      ],
      correctAnswer: 1,
      explanation: "Ekklesia means “a group called out with a common purpose.”",
    },
    {
      id: "kog-q13",
      type: "multiple-choice",
      question: "According to Mark 9:1, how would the kingdom of God come?",
      points: 1,
      options: ["Quietly and unseen", "With power", "After everyone listening had died", "Through a military victory"],
      correctAnswer: 1,
      explanation:
        "Jesus says some standing there will not taste death before the kingdom comes with power. Judas did not live to see it.",
    },
    {
      id: "kog-q14",
      type: "multiple-choice",
      question: "How does one enter the kingdom of God, according to John 3:1–7?",
      points: 1,
      options: [
        "By being born into a religious family",
        "By keeping the Law of Moses",
        "By being born of water and the Spirit",
        "By attending church once",
      ],
      correctAnswer: 2,
      explanation: "Jesus tells Nicodemus that no one can enter the kingdom unless they are born of water and the Spirit.",
    },
    {
      id: "kog-q15",
      type: "multiple-choice",
      question: "Which two members of the Jewish ruling council became followers of Jesus?",
      points: 1,
      options: [
        "Caiaphas and Annas",
        "Nicodemus and Joseph of Arimathea",
        "Gamaliel and Saul",
        "Nicodemus and Caiaphas",
      ],
      correctAnswer: 1,
      explanation:
        "Nicodemus (John 3:1) and Joseph of Arimathea (Luke 23:50–51) were council members who became followers of Jesus.",
    },
    {
      id: "kog-q16",
      type: "spelling",
      question: "Who asked Pilate for the body of Jesus?",
      points: 1,
      correctAnswers: ["Joseph of Arimathea", "Joseph"],
      explanation:
        "Joseph of Arimathea asked for Jesus' body (Luke 23:50–52). He was waiting for the kingdom, which had not yet come.",
    },
    {
      id: "kog-q17",
      type: "multi-select",
      question: "Pick the four clues about entering the kingdom in Luke 24:44–49.",
      points: 4,
      options: [
        "Repentance and forgiveness of sins in Jesus' name",
        "Keeping the Law of Moses",
        "Preached to all nations",
        "Preached to Israel only",
        "Starting in Jerusalem",
        "Starting in Galilee",
        "Power from on high",
        "Rebuilding the temple",
      ],
      correctOptions: [0, 2, 4, 6],
      explanation:
        "After his resurrection, Jesus points to repentance and forgiveness in his name, preached to all nations, beginning at Jerusalem, with power from on high.",
    },
    {
      id: "kog-q18",
      type: "multiple-choice",
      question: "When did the kingdom of God come?",
      points: 1,
      options: [
        "At Jesus' birth",
        "At Jesus' death on the cross",
        "On the day of Pentecost",
        "It has not come yet",
      ],
      correctAnswer: 2,
      explanation:
        "The kingdom had not come at Jesus' death (Luke 23:50–51) or resurrection (Luke 24). It came with power in Jerusalem in Acts 2.",
    },
    {
      id: "kog-q19",
      type: "multi-select",
      question: "Pick the three essential truths (“keys”) Peter preaches in Acts 2:22–24.",
      points: 3,
      options: [
        "Jesus is from God",
        "Jesus was only a prophet",
        "Our sins put him on the cross",
        "The Law of Moses saves us",
        "He rose from the dead",
        "He will set up an earthly throne",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "These are the truths we must believe before being born of water and the Spirit.",
    },
    {
      id: "kog-q20",
      type: "multiple-choice",
      question: "About how many people were “born again of water and the Spirit” when the kingdom came in Acts 2:41?",
      points: 1,
      options: ["Twelve", "One hundred and twenty", "Three thousand", "Five thousand"],
      correctAnswer: 2,
      explanation: "About three thousand were added that day.",
    },
    {
      id: "kog-q21",
      type: "multi-select",
      question: "According to Acts 2:42–47, pick the four things the first-century disciples were devoted to.",
      points: 4,
      options: [
        "The apostles' teaching",
        "Temple sacrifices",
        "Prayer",
        "Their own traditions",
        "Fellowship",
        "Keeping the Sabbath",
        "The breaking of bread",
        "Building programs",
      ],
      correctOptions: [0, 2, 4, 6],
      explanation:
        "Acts 2:42 is the blueprint for the church: devotion to the Bible, prayer, fellowship, and the breaking of bread.",
    },
    {
      id: "kog-q22",
      type: "multiple-choice",
      question: "How does the study apply Matthew 6:33, “Seek first his kingdom”?",
      points: 1,
      options: [
        "Attend church only when it is convenient",
        "Make the meetings of the body a priority and sacrifice to put the church first",
        "Seek the kingdom privately, apart from other disciples",
        "Wait for a physical kingdom to appear",
      ],
      correctAnswer: 1,
      explanation:
        "The challenge is to seek first the kingdom by being committed to the fellowship of disciples: the church.",
    },
    {
      id: "kog-q23",
      type: "memory-verse",
      question: "Write Ezekiel 18:20 from memory (NIV).",
      points: 3,
      correctText:
        "The one who sins is the one who will die. The child will not share the guilt of the parent, nor will the parent share the guilt of the child. The righteousness of the righteous will be credited to them, and the wickedness of the wicked will be charged against them.",
    },
    {
      id: "kog-q24",
      type: "memory-verse",
      question: "Write Galatians 1:8 from memory (NIV).",
      points: 3,
      correctText:
        "But even if we or an angel from heaven should preach a gospel other than the one we preached to you, let them be under God's curse!",
    },
    {
      id: "kog-q25",
      type: "ordered-list",
      question: "Write the first eight books of the Bible, Genesis through Ruth, in order.",
      points: 8,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
      ],
      orderedListHint: "Type the next book…",
    },
    {
      id: "kog-q26",
      type: "ordered-list",
      question: "Continue the books of the Bible from 1 Samuel through Nehemiah, in order.",
      points: 8,
      correctAnswers: [
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
      ],
      orderedListHint: "Type the next book…",
    },
    {
      id: "kog-q27",
      type: "ordered-list",
      question: "Continue the books of the Bible from Esther through Jeremiah, in order.",
      points: 8,
      correctAnswers: [
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
      ],
      orderedListHint: "Type the next book…",
    },
    {
      id: "kog-q28",
      type: "ordered-list",
      question: "Continue the books of the Bible from Lamentations through Jonah, in order.",
      points: 8,
      correctAnswers: [
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
      ],
      orderedListHint: "Type the next book…",
    },
    {
      id: "kog-q29",
      type: "ordered-list",
      question: "Finish the Old Testament from Micah through Malachi, in order.",
      points: 7,
      correctAnswers: [
        "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
      ],
      orderedListHint: "Type the next book…",
    },
  ],
}

export const dummyAssessments: Assessment[] = [
  wordOfGodStudyQuiz,
  discipleshipStudyQuiz,
  comingOfTheKingdomStudyQuiz,
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
  {
    id: "cyber-l4-quiz",
    courseId: "7",
    title: "Lecture 4 Quiz",
    description:
      "Lecture 4 — Security Engineering Principles. Multiple-choice quiz covering Least Privilege, Fail-Safe Defaults, Zero Trust, the named traps, and supporting engineering patterns. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-19T10:00:00Z",
    questions: [
      {
        id: "cyb-l4-q1",
        type: "multiple-choice",
        question:
          "The course frames security engineering around three pillars. Which set correctly names all three?",
        points: 2,
        options: [
          "Confidentiality, Integrity, Availability",
          "Least Privilege, Fail-Safe Defaults, Zero Trust",
          "Authentication, Authorisation, Auditing",
          "Defence in Depth, Encryption, Segmentation",
        ],
        correctAnswer: 1,
        explanation:
          "The three pillars are Least Privilege, Fail-Safe Defaults, and Zero Trust. (a) is the CIA triad — a separate concept.",
      },
      {
        id: "cyb-l4-q2",
        type: "multiple-choice",
        question:
          "According to the course, the three pillars relate to each other in which of the following ways?",
        points: 2,
        options: [
          "They are interchangeable — applying any one of them is sufficient for a secure system",
          "Least Privilege sets the SCOPE of capability, Fail-Safe Defaults handle AMBIGUITY by denying, and Zero Trust provides CONTEXT via explicit identity at every hop",
          "Zero Trust replaces Least Privilege in cloud-native architectures",
          "Fail-Safe Defaults are a special case of Defence in Depth and do not need to be considered separately",
        ],
        correctAnswer: 1,
        explanation:
          "The slides explicitly state: Least Privilege sets the scope, Fail-Safe handles ambiguity by denying, and Zero Trust provides the context that lets least-privilege decisions be made.",
      },
      {
        id: "cyb-l4-q3",
        type: "multiple-choice",
        question: "The course defines least privilege as:",
        points: 2,
        options: [
          "Restricting access only to the most senior staff in an organisation",
          "Granting only the permissions needed to perform a task, for only as long as needed, scoped to only the resources required",
          "Denying every action by default and never granting exceptions",
          "Encrypting all data so that even privileged users cannot read it",
        ],
        correctAnswer: 1,
        explanation:
          "The exact definition from the slides: minimum permissions, minimum time, minimum resource scope.",
      },
      {
        id: "cyb-l4-q4",
        type: "multiple-choice",
        question:
          "Which of the following is NOT one of the four categories the slides apply least privilege to?",
        points: 2,
        options: [
          "People (users)",
          "Services and workloads",
          "Network bandwidth allocation",
          "Code modules and libraries",
        ],
        correctAnswer: 2,
        explanation:
          "The four categories are People, Services & Workloads, Data, and Code Modules. Network bandwidth is not one.",
      },
      {
        id: "cyb-l4-q5",
        type: "multiple-choice",
        question: "The Zero Trust pillar is best described as:",
        points: 2,
        options: [
          "A specific vendor product that replaces traditional firewalls",
          "A one-time architectural migration project",
          "A philosophy/architectural approach with minimal implicit trust in the network — every request authenticated and authorised at every hop",
          "A policy that distrusts all employees until they have passed a background check",
        ],
        correctAnswer: 2,
        explanation:
          "Zero Trust is a 'philosophy, not a product' — minimal implicit trust, verify everywhere.",
      },
      {
        id: "cyb-l4-q6",
        type: "multiple-choice",
        question:
          "The course argues that the 'old model' of network security (Inside = Safe, Outside = Danger) is broken because:",
        points: 2,
        options: [
          "Modern firewalls cannot inspect encrypted traffic",
          "Attackers enter via phishing, supply chain, and stolen credentials, then move laterally once inside the perimeter",
          "Internal networks are now slower than external networks",
          "Compliance frameworks no longer recognise perimeter defences",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Death of the Perimeter' slide: attackers enter via phishing, supply chain, and stolen credentials, then move laterally. Zero Trust assumes breach.",
      },
      {
        id: "cyb-l4-q7",
        type: "multiple-choice",
        question:
          "A team gives a single shared IAM role called 'backend-service' read/write access to the entire database because all 23 microservices need 'some' access to 'some' data. The course names this anti-pattern. The PRIMARY security risk is:",
        points: 2,
        options: [
          "The role's name is not descriptive enough for auditing",
          "Compromise of any one of the 23 services hands the attacker access to everything the shared role can do — the blast radius is the entire system",
          "AWS charges more for shared roles than for per-service roles",
          "The role will eventually exceed AWS's maximum permission size",
        ],
        correctAnswer: 1,
        explanation:
          "This is the 'backend-service mega-role' trap. The blast radius of a compromise becomes the entire system because the shared role grants access to everything.",
      },
      {
        id: "cyb-l4-q8",
        type: "multiple-choice",
        question:
          "Which IAM policy snippet best illustrates least privilege as taught in the slides?",
        points: 2,
        options: [
          "\"Action\": \"s3:*\", \"Resource\": \"*\"",
          "\"Action\": [\"s3:GetObject\", \"s3:ListBucket\"], \"Resource\": \"arn:aws:s3:::app-data/tenants/acme/*\"",
          "\"Action\": \"*\", \"Resource\": \"arn:aws:s3:::*\"",
          "\"Action\": [\"s3:*\"], \"Resource\": \"arn:aws:s3:::production-*\"",
        ],
        correctAnswer: 1,
        explanation:
          "Specific actions on a specific tenant prefix is the canonical 'Cloud IAM: Good' example. (a), (c), and (d) all use wildcards.",
      },
      {
        id: "cyb-l4-q9",
        type: "multiple-choice",
        question:
          "For end-USER least privilege, the course recommends which pattern?",
        points: 2,
        options: [
          "Use a single admin account for both day-to-day work and administrative tasks, but log every action",
          "Day-to-day work on a standard account; admin is a distinct identity, elevation requires phishing-resistant MFA, and admin sessions are time-boxed",
          "Disable all administrator accounts and use only the root account for everything",
          "Give every developer permanent admin rights to reduce friction during deployment",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Least Privilege for Users' slide: separate accounts, step-up authentication for elevation, time-boxed admin sessions.",
      },
      {
        id: "cyb-l4-q10",
        type: "multiple-choice",
        question:
          "Which of the following is the course's recommendation for SERVICE-level least privilege?",
        points: 2,
        options: [
          "One large shared service account spanning dev, staging, and production for operational simplicity",
          "Long-lived static API keys, rotated annually",
          "Per-workload identity with no shared service accounts, and short-lived tokens preferred over static keys",
          "Service accounts inherit the permissions of the user who last deployed the code",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Least Privilege for Services' slide: per-workload identity, no shared service accounts, short-lived tokens.",
      },
      {
        id: "cyb-l4-q11",
        type: "multiple-choice",
        question: "For DATA least privilege, the course recommends:",
        points: 2,
        options: [
          "APIs return every available field so the client can pick what it needs",
          "Debug endpoints stay on in production so issues can be diagnosed quickly",
          "APIs expose only the minimum fields required by the caller's role; debug endpoints are off in production; verbose stack traces are not returned to callers",
          "All data is returned encrypted so that the API does not need to enforce field-level access",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Least Privilege for Data' slide: expose minimum fields, disable debug endpoints in production, suppress verbose errors.",
      },
      {
        id: "cyb-l4-q12",
        type: "multiple-choice",
        question:
          "'Break-glass' (emergency) access in the course is best characterised by which combination of properties?",
        points: 2,
        options: [
          "Frictionless to use so that responders can act quickly, with logging deferred until after the incident",
          "Available only during business hours, with no audit trail",
          "High-friction by design, with an immutable audit trail and immediate tamper-proof alerts on every use",
          "Implemented by sharing the root password with the on-call engineer for the duration of the incident",
        ],
        correctAnswer: 2,
        explanation:
          "Break-glass access must exist, but must be high-friction by design with an immutable audit trail and immediate tamper-proof alerts.",
      },
      {
        id: "cyb-l4-q13",
        type: "multiple-choice",
        question: "'Fail-safe defaults' (also called fail closed) means:",
        points: 2,
        options: [
          "On error, the system should attempt to guess the user's intent and proceed",
          "On error or ambiguity, the safe outcome is denial — the system must not guess 'allow'",
          "The system should fail loudly with verbose error messages, including stack traces, to aid debugging",
          "The system should silently retry until it succeeds",
        ],
        correctAnswer: 1,
        explanation:
          "Fail-safe = fail closed. Default to deny. When uncertain, the system must not guess 'allow'.",
      },
      {
        id: "cyb-l4-q14",
        type: "multiple-choice",
        question:
          "A new API endpoint accepts JSON documents with arbitrary keys. The developer maintains a blocklist of dangerous field names (__proto__, constructor, ...) and accepts everything else. The course's view is that this is:",
        points: 2,
        options: [
          "Correct, provided the blocklist is regularly updated",
          "Incorrect: an allowlist of permitted keys should be used, because blocklists fail open whenever an attacker uses something not yet on the list",
          "Correct, because allowlists are too restrictive for modern APIs",
          "Incorrect: input validation should happen only at the database layer",
        ],
        correctAnswer: 1,
        explanation:
          "Blocklists fail open whenever attackers find something not on the list. Allowlists are the fail-safe choice.",
      },
      {
        id: "cyb-l4-q15",
        type: "multiple-choice",
        question:
          "Which Content-Security-Policy directive demonstrates the fail-safe defaults pattern in browser security?",
        points: 2,
        options: [
          "default-src *; script-src *",
          "default-src 'none'; script-src 'self'; style-src 'self'",
          "Content-Security-Policy-Report-Only with no enforcement",
          "Disabling CSP entirely and relying on the WAF",
        ],
        correctAnswer: 1,
        explanation:
          "default-src 'none' is the fail-safe — nothing is allowed unless explicitly listed. Strict CSP is the canonical browser fail-closed example in the slides.",
      },
      {
        id: "cyb-l4-q16",
        type: "multiple-choice",
        question:
          "A deployment pipeline rule states: 'If the security scanner is unreachable, the deploy is BLOCKED.' Why does the course consider this rule essential?",
        points: 2,
        options: [
          "Because scanners are expensive and should always be used to justify their cost",
          "Because allowing deploys when the scanner is offline creates a bypass: an attacker who disables the scanner gets free passage — fail-closed preserves the gate",
          "Because audit standards mandate that no software ever deploys without a clean scan",
          "Because the scanner contains the only copy of the deployment credentials",
        ],
        correctAnswer: 1,
        explanation:
          "If the scanner is offline → block deploy. Otherwise an attacker (or accidental outage) bypasses the gate.",
      },
      {
        id: "cyb-l4-q17",
        type: "multiple-choice",
        question:
          "According to the course's 'Operational Fail-Safes' slide, which of the following is NOT one of the listed patterns?",
        points: 2,
        options: [
          "Backups must fail loudly — silent backup failure is indistinguishable from no backup at all",
          "Security scanner gates deployment — pipeline does not proceed if the scanner is offline",
          "Failure is observable — every fail-closed event produces a metric, log, and alert",
          "Failed authentication attempts trigger automatic account deletion after three tries",
        ],
        correctAnswer: 3,
        explanation:
          "Automatic account DELETION after three failed attempts is not in the slides — that would be punitive, not fail-safe. The three real patterns are (a), (b), and (c).",
      },
      {
        id: "cyb-l4-q18",
        type: "multiple-choice",
        question:
          "The 'overbroad try/catch' is named in the course as a fail-safe trap. Why is it dangerous?",
        points: 2,
        options: [
          "Try/catch blocks slow down production traffic",
          "Swallowing a security-relevant exception (e.g. a failed authentication check) and proceeding allows the request through with no caller verified — turning a fail-closed check into fail-open",
          "Try/catch blocks cannot be unit tested",
          "The exception handler may log sensitive data to disk",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Overbroad try/catch' trap: swallowing a security exception (e.g. failed auth) and proceeding turns a fail-closed check into a fail-open one. The catch block must rethrow or return a denial — never continue.",
      },
      {
        id: "cyb-l4-q19",
        type: "multiple-choice",
        question:
          "An external user authenticates to a public API gateway with a long-lived OAuth bearer token. The gateway forwards that same token unchanged to seven internal microservices. The course considers this:",
        points: 2,
        options: [
          "Correct — a single token authenticates the user uniformly across all services",
          "Incorrect — the gateway should reject the request and force the user to re-authenticate at every internal hop",
          "Incorrect — the gateway should terminate the external identity at the trust boundary and exchange the external token for strictly scoped internal service principals",
          "Correct, provided every internal hop uses mutual TLS",
        ],
        correctAnswer: 2,
        explanation:
          "'Edge Identity Termination' slide: never forward raw end-user bearer tokens deep into the backend; the gateway exchanges external identity for a strictly scoped internal service principal at the trust boundary.",
      },
      {
        id: "cyb-l4-q20",
        type: "multiple-choice",
        question:
          "According to the slides, what does the Identity-Aware Proxy pattern (and 'From Flat VPN to Application Access' model) change about how access is granted?",
        points: 2,
        options: [
          "Access is granted to whole subnets after a single VPN login, but the connection is now encrypted",
          "Access is granted to specific APPLICATIONS based on user identity AND device posture, not to network ranges based on VPN connection",
          "Access is replaced entirely by API keys held by the user",
          "Access is granted to IP ranges only, with no identity component",
        ],
        correctAnswer: 1,
        explanation:
          "The 'From Flat VPN to Application Access' slide: access is narrowed from a subnet to a specific API endpoint, granted based on identity + device posture.",
      },
      {
        id: "cyb-l4-q21",
        type: "multiple-choice",
        question:
          "The course warns against 'recreating a perimeter inside the mesh' by writing rules like 'allow any service in Namespace X'. Why is this a trap?",
        points: 2,
        options: [
          "Namespaces are deprecated in modern Kubernetes",
          "Network location is not identity — a compromised pod in the same namespace can exploit the namespace-wide trust and move laterally",
          "Namespaces cannot enforce mTLS",
          "Namespaces are a paid feature in most service meshes",
        ],
        correctAnswer: 1,
        explanation:
          "'Trap 1: The Internal Perimeter' — namespace membership is not cryptographic identity. Use SPIFFE/SPIRE-based workload identity, not namespace-wide trust.",
      },
      {
        id: "cyb-l4-q22",
        type: "multiple-choice",
        question:
          "In a service mesh (e.g. Istio) PeerAuthentication policy, what is the consequence of running with mode: PERMISSIVE in production?",
        points: 2,
        options: [
          "Performance improves because TLS is optional",
          "Plaintext connections are accepted alongside mTLS, which silently allows unencrypted lateral movement — defeating the purpose of mesh-wide encryption",
          "Only authenticated services can connect; PERMISSIVE is stricter than STRICT",
          "The mesh refuses to start until STRICT is configured",
        ],
        correctAnswer: 1,
        explanation:
          "STRICT mandates mTLS; PERMISSIVE accepts plaintext connections too. In production this silently allows unencrypted lateral movement — the slide explicitly warns against it.",
      },
      {
        id: "cyb-l4-q23",
        type: "multiple-choice",
        question:
          "A procurement committee says: 'Let's buy MediCare v1.0 now, even though it lacks proper RBAC, separate backups, and log protection. The vendor promises to add all of these in v2.0 next year.' Which TRAP from the lecture does this most directly illustrate?",
        points: 2,
        options: [
          "The 'Internal Perimeter' trap",
          "'Zero Trust as a One-Time Project'",
          "The 'We'll Tighten Later' trap — loose permissions and missing controls become entrenched technical/security debt that rarely gets addressed",
          "The 'Hidden Privileges' trap",
        ],
        correctAnswer: 2,
        explanation:
          "'Trap 1: We'll Tighten Later' — technical/security debt accumulates like interest. Once a system 'works', there is rarely incentive to go back and tighten. This is the exact trap the procurement scenario describes.",
      },
      {
        id: "cyb-l4-q24",
        type: "multiple-choice",
        question:
          "Which of the following statements about the three pillars is MOST consistent with the course's overall message?",
        points: 2,
        options: [
          "The pillars are independent — apply whichever one fits the current project and skip the others",
          "The pillars are sequential phases of a security programme — start with Least Privilege, then add Fail-Safe Defaults, then Zero Trust, then stop",
          "The pillars work together: design with least privilege, fail safely when uncertain, and never trust the network implicitly. Together they shrink blast radius and force breaches to be loud rather than silent",
          "The pillars are obsolete in cloud-native architectures and have been replaced by Defence in Depth alone",
        ],
        correctAnswer: 2,
        explanation:
          "The pillars are complementary, not independent or sequential. Together they shrink blast radius and make breaches detectable rather than silent.",
      },
    ],
  },
  {
    id: "cyber-l5-quiz",
    courseId: "7",
    title: "Lecture 5 Quiz",
    description:
      "Lecture 5 — Human-Centered Security. Multiple-choice quiz covering cognitive psychology, secure UX, phishing, Cialdini's principles, insider threats, and human-side defences. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-19T11:00:00Z",
    questions: [
      {
        id: "cyb-l5-q1",
        type: "multiple-choice",
        question:
          "The slides quote Kevin Mitnick: 'The weakest link in the security chain is the human element.' The lecture's overall stance on this claim is best summarised as:",
        points: 2,
        options: [
          "Fully agree — humans are inherently unreliable and the goal of security engineering is to remove them from the loop wherever possible",
          "It is misleading: people fail because SYSTEMS are designed badly. Treat users as partners and shift more of the security burden onto the design",
          "It only applies to users in non-technical roles; engineers and admins are not the weak link",
          "It was true in the 1990s but no longer applies in modern enterprises with MFA",
        ],
        correctAnswer: 1,
        explanation:
          "The slides explicitly push back on Mitnick's quote. People fail because systems are designed badly; human-centred security treats users as PARTNERS, not as the problem.",
      },
      {
        id: "cyb-l5-q2",
        type: "multiple-choice",
        question:
          "According to Kahneman's dual-process theory as applied in the slides, which statement is correct?",
        points: 2,
        options: [
          "System 2 is fast and automatic; System 1 is slow and deliberate",
          "System 1 is fast and automatic and is what users default to under cognitive load; System 2 is slow, deliberate, and fatigues quickly",
          "Both systems operate identically under stress",
          "Routine security decisions in production interfaces should require System 2 thinking to ensure users pay attention",
        ],
        correctAnswer: 1,
        explanation:
          "System 1 = fast, automatic, default-under-load. System 2 = slow, deliberate, fatigues. Users default to System 1 under cognitive pressure.",
      },
      {
        id: "cyb-l5-q3",
        type: "multiple-choice",
        question:
          "The course argues that routine security decisions should NOT require which kind of cognition?",
        points: 2,
        options: [
          "System 1 — because attackers easily mimic familiar patterns that users accept automatically",
          "System 2 — because under cognitive load users default to System 1, skip the decision, and accept defaults without reading",
          "Either — secure defaults should remove the need to think at all",
          "Heuristic thinking — because it is statistically unreliable",
        ],
        correctAnswer: 1,
        explanation:
          "The slide states: 'Routine security decisions should not require System 2 thinking' — because users skip it under load and revert to System 1.",
      },
      {
        id: "cyb-l5-q4",
        type: "multiple-choice",
        question:
          "The three properties of GOOD human-side security design listed in the slides are:",
        points: 2,
        options: [
          "Encryption, Authentication, Auditing",
          "Speed, Simplicity, Convenience",
          "Comprehensibility, Correctness Affordance, Forgiveness",
          "Confidentiality, Integrity, Availability",
        ],
        correctAnswer: 2,
        explanation:
          "The three properties are Comprehensibility, Correctness Affordance, and Forgiveness. (d) is the CIA triad.",
      },
      {
        id: "cyb-l5-q5",
        type: "multiple-choice",
        question:
          "The course rejects the 'Security vs. Usability' trade-off as a false dichotomy. Which piece of evidence is cited?",
        points: 2,
        options: [
          "Forced 90-day password rotations are universally loved by users",
          "Google's 2017 deployment of security keys to 85,000 employees resulted in zero phishing AND faster login than OTP",
          "CAPTCHAs increase both usability and security",
          "Annual compliance training reduces phishing rates by 90%",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Usability-Security Myth' slide cites Google's 2017 security key deployment: zero phishing across 85,000 employees AND faster login than OTP.",
      },
      {
        id: "cyb-l5-q6",
        type: "multiple-choice",
        question:
          "The 'alert fatigue' slide reports that after week one, user engagement with security prompts drops by roughly:",
        points: 2,
        options: ["12%", "32%", "62%", "92%"],
        correctAnswer: 2,
        explanation:
          "The 'Alert Fatigue Problem' slide reports a 62% drop in user engagement with security prompts after week one.",
      },
      {
        id: "cyb-l5-q7",
        type: "multiple-choice",
        question:
          "The slides contrast 'Optional MFA' with a 'Mandatory Flow.' Reported enrolment rates are:",
        points: 2,
        options: [
          "Optional 8% vs Mandatory 94%",
          "Optional 50% vs Mandatory 60%",
          "Optional 30% vs Mandatory 35%",
          "Both produce similar adoption — the difference is negligible",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Insecure Defaults' slide gives the exact numbers: optional MFA ≈ 8% enrolment vs mandatory flow ≈ 94%.",
      },
      {
        id: "cyb-l5-q8",
        type: "multiple-choice",
        question:
          "The course's 'Insecure Defaults' UX anti-pattern is best summarised as:",
        points: 2,
        options: [
          "The secure option requires LESS effort than the insecure alternative — when this is reversed, users take the insecure path",
          "Encryption must be optional so users can choose performance over security",
          "Security prompts should appear as frequently as possible to maintain awareness",
          "Default-on features create legal liability and should be avoided",
        ],
        correctAnswer: 0,
        explanation:
          "The secure option must require LESS effort than the insecure alternative. If it requires more, users find another way.",
      },
      {
        id: "cyb-l5-q9",
        type: "multiple-choice",
        question:
          "Which prompt is preferred by the course for 'Meaningful Confirmations'?",
        points: 2,
        options: [
          "'Are you sure?' [Cancel] [OK]",
          "'Type DELETE BACKUP to permanently delete the production database backup from 2025-06-14.'",
          "'This action may have consequences. Continue?'",
          "A modal with no buttons that disappears after 5 seconds",
        ],
        correctAnswer: 1,
        explanation:
          "'Meaningful Confirmations' slide: specific prompts ('Type DELETE BACKUP to ...') beat vague ones ('Are you sure?').",
      },
      {
        id: "cyb-l5-q10",
        type: "multiple-choice",
        question:
          "The 'Error-Tolerant Systems' approach in the slides advocates for which combination?",
        points: 2,
        options: [
          "Permanent deletion of all records to minimise data exposure",
          "Meaningful confirmations, soft deletes (e.g. 30-day recovery window), visible activity feeds, and clear session indicators",
          "Removing all undo functionality so users learn from mistakes",
          "Disabling all confirmations to reduce friction",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Error-Tolerant Systems' slides cover meaningful confirmations, soft deletes with recovery windows, visible activity feeds, and session indicators.",
      },
      {
        id: "cyb-l5-q11",
        type: "multiple-choice",
        question: "The SignalGate 2025 case study is included to illustrate:",
        points: 2,
        options: [
          "A failure of Signal's cryptography",
          "A human-centred security failure — wrong tool for classified material, manual entry without verification, and no procedural check, despite the cryptography working perfectly",
          "The superiority of consumer messaging apps over government systems",
          "The need for stronger TLS configurations",
        ],
        correctAnswer: 1,
        explanation:
          "SignalGate 2025 is included precisely because the cryptography worked — the failure was wrong tool, manual entry without verification, and no procedural check.",
      },
      {
        id: "cyb-l5-q12",
        type: "multiple-choice",
        question:
          "The course states that knowledge from annual phishing training typically decays within:",
        points: 2,
        options: ["1 week", "2–4 weeks", "3–6 months", "1 year"],
        correctAnswer: 1,
        explanation:
          "The 'Why Phishing Training Fails' slide states knowledge decays within 2–4 weeks.",
      },
      {
        id: "cyb-l5-q13",
        type: "multiple-choice",
        question:
          "A company has run mandatory annual cybersecurity-awareness training (with one simulated phishing email per year) for ten years, yet its phishing success rate has not improved. According to the slides, the main research-based reasons are:",
        points: 2,
        options: [
          "The training videos are too short and need to be longer",
          "Knowledge decays within 2–4 weeks, generic tests don't transfer to novel attacks, and shame-based follow-up reduces reporting of real incidents",
          "Phishing is now solved by spam filters, so training is irrelevant",
          "The training is too expensive to scale beyond annual delivery",
        ],
        correctAnswer: 1,
        explanation:
          "The slide lists three reasons: rapid decay, no transfer to novel attacks, and shame reducing reporting.",
      },
      {
        id: "cyb-l5-q14",
        type: "multiple-choice",
        question:
          "According to the slides, 'what actually works' instead of annual compliance training is:",
        points: 2,
        options: [
          "Longer, more comprehensive yearly modules with formal certification at the end",
          "Public leaderboards naming people who clicked the simulated phish",
          "Short (5–10 min) scenario-based learning, teaching the FEELING of a phish, and a psychologically safe reporting culture",
          "Removing email access for non-technical staff",
        ],
        correctAnswer: 2,
        explanation:
          "'What Actually Works': short scenario-based learning, teaching the FEELING of a phish, and psychologically safe reporting.",
      },
      {
        id: "cyb-l5-q15",
        type: "multiple-choice",
        question:
          "An 'Adversary-in-the-Middle' (AiTM) proxy attack (e.g. using Evilginx2) succeeds against which of the following?",
        points: 2,
        options: [
          "Push-based OTP from an authenticator app — the attacker can relay both credentials AND the OTP code in real time",
          "FIDO2 / WebAuthn security keys — these prevent the relay because the cryptographic challenge is bound to the real domain",
          "Long passwords with mixed character classes",
          "Account recovery via security questions",
        ],
        correctAnswer: 0,
        explanation:
          "AiTM proxies (Evilginx2) relay credentials AND OTP codes in real time. They DO NOT defeat FIDO2/WebAuthn keys, which are bound to the real domain.",
      },
      {
        id: "cyb-l5-q16",
        type: "multiple-choice",
        question:
          "Which of the following is described as 'phishing-resistant MFA' by the slides?",
        points: 2,
        options: [
          "SMS-based one-time codes",
          "Security questions about a pet's name",
          "FIDO2 security keys or passkeys with WebAuthn",
          "Email-based magic links",
        ],
        correctAnswer: 2,
        explanation:
          "'Phishing-resistant MFA' = security keys / passkeys via WebAuthn. OTPs, SMS, and security questions are all phishable.",
      },
      {
        id: "cyb-l5-q17",
        type: "multiple-choice",
        question:
          "A user receives a 'document share' email from a convincing but off-brand domain, clicks, and unwittingly relays credentials and an OTP to an AiTM proxy. According to the slides, which of the following would NOT break this attack chain?",
        points: 2,
        options: [
          "Security keys that prevent OTP relay",
          "Unusual sign-in from a new ASN triggering token revocation",
          "Sending the user a longer annual training module next year",
          "App-password creation requiring step-up with device-bound authentication",
        ],
        correctAnswer: 2,
        explanation:
          "Longer annual training is the OPPOSITE of what works — it suffers from rapid knowledge decay. The other three all break the AiTM chain at a technical level.",
      },
      {
        id: "cyb-l5-q18",
        type: "multiple-choice",
        question:
          "Cialdini's six principles of persuasion, as listed in the slides, are:",
        points: 2,
        options: [
          "Confidentiality, Integrity, Availability, Auditing, Access, Accountability",
          "Authority, Scarcity, Reciprocity, Liking, Social Proof, Commitment/Consistency",
          "Speed, Volume, Repetition, Pressure, Reward, Punishment",
          "Empathy, Logic, Emotion, Trust, Familiarity, Comfort",
        ],
        correctAnswer: 1,
        explanation:
          "The six principles: Authority, Scarcity, Reciprocity, Liking, Social Proof, Commitment/Consistency.",
      },
      {
        id: "cyb-l5-q19",
        type: "multiple-choice",
        question:
          "An attacker emails a junior employee: 'Your colleagues Priya and Sam have already completed this confidentiality attestation; please complete yours by end of day.' Which of Cialdini's principles is being exploited MOST directly?",
        points: 2,
        options: ["Authority", "Scarcity", "Social Proof", "Reciprocity"],
        correctAnswer: 2,
        explanation:
          "Social Proof — 'everyone else has already done it.' The slide example: 'Everyone on the team already completed this security training.'",
      },
      {
        id: "cyb-l5-q20",
        type: "multiple-choice",
        question:
          "A vishing attacker calls and says: 'Hi, this is the CFO. I need you to authorise this wire transfer before 5pm — the board meeting starts in 20 minutes.' Which combination of Cialdini's principles is at work?",
        points: 2,
        options: [
          "Reciprocity and Liking",
          "Authority and Scarcity/Urgency",
          "Social Proof and Commitment",
          "Liking and Consistency",
        ],
        correctAnswer: 1,
        explanation:
          "Authority ('the CFO') combined with Scarcity/Urgency ('before 5pm — meeting in 20 minutes'). The slide gives almost exactly this example.",
      },
      {
        id: "cyb-l5-q21",
        type: "multiple-choice",
        question:
          "The slides note that 'New Employee' is an especially effective pretexting angle. Why?",
        points: 2,
        options: [
          "New employees have more system access than long-term staff",
          "New employees are more technically skilled than average and harder to detect as fake",
          "Targets feel helpful and don't want to seem unwelcoming, so questions that would seem suspicious from outsiders appear normal from new hires",
          "Companies are legally required to assist new employees with any request",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Pretexting and Vishing' slide: targets feel helpful and don't want to seem unwelcoming, so suspicious questions appear routine from new hires.",
      },
      {
        id: "cyb-l5-q22",
        type: "multiple-choice",
        question:
          "Three months before resigning, an engineer downloads the company's entire customer database to her personal laptop 'for a side project,' then takes the laptop to her new employer. The course classifies this insider-threat type as:",
        points: 2,
        options: ["Negligent", "Compromised", "Malicious", "Accidental"],
        correctAnswer: 2,
        explanation:
          "Malicious insider — deliberate exfiltration for personal gain (taking data to the new employer). Negligent = careless without intent; Compromised = manipulated without realising.",
      },
      {
        id: "cyb-l5-q23",
        type: "multiple-choice",
        question:
          "The slides list which of the following as BEHAVIOURAL indicators of an insider threat?",
        points: 2,
        options: [
          "Frequent use of the company VPN during business hours",
          "Working on weekends with company approval",
          "Access to data outside normal job function, large downloads before resignation, and system access outside business hours from unusual locations",
          "Asking the IT helpdesk for password resets",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Insider Threat Dimension' slide lists exactly these three behavioural indicators.",
      },
      {
        id: "cyb-l5-q24",
        type: "multiple-choice",
        question:
          "Refilwe Hospital requires wire transfers to NEW payees to have a mandatory 24-hour delay before processing. Which course principle does this MOST directly implement?",
        points: 2,
        options: [
          "Defence in depth at the network layer",
          "A cooling-off period that removes the URGENCY attackers rely on, even when the request looks authoritative",
          "Least privilege for financial systems",
          "Air-gapped backups",
        ],
        correctAnswer: 1,
        explanation:
          "Cooling-off periods are the slide's explicit countermeasure to authority+urgency attacks. 'Attackers rely on urgency. Time removes it entirely.'",
      },
    ],
  },
  {
    id: "cyber-l6-quiz",
    courseId: "7",
    title: "Lecture 6 Quiz",
    description:
      "Lecture 6 — Digital Forensics Fundamentals. Multiple-choice quiz covering the forensic process, frameworks (SANS/NIST/ISO), evidence preservation, OS/cloud artefacts, incident response, and post-incident improvement. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-19T12:00:00Z",
    questions: [
      {
        id: "cyb-l6-q1",
        type: "multiple-choice",
        question: "The course defines digital forensics as:",
        points: 2,
        options: [
          "Hacking back against attackers to recover stolen data",
          "Identifying, preserving, analysing, and reporting digital evidence",
          "Encrypting evidence so that only the SOC can read it",
          "Restoring services to normal operation after an incident",
        ],
        correctAnswer: 1,
        explanation:
          "The slide definition: 'Identifying, preserving, analysing, and reporting digital evidence.'",
      },
      {
        id: "cyb-l6-q2",
        type: "multiple-choice",
        question:
          "The slides note that 'most standards look something like this.' Which sequence of phases is shown on that slide?",
        points: 2,
        options: [
          "Detect, Respond, Recover, Report, Restart",
          "Preparation, Identification, Preservation, Analysis, Reporting",
          "Containment, Eradication, Recovery, Review, Restart",
          "Plan, Build, Run, Audit, Retire",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Most Standards Look Something Like This' slide lists Preparation → Identification → Preservation → Analysis → Reporting as the common pattern.",
      },
      {
        id: "cyb-l6-q3",
        type: "multiple-choice",
        question: "The SANS six-step process for incident response is:",
        points: 2,
        options: [
          "Plan, Build, Test, Deploy, Monitor, Retire",
          "Detect, Triage, Investigate, Contain, Restore, Report",
          "Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned",
          "Identification, Authorisation, Acquisition, Analysis, Reporting, Archive",
        ],
        correctAnswer: 2,
        explanation:
          "SANS six steps: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.",
      },
      {
        id: "cyb-l6-q4",
        type: "multiple-choice",
        question:
          "NIST SP 800-61 is described in the slides as best suited to which use case?",
        points: 2,
        options: [
          "Quick, field-friendly action under pressure",
          "Legal admissibility and formal certification",
          "Mature programmes — expanding on roles, communications, metrics, and documentation",
          "Cloud-only environments",
        ],
        correctAnswer: 2,
        explanation:
          "NIST SP 800-61 is described as 'ideal for mature programmes' because it adds rigour around metrics, communication trees, and documentation.",
      },
      {
        id: "cyb-l6-q5",
        type: "multiple-choice",
        question:
          "ISO/IEC 27035 and 27037–27043 are positioned in the slides as:",
        points: 2,
        options: [
          "Cloud-native incident response frameworks for hyperscale environments",
          "The most rigorous standards — focused on governance, admissibility of evidence, and certification",
          "Lightweight alternatives to SANS for small teams",
          "Deprecated standards superseded by NIST",
        ],
        correctAnswer: 1,
        explanation:
          "ISO frameworks (27035, 27037–27043) are presented as the most rigorous — focus on governance, admissibility, and certification.",
      },
      {
        id: "cyb-l6-q6",
        type: "multiple-choice",
        question: "The slides call which phase 'the most overlooked'?",
        points: 2,
        options: ["Identification", "Preparation", "Recovery", "Reporting"],
        correctAnswer: 1,
        explanation:
          "The slide explicitly calls Preparation 'The Most Overlooked Phase.'",
      },
      {
        id: "cyb-l6-q7",
        type: "multiple-choice",
        question:
          "Step 1 (Preparation, Before the Incident) requires which set of artefacts?",
        points: 2,
        options: [
          "Forensic disk images of every employee laptop, refreshed weekly",
          "On-call roster, key contacts (legal, PR, executive sponsors), runbooks per scenario, pre-positioned tools, and tabletop exercises",
          "A signed memorandum from law enforcement",
          "Annual SOC 2 audit reports stored in the SIEM",
        ],
        correctAnswer: 1,
        explanation:
          "The Preparation slide lists exactly these artefacts: on-call roster, key contacts, runbooks, pre-positioned tools, tabletop exercises.",
      },
      {
        id: "cyb-l6-q8",
        type: "multiple-choice",
        question: "During Identification (SANS Step 2), the analyst should:",
        points: 2,
        options: [
          "Immediately wipe the affected system to prevent further damage",
          "Detect (alerts/user reports), triage real vs false positive, bound the affected systems, estimate blast radius, and escalate if warranted",
          "Skip straight to credential rotation",
          "Begin drafting the post-incident review",
        ],
        correctAnswer: 1,
        explanation:
          "Identification (Step 2) involves detection, triage, bounding, blast radius estimation, and escalation.",
      },
      {
        id: "cyb-l6-q9",
        type: "multiple-choice",
        question:
          "During an incident, the response lead does the following in this order: (1) isolates the compromised host from the network; (2) revokes its service tokens; (3) removes the webshell the attacker installed; (4) patches the vulnerability that let them in. Where is the boundary between containment and eradication?",
        points: 2,
        options: [
          "Step 1 is containment; steps 2–4 are eradication",
          "Steps 1–2 are containment; steps 3–4 are eradication",
          "All four steps are containment; eradication has not yet started",
          "Only step 4 is eradication; the rest are recovery",
        ],
        correctAnswer: 1,
        explanation:
          "Isolating the host (step 1) and revoking service tokens (step 2) both stop the attacker's reach = containment. Removing the webshell (step 3) and patching the vulnerability (step 4) remove the threat = eradication.",
      },
      {
        id: "cyb-l6-q10",
        type: "multiple-choice",
        question:
          "The slide titled 'Containment: Stop the Bleeding' lists which of the following actions?",
        points: 2,
        options: [
          "Patch the vulnerability and reset all credentials",
          "Isolate and revoke (network isolation, token revocation, account disable), block indicators (IPs, domains, hashes), preserve evidence, communicate",
          "Restore from clean backups and obtain business sign-off",
          "Form hypotheses and build timelines",
        ],
        correctAnswer: 1,
        explanation:
          "'Containment: Stop the Bleeding' lists Isolate & Revoke, Block Indicators, Preserve Evidence, Communicate.",
      },
      {
        id: "cyb-l6-q11",
        type: "multiple-choice",
        question:
          "According to the 'Eradication and Remediation' slide, which of the following is NOT a listed action?",
        points: 2,
        options: [
          "Remove malware (backdoors, droppers, webshells)",
          "Eliminate persistence (scheduled tasks, registry keys, crontabs)",
          "Patch and harden — close the vulnerability that was exploited",
          "Notify the public via press release before internal investigation completes",
        ],
        correctAnswer: 3,
        explanation:
          "Public notification is NOT in the eradication slide. The four listed actions are Remove Malware, Eliminate Persistence, Patch & Harden, Reset Credentials.",
      },
      {
        id: "cyb-l6-q12",
        type: "multiple-choice",
        question: "The slide on Recovery (Step 5) emphasises which sequence?",
        points: 2,
        options: [
          "Restore everything immediately to minimise downtime; investigate afterwards",
          "Restore from clean backups (verify integrity BEFORE restoring, not during), validate before reconnecting, gradual reintroduction with monitoring, and formal business sign-off",
          "Hand over to a third-party MSP and stop internal work",
          "Notify regulators before restoring any services",
        ],
        correctAnswer: 1,
        explanation:
          "Recovery requires verifying backup integrity BEFORE restoring (not during), validating before reconnecting, gradual reintroduction, and business sign-off.",
      },
      {
        id: "cyb-l6-q13",
        type: "multiple-choice",
        question:
          "The slides state that during Preservation (Phase 3), evidence should be collected in which order?",
        points: 2,
        options: [
          "Disk images first, then memory if there's time",
          "Volatile data (memory and running processes) FIRST, then less volatile sources",
          "Logs first, then memory, then disk",
          "The order does not matter as long as everything is hashed",
        ],
        correctAnswer: 1,
        explanation:
          "Phase 3 (Preservation): 'Volatile Data First — memory and running processes before anything else.' Volatile data disappears when power is lost.",
      },
      {
        id: "cyb-l6-q14",
        type: "multiple-choice",
        question: "The hashing algorithm the slides specify for evidence is:",
        points: 2,
        options: [
          "MD5",
          "SHA-1",
          "SHA-256, computed both before AND after acquisition",
          "CRC-32",
        ],
        correctAnswer: 2,
        explanation:
          "The slides specify SHA-256, computed both before AND after acquisition, to prove integrity.",
      },
      {
        id: "cyb-l6-q15",
        type: "multiple-choice",
        question:
          "The example Chain-of-Custody record in the slides includes ALL of the following EXCEPT:",
        points: 2,
        options: [
          "Case ID and acquisition authorisation",
          "Analyst name and role",
          "The personal opinion of the analyst about who is to blame",
          "Tool and version used, plus SHA-256 hashes",
        ],
        correctAnswer: 2,
        explanation:
          "Analyst opinion / blame attribution is NOT part of the CoC record. CoC documents facts only: case ID, who performed, timestamps (UTC), tools & versions, hashes, storage & transfers.",
      },
      {
        id: "cyb-l6-q16",
        type: "multiple-choice",
        question:
          "A bank stores its security logs in an S3 bucket with object-versioning, MFA-required-for-delete, and a retention lock preventing deletion for seven years. This configuration is best described as:",
        points: 2,
        options: [
          "Role-based access control (RBAC)",
          "Write-Once-Read-Many (WORM) storage",
          "Defence in depth at the network layer",
          "An air-gapped backup",
        ],
        correctAnswer: 1,
        explanation:
          "Object-versioning + MFA-required-for-delete + retention lock = WORM storage (immutable evidence).",
      },
      {
        id: "cyb-l6-q17",
        type: "multiple-choice",
        question:
          "The 'Log Protection Strategies' slide lists four techniques. Which set is correct?",
        points: 2,
        options: [
          "Frequent rotation, public mirroring, weekly archival, quarterly review",
          "Write-once storage, separate security accounts, integrity checks (hash on ingest, re-verify on access), encryption at rest with key management separate from data",
          "Single-user write access, encryption with the same key as the database, daily overwrite, indefinite retention",
          "Local storage on each application server, with hourly sync to a single central server",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Log Protection Strategies' slide lists Write-Once Storage, Separate Security Accounts, Integrity Checks, and Encryption at Rest with separate key management.",
      },
      {
        id: "cyb-l6-q18",
        type: "multiple-choice",
        question:
          "On a Windows host triage, which of the following best matches 'execution evidence'?",
        points: 2,
        options: [
          "Registry hives (SAM, SYSTEM, SOFTWARE) and NTUSER.DAT",
          "Prefetch files, ShimCache, AmCache, and EDR process trees",
          "Scheduled tasks and WMI subscriptions",
          "Security event logs (4624, 4625, 4688)",
        ],
        correctAnswer: 1,
        explanation:
          "Execution evidence on Windows = Prefetch, ShimCache, AmCache, EDR process trees. The other answers are different categories on the same slide (registry, persistence, event logs).",
      },
      {
        id: "cyb-l6-q19",
        type: "multiple-choice",
        question: "Which Windows Security event IDs map to the actions listed?",
        points: 2,
        options: [
          "4624 = successful logon, 4625 = failed logon, 4688 = process creation",
          "4624 = process creation, 4625 = successful logon, 4688 = failed logon",
          "4624 = service start, 4625 = service stop, 4688 = scheduled task created",
          "4624 = file deletion, 4625 = file creation, 4688 = registry change",
        ],
        correctAnswer: 0,
        explanation:
          "4624 = successful logon, 4625 = failed logon, 4688 = process creation. These are the three security event IDs explicitly listed in the Windows Host Triage slide.",
      },
      {
        id: "cyb-l6-q20",
        type: "multiple-choice",
        question:
          "Which of the following is NOT listed on the 'Linux Host Triage' slide?",
        points: 2,
        options: [
          "Auth logs, sudo logs, auditd, systemd journals",
          ".ssh/authorized_keys and known_hosts",
          "Crontab entries, systemd timers, setuid files, modified binaries in privileged paths",
          "Windows Prefetch and ShimCache",
        ],
        correctAnswer: 3,
        explanation:
          "Prefetch and ShimCache are WINDOWS artefacts, not Linux. The Linux slide lists auth/sudo/auditd/journal logs, .ssh keys, bash history, cron/systemd timers, setuid files, processes and sockets, container metadata.",
      },
      {
        id: "cyb-l6-q21",
        type: "multiple-choice",
        question:
          "For cloud investigations, the slides list which of the following as primary evidence sources?",
        points: 2,
        options: [
          "IdP sign-in logs, token issuance records, SaaS audit trails, object storage logs, and build-system logs",
          "The marketing team's CRM",
          "Customer-facing application UI screenshots",
          "Public DNS records only",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Cloud Investigation Sources' slide lists IdP sign-in logs, token issuance, SaaS audit trails, object storage logs, and build-system logs.",
      },
      {
        id: "cyb-l6-q22",
        type: "multiple-choice",
        question:
          "The slides give a 'Test Readiness' question to ask of any critical system: if it were compromised last week, could you reconstruct which of the following?",
        points: 2,
        options: [
          "The CEO's personal calendar",
          "Who logged in, what they ran, what data left, and what config changed",
          "The exact financial impact in USD",
          "The motivations of the attacker",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Test Readiness' slide asks exactly these four reconstruction questions. If you can't answer them, your logging is inadequate.",
      },
      {
        id: "cyb-l6-q23",
        type: "multiple-choice",
        question:
          "According to the 'How Long to Keep Evidence' slide, high-value telemetry has an operational minimum retention of approximately:",
        points: 2,
        options: ["7–14 days", "30 days", "90–400 days", "10 years"],
        correctAnswer: 2,
        explanation:
          "The 'How Long to Keep Evidence' slide gives 90–400 days as the operational minimum for high-value telemetry.",
      },
      {
        id: "cyb-l6-q24",
        type: "multiple-choice",
        question:
          "The 'Learn and Improve' (Step 6) slide states that the post-incident review should focus on:",
        points: 2,
        options: [
          "Identifying which individual to blame and what disciplinary action to take",
          "Systems, not blame — updating runbooks with what actually worked, improving telemetry to fill gaps, and tracking remediation items to completion with owners and deadlines",
          "Producing a press release for external stakeholders before any internal review",
          "Closing the case quickly so the team can move on",
        ],
        correctAnswer: 1,
        explanation:
          "'Learn and Improve' (Step 6) explicitly states 'Focus on systems, not blame' and lists updating runbooks, improving telemetry, and tracking remediation to completion with owners and deadlines.",
      },
    ],
  },
  {
    id: "cyber-mock-test-2",
    courseId: "7",
    title: "Mock Test 2",
    description:
      "Cybersecurity Mock Test 2 (SM1 2026). Covers Lectures 4–8: least privilege, Zero Trust, fail-safe defaults, human-centred security, digital forensics, secure SDLC, and network defence. 12 MCQs (24 marks), 3 short answers (12 marks), and 1 scenario (14 marks). Total: 50 marks.",
    type: "test",
    timeLimit: 90,
    createdAt: "2026-05-20T10:00:00Z",
    questions: [
      {
        id: "cyb-mt2-q1",
        type: "multiple-choice",
        question:
          "A startup runs 23 microservices that all share a single IAM role called backend-service with wide read/write access to the entire database, 'to keep things simple.' The course names this anti-pattern explicitly. It is best described as:",
        points: 2,
        options: [
          "The 'encryption without authorisation' trap",
          "The 'backend-service mega-role' trap — compromise of one service grants access to all of them; the blast radius is the entire system",
          "A correct application of least privilege at the system level",
          "An acceptable consequence of microservice architectures, since the alternative is complex",
        ],
        correctAnswer: 1,
        explanation:
          "The 'backend-service mega-role' anti-pattern (L4). A single shared IAM role violates least privilege at the service level; compromise of any one service hands the attacker access to everything the shared role can do. The correct pattern is per-workload identity. Source: L4 — 'Least Privilege for Services' slide.",
      },
      {
        id: "cyb-mt2-q2",
        type: "multiple-choice",
        question:
          "An external user authenticates to a public API gateway with a long-lived OAuth bearer token. The gateway forwards that same token, unchanged, to seven internal microservices that each validate and use it. From a Zero-Trust perspective, this is:",
        points: 2,
        options: [
          "Correct: a single token authenticates the user uniformly across the system",
          "Incorrect: the gateway should exchange the external token for a strictly scoped internal service-principal at the trust boundary",
          "Correct, provided every internal hop uses mutual TLS",
          "Incorrect: the gateway should reject the request and force the user to re-authenticate at each hop",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Edge Identity Termination' pattern: never forward raw end-user bearer tokens deep into the backend. The edge gateway exchanges the external token for a strictly scoped internal service principal. mTLS solves transport identity, not unscoped propagation; re-authenticating at every hop is impractical. Source: L4 — 'Edge Identity Termination' slide.",
      },
      {
        id: "cyb-mt2-q3",
        type: "multiple-choice",
        question:
          "A new endpoint accepts JSON documents with arbitrary keys. The developer maintains a blocklist of dangerous field names (__proto__, constructor, ...) and accepts everything else. From the course's perspective, this approach is:",
        points: 2,
        options: [
          "Correct, provided the blocklist is updated regularly",
          "Incorrect: an allowlist of permitted keys should be used, because blocklists fail open whenever an attacker uses something not yet on the list",
          "Correct, because parsing all input gives more flexibility to downstream code",
          "Incorrect: input validation should be done at the database, not the API layer",
        ],
        correctAnswer: 1,
        explanation:
          "Fail-safe defaults applied to input validation. Blocklists FAIL OPEN (anything not listed gets through); allowlists FAIL CLOSED (anything not explicitly permitted is rejected). Source: L4 — 'Fail-Safe in Code' slide ('Whitelist, not blacklist').",
      },
      {
        id: "cyb-mt2-q4",
        type: "multiple-choice",
        question:
          "The slides argue, drawing on Kahneman, that routine security decisions in production interfaces should NOT require which kind of cognition?",
        points: 2,
        options: [
          "System 1 — fast, automatic thinking, because attackers easily mimic familiar patterns",
          "System 2 — slow, deliberate thinking, because under load users default to System 1 and skip the decision",
          "Either system: secure defaults remove the need to think at all",
          "Heuristic thinking, because it is statistically unreliable",
        ],
        correctAnswer: 1,
        explanation:
          "System 2 is slow, deliberate, and fatigues; under load users default to System 1 and skip required deliberation. The question asks which cognition should NOT be REQUIRED — System 2. (c) is tempting but the question is about the type of cognition, not whether thinking is needed at all. Source: L5 — Dual-process cognition (Kahneman).",
      },
      {
        id: "cyb-mt2-q5",
        type: "multiple-choice",
        question:
          "Three months before resigning, an engineer downloads the company's entire customer database to her personal laptop 'for a side project,' then takes the laptop to her new employer. The course classifies this kind of insider threat as:",
        points: 2,
        options: ["Negligent", "Compromised", "Malicious", "Accidental"],
        correctAnswer: 2,
        explanation:
          "Deliberate exfiltration for personal gain = MALICIOUS insider. Negligent = careless without intent; Compromised = manipulated without realising. Behavioural indicators (data outside normal job function, large downloads before resignation) fit. Source: L5 — 'Insider Threat Dimension' slide.",
      },
      {
        id: "cyb-mt2-q6",
        type: "multiple-choice",
        question:
          "An attacker emails a junior employee: 'Your colleagues Priya and Sam have already completed this confidentiality attestation; please complete yours by end of day.' Which of Cialdini's principles is being exploited MOST directly?",
        points: 2,
        options: ["Authority", "Scarcity", "Social proof", "Reciprocity"],
        correctAnswer: 2,
        explanation:
          "SOCIAL PROOF — people look to peer behaviour. 'Priya and Sam have already completed this' matches the slide example almost verbatim. 'End of day' is a secondary scarcity/urgency pressure, but the PRIMARY mechanism is the appeal to peers. Source: L5 — Cialdini's Principles.",
      },
      {
        id: "cyb-mt2-q7",
        type: "multiple-choice",
        question:
          "A bank stores its security logs in an S3 bucket with object-versioning, MFA-required-for-delete, and a retention lock preventing deletion for seven years. This configuration is best described as which course concept?",
        points: 2,
        options: [
          "Role-based access control (RBAC)",
          "Write-Once-Read-Many (WORM) storage",
          "Defence in depth at the network layer",
          "An air-gapped backup",
        ],
        correctAnswer: 1,
        explanation:
          "Object-versioning + MFA-delete + retention lock is the canonical AWS implementation of WORM storage — logs become immutable until retention expires. An air-gapped backup requires physical disconnection; this bucket is online. Source: L6 — 'Log Protection Strategies' slide.",
      },
      {
        id: "cyb-mt2-q8",
        type: "multiple-choice",
        question:
          "During an incident, the response lead does the following in this order: (1) isolates the compromised host from the network; (2) revokes its service tokens; (3) removes the webshell the attacker installed; (4) patches the vulnerability that let them in. According to the course's incident-response phases, where is the boundary between containment and eradication?",
        points: 2,
        options: [
          "Step 1 is containment; steps 2–4 are eradication",
          "Steps 1–2 are containment; steps 3–4 are eradication",
          "All four steps are containment; eradication has not yet started",
          "Only step 4 is eradication; the rest are recovery",
        ],
        correctAnswer: 1,
        explanation:
          "Containment = cut the attacker's reach (isolate host, revoke tokens). Eradication = remove what the attacker installed and close the hole (remove webshell, patch vulnerability). Source: L6 — SANS Step 3 (Containment) and Step 4 (Eradication and Remediation).",
      },
      {
        id: "cyb-mt2-q9",
        type: "multiple-choice",
        question:
          "A defect found in the design (planning) stage costs roughly 1 unit to fix. According to the 'shift-left' cost curve used in the course, the same defect discovered in production typically costs approximately:",
        points: 2,
        options: ["5×", "25×", "100×", "1000×"],
        correctAnswer: 2,
        explanation:
          "The shift-left cost curve (L7): Requirements 1×, Design 5×, Implementation 10×, Verification 25×, Production 100×. This justifies shifting security testing left into design, code, and CI. Source: L7 — 'Shift-Left Security' slide.",
      },
      {
        id: "cyb-mt2-q10",
        type: "multiple-choice",
        question:
          "A container image is deployed with the following properties: it runs as a non-root user; its root filesystem is mounted read-only; all Linux capabilities are dropped (and none re-added); and its database password is read from the orchestrator's secret store rather than an environment variable. Which security principle most broadly governs this combination?",
        points: 2,
        options: [
          "Defence in depth via memory-safe languages",
          "Least privilege, applied to the workload",
          "Zero Trust networking between services",
          "Fail-safe defaults for incoming requests",
        ],
        correctAnswer: 1,
        explanation:
          "Each control (non-root, read-only FS, dropped capabilities, secrets from the orchestrator) narrows what the container is ALLOWED to do — the overarching principle is least privilege applied to the workload. None of the controls touch service-to-service networking or error handling. Source: L7 — 'Running Containers Safely'; L4 — Least Privilege categories.",
      },
      {
        id: "cyb-mt2-q11",
        type: "multiple-choice",
        question:
          "Most major data-exfiltration incidents exploit a particular network-design weakness. Which is it?",
        points: 2,
        options: [
          "Insufficient encryption of data at rest",
          "Permissive outbound (egress) network access",
          "Absence of intrusion detection on inbound traffic",
          "Use of HTTPS rather than HTTP for sensitive APIs",
        ],
        correctAnswer: 1,
        explanation:
          "Exfiltration happens via EGRESS — attacker tools call home (C2), upload data, and pull payloads, all outbound. The prescription is default-deny egress with allowlisted destinations via a proxy. Source: L8 — 'Egress Control' slide.",
      },
      {
        id: "cyb-mt2-q12",
        type: "multiple-choice",
        question:
          "An Identity-Aware Proxy sits in front of a private internal application. Which statement best describes how this changes the application's exposure?",
        points: 2,
        options: [
          "The application is exposed to the public internet, but only over TLS",
          "The application never sees the public internet; the proxy validates the user's SSO identity and device posture before forwarding the request",
          "The proxy removes the need for authentication inside the application",
          "The proxy grants the user network-level access to the entire subnet the application lives in",
        ],
        correctAnswer: 1,
        explanation:
          "The Identity-Aware Proxy (L8): the app sits on a private network with no public IP; the proxy is the only ingress, validates the SSO token and device posture, then forwards over an authenticated channel. (d) describes a flat VPN — the wrong pattern; the point is app-level, not network-level, access. Source: L8 — 'Modern Access Pattern: Identity-Aware Proxy' slide.",
      },
      {
        id: "cyb-mt2-q13",
        type: "text",
        question:
          "Short answer (4 marks). A company has run mandatory annual cybersecurity-awareness training (with one simulated phishing email per year) for ten years, yet its phishing success rate has not improved. State two research-based reasons (from the slides) that this kind of training is largely ineffective, and ONE concrete intervention that the literature suggests works better.",
        points: 4,
        explanation:
          "MODEL ANSWER — Two reasons (1 mark each, any two): (1) Knowledge decay — phishing training knowledge decays within 2–4 weeks, so annual delivery retains almost nothing for the other 11 months. (2) No transfer to novel attacks — generic simulated phish don't transfer to the variety of real-world lures. (3) Shame reduces reporting — shame-based follow-up makes staff hide mistakes, so real incidents go unreported. One intervention that works better (2 marks, must be concrete): short (5–10 min) scenario-based learning delivered frequently; teaching the FEELING of a phish (urgency/authority/off-pattern); a psychologically safe reporting culture; or a one-click report button wired to the SOC. Marking: 1 mark per reason (max 2); 2 marks for a specific intervention ('do more training' = 0). Source: L5 — 'Why Phishing Training Fails' / 'What Actually Works'.",
      },
      {
        id: "cyb-mt2-q14",
        type: "text",
        question:
          "Short answer (4 marks). A deployment pipeline has the following rule: if any security gate (SAST, secrets scanner, dependency scanner, IaC scanner) fails, the deploy is blocked. If the security scanner itself is unreachable, the deploy is also blocked. (a) Name the security principle being applied here. (b) Why is the 'scanner offline → block' rule essential?",
        points: 4,
        explanation:
          "MODEL ANSWER — (a) Fail-safe defaults (also accept 'fail closed' / 'deny by default'). (b) The rule preserves the integrity of the gate: if 'scanner offline = deploy allowed' were the default, an attacker who disables/DoSes the scanner gains free passage (every malicious deploy goes unscanned), and accidental outages would also let unscanned code reach production — the gate would provide no real assurance. Blocking on unavailability ensures the gate cannot be silently bypassed and every deploy is provably scanned. Marking (per published scheme): (a) 1 mark for the term; (b) 1 mark for the bypass risk + 1 mark for the consequence. Source: L4 — 'Operational Fail-Safes' slide.",
      },
      {
        id: "cyb-mt2-q15",
        type: "text",
        question:
          "Short answer (4 marks). A small company offers all its engineers a full-tunnel VPN from their personal laptops into a flat corporate network containing development, staging, AND production servers. Identify two distinct security weaknesses of this architecture, and for each one, briefly describe a Zero-Trust-aligned alternative.",
        points: 4,
        explanation:
          "MODEL ANSWER — Weakness 1 (1 mark): Flat network / no segmentation — once on the VPN, anyone (or a stolen credential) can reach dev, staging, AND production; lateral movement is trivial. ZT alternative (1 mark): application-level access via an identity-aware proxy, granting access to specific applications by identity/role, with each environment separately gated. Weakness 2 (1 mark): No device posture check / personal laptops — unknown patch level, possible malware, unmanaged; dragged straight inside the perimeter. ZT alternative (1 mark): device-aware conditional access verifying device health (MDM, disk encryption, OS patch, EDR) on every request, plus phishing-resistant MFA (passkeys/FIDO2). Other acceptable weaknesses: long-lived sessions vs short-lived/time-bound access; network-level trust vs identity-based continuous verification; no service-to-service auth vs mTLS/workload identity. Marking: 1 mark per distinct weakness (max 2) + 1 mark per matching ZT alternative (max 2); penalise duplicate weaknesses. Source: L8 — 'From Flat VPN to Application Access' and 'Device-Aware Conditional Access'.",
      },
      {
        id: "cyb-mt2-q16a",
        type: "text",
        question:
          "Scenario — Refilwe Memorial Hospital (8 marks). A hospital group (1,200 staff across 18 clinics) is procuring a new electronic patient-records system. The vendor's proposed version 1.0 has the following design:\n• A single 'Hospital Staff' role is assigned to all 1,200 users — doctors, nurses, admin staff, cleaning contractors, and IT contractors alike — each with read/write access to all patient records.\n• Administration uses one shared 'superuser' account; its password is rotated every 90 days and stored in a shared OneNote accessible to the whole IT team.\n• A flat IPSec VPN connects all 18 clinics to head office, and once connected, all hospital services are reachable.\n• Security awareness is a 30-minute e-learning module once a year, plus one simulated phishing email per year.\n• Backups are written nightly to a NAS in the same data centre as the source system and kept for 30 days.\n• Logs are kept for 30 days on the same server that generates them, then rotated.\n\nIdentify FOUR distinct security weaknesses in this proposal. For each, name the relevant principle, concept, or trap from the course that it violates. (2 marks per weakness.)",
        points: 8,
        explanation:
          "MODEL ANSWER (any FOUR, 2 marks each = 1 weakness + 1 principle): (1) Single 'Hospital Staff' role for all 1,200 users with full patient-record access → violates LEAST PRIVILEGE / no role separation (RBAC failure); blast radius of one phished credential is the whole database. (2) Shared 'superuser' account with password in OneNote → violates LEAST PRIVILEGE (users) AND ACCOUNTABILITY / NON-REPUDIATION; no individual attribution; admin must be a distinct per-user identity with phishing-resistant MFA. (3) Flat IPSec VPN where all services are reachable → violates ZERO TRUST / flat network / no segmentation; alternative is app-level access via identity-aware proxy with device posture. (4) Annual 30-min e-learning + 1 phish/year → violates the 'Why Phishing Training Fails' research (2–4 week decay); use frequent scenario-based learning + safe reporting. (5) Backups on a NAS in the same data centre, 30-day retention → violates backup isolation / forensic readiness; same blast radius, no WORM immutability, below the 90–400 day minimum. (6) Logs 30 days on the same server then rotated → violates Log Protection Strategies (L6); logs must be WORM/versioned in a separate security account; 30 days is below the 90–400 day minimum. Marking: 1 mark per weakness + 1 mark per correct principle, max 4 weaknesses (8 marks); penalise duplicates mapping to the same principle.",
      },
      {
        id: "cyb-mt2-q16b",
        type: "text",
        question:
          "Scenario — Refilwe Memorial Hospital, continued (3 marks). Choose ONE of the weaknesses you identified in part (a). Propose a specific, concrete redesign for it, and name the principle the redesign now satisfies.",
        points: 3,
        explanation:
          "MODEL ANSWER (example using the single 'Hospital Staff' role): implement RBAC with clinically-justified, minimum-scoped roles — Doctors: read/write only to records of patients under their active care (relationship-based); Nurses: only their ward/shift; Admin: demographic/billing fields only, no clinical notes; Cleaning contractors: NO patient-record access; IT contractors: time-bound, audit-logged access for specific maintenance, no routine clinical access. Plus: every access logged with user/time/patient/reason, and out-of-pattern access alerts. PRINCIPLE NOW SATISFIED: least privilege (applied to users and data). Other valid redesigns: identity-aware proxy + per-clinic segmentation; WORM logs in a separate security account; isolated immutable backups. Marking: 1 mark for choosing a weakness and addressing it; 1 mark for being SPECIFIC/CONCRETE ('improve permissions' = 0; 'split into 4 named roles with these scopes' earns it); 1 mark for naming the principle.",
      },
      {
        id: "cyb-mt2-q16c",
        type: "text",
        question:
          "Scenario — Refilwe Memorial Hospital, continued (3 marks). A procurement-committee member responds: 'Let's just buy this version now because the vendor has promised to add proper role-based permissions, separate backups, and better logging in version 2.0 next year.' Drawing on a specific TRAP named in the course, explain why this plan is itself a security risk.",
        points: 3,
        explanation:
          "MODEL ANSWER — This is the 'WE'LL TIGHTEN LATER' trap (L4). Properties: (1) Technical debt = security debt — loose permissions accumulate like compound interest; the longer it runs with broad access, the more processes depend on it, making tightening harder. (2) You rarely go back — once it 'works' in production, commercial/operational pressure pushes tightening down the backlog; v2.0 may slip or its controls may be optional/poorly adopted. (3) Start strict — grant access explicitly as requirements are proven, not broadly upfront with promises of future restriction. Refilwe specifics: patient data is high-sensitivity (POPIA-regulated), 1,200 users and 18 clinics are already active, and retrofitting RBAC after a year of 'everyone can access everything' is a far harder migration. The right move: require these controls in v1.0 as a condition of purchase, or choose another product. Marking: 1 mark for naming the trap; 1 mark for why it's a trap (debt / you rarely go back / harder later); 1 mark for connecting it to the scenario (regulated data; entrenched broad access; diminishing vendor incentives post-sale).",
      },
    ],
  },
  {
    id: "cyber-l7-quiz",
    courseId: "7",
    title: "Lecture 7 Quiz",
    description:
      "Lecture 7 — Secure Software Development Lifecycle. Multiple-choice quiz covering SDLC phases, shift-left, threat modeling, abuse cases, web/cloud/mobile/embedded security, containers, and testing. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-20T11:00:00Z",
    questions: [
      {
        id: "cyb-l7-q1",
        type: "multiple-choice",
        question: "The course states the AIM of a secure SDLC as:",
        points: 2,
        options: [
          "Run a separate security audit only at the end of the project, just before release",
          "Catch issues EARLY when they are cheap to fix, build in guardrails so common mistakes don't ship, and keep enough visibility to prove what you shipped matches what you intended",
          "Hire enough security engineers to manually review every pull request before merge",
          "Replace developers with security specialists for any production code",
        ],
        correctAnswer: 1,
        explanation:
          "The L7 preface states this exact aim: catch early, build guardrails, keep visibility to prove what shipped.",
      },
      {
        id: "cyb-l7-q2",
        type: "multiple-choice",
        question:
          "According to the shift-left cost curve in the slides, a defect found in the requirements/planning stage costs roughly 1 unit. The same defect discovered in production costs approximately:",
        points: 2,
        options: ["5×", "25×", "100×", "1000×"],
        correctAnswer: 2,
        explanation: "The shift-left cost curve gives ~100× for production.",
      },
      {
        id: "cyb-l7-q3",
        type: "multiple-choice",
        question:
          "The shift-left cost curve in L7 gives which sequence of approximate cost multipliers?",
        points: 2,
        options: [
          "1× → 2× → 4× → 8× → 16× (across the five stages)",
          "1× → 5× → 10× → 25× → 100× (Planning → Design → Implementation → Verification → Production)",
          "10× → 25× → 50× → 75× → 100×",
          "The cost is roughly constant across all stages",
        ],
        correctAnswer: 1,
        explanation:
          "The exact numbers from the slide: 1 (planning) → 5 (design) → 10 (implementation) → 25 (verification) → 100 (production).",
      },
      {
        id: "cyb-l7-q4",
        type: "multiple-choice",
        question: "The course describes a 'mature SDLC' as one that:",
        points: 2,
        options: [
          "Slows teams down to ensure thorough review",
          "Removes toil by providing PAVED PATHS that are secure by default",
          "Reviews every line of code manually before merging",
          "Maintains a separate security team that runs in parallel with developers",
        ],
        correctAnswer: 1,
        explanation:
          "'A mature SDLC does not slow teams down. It removes toil by providing paved paths that are secure by default.'",
      },
      {
        id: "cyb-l7-q5",
        type: "multiple-choice",
        question:
          "Which of the following is NOT one of the SDLC phases listed in the L7 'SDLC at a glance' section?",
        points: 2,
        options: [
          "Requirements and use cases with security and privacy goals alongside functionality",
          "Architecture and threat modeling to surface abuse cases early",
          "Annual external penetration test as the only verification",
          "Verification using static analysis, dependency checks, code review, and targeted dynamic tests",
        ],
        correctAnswer: 2,
        explanation:
          "An annual external pen test is NOT a phase. The seven listed phases are Requirements, Architecture/threat modeling, Design, Implementation, Verification, Pre-release hardening, Handover.",
      },
      {
        id: "cyb-l7-q6",
        type: "multiple-choice",
        question: "The STRIDE threat model in L7 stands for:",
        points: 2,
        options: [
          "Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
          "Security, Trust, Resilience, Integrity, Defence, Encryption",
          "Scan, Test, Review, Iterate, Deploy, Evaluate",
          "Static, Transit, Runtime, Identity, Dynamic, Egress",
        ],
        correctAnswer: 0,
        explanation:
          "STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.",
      },
      {
        id: "cyb-l7-q7",
        type: "multiple-choice",
        question:
          "A team is building a file-upload feature where users upload profile documents. The slides give two example abuse cases for this feature. Which are they?",
        points: 2,
        options: [
          "Slow upload speeds and large file sizes",
          "Malware hidden inside uploads, AND exfiltration via large file uploads",
          "Users forgetting their passwords, AND broken thumbnails",
          "Browser incompatibility, AND missing image previews",
        ],
        correctAnswer: 1,
        explanation:
          "The 'For Every Use Case, Write Abuse Cases' slide lists exactly these two for file uploads.",
      },
      {
        id: "cyb-l7-q8",
        type: "multiple-choice",
        question:
          "The slides give an example of a 'well-formed security requirement' written as a user story: 'As an operator, I need all admin actions to be logged with subject, action, and result so that I can audit changes.' What three properties does the slide say this requirement has?",
        points: 2,
        options: [
          "Written like any other user story, testable and specific, linked to abuse cases",
          "Long, technical, signed off by the CISO",
          "Mandated by ISO 27001, GDPR, and SOX simultaneously",
          "Implemented in a separate service from the main application",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Capture Security in the Backlog' slide lists: written like any user story, testable & specific, linked to abuse cases.",
      },
      {
        id: "cyb-l7-q9",
        type: "multiple-choice",
        question:
          "The L7 'fast' threat-modeling approach recommends which set of activities?",
        points: 2,
        options: [
          "A two-week formal STRIDE workshop with all stakeholders before any code is written",
          "Drawing data flows, marking trust boundaries, listing the top five risks with proposed controls, and revisiting when the design changes",
          "Outsourcing threat modeling to an external consultancy once a year",
          "Skipping threat modeling for agile teams since the backlog covers it",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Architecture and threat modeling, fast' section: light and regular — draw flows, mark trust boundaries, list top 5 risks, revisit when design changes.",
      },
      {
        id: "cyb-l7-q10",
        type: "multiple-choice",
        question:
          "A new endpoint accepts JSON documents with arbitrary keys. The developer maintains a blocklist of dangerous field names (__proto__, constructor, ...) and accepts everything else. From the course's perspective, this approach is:",
        points: 2,
        options: [
          "Correct, provided the blocklist is updated regularly",
          "Incorrect: an ALLOWLIST of permitted keys should be used, because blocklists fail open whenever an attacker uses something not yet on the list",
          "Correct, because parsing all input gives more flexibility to downstream code",
          "Incorrect: input validation should be done at the database, not the API layer",
        ],
        correctAnswer: 1,
        explanation: "Blocklists fail open; allowlists are the fail-safe default.",
      },
      {
        id: "cyb-l7-q11",
        type: "multiple-choice",
        question:
          "The L7 web-security threat focus lists IDOR (Insecure Direct Object Reference) and 'broken object-level authorization in APIs.' The recommended design countermeasure is:",
        points: 2,
        options: [
          "Encrypt all object IDs with AES-256",
          "Hide the IDs behind a separate microservice",
          "A SINGLE access-check function used before handlers, enforced in code review; check ownership on EVERY resource — not just role at login",
          "Use sequential numeric IDs to make caching easier",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Threat focus → Design countermeasures' sections: a single access-check function used before handlers, and check ownership on every resource.",
      },
      {
        id: "cyb-l7-q12",
        type: "multiple-choice",
        question:
          "A REST endpoint /v1/tenants/:tid/reports/:id is being written. According to the L7 sample handler, what authorization checks should occur BEFORE returning the report?",
        points: 2,
        options: [
          "Only check that the user has a valid session token",
          "Check that req.user.tenant === tid (or the user has a trusted support role), AND that the report's tenant field also matches tid before returning the row",
          "Check role permissions in the database layer only",
          "No authorization check is needed if the URL contains the tenant ID",
        ],
        correctAnswer: 1,
        explanation:
          "The sample handler enforces tenant match (or trusted support role) AND checks the report's own tenant field — both checks before returning data.",
      },
      {
        id: "cyb-l7-q13",
        type: "multiple-choice",
        question:
          "Which set of test types is recommended on the L7 'Test Egress Controls — SSRF Resistance' slide?",
        points: 2,
        options: [
          "Block 169.254.169.254 (the metadata endpoint), block all link-local 169.254.x.x addresses, block private IP ranges (10.x, 172.16.x, 192.168.x), and re-check resolved IPs after DNS lookup to prevent DNS rebinding",
          "Allow all outbound traffic and rely on the WAF to filter",
          "Block only port 80 and 443",
          "Use a global allowlist of 'good' URLs maintained by the security team",
        ],
        correctAnswer: 0,
        explanation:
          "'Test Egress Controls — SSRF Resistance' slide lists: block metadata endpoint, block link-local, block private IP ranges, safe DNS resolution.",
      },
      {
        id: "cyb-l7-q14",
        type: "multiple-choice",
        question:
          "The 'client-side security' recommendations in L7 include which of the following?",
        points: 2,
        options: [
          "Disable Content-Security-Policy to allow flexibility",
          "Allow inline scripts to simplify templating",
          "Enable a STRICT Content-Security-Policy, forbid inline scripts, load third-party scripts cautiously, and use Subresource Integrity where possible",
          "Trust all scripts from major CDNs without verification",
        ],
        correctAnswer: 2,
        explanation:
          "Strict CSP, forbid inline scripts, cautious third-party scripts, Subresource Integrity — exactly as listed in the L7 'Client-side security' section.",
      },
      {
        id: "cyb-l7-q15",
        type: "multiple-choice",
        question: "The course says that 'most cloud incidents' trace back to:",
        points: 2,
        options: [
          "Novel zero-day vulnerabilities in cloud-provider services",
          "Insufficient bandwidth between regions",
          "Identity, misconfiguration, or over-broad roles — rather than novel vulnerabilities",
          "Hardware failures in the data centre",
        ],
        correctAnswer: 2,
        explanation:
          "The L7 cloud preface: 'Most cloud incidents trace back to identity, misconfiguration, or over-broad roles rather than novel vulnerabilities.'",
      },
      {
        id: "cyb-l7-q16",
        type: "multiple-choice",
        question:
          "Which of the following is listed as a CLOUD-specific threat focus in L7?",
        points: 2,
        options: [
          "Insufficient TLS version in browser caches",
          "Public exposure through misconfigured buckets, privilege escalation via wildcard IAM, metadata service abuse, and supply-chain risks in base images",
          "Cosmic-ray bit flips in production memory",
          "Vendor lock-in to a single cloud provider",
        ],
        correctAnswer: 1,
        explanation:
          "The L7 'Threat focus' for cloud: public exposure, privilege escalation, metadata abuse, supply chain.",
      },
      {
        id: "cyb-l7-q17",
        type: "multiple-choice",
        question:
          "A container image is deployed with these properties: runs as a non-root user; root filesystem mounted read-only; all Linux capabilities dropped (none re-added); database password read from the orchestrator's secret store rather than an environment variable. Which security principle most broadly governs this combination?",
        points: 2,
        options: [
          "Defence in depth via memory-safe languages",
          "LEAST PRIVILEGE, applied to the workload",
          "Zero Trust networking between services",
          "Fail-safe defaults for incoming requests",
        ],
        correctAnswer: 1,
        explanation:
          "The single overarching principle is least privilege applied to the workload.",
      },
      {
        id: "cyb-l7-q18",
        type: "multiple-choice",
        question:
          "The slides' 'Field-Ready IoT Defences' list includes which set?",
        points: 2,
        options: [
          "Force credential change on first boot, authenticated update servers (TLS mutual auth), firmware transparency (SBOMs + signed manifests), and kernel update strategy with A/B partition rollback",
          "Allow factory-default admin passwords for ease of deployment",
          "Push updates over plain HTTP to save bandwidth",
          "Disable all firmware signing to allow community modifications",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Field-Ready IoT Defences' slide lists exactly these four.",
      },
      {
        id: "cyb-l7-q19",
        type: "multiple-choice",
        question:
          "Which of the following is the L7 recommendation for handling SECRETS in MOBILE apps?",
        points: 2,
        options: [
          "Embed static API keys in the app binary, since users can't easily extract them",
          "Keep secrets off the device entirely; use backend-issued tokens bound to device properties where possible, and treat your API like a public client",
          "Store secrets in plain text in the app's shared preferences for performance",
          "Use the device's IMEI as a hard-coded secret",
        ],
        correctAnswer: 1,
        explanation:
          "'Keep secrets off the device. Do not embed static API keys. Use backend-issued tokens. Treat your API like a public client.' (L7 Mobile section.)",
      },
      {
        id: "cyb-l7-q20",
        type: "multiple-choice",
        question:
          "Which of the following is NOT among the L7 IoT design countermeasures?",
        points: 2,
        options: [
          "Force initial credential change or ship with no default admin access",
          "TLS-authenticated update servers with pinned trust anchors",
          "Firmware transparency: SBOMs, reproducible builds, signed manifests",
          "Allow any signed firmware from third-party community sources to be installed automatically",
        ],
        correctAnswer: 3,
        explanation:
          "Auto-installing community-signed firmware bypasses the device's trust anchor — the OPPOSITE of secure-boot practice. The other three are all listed countermeasures.",
      },
      {
        id: "cyb-l7-q21",
        type: "multiple-choice",
        question: "The L7 'Six Security Test Categories' are:",
        points: 2,
        options: [
          "Unit, integration, end-to-end, smoke, sanity, regression",
          "SAST, Dependency/SBOM, Secrets Scanning, IaC Scanning, DAST/Smoke Tests, Header Snapshot Tests",
          "Manual review, code review, peer review, lead review, VP review, CISO review",
          "Pen test, red team, purple team, blue team, tiger team, SOC review",
        ],
        correctAnswer: 1,
        explanation: "The 'Six Security Test Categories' slide.",
      },
      {
        id: "cyb-l7-q22",
        type: "multiple-choice",
        question:
          "SAST (Static Application Security Testing) and DAST (Dynamic Application Security Testing) differ in that:",
        points: 2,
        options: [
          "SAST runs only in production, DAST runs only in development",
          "SAST analyses the SOURCE CODE (without executing it), while DAST exercises the RUNNING APPLICATION (e.g. ZAP Baseline in staging)",
          "SAST is for web apps only, DAST is for mobile only",
          "They are the same thing under different names",
        ],
        correctAnswer: 1,
        explanation:
          "SAST = static (no execution), DAST = dynamic (running app). The L7 categories explicitly include 'DAST / Smoke Tests — ZAP Baseline in staging.'",
      },
      {
        id: "cyb-l7-q23",
        type: "multiple-choice",
        question:
          "The L7 'Evidence for sign-off' approach replaces the statement 'it feels secure' with:",
        points: 2,
        options: [
          "'The product owner says it's secure'",
          "'We can SHOW it' — threat model checked in, automated test results, dependency and secrets scans clean, reviewed IaC, and documented residual risks",
          "'The CISO has signed a memo'",
          "'We've run a penetration test in the past 12 months'",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Evidence for sign-off' section: from 'it feels secure' to 'we can show it' — with threat model, scan results, code review evidence, etc.",
      },
      {
        id: "cyb-l7-q24",
        type: "multiple-choice",
        question:
          "The lecture's overarching message about secure SDLC is best captured by which statement?",
        points: 2,
        options: [
          "Security is a separate track that runs in parallel with development",
          "Security should be done once, at the end, by a dedicated team",
          "Catch issues EARLY when they are cheap, build GUARDRAILS so common mistakes don't ship, and maintain VISIBILITY so you can prove what shipped matches what was intended",
          "Security is best handled by external auditors after deployment",
        ],
        correctAnswer: 2,
        explanation:
          "The L7 preface summarises the entire chapter in exactly these three goals: catch early, guardrails, visibility.",
      },
    ],
  },
  {
    id: "cyber-l8-quiz",
    courseId: "7",
    title: "Lecture 8 Quiz",
    description:
      "Lecture 8 — Communication & Network Security. Multiple-choice quiz covering Zero Trust networking, VPN vs IAP, egress control, segmentation, OSI/firewall layers, mTLS, modern detection, and PAM. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-20T12:00:00Z",
    questions: [
      {
        id: "cyb-l8-q1",
        type: "multiple-choice",
        question: "The L8 summary states the lecture's central message as:",
        points: 2,
        options: [
          "Treat the network as a trust boundary; defend the perimeter with stronger firewalls",
          "Treat the network as a DELIVERY MECHANISM, not a trust boundary; build trust with identity, encrypt by default, and write policies in terms of who can do what, not where they are",
          "Encrypt only sensitive data; leave internal traffic plaintext for performance",
          "Trust internal traffic by default; suspect only external",
        ],
        correctAnswer: 1,
        explanation:
          "The L8 summary explicitly says: 'Treat the network as a delivery mechanism, not as a trust boundary.'",
      },
      {
        id: "cyb-l8-q2",
        type: "multiple-choice",
        question:
          "The 'Core Zero Trust Concepts' slide lists four concepts. Which set is correct?",
        points: 2,
        options: [
          "Credentials Everywhere, Device Posture, Gateway Termination, Identity-Based Access",
          "Encryption, Authentication, Authorisation, Auditing",
          "Inside-Safe, Outside-Dangerous, Perimeter, Castle",
          "VPN, Firewall, Antivirus, Backup",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Core Zero Trust Concepts' slide lists exactly these four: Credentials Everywhere, Device Posture, Gateway Termination, Identity-Based Access.",
      },
      {
        id: "cyb-l8-q3",
        type: "multiple-choice",
        question:
          "Under Zero Trust, 'Identity-Based Access' means access is defined by:",
        points: 2,
        options: [
          "IP addresses and subnet membership",
          "The user's physical location in the office",
          "Identity and application — not IP addresses",
          "Whether the user is connected to the corporate VPN",
        ],
        correctAnswer: 2,
        explanation:
          "'Access defined by identity and application — not IP addresses.' (Slide quote.)",
      },
      {
        id: "cyb-l8-q4",
        type: "multiple-choice",
        question: "'Device Posture' in the Zero Trust model contributes:",
        points: 2,
        options: [
          "Optional information that may or may not be checked",
          "Health and posture signals ALONGSIDE identity, used in the access decision",
          "A replacement for user identity",
          "Audit data only, not access-decision data",
        ],
        correctAnswer: 1,
        explanation:
          "The slide states devices contribute health and posture signals ALONGSIDE identity, not as a replacement.",
      },
      {
        id: "cyb-l8-q5",
        type: "multiple-choice",
        question:
          "According to the 'Device-Aware Conditional Access' slide, how many signals feed into a single access decision, and what are they?",
        points: 2,
        options: [
          "Two: username and password",
          "Three: user identity (group membership), device compliance (MDM enrolled and policy-compliant), and sign-in risk score",
          "Four: identity, device, location, biometric",
          "One: a single SSO token",
        ],
        correctAnswer: 1,
        explanation:
          "'Device-Aware Conditional Access — three signals, one decision: user identity, device compliance, sign-in risk.'",
      },
      {
        id: "cyb-l8-q6",
        type: "multiple-choice",
        question:
          "The 'From Flat VPN to Application Access' slide contrasts the two models as:",
        points: 2,
        options: [
          "Both grant identical access; the difference is only marketing",
          "Traditional VPN: 'You are on the VPN → you can reach ALL servers.' Application Access Proxy: 'You are on a compliant device → you can reach the Orders API.'",
          "VPN is more secure than IAP in all scenarios",
          "IAP requires the user to install custom client software",
        ],
        correctAnswer: 1,
        explanation:
          "This is the exact contrast from the 'From Flat VPN to Application Access' slide.",
      },
      {
        id: "cyb-l8-q7",
        type: "multiple-choice",
        question:
          "An Identity-Aware Proxy sits in front of a private internal application. The slides describe its effect as:",
        points: 2,
        options: [
          "The application is exposed to the public internet but only over TLS",
          "The application NEVER sees the public internet; the proxy validates the user's SSO identity and device posture before forwarding the request",
          "The proxy removes the need for any authentication inside the application",
          "The proxy grants the user network-level access to the entire subnet",
        ],
        correctAnswer: 1,
        explanation:
          "The application never sees the public internet; the proxy validates identity AND device posture.",
      },
      {
        id: "cyb-l8-q8",
        type: "multiple-choice",
        question:
          "In the Identity-Aware Proxy flow, what type of request does the proxy forward to the backend?",
        points: 2,
        options: [
          "The user's original IP address, unmodified",
          "Anonymous requests, since the proxy has handled auth",
          "Requests authenticated with mTLS, from the proxy CIDR only, with the user's validated identity attached",
          "Raw TCP packets from the public internet",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Modern Access Pattern' slide: only the proxy CIDR is allowed inbound, with mTLS; the proxy validated SSO token + device health first.",
      },
      {
        id: "cyb-l8-q9",
        type: "multiple-choice",
        question:
          "A small company offers all its engineers a full-tunnel VPN from their personal laptops into a flat corporate network containing dev, staging, and production. Identify the TWO strongest weaknesses described in the slides.",
        points: 2,
        options: [
          "The VPN protocol is too slow, and the encryption keys are too short",
          "Flat network = trivial lateral movement (no segmentation), AND personal laptops bypass device-posture / health checks",
          "The VPN costs too much money to operate",
          "Only one engineer can connect at a time",
        ],
        correctAnswer: 1,
        explanation:
          "These are the two structural weaknesses: no segmentation (lateral movement) and no device-posture check (personal laptops drag malware inside).",
      },
      {
        id: "cyb-l8-q10",
        type: "multiple-choice",
        question:
          "When the slides DO allow a VPN as appropriate, the 'Appropriate VPN Use Cases' slide requires which set of accompanying controls?",
        points: 2,
        options: [
          "Default username/password for ease of use",
          "Indefinite session length to reduce reconnect friction",
          "Aggressive segmentation WITHIN the VPN, phishing-resistant MFA, device-posture checks, and short time-bound sessions",
          "Flat networks inside the VPN so engineers can reach any server",
        ],
        correctAnswer: 2,
        explanation:
          "'Appropriate VPN Use Cases': segment aggressively within the VPN, phishing-resistant MFA, device posture, short sessions.",
      },
      {
        id: "cyb-l8-q11",
        type: "multiple-choice",
        question:
          "Most major data-exfiltration incidents exploit a particular network-design weakness. Which is it?",
        points: 2,
        options: [
          "Insufficient encryption of data at rest",
          "Permissive OUTBOUND (egress) network access",
          "Absence of intrusion detection on inbound traffic",
          "Use of HTTPS rather than HTTP for sensitive APIs",
        ],
        correctAnswer: 1,
        explanation: "Most data-exfil incidents exploit permissive egress.",
      },
      {
        id: "cyb-l8-q12",
        type: "multiple-choice",
        question:
          "The L8 'segmentation that actually helps' recommends which sequence?",
        points: 2,
        options: [
          "Allow all internal traffic by default and add deny rules as problems are found",
          "Inventory flows → deny by default → open narrowly (only required destinations/ports, preferably identity-aware) → monitor and prune",
          "Buy the most expensive next-gen firewall available",
          "Place all services in a single flat subnet for performance",
        ],
        correctAnswer: 1,
        explanation:
          "The 'segmentation that actually helps' four-step sequence: inventory flows, deny by default, open narrowly, monitor and prune.",
      },
      {
        id: "cyb-l8-q13",
        type: "multiple-choice",
        question:
          "The slides advocate 'Identity over IP' for firewall policy. Why?",
        points: 2,
        options: [
          "IPs are easier to memorise",
          "IP-based policies can be bypassed by NAT, IP hopping, or recycling — identity is the only reliable handle in cloud environments",
          "Identity-based rules are cheaper to license",
          "IPs are deprecated in IPv6",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Firewall Best Practices' slide: 'Identity over IP. Where possible, enforce identity-aware policies at the proxy or mesh layer so that IP hopping or NAT does not bypass intent.'",
      },
      {
        id: "cyb-l8-q14",
        type: "multiple-choice",
        question:
          "The L8 mTLS-via-service-mesh example uses Istio with mtls: mode: STRICT. The slides warn that running with mode: PERMISSIVE in production is dangerous because:",
        points: 2,
        options: [
          "PERMISSIVE rejects all mTLS connections",
          "PERMISSIVE accepts plaintext alongside mTLS — silently allowing unencrypted lateral movement",
          "PERMISSIVE requires a paid Istio licence",
          "PERMISSIVE forces certificate rotation every minute",
        ],
        correctAnswer: 1,
        explanation:
          "STRICT rejects plaintext entirely; PERMISSIVE accepts both and silently allows unencrypted lateral movement.",
      },
      {
        id: "cyb-l8-q15",
        type: "multiple-choice",
        question:
          "The 'Service-to-Service Trust' slide lists three principles. Which set is correct?",
        points: 2,
        options: [
          "Mutual TLS (both sides present certificates); do NOT rely on source IP (spoofable, NAT, recycling); service meshes (Istio/Linkerd) enforce mTLS at the infrastructure layer",
          "HTTPS only; trust the corporate VPN; rotate IPs daily",
          "Symmetric encryption with a shared password",
          "Use plaintext internally for performance; TLS only at the edge",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Service-to-Service Trust' slide lists exactly these three.",
      },
      {
        id: "cyb-l8-q16",
        type: "multiple-choice",
        question:
          "According to the L8 'Practical network hardening checklist,' which set best matches the recommended controls?",
        points: 2,
        options: [
          "Single shared admin account; long-lived credentials; no monitoring; trust internal traffic",
          "Inventory & map assets; encrypt everywhere (TLS for all services, internal databases and queues included); deny lateral movement by default; control egress; patch surface devices; monitor DNS, control plane, endpoints; test failure modes",
          "Open all ports for ease of debugging",
          "Allow all outbound traffic; block only inbound",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Practical network hardening checklist' lists exactly these items.",
      },
      {
        id: "cyb-l8-q17",
        type: "multiple-choice",
        question:
          "A Web Application Firewall (WAF) operates primarily at which OSI layer?",
        points: 2,
        options: [
          "Layer 2 (Data Link)",
          "Layer 3 (Network)",
          "Layer 4 (Transport)",
          "Layer 7 (Application)",
        ],
        correctAnswer: 3,
        explanation: "WAFs inspect HTTP headers and payloads — Layer 7 (Application).",
      },
      {
        id: "cyb-l8-q18",
        type: "multiple-choice",
        question:
          "Which firewall type best matches 'tracks the state of active TCP/UDP connections — allowing only legitimate response traffic, understanding TCP handshakes and session states'?",
        points: 2,
        options: [
          "Packet-filtering firewall (Layer 3-4)",
          "Stateful firewall (Layer 4)",
          "Application firewall / WAF (Layer 7)",
          "Proxy firewall",
        ],
        correctAnswer: 1,
        explanation:
          "Stateful firewalls operate at Layer 4 (Transport) and track TCP/UDP connection state.",
      },
      {
        id: "cyb-l8-q19",
        type: "multiple-choice",
        question:
          "The L8 OSI table maps 'VLANs and MAC filtering' to which layer?",
        points: 2,
        options: [
          "Layer 7 (Application)",
          "Layer 4 (Transport)",
          "Layer 3 (Network)",
          "Layer 2 (Data Link)",
        ],
        correctAnswer: 3,
        explanation:
          "MAC filtering and VLAN traffic isolation are Layer 2 (Data Link) controls.",
      },
      {
        id: "cyb-l8-q20",
        type: "multiple-choice",
        question: "The 'Firewall Best Practices' slide lists which set?",
        points: 2,
        options: [
          "Deny by default (inbound AND lateral); identity over IP; egress control; rules as code with change control and drift detection",
          "Allow all by default; tighten when problems are reported by users",
          "Configure rules manually in each firewall; never version-control them",
          "Permit all outbound traffic to avoid breaking legitimate apps",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Firewall Best Practices' slide lists exactly these: deny by default, identity over IP, egress control, rules as code with drift detection.",
      },
      {
        id: "cyb-l8-q21",
        type: "multiple-choice",
        question:
          "A Next-Generation Firewall (NGFW) is described as operating across which OSI layers?",
        points: 2,
        options: [
          "Layer 2 only",
          "Layer 3 only",
          "Layers 3 through 7, combining packet filtering, stateful inspection, and deep packet inspection with application awareness and IPS",
          "Layer 7 only",
        ],
        correctAnswer: 2,
        explanation:
          "NGFW combines packet filtering (L3), stateful inspection (L4), and deep packet inspection (L7) with IPS.",
      },
      {
        id: "cyb-l8-q22",
        type: "multiple-choice",
        question:
          "Because most modern transport is encrypted, the L8 detection-stack recommendations have shifted toward which set of sources?",
        points: 2,
        options: [
          "Decrypting all internal traffic via MITM appliances at every hop",
          "EDR (process lineage, file ops, in-memory signals); DNS and egress analytics (bad-reputation domains, DGA patterns, unusual exfiltration); cloud control-plane logs (CloudTrail / Audit Logs revealing IAM abuse)",
          "Manual review of every packet capture",
          "Disabling encryption to make inspection easier",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Modern detection stack' slide lists exactly EDR, DNS/egress analytics, and cloud control-plane logs.",
      },
      {
        id: "cyb-l8-q23",
        type: "multiple-choice",
        question:
          "The L8 Privileged Access Management (PAM) section recommends which pattern for admin access, INSTEAD of a persistent VPN?",
        points: 2,
        options: [
          "Permanent admin credentials shared via team chat",
          "Bastion / access proxy with NO direct network access; session recording for audit; JUST-IN-TIME elevation with no standing privilege; time-bound credentials that auto-expire",
          "A single shared root password rotated quarterly",
          "Direct SSH from the engineer's personal laptop to production with a static key",
        ],
        correctAnswer: 1,
        explanation:
          "The L8 PAM section lists bastion/access proxy, session recording, just-in-time elevation, and time-bound credentials.",
      },
      {
        id: "cyb-l8-q24",
        type: "multiple-choice",
        question:
          "The L8 summary states that 'detection shifts toward endpoints, DNS, and control planes as transport encrypts.' The deeper point is:",
        points: 2,
        options: [
          "Network-layer detection is irrelevant in modern systems",
          "Firewalls and IDS/IPS still matter, but they SERVE identity- and application-aware access; segmentation shrinks blast radius; build trust with identity, not network location",
          "All security can be replaced by encryption",
          "Cloud providers handle all security automatically",
        ],
        correctAnswer: 1,
        explanation:
          "The L8 summary's deeper point: firewalls/IDS still matter but serve identity-aware access; segmentation shrinks blast radius; trust comes from identity.",
      },
    ],
  },
  {
    id: "cyber-l1-quiz",
    courseId: "7",
    title: "Lecture 1 Quiz",
    description:
      "Lecture 1 — Introduction to Cybersecurity. Multiple-choice quiz covering the CIA Triad, threat modelling (Asset-Adversary-Mechanism), the Cyber Kill Chain, security controls, risk, Defence in Depth vs Zero Trust, CVE/CWE/CVSS, and South African legal context. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-20T13:00:00Z",
    questions: [
      {
        id: "cyb-l1-q1",
        type: "multiple-choice",
        question:
          "A ransomware attack encrypts a hospital's patient-record database, making it unreadable to staff during a critical shift. Which element of the CIA triad is MOST directly violated?",
        points: 2,
        options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
        correctAnswer: 2,
        explanation:
          "Ransomware that encrypts records makes them inaccessible to authorised staff — the textbook definition of an availability failure. The data has not been disclosed (not confidentiality) or altered to a wrong value (not integrity). The slides explicitly list ransomware and DDoS as availability failures.",
      },
      {
        id: "cyb-l1-q2",
        type: "multiple-choice",
        question:
          "An attacker silently modifies a banking transaction in transit from $10 to $10,000. The mechanism BEST suited to detect this kind of attack is:",
        points: 2,
        options: [
          "AES-256 encryption of the transaction payload",
          "An HMAC or digital signature over the transaction",
          "A faster CDN to deliver the transaction",
          "Rate limiting on the API endpoint",
        ],
        correctAnswer: 1,
        explanation:
          "Integrity is the property concerned with tampering. The slides list Hashing (SHA-256), Digital Signatures, and HMAC as integrity mechanisms. AES protects confidentiality but does not detect modification; a CDN and rate limiting protect availability.",
      },
      {
        id: "cyb-l1-q3",
        type: "multiple-choice",
        question:
          "The slides give the example of an air-gapped system that is completely isolated from networks. This illustrates a trade-off between which two CIA properties?",
        points: 2,
        options: [
          "Confidentiality vs. Integrity",
          "Confidentiality vs. Availability",
          "Integrity vs. Availability",
          "Availability vs. Authenticity",
        ],
        correctAnswer: 1,
        explanation:
          "The slides use this exact example: 'Maximum confidentiality = air-gapped system... Result: Not remotely available to legitimate users.' The system is maximally confidential but unusable remotely.",
      },
      {
        id: "cyb-l1-q4",
        type: "multiple-choice",
        question:
          "The slides describe blockchain as providing extremely high integrity through distributed consensus, but at a cost. What is that cost?",
        points: 2,
        options: [
          "Reduced confidentiality, since all ledger entries are public",
          "Slow write operations and reduced availability for high-throughput applications",
          "Weaker integrity, because consensus can be overridden by a 51% attack",
          "Loss of all three CIA properties under normal load",
        ],
        correctAnswer: 1,
        explanation:
          "The second worked trade-off in the slides: 'Blockchain = extremely high integrity through distributed consensus. Result: Slow write operations, reduced availability.' Option (c) misreads it — the slides present blockchain integrity as very high, not weak.",
      },
      {
        id: "cyb-l1-q5",
        type: "multiple-choice",
        question:
          "Which of the following is NOT a mechanism for enforcing confidentiality, according to the slides?",
        points: 2,
        options: [
          "AES / TLS encryption",
          "Access Control Lists (ACLs)",
          "Multi-Factor Authentication",
          "HMAC over the message body",
        ],
        correctAnswer: 3,
        explanation:
          "HMAC is an INTEGRITY mechanism (detects modification), not a confidentiality one. Encryption, ACLs, and MFA are listed as confidentiality mechanisms in the lecture.",
      },
      {
        id: "cyb-l1-q6",
        type: "multiple-choice",
        question:
          "A team writes the requirement: 'We need to prevent network attackers from reading message content using end-to-end encryption.' Which three elements of the Asset-Adversary-Mechanism framework are present in this single sentence?",
        points: 2,
        options: [
          "Asset = 'network attackers'; Adversary = 'message content'; Mechanism = 'end-to-end encryption'",
          "Asset = 'message content'; Adversary = 'network attackers'; Mechanism = 'end-to-end encryption'",
          "Asset = 'end-to-end encryption'; Adversary = 'message content'; Mechanism = 'network attackers'",
          "Asset = 'the team'; Adversary = 'the requirement'; Mechanism = 'the sentence'",
        ],
        correctAnswer: 1,
        explanation:
          "The Asset is what you protect (message content), the Adversary is the actor with the capability to attack (network attacker), and the Mechanism is the defensive control (E2EE).",
      },
      {
        id: "cyb-l1-q7",
        type: "multiple-choice",
        question:
          "In the messaging-app threat model from the slides, 'Rate Limiting + a Content Delivery Network' is given as the defensive mechanism. Which threat model does it serve?",
        points: 2,
        options: [
          "Confidentiality — protecting message content from network attackers",
          "Integrity — protecting message content from a compromised relay server",
          "Availability — protecting the service from a botnet flooding the chat server with fake requests",
          "Authentication — proving that messages came from the claimed sender",
        ],
        correctAnswer: 2,
        explanation:
          "From Threat Model 3 in the slides: rate limiting + CDN is the mechanism for the availability scenario where the adversary is a botnet owner commanding 100,000 IoT devices.",
      },
      {
        id: "cyb-l1-q8",
        type: "multiple-choice",
        question:
          "The slides state security fails when the Mechanism cannot enforce the Policy against the Adversary. Which scenario is BEST described as a 'bypassed mechanism' failure mode?",
        points: 2,
        options: [
          "AES-128 encryption broken by a future quantum computer",
          "Rate limit of 1,000 req/sec defeated by 1 million IPs each sending 10 req/sec",
          "A high-security door lock defeated by a lock-picking expert or by someone climbing through a window",
          "A signed assertion rejected because the clock skew is too large",
        ],
        correctAnswer: 2,
        explanation:
          "The slides name three failure modes: weak mechanism vs advanced adversary (a), overwhelmed mechanism (b), and bypassed mechanism (c). The window-climber goes AROUND the lock rather than breaking it — classic bypass.",
      },
      {
        id: "cyb-l1-q9",
        type: "multiple-choice",
        question:
          "The slides explicitly contrast threat modelling 'before' and 'after.' What is the PRIMARY problem with the pre-threat-modelling statement 'We need to secure our chat app'?",
        points: 2,
        options: [
          "It uses the word 'secure' instead of 'safe'",
          "It is too vague to act upon — no asset, adversary, or mechanism is specified, so the requirement cannot be tested or implemented",
          "It does not mention a budget",
          "It is too specific and leaves no room for design flexibility",
        ],
        correctAnswer: 1,
        explanation:
          "The slides contrast 'We need to secure our chat app' (vague, not testable) with 'We need to prevent network attackers from reading message content using end-to-end encryption' (specific, actionable, testable). Threat modelling forces precision.",
      },
      {
        id: "cyb-l1-q10",
        type: "multiple-choice",
        question:
          "A security team observes an employee receiving a phishing email with a malicious PDF attachment. The email passed through the corporate mail server but has not yet been opened. Which Kill Chain stage is the attack currently in?",
        points: 2,
        options: ["Reconnaissance", "Weaponisation", "Delivery", "Exploitation"],
        correctAnswer: 2,
        explanation:
          "The slides define Delivery as the stage where the attacker 'sends the email' or 'drops the USB.' The email has been transmitted but not yet opened — the PDF has not yet triggered (which would be Exploitation).",
      },
      {
        id: "cyb-l1-q11",
        type: "multiple-choice",
        question:
          "The attacker's malicious PDF is opened by an employee and successfully runs shellcode on the workstation, granting the attacker an initial foothold. This is the 'boom' moment of the intrusion. Which stage is this?",
        points: 2,
        options: ["Weaponisation", "Delivery", "Exploitation", "Installation"],
        correctAnswer: 2,
        explanation:
          "The slides explicitly call Exploitation 'the boom moment where vulnerability is triggered' and give the exact example 'User opens PDF → vulnerability triggered → code execution achieved.'",
      },
      {
        id: "cyb-l1-q12",
        type: "multiple-choice",
        question:
          "After gaining code execution on a victim host, the attacker adds a malicious script to the Windows registry 'Run' key so that it executes on every reboot. This is a textbook example of which Kill Chain stage?",
        points: 2,
        options: [
          "Exploitation",
          "Installation",
          "Command & Control (C2)",
          "Actions on Objectives",
        ],
        correctAnswer: 1,
        explanation:
          "The slides define Installation as establishing persistence: 'Add malicious scripts to startup locations... Modify system files and registries.' The registry 'Run' key is the canonical persistence mechanism. Exploitation is 'code runs'; Installation is 'code SURVIVES A REBOOT.'",
      },
      {
        id: "cyb-l1-q13",
        type: "multiple-choice",
        question:
          "A defender notices unusual outbound DNS traffic from an internal workstation to a previously unseen domain, repeating every 60 seconds with small payloads. This is MOST consistent with which Kill Chain stage?",
        points: 2,
        options: [
          "Reconnaissance",
          "Delivery",
          "Command & Control (C2)",
          "Actions on Objectives",
        ],
        correctAnswer: 2,
        explanation:
          "C2 is the stage where 'Malware connects to attacker's server. Often uses DNS or HTTP to blend in.' DNS beaconing on a fixed interval to a never-before-seen domain is a hallmark C2 indicator; the defensive action listed is 'DNS monitoring for suspicious domains.'",
      },
      {
        id: "cyb-l1-q14",
        type: "multiple-choice",
        question:
          "The slides give 'Network Segmentation, Offline Backups, Least Privilege Access, and Incident Response plans' as defensive actions. These are mapped to which Kill Chain stage?",
        points: 2,
        options: [
          "Reconnaissance",
          "Exploitation",
          "Command & Control",
          "Actions on Objectives",
        ],
        correctAnswer: 3,
        explanation:
          "The slides list these four controls verbatim against Actions on Objectives: 'Network segmentation (limit lateral movement), Offline backups, Least privilege access, Incident response plan.' These are end-state mitigations limiting damage once the attacker has reached their goal.",
      },
      {
        id: "cyb-l1-q15",
        type: "multiple-choice",
        question:
          "The slides give the example: a policy document says 'Change password every 90 days,' and SEPARATELY the authentication system automatically rejects logins after 90 days unless the password is updated. The combination illustrates which design principle?",
        points: 2,
        options: [
          "Zero Trust",
          "Defence in Depth (layering control TYPES so an administrative rule and a technical enforcement reinforce each other)",
          "Fail-Safe Defaults",
          "The CIA Triad",
        ],
        correctAnswer: 1,
        explanation:
          "The slides use this exact example under 'Layering Control Types — Defence in Depth: Password Policy Example.' The administrative control (the rule) and the technical control (automated enforcement) layer together so if one fails the other holds.",
      },
      {
        id: "cyb-l1-q16",
        type: "multiple-choice",
        question:
          "Which classification is correct for a badge reader on the server room door?",
        points: 2,
        options: [
          "Administrative control",
          "Technical control",
          "Physical control",
          "Cryptographic control",
        ],
        correctAnswer: 2,
        explanation:
          "The slides explicitly give 'Locked server room, badge readers, biometric scanners, security cameras' as examples of physical controls. Anything that prevents unauthorised PHYSICAL access is a physical control.",
      },
      {
        id: "cyb-l1-q17",
        type: "multiple-choice",
        question:
          "The course defines risk using a specific formula. Which is it?",
        points: 2,
        options: [
          "Risk = Vulnerability × Exploit",
          "Risk = Likelihood × Impact",
          "Risk = CVSS × Patching Time",
          "Risk = Threats - Controls",
        ],
        correctAnswer: 1,
        explanation:
          "Given verbatim in the 'Risk Is Not Just Danger' slide. Likelihood = probability the threat occurs; Impact = damage if it happens. A high-impact, low-likelihood event can carry the same risk as a low-impact, high-likelihood one.",
      },
      {
        id: "cyb-l1-q18",
        type: "multiple-choice",
        question:
          "A company decides not to store credit-card numbers at all, instead delegating payment processing to a PCI-DSS certified third party. Using the slides' four ways to handle risk, this is BEST described as:",
        points: 2,
        options: ["Accept", "Avoid", "Mitigate", "Transfer"],
        correctAnswer: 1,
        explanation:
          "The four strategies are Accept (tolerate), Avoid (don't do the risky activity — the slides' own example is 'don't store credit cards'), Mitigate (reduce likelihood/impact), and Transfer (insurance/outsource). Here the company eliminates the risky activity entirely. Transfer would apply if it STILL stored cards but bought breach insurance.",
      },
      {
        id: "cyb-l1-q19",
        type: "multiple-choice",
        question:
          "The Zero Trust model rejects the assumption that 'inside the network = safe.' Which of the following BEST captures the principle in practice, as stated in the slides?",
        points: 2,
        options: [
          "Employees on the corporate Wi-Fi are automatically trusted for internal database access",
          "Every request is authenticated and authorised as if it originated from the open internet — even if it comes from an employee's laptop on office Wi-Fi",
          "External traffic is blocked entirely and only VPN users are allowed",
          "Encryption is sufficient — no further authorisation is needed inside the network",
        ],
        correctAnswer: 1,
        explanation:
          "The slides give this exact practice statement: 'Just because a request comes from an employee's laptop inside the office Wi-Fi does not mean it should have access to the database. Every request is authenticated and authorised as if it originated from the open internet.' Core slogan: 'Never trust, always verify.'",
      },
      {
        id: "cyb-l1-q20",
        type: "multiple-choice",
        question: "The course defines a 'zero-day' vulnerability as:",
        points: 2,
        options: [
          "Any vulnerability discovered within the last 24 hours",
          "A vulnerability unknown to the vendor — no patch exists, so attackers have first-mover advantage",
          "A known vulnerability with a patch that has not yet been applied in production",
          "A vulnerability whose CVSS score is exactly 0.0",
        ],
        correctAnswer: 1,
        explanation:
          "From the 'Formal Definitions' slide: 'Zero-Day: Vulnerability unknown to the vendor — no patch exists, attackers have first-mover advantage.' Option (c) describes N-day, not zero-day.",
      },
      {
        id: "cyb-l1-q21",
        type: "multiple-choice",
        question: "Which statement BEST distinguishes CVE from CWE?",
        points: 2,
        options: [
          "CVE and CWE are the same thing under different names",
          "CVE is the taxonomy of vulnerability TYPES; CWE lists specific INSTANCES with unique IDs",
          "CVE lists specific INSTANCES (e.g. CVE-2023-34362 in MOVEit); CWE is the TAXONOMY of vulnerability types (e.g. CWE-89 is SQL Injection)",
          "CVE is open source; CWE is proprietary to NIST",
        ],
        correctAnswer: 2,
        explanation:
          "The slides: 'CVE = the instance (broken lock on your door); CWE = the category (broken locks in general).' CVE-2023-34362 (MOVEit) is an instance of CWE-89 (SQL Injection). 'CVEs are crimes; CWEs are types of crimes.'",
      },
      {
        id: "cyb-l1-q22",
        type: "multiple-choice",
        question:
          "The slides emphasise that CVSS 'measures severity, not risk.' The BEST reason this distinction matters is:",
        points: 2,
        options: [
          "CVSS scores are randomly assigned and unreliable",
          "A CVSS 9.8 Critical in a component you do not expose to the internet may matter less than a 5.5 Medium in your internet-facing edge",
          "Severity and risk are synonyms in cybersecurity",
          "CVSS only applies to web applications",
        ],
        correctAnswer: 1,
        explanation:
          "The slides state 'CVSS measures severity, not risk' and that context (reachability, exposure, exploit availability, blast radius) determines real-world risk. A high CVSS in unreachable code is less urgent than a moderate CVSS on your front-line system.",
      },
      {
        id: "cyb-l1-q23",
        type: "multiple-choice",
        question:
          "Under the South African Cybercrimes Act 19 of 2020, which of the following is MOST clearly a criminal offence even if no data was stolen?",
        points: 2,
        options: [
          "Reading publicly available CVE advisories on cve.org",
          "Running an nmap port scan against your own authorised lab environment",
          "Intentionally and without permission intercepting data transmissions",
          "Reporting a flaw to a vendor through their published responsible-disclosure policy",
        ],
        correctAnswer: 2,
        explanation:
          "The Cybercrimes Act 19 of 2020 criminalises unlawful access, unlawful interception of data, and possession of malware/hacking tools with intent. Intent alone is not enough — you need authorisation. Reading public advisories, scanning your own authorised systems, and responsible disclosure are lawful; unauthorised interception is the offence even if no theft occurs.",
      },
      {
        id: "cyb-l1-q24",
        type: "multiple-choice",
        question:
          "A penetration tester finds a vulnerability in a banking portal during an AUTHORISED engagement and, in the process, briefly views a customer's account balance to prove the bug is real. Which law is MOST directly at risk of being breached if the tester does not delete that data immediately?",
        points: 2,
        options: [
          "The Cybercrimes Act, because viewing data with consent is illegal",
          "POPIA, because retaining personal information beyond what is necessary for the test can constitute a data breach",
          "Neither — written consent for the test covers all data handling indefinitely",
          "Both Cybercrimes Act and POPIA, equally, regardless of consent",
        ],
        correctAnswer: 1,
        explanation:
          "The slides warn: 'Security researchers must be careful not to exfiltrate personal data during a test, as this constitutes a data breach under POPIA.' Rules of Engagement: 'Never view user data unless necessary for the proof of concept, then delete immediately.' Authorisation under the Cybercrimes Act protects the TESTING; it does not exempt the tester from POPIA's data-handling obligations.",
      },
    ],
  },
  {
    id: "cyber-l2-quiz",
    courseId: "7",
    title: "Lecture 2 Quiz",
    description:
      "Lecture 2 — Vulnerabilities and Threats. Multiple-choice quiz covering CVE/CWE/CVSS, the 10-category taxonomy, injection, authentication & session, access control, cryptographic misuse, XSS, CSRF, supply chain, memory safety, misconfiguration, and business logic flaws. 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-20T14:00:00Z",
    questions: [
      {
        id: "cyb-l2-q1",
        type: "multiple-choice",
        question:
          "Which statement BEST captures the difference between CVE and CWE, as taught in the slides?",
        points: 2,
        options: [
          "CVE is the taxonomy of types; CWE is the list of specific instances",
          "CVE lists specific INSTANCES (e.g. CVE-2023-34362 in MOVEit); CWE is the TAXONOMY of vulnerability TYPES (e.g. CWE-89 SQL Injection)",
          "CVE and CWE are the same thing under different names",
          "CVE is for hardware bugs; CWE is for software bugs",
        ],
        correctAnswer: 1,
        explanation:
          "CVE = the instance ('broken lock on your door'); CWE = the category ('broken locks in general'). CVE-2023-34362 (MOVEit) is an instance of CWE-89 (SQL Injection). 'CVEs are crimes; CWEs are types of crimes.'",
      },
      {
        id: "cyb-l2-q2",
        type: "multiple-choice",
        question:
          "The slides explicitly note that some cloud/SaaS breaches do NOT receive a CVE identifier. The PRIMARY reason given is:",
        points: 2,
        options: [
          "Cloud vendors are exempt from CVE assignment",
          "CVEs are only issued for vulnerabilities in specific versions of software packages; if the software worked as designed and the IMPLEMENTATION was insecure (e.g., a weak password or open database), no CVE is assigned",
          "MITRE refuses to issue CVEs for cloud platforms",
          "Cloud breaches are never severe enough to warrant a CVE",
        ],
        correctAnswer: 1,
        explanation:
          "Under 'A Note on Missing CVEs': cloud/SaaS breaches often occur due to misconfiguration (weak password, open database) rather than a bug in the software CODE. The software worked as designed; the implementation was insecure. The Tea App breach is the cited example.",
      },
      {
        id: "cyb-l2-q3",
        type: "multiple-choice",
        question:
          "A vulnerability has the CVSS vector AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H, scoring 9.8 Critical. Which property of this vector contributes MOST to making exploitation broadly automated and dangerous?",
        points: 2,
        options: [
          "AV:N (Attack Vector = Network) and UI:N (no user interaction required) — the flaw is remotely exploitable without tricking a user",
          "AC:L (low complexity) alone — complexity has the biggest weight",
          "S:U (Scope = Unchanged) — Unchanged scope is the worst",
          "C:H alone — only confidentiality impact matters",
        ],
        correctAnswer: 0,
        explanation:
          "AV:N (hit it over the network from anywhere) and UI:N (no need to trick a user), combined with PR:N (no auth), are what make 9.8 Critical CVEs mass-exploitable at internet scale. Option (c) is backwards: Changed scope is worse than Unchanged.",
      },
      {
        id: "cyb-l2-q4",
        type: "multiple-choice",
        question:
          "The slides emphasise that 'CVSS measures severity, not risk.' Which extra factors do they recommend adding to determine ACTUAL risk to your environment?",
        points: 2,
        options: [
          "Reachability in your deployment, public exploit availability, and blast radius",
          "The age of the vulnerability and the size of the vendor",
          "The number of CVEs issued in the same year",
          "The number of news articles published about it",
        ],
        correctAnswer: 0,
        explanation:
          "The notes: 'Ask if the vulnerability is REACHABLE in your deployment, if there is a PUBLIC EXPLOIT, and what the BLAST RADIUS is.' These three turn raw severity into real-world risk.",
      },
      {
        id: "cyb-l2-q5",
        type: "multiple-choice",
        question:
          "The 10-category vulnerability taxonomy used in the lecture is described as:",
        points: 2,
        options: [
          "The official OWASP standard, replacing CWE",
          "An educational framework that groups common security failures into 10 understandable categories, drawing heavily on the OWASP Top 10 and CWE Top 25",
          "A South African-only taxonomy maintained by Wits",
          "A subset of CVSS impact metrics",
        ],
        correctAnswer: 1,
        explanation:
          "The slides: 'This is an educational framework... It is not an official standard like CVE or CWE, but it draws heavily from the OWASP Top 10 and CWE Top 25.'",
      },
      {
        id: "cyb-l2-q6",
        type: "multiple-choice",
        question:
          "The MOVEit Transfer breach (CVE-2023-34362) is used in the slides as the case study for which category?",
        points: 2,
        options: [
          "Cross-Site Scripting (XSS)",
          "Injection & Deserialization (specifically SQL Injection, CWE-89)",
          "Misconfiguration & Default Secrets",
          "Memory Safety & Concurrency",
        ],
        correctAnswer: 1,
        explanation:
          "MOVEit sits under Category 1 (Injection & Deserialization): 'Attackers used SQL injection to bypass login screens and execute arbitrary database queries, stealing file lists and administrative keys.'",
      },
      {
        id: "cyb-l2-q7",
        type: "multiple-choice",
        question:
          "The CORE concept of an injection vulnerability, as stated in the slides, is:",
        points: 2,
        options: [
          "The attacker needs root access to launch the attack",
          "The interpreter cannot distinguish between trusted commands and untrusted data when they are concatenated together",
          "The database server is misconfigured",
          "The user's session has expired",
        ],
        correctAnswer: 1,
        explanation:
          "The lecture's framing word-for-word: 'The interpreter cannot distinguish between trusted commands and untrusted data when they're concatenated together.' Mantra: 'Never trust user input. Never.'",
      },
      {
        id: "cyb-l2-q8",
        type: "multiple-choice",
        question:
          "The slides list three XSS variants. A payload that is saved to the database and then served back to every user who views the affected page is:",
        points: 2,
        options: ["Reflected XSS", "Stored XSS", "DOM-based XSS", "CSRF"],
        correctAnswer: 1,
        explanation:
          "Stored XSS — payload saved to the database, affecting every viewer of that content. Reflected XSS is in URL parameters reflected immediately; DOM-based XSS is client-side JS writing unsanitised input into the DOM.",
      },
      {
        id: "cyb-l2-q9",
        type: "multiple-choice",
        question:
          "Which set of XSS defences is given in the lecture's 'Defence Layers' slide?",
        points: 2,
        options: [
          "Anti-CSRF tokens, SameSite cookies, double-submit cookies",
          "Input validation (whitelist), context-aware output encoding, Content Security Policy (CSP) headers, and HttpOnly cookies",
          "Encryption at rest, encryption in transit, and key rotation",
          "Stack canaries, ASLR, DEP/NX, and CFI",
        ],
        correctAnswer: 1,
        explanation:
          "The four XSS 'Defence Layers': input validation (whitelist), context-aware output encoding, CSP headers, and HttpOnly cookies. Option (a) is the CSRF defence set; option (d) is the memory-safety mitigation set.",
      },
      {
        id: "cyb-l2-q10",
        type: "multiple-choice",
        question:
          "The Windows 'CurveBall' vulnerability (CVE-2020-0601) is presented in the slides as a case study of:",
        points: 2,
        options: [
          "Injection & Deserialization",
          "Cryptographic Misuse — specifically a flaw in how Windows validated Elliptic Curve Cryptography certificates, allowing forged code-signing certs",
          "Cross-Site Request Forgery",
          "Supply Chain & Dependencies",
        ],
        correctAnswer: 1,
        explanation:
          "CurveBall is the textbook crypto-misuse case study: 'A mathematical error in how Windows crypt32.dll validated Elliptic Curve Cryptography (ECC) certificates,' allowing attackers to craft fake code-signing certificates Windows accepted as legitimate.",
      },
      {
        id: "cyb-l2-q11",
        type: "multiple-choice",
        question:
          "The slides warn that JWT payloads are not encrypted by default — just Base64-encoded. Which kind of data should therefore NEVER be placed in JWT claims?",
        points: 2,
        options: [
          "Public usernames and role names",
          "Token expiry timestamps",
          "Passwords, PII, credit card numbers, medical records",
          "The issuer ('iss') and audience ('aud') fields",
        ],
        correctAnswer: 2,
        explanation:
          "The slides: 'JWTs are not encrypted by default. The payload is merely Base64-encoded... Never place sensitive data (passwords, PII, credit card numbers, medical records) in JWT claims.' Roles, expiry, iss/aud are fine — they are not secrets.",
      },
      {
        id: "cyb-l2-q12",
        type: "multiple-choice",
        question:
          "The GitLab Account Takeover case study (CVE-2022-1162) is used in the slides to illustrate which category?",
        points: 2,
        options: [
          "Cross-Site Scripting",
          "Authentication & Session Management — specifically a hardcoded password left in the OmniAuth module that allowed login to any account using a third-party provider",
          "Memory Safety",
          "Business Logic & Abuse",
        ],
        correctAnswer: 1,
        explanation:
          "Category 2: 'A hardcoded password was accidentally left in the GitLab authentication module for accounts using OmniAuth providers. Attackers could log in to any account that used a third-party provider by using this static, universal password found in the code.'",
      },
      {
        id: "cyb-l2-q13",
        type: "multiple-choice",
        question:
          "The slides explicitly distinguish authentication from authorisation. Which pairing is correct?",
        points: 2,
        options: [
          "AuthN = 'What can you do?'; AuthZ = 'Who are you?'",
          "AuthN = 'Who are you?' (identity verification); AuthZ = 'What can you do?' (permission verification)",
          "AuthN and AuthZ both mean 'What can you do?'",
          "AuthN is a stronger form of AuthZ",
        ],
        correctAnswer: 1,
        explanation:
          "From the 'Authentication vs Authorisation' slide: AuthN proves identity ('Who are you?'); AuthZ enforces what that identity can access ('What can you do?'). One without the other is insufficient.",
      },
      {
        id: "cyb-l2-q14",
        type: "multiple-choice",
        question:
          "A logged-in user changes the URL from api.example.com/user/123/profile to api.example.com/user/124/profile and gains access to another person's profile. This is a textbook example of:",
        points: 2,
        options: [
          "Cross-Site Scripting",
          "Vertical privilege escalation",
          "Insecure Direct Object Reference (IDOR) — a form of broken access control / horizontal escalation",
          "SQL Injection",
        ],
        correctAnswer: 2,
        explanation:
          "The IDOR slide uses this exact URL pattern. It is horizontal escalation — accessing ANOTHER user's data at the SAME privilege level, not gaining admin rights (which would be vertical escalation).",
      },
      {
        id: "cyb-l2-q15",
        type: "multiple-choice",
        question:
          "The slides note that replacing sequential integer IDs with random UUIDs 'helps but doesn't solve' IDOR. Why not?",
        points: 2,
        options: [
          "UUIDs are easy to guess with modern compute",
          "UUIDs still need a SERVER-SIDE authorisation check on every request ('does this user OWN this resource?') — the URL identifier alone never authorises access",
          "UUIDs collide too frequently to be safe",
          "UUIDs cannot be used in REST APIs",
        ],
        correctAnswer: 1,
        explanation:
          "The slide: 'Random UUIDs are HARDER TO GUESS than sequential integers, but you still need server-side authorisation.' Every request must check 'Does this authenticated user OWN this resource?' Security through obscurity is not security.",
      },
      {
        id: "cyb-l2-q16",
        type: "multiple-choice",
        question: "According to the slides, a CSRF attack succeeds because:",
        points: 2,
        options: [
          "The attacker has the victim's password",
          "The application uses HTTPS",
          "The browser automatically attaches the victim's session cookie to cross-site requests, and the server cannot distinguish forged requests from legitimate ones",
          "The Same-Origin Policy is disabled by default",
        ],
        correctAnswer: 2,
        explanation:
          "The slide: 'The browser automatically sends cookies for bank.com with the request — the server can't distinguish legitimate requests from forged ones.' The attack hinges on this default browser behaviour.",
      },
      {
        id: "cyb-l2-q17",
        type: "multiple-choice",
        question:
          "Which of the following is the PRIMARY (server-side) defensive control against CSRF on state-changing endpoints, as named in the slides?",
        points: 2,
        options: [
          "HttpOnly cookies",
          "Content Security Policy",
          "Anti-CSRF tokens (Synchroniser Token Pattern)",
          "Multi-Factor Authentication",
        ],
        correctAnswer: 2,
        explanation:
          "The Synchroniser Token Pattern is the primary defence: 'Server embeds random token in forms and validates it on POST requests. Token is unpredictable to attacker.' HttpOnly defends against XSS, not CSRF — a common distractor.",
      },
      {
        id: "cyb-l2-q18",
        type: "multiple-choice",
        question:
          "In a dependency confusion attack, the package manager installs the malicious public package because:",
        points: 2,
        options: [
          "Internal packages are never digitally signed",
          "The package manager may prefer the HIGHER VERSION NUMBER found in the public registry over the lower version on the internal registry",
          "Private registries automatically mirror all public packages",
          "CI/CD pipelines always skip integrity checks",
        ],
        correctAnswer: 1,
        explanation:
          "The slide: an attacker registers the internal package name on the public registry with a higher version (e.g. 99.0.0); npm sees both and CHOOSES THE PUBLIC ONE due to higher semantic versioning, installing malicious code.",
      },
      {
        id: "cyb-l2-q19",
        type: "multiple-choice",
        question:
          "Which of the following is NOT listed in the slides as a supply-chain attack pattern?",
        points: 2,
        options: [
          "Dependency confusion",
          "Typosquatting (e.g., colorama vs colourama)",
          "Account compromise of legitimate maintainers",
          "IDOR through sequential package IDs",
        ],
        correctAnswer: 3,
        explanation:
          "The four supply-chain patterns are Dependency Confusion, Typosquatting, Account Compromise (event-stream), and Malicious Updates (ua-parser-js). IDOR is an access-control category, not a supply-chain pattern.",
      },
      {
        id: "cyb-l2-q20",
        type: "multiple-choice",
        question:
          "A C function calls strcpy(buffer, user_input) without bounds checking. An attacker supplies a very long input that overwrites the saved return address with the address of injected shellcode. This is a classic example of:",
        points: 2,
        options: [
          "SQL injection",
          "Stack buffer overflow leading to remote code execution",
          "CSRF",
          "Race condition",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Buffer Overflow Technical Explanation' slide: strcpy without bounds checking writes past the buffer, overwriting the return address; on return, execution jumps to the attacker's shellcode. Classic stack-smashing (Memory Safety, Category 8).",
      },
      {
        id: "cyb-l2-q21",
        type: "multiple-choice",
        question:
          "Which of the following is NOT one of the modern memory-safety mitigations listed in the slides?",
        points: 2,
        options: [
          "ASLR (Address Space Layout Randomisation)",
          "DEP / NX (Data Execution Prevention)",
          "Stack canaries",
          "HttpOnly cookies",
        ],
        correctAnswer: 3,
        explanation:
          "The memory-safety mitigations are ASLR, DEP/NX, stack canaries, and CFI. HttpOnly is a cookie flag defending against XSS reading session tokens — a web-tier control, not a memory-tier one.",
      },
      {
        id: "cyb-l2-q22",
        type: "multiple-choice",
        question:
          "A developer accidentally commits a database password in plaintext to a public GitHub repository. According to the 10-category taxonomy, this is BEST classified as:",
        points: 2,
        options: [
          "Cross-Site Scripting (XSS)",
          "Misconfiguration & Default Secrets",
          "Business Logic Abuse",
          "Memory Safety Violation",
        ],
        correctAnswer: 1,
        explanation:
          "Category 9: 'the software worked as designed; the implementation was insecure.' Plaintext secrets in source control is the canonical example. Not XSS (no script injection), not business logic (code did nothing wrong), not memory safety (no buffer issue).",
      },
      {
        id: "cyb-l2-q23",
        type: "multiple-choice",
        question:
          "The slides emphasise that an SQL injection vulnerability is NOT a business logic flaw. Why?",
        points: 2,
        options: [
          "Because SQL injection always requires admin access",
          "Because business logic flaws never affect databases",
          "Because SQL injection exploits the INTERPRETER mixing data with commands; business logic flaws are cases where the code works as written but the application RULES allow abuse",
          "Because business logic flaws are not in the taxonomy",
        ],
        correctAnswer: 2,
        explanation:
          "SQL injection (Category 1) exploits the database interpreter's inability to separate trusted commands from untrusted data. Business logic flaws (Category 10) are different: the code works exactly as written, but the logic lets users manipulate business rules.",
      },
      {
        id: "cyb-l2-q24",
        type: "multiple-choice",
        question:
          "A user discovers that calling the URL /payment/confirm directly — skipping the payment form entirely — still marks the order as 'paid.' This is BEST described as:",
        points: 2,
        options: [
          "SQL injection",
          "A business logic flaw (process-flow bypass): the code runs correctly, but the application incorrectly trusts that users follow the intended sequence of steps",
          "Cross-Site Scripting",
          "Misconfiguration",
        ],
        correctAnswer: 1,
        explanation:
          "The slides give this exact pattern under business logic flaws: 'Process flow bypass — call confirmation URL directly, skipping payment.' Defence: server-side validation of state transitions; never trust the client to follow the intended sequence.",
      },
    ],
  },
  {
    id: "cyber-l3-quiz",
    courseId: "7",
    title: "Lecture 3 Quiz",
    description:
      "Lecture 3 — Authentication, Authorisation & Trust. Multiple-choice quiz covering MFA factors, password storage, sessions vs JWTs, JWT structure and attacks, refresh tokens, OAuth 2.0 / OIDC, WebAuthn, Kerberos, LDAP, SAML, TPM/HSM/PUF, RBAC vs ABAC, and Policy-as-Code (OPA / Rego). 24 questions, 2 marks each (48 marks total).",
    type: "quiz",
    timeLimit: 30,
    createdAt: "2026-05-20T15:00:00Z",
    questions: [
      {
        id: "cyb-l3-q1",
        type: "multiple-choice",
        question:
          "The slides define MFA as requiring multiple independent types of evidence. Which set correctly names the three factors as taught?",
        points: 2,
        options: [
          "Username, Password, IP Address",
          "Something You Know, Something You Have, Something You Are",
          "Authentication, Authorisation, Auditing",
          "MFA, SSO, OIDC",
        ],
        correctAnswer: 1,
        explanation:
          "The MFA slide: Know (password, PIN), Have (phone, YubiKey, authenticator app), Are (fingerprint, facial scan, iris). Combining factors from different categories is what makes MFA strong.",
      },
      {
        id: "cyb-l3-q2",
        type: "multiple-choice",
        question:
          "Why does the lecture single out WebAuthn / FIDO2 as phishing-RESISTANT, while SMS OTP and even TOTP are NOT?",
        points: 2,
        options: [
          "WebAuthn uses longer codes than SMS or TOTP",
          "The authenticator verifies the ORIGIN (domain) before using the credential — if you registered the key on bank.com and a phishing site mimics it as examp1e-bank.com, the browser refuses to use the credential",
          "WebAuthn always requires biometrics",
          "WebAuthn codes have shorter expiry times",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Origin-Bound Credentials' slide: the authenticator checks the origin and refuses on mismatch, making phishing structurally impossible regardless of how well-crafted the phishing site is. SMS and TOTP let the user type a code into any site.",
      },
      {
        id: "cyb-l3-q3",
        type: "multiple-choice",
        question:
          "The slides say session tokens stored in cookies must use which three security flags?",
        points: 2,
        options: [
          "HttpOnly, Secure, SameSite",
          "Public, Static, Long-Lived",
          "Persistent, Cleartext, Wildcard",
          "Admin, Audit, Anon",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Critical Cookie Attributes' slide: HttpOnly (JS can't read it — XSS defence), Secure (HTTPS only), SameSite (restricts cross-site sending — CSRF defence). These three are the modern session-cookie baseline.",
      },
      {
        id: "cyb-l3-q4",
        type: "multiple-choice",
        question:
          "The slides explicitly warn against storing passwords with which hashing algorithm(s)?",
        points: 2,
        options: [
          "bcrypt and Argon2",
          "MD5 and SHA1 — vulnerable to rainbow-table attacks",
          "PBKDF2 and scrypt",
          "AES-256 — it is not a hashing algorithm but is fine for storage",
        ],
        correctAnswer: 1,
        explanation:
          "The slides: 'Use bcrypt or Argon2 with unique salts. Never MD5 or SHA1 — vulnerable to rainbow table attacks.' MD5/SHA1 are fast hashes (billions/sec on a GPU). AES is a cipher, not a hash, so (d) is doubly wrong.",
      },
      {
        id: "cyb-l3-q5",
        type: "multiple-choice",
        question:
          "The slides note that SMS OTP, TOTP authenticator apps, and WebAuthn keys are not equally strong. Which of the following is the PRIMARY weakness of SMS OTP that TOTP apps avoid?",
        points: 2,
        options: [
          "SMS codes are too short",
          "SMS is vulnerable to SIM swapping, SS7 protocol exploits, and real-time interception in the carrier network — TOTP codes are generated locally and cannot be intercepted in transit",
          "SMS codes expire too quickly",
          "SMS apps cost more to develop",
        ],
        correctAnswer: 1,
        explanation:
          "The slides list MFA Bypass Risks for SMS: SIM swapping, push fatigue, SMS OTP interception. The SMS code travels through the carrier network the user doesn't control; TOTP computes the code locally. (TOTP is still phishable in real time — only WebAuthn/FIDO2 eliminates that.)",
      },
      {
        id: "cyb-l3-q6",
        type: "multiple-choice",
        question: "The slides cover 'Session Fixation.' The recommended defence is:",
        points: 2,
        options: [
          "Always store the session ID in a URL parameter",
          "Regenerate session IDs after successful login and privilege escalation; never accept session IDs from URL parameters",
          "Use the same session ID for the user's entire account lifetime",
          "Encrypt the cookie with the user's password",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Session Fixation Defence' slide: 'Regenerate session IDs after successful login. Never accept session IDs from URL parameters.' ID regeneration on login breaks the attack where an attacker plants a known session ID on the victim.",
      },
      {
        id: "cyb-l3-q7",
        type: "multiple-choice",
        question:
          "The slides state JWTs exist because the two pre-JWT options for cross-service identity were both unsatisfying. Which two?",
        points: 2,
        options: [
          "Shared session database (tight coupling, single point of failure) and call-back to the auth service on every request (latency, load)",
          "Encrypted email and SMS OTP",
          "Kerberos and SAML",
          "RBAC and ABAC",
        ],
        correctAnswer: 0,
        explanation:
          "The 'Problem JWTs Solve' slide: a shared DB creates tight coupling and a single point of failure; calling the auth service every request adds latency/load and fails if the service is down. JWTs are a third option — cryptographically signed claims any service can verify locally.",
      },
      {
        id: "cyb-l3-q8",
        type: "multiple-choice",
        question: "Which JWT HEADER claim specifies the signing algorithm used?",
        points: 2,
        options: ["typ", "sub", "alg", "iat"],
        correctAnswer: 2,
        explanation:
          "The JWT Header: alg (signing algorithm), typ (token type, always 'JWT'), kid (key ID). sub and iat are payload claims (subject and issued-at).",
      },
      {
        id: "cyb-l3-q9",
        type: "multiple-choice",
        question:
          "The 2015 'algorithm confusion' attack against JWT libraries allowed an attacker to forge tokens by:",
        points: 2,
        options: [
          "Brute-forcing the HMAC secret in a few hours",
          "Replaying a captured token before its exp claim expired",
          "Setting the alg header to 'none' and removing the signature",
          "Switching alg from RS256 to HS256 and signing with the SERVER'S PUBLIC KEY used as the HMAC secret — the vulnerable library then 'verified' the forged token",
        ],
        correctAnswer: 3,
        explanation:
          "The attacker takes a valid RS256 token, changes the header to HS256, and signs with the server's PUBLIC KEY treated as an HMAC secret. A vulnerable library fetches the public key and uses HMAC-SHA256 to 'verify' — and it works. Fix: whitelist algorithms. Option (c) is the related but distinct 'alg: none' attack.",
      },
      {
        id: "cyb-l3-q10",
        type: "multiple-choice",
        question:
          "The slides list a strict JWT verification checklist. Which step is on it?",
        points: 2,
        options: [
          "Reject 'alg': 'none'; whitelist allowed algorithms (e.g. algorithms: ['RS256']); verify the signature BEFORE reading any claims",
          "Read claims first, then validate the signature",
          "Trust the alg header without question",
          "Always use HS256 in production",
        ],
        correctAnswer: 0,
        explanation:
          "The checklist: 'If the signature is invalid, STOP IMMEDIATELY. Don't even look at the claims.' Reading claims before verifying lets attackers trick you with tampered tokens. 'alg: none' must always be rejected.",
      },
      {
        id: "cyb-l3-q11",
        type: "multiple-choice",
        question:
          "The slides recommend a 'hybrid' pattern: short-lived access tokens combined with refresh tokens. Why?",
        points: 2,
        options: [
          "To make tokens harder to read",
          "To balance the SCALABILITY of stateless JWTs with the ability to REVOKE access — access tokens expire quickly (5–15 min); refresh tokens are stored server-side and can be revoked instantly",
          "To support older browsers",
          "To increase the number of network round-trips",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Best of Both Worlds — Hybrid Approach' slide: short-lived stateless access tokens (5–15 min, fast verification) plus long-lived opaque refresh tokens (stored server-side, instant revocation) balance security, performance, and revocation.",
      },
      {
        id: "cyb-l3-q12",
        type: "multiple-choice",
        question:
          "The slides emphasise refresh-token ROTATION with REUSE DETECTION. The point of reuse detection is:",
        points: 2,
        options: [
          "To save server storage",
          "If an 'old' refresh token is presented after rotation, it likely indicates theft — the server treats it as a security event and revokes the entire token chain",
          "To allow the same refresh token to be used twice",
          "To extend the access token lifetime indefinitely",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Security Through Rotation' slide: 'If old refresh token used again, server detects replay attack and revokes entire chain.' The legitimate user rotates to a new token, so an 'old' one resurfacing signals compromise.",
      },
      {
        id: "cyb-l3-q13",
        type: "multiple-choice",
        question:
          "The slides are emphatic that 'OAuth 2.0 is NOT an authentication protocol.' Which statement BEST captures why?",
        points: 2,
        options: [
          "OAuth 2.0 is just an old name for SAML",
          "OAuth 2.0 is an authorisation framework — it lets a user grant a third-party app limited access to their resources WITHOUT sharing the password; it does not by itself tell the third party WHO the user is. OpenID Connect (OIDC) adds the identity layer (ID tokens) on top",
          "OAuth 2.0 does not use tokens",
          "OAuth 2.0 only works with passwords",
        ],
        correctAnswer: 1,
        explanation:
          "The dedicated slide: 'OAuth 2.0 does NOT tell PrintShop who you are — it only gives them a token to access your photos.' OpenID Connect adds an ID Token (a JWT with the user's identity) on top to provide authentication.",
      },
      {
        id: "cyb-l3-q14",
        type: "multiple-choice",
        question:
          "For a server-side web application authenticating users, the recommended OAuth 2.0 grant type is:",
        points: 2,
        options: [
          "Implicit",
          "Resource Owner Password Credentials",
          "Authorization Code (with PKCE)",
          "Client Credentials",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Different Clients, Different Flows' table: Web App (Backend) → Authorization Code + PKCE, because the backend is a confidential client. PKCE is recommended for all clients (mandatory in OAuth 2.1). Implicit and ROPC are deprecated; Client Credentials is for server-to-server with no user.",
      },
      {
        id: "cyb-l3-q15",
        type: "multiple-choice",
        question: "The CLIENT CREDENTIALS grant is appropriate for:",
        points: 2,
        options: [
          "A user logging into a web app via the browser",
          "A backend service-to-service call where no human user is involved",
          "A smart TV with no keyboard",
          "A mobile app authenticating a user",
        ],
        correctAnswer: 1,
        explanation:
          "The table: 'Backend Service → Server-to-server → Client Credentials → No user interaction.' Client Credentials authenticates the SERVICE itself, not a user.",
      },
      {
        id: "cyb-l3-q16",
        type: "multiple-choice",
        question:
          "The slides describe an OAuth flow used by GitHub CLI, AWS CLI SSO, Azure CLI, and gcloud — where the CLI shows a short code and the user authorises on a phone or laptop. This is:",
        points: 2,
        options: [
          "Authorization Code with PKCE",
          "Device Authorization Grant (Device Flow)",
          "Client Credentials",
          "Implicit",
        ],
        correctAnswer: 1,
        explanation:
          "These are the canonical Device Authorization Grant examples (gh auth login, aws sso login, az login, gcloud auth login). Device Flow is designed for clients without a browser/keyboard — the user authorises on a separate device and the CLI polls for completion.",
      },
      {
        id: "cyb-l3-q17",
        type: "multiple-choice",
        question:
          "LDAP is most commonly used in enterprise environments to:",
        points: 2,
        options: [
          "Sign SAML assertions between IdPs and SPs",
          "Centralise authentication and authorisation data by querying a directory of users, groups, and devices",
          "Issue X.509 certificates from a certificate authority",
          "Delegate authorisation tokens to third-party applications",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Directory Services: LDAP' slide: 'LDAP provides centralised storage and querying for organisational data: users, groups, devices, and permissions.' Flow: connect → bind → query. Always use LDAPS (TLS on port 636) — plain LDAP sends credentials in cleartext.",
      },
      {
        id: "cyb-l3-q18",
        type: "multiple-choice",
        question:
          "The slides give Kerberos as the protocol underpinning Windows Active Directory. Which is a known Kerberos attack?",
        points: 2,
        options: [
          "IDOR",
          "CSRF",
          "Kerberoasting — requesting Service Tickets for accounts with weak passwords and cracking them offline",
          "Buffer overflow",
        ],
        correctAnswer: 2,
        explanation:
          "The slides list Golden Ticket, Kerberoasting, and Pass-the-Ticket. Kerberoasting targets weak service-account passwords (crack Service Tickets offline); mitigation is strong random passwords or Group Managed Service Accounts.",
      },
      {
        id: "cyb-l3-q19",
        type: "multiple-choice",
        question:
          "The slides describe a TPM (Trusted Platform Module). Its key SECURITY PROPERTY is:",
        points: 2,
        options: [
          "It encrypts the entire hard drive using AES-256",
          "Private keys are generated and stored inside the chip and never exported in plaintext",
          "It supplies biometric fingerprint authentication to the OS",
          "It acts as a VPN concentrator for remote access",
        ],
        correctAnswer: 1,
        explanation:
          "The TPM's defining property: 'Keys generated inside TPM never leave chip — protected from memory scraping. Sign, encrypt, decrypt without exposing keys to OS.' BitLocker is a USE of TPM, not its defining property — option (a) is the trap.",
      },
      {
        id: "cyb-l3-q20",
        type: "multiple-choice",
        question: "An HSM differs from a TPM PRIMARILY in that an HSM is:",
        points: 2,
        options: [
          "Soldered onto the motherboard and cannot be removed",
          "A dedicated, tamper-resistant EXTERNAL device used for high-volume cryptographic operations (e.g., by certificate authorities, payment processors, cloud KMS)",
          "Used exclusively to store biometric credentials",
          "Only compatible with Windows environments",
        ],
        correctAnswer: 1,
        explanation:
          "TPM is a discrete chip on the motherboard, one per machine. HSM is a dedicated external device, tamper-resistant, used by CAs, payment processors, and cloud KMS for high-volume crypto that many systems share. HSMs are typically certified to FIPS 140-2 Level 3+.",
      },
      {
        id: "cyb-l3-q21",
        type: "multiple-choice",
        question:
          "According to the slides, a Physical Unclonable Function (PUF) generates a device fingerprint by:",
        points: 2,
        options: [
          "Asking the user to set a unique PIN at first boot",
          "Exploiting natural manufacturing variations in silicon to produce a unique, repeatable response that cannot be cloned — ideal for IoT devices too small for a discrete security chip",
          "Storing a hash of the MAC address",
          "Generating a UUID at boot time",
        ],
        correctAnswer: 1,
        explanation:
          "The 'Hardware Roots of Trust' slide: PUFs exploit 'manufacturing variations in silicon as a unique fingerprint. Ideal for IoT devices too resource-constrained for discrete security chips.' Each chip gives a unique, repeatable, unclonable response to a challenge.",
      },
      {
        id: "cyb-l3-q22",
        type: "multiple-choice",
        question:
          "Attribute-Based Access Control (ABAC) differs from RBAC primarily because ABAC:",
        points: 2,
        options: [
          "Only grants access based on group membership",
          "Evaluates multiple attributes (user, resource, environment, time) at access time",
          "Stores permissions in a static ACL on each resource",
          "Requires all decisions to be made offline before the session begins",
        ],
        correctAnswer: 1,
        explanation:
          "ABAC: 'Policies dynamically evaluate attributes of the SUBJECT, RESOURCE, ACTION, and ENVIRONMENT.' This handles rules RBAC can't, e.g. 'Alice can read orders for her own tenant only' or 'this API key only works from the office IP during working hours.'",
      },
      {
        id: "cyb-l3-q23",
        type: "multiple-choice",
        question:
          "Open Policy Agent (OPA) uses the Rego language to implement which paradigm?",
        points: 2,
        options: [
          "Mandatory Access Control (MAC)",
          "Discretionary Access Control (DAC)",
          "Policy-as-Code: machine-readable, version-controlled authorisation policies, externalised from each microservice",
          "Role-Based Access Control stored in LDAP groups",
        ],
        correctAnswer: 2,
        explanation:
          "The 'Policy-as-Code — Externalising Authorisation' slide lists OPA (Rego), Cedar (AWS), and Casbin. The point: move authz logic out of each microservice into a dedicated, declarative, version-controlled engine — solving '50 microservices each implementing authz differently.'",
      },
      {
        id: "cyb-l3-q24",
        type: "multiple-choice",
        question:
          "The slides give an example OPA policy with the line `default allow = false`. The PRINCIPLE this expresses is:",
        points: 2,
        options: [
          "Default permit — allow everything unless an explicit rule denies it",
          "Default deny / fail-secure — nothing is permitted unless an explicit rule allows it; this prevents accidental authorisation through policy omissions",
          "Open access for all engineers",
          "Audit-only mode (log requests but do not block)",
        ],
        correctAnswer: 1,
        explanation:
          "The OPA example: 'Default deny principle: Nothing is permitted unless a rule explicitly allows it. This fail-secure approach prevents accidental authorisation through policy omissions.' An empty or typo'd policy should deny by default — the same Fail-Safe Defaults principle revisited in Lecture 4.",
      },
    ],
  },
  {
    id: "cyber-mock-test-1",
    courseId: "7",
    title: "Mock Test 1",
    description:
      "Cybersecurity Mock Test 1 (SM1 2026). Scope: Lectures 1–3 (Introduction to Cybersecurity; Vulnerabilities and Threats; Authentication, Authorisation & Trust). Section A: 17 MCQs (34 marks); Section B: 4 True/False (4 marks); Section C: 3 short answers (6 marks); Section D: 1 scenario (6 marks). Total: 50 marks.",
    type: "test",
    timeLimit: 90,
    createdAt: "2026-05-20T09:00:00Z",
    questions: [
      {
        id: "cyb-mt1-q1",
        type: "multiple-choice",
        question:
          "Which element of the CIA triad is most directly concerned with ensuring data has not been altered by unauthorised parties?",
        points: 2,
        options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
        correctAnswer: 1,
        explanation:
          "Integrity ensures data is accurate and has not been tampered with (e.g. an attacker modifying a transaction from $10 to $10,000). Mechanisms: Hashing (SHA-256), Digital Signatures, HMAC. Authentication is not part of the CIA triad. Source: L1 — 'The Three Pillars of CIA' slide.",
      },
      {
        id: "cyb-mt1-q2",
        type: "multiple-choice",
        question:
          "In the Asset-Adversary-Mechanism threat modelling framework, which best describes an 'adversary'?",
        points: 2,
        options: [
          "A database containing sensitive customer records",
          "An SQL injection payload used to extract data",
          "A nation-state actor seeking to exfiltrate intellectual property",
          "A firewall rule blocking inbound traffic",
        ],
        correctAnswer: 2,
        explanation:
          "Asset = what you protect (the database); Adversary = the ACTOR with capability and intent (the nation-state); Payload = the tool wielded (the SQL injection string); Mechanism = the defensive control (the firewall rule). An attack payload is not the adversary itself. Source: L1 — Threat Modelling slide.",
      },
      {
        id: "cyb-mt1-q3",
        type: "multiple-choice",
        question:
          "At which stage of the Cyber Kill Chain does an attacker typically install a persistent backdoor on the victim's system?",
        points: 2,
        options: ["Reconnaissance", "Weaponisation", "Installation", "Delivery"],
        correctAnswer: 2,
        explanation:
          "Installation = establishing persistence: backdoor/rootkit, startup-location scripts, scheduled tasks, registry modification — to survive reboots and detection. Exploitation is the 'boom' moment; Installation makes that access persistent. Source: L1 — 'Kill Chain Stage 5: Installation' slide.",
      },
      {
        id: "cyb-mt1-q4",
        type: "multiple-choice",
        question:
          "A company mandates annual security awareness training for all staff. This is best classified as a:",
        points: 2,
        options: [
          "Technical control",
          "Physical control",
          "Administrative / policy control",
          "Cryptographic control",
        ],
        correctAnswer: 2,
        explanation:
          "Administrative controls are policies, procedures, and training that define expected behaviour and rely on human compliance. Training is a textbook administrative control. 'Cryptographic control' is not a category in the lecture's taxonomy. Source: L1 — 'Security Controls Overview' slide.",
      },
      {
        id: "cyb-mt1-q5",
        type: "multiple-choice",
        question:
          "Which JWT header claim specifies the algorithm used to sign the token?",
        points: 2,
        options: ["typ", "kid", "alg", "sub"],
        correctAnswer: 2,
        explanation:
          "alg = signing algorithm (HS256, RS256, ES256). typ = token type ('JWT'). kid = key ID for rotation. sub is a PAYLOAD claim (the subject/user ID), not a header claim. Source: L3 — 'JWT Header' slide.",
      },
      {
        id: "cyb-mt1-q6",
        type: "multiple-choice",
        question:
          "The 2015 algorithm confusion attack against multiple JWT libraries allowed attackers to forge tokens by:",
        points: 2,
        options: [
          "Brute-forcing the HMAC secret",
          "Setting alg to 'none' and removing the signature",
          "Switching alg from RS256 to HS256 and signing with the public key as the HMAC secret",
          "Replaying a captured token before its exp claim expired",
        ],
        correctAnswer: 2,
        explanation:
          "The attacker changes a valid RS256 token's header to HS256 and computes HMAC-SHA256 using the server's (public) key as the shared secret; a vulnerable library fetches that key and 'verifies' successfully. Option (b) is the distinct 'alg: none' attack. Fix: whitelist algorithms. Source: L3 — 'Algorithm Confusion Attack'.",
      },
      {
        id: "cyb-mt1-q7",
        type: "multiple-choice",
        question:
          "A Trusted Platform Module (TPM) provides which key security property?",
        points: 2,
        options: [
          "It encrypts the entire hard drive with AES-256",
          "Private keys are generated and stored inside the chip and never exported in plaintext",
          "It acts as a VPN concentrator for remote access sessions",
          "It supplies biometric fingerprint authentication to the OS",
        ],
        correctAnswer: 1,
        explanation:
          "The TPM's defining property is hardware-bound key storage: keys generated inside never leave the chip, protected from memory scraping. BitLocker is a USE of TPM, not its defining property (option a is the trap). Source: L3 — 'TPM' slide.",
      },
      {
        id: "cyb-mt1-q8",
        type: "multiple-choice",
        question: "LDAP is most commonly used in enterprise environments to:",
        points: 2,
        options: [
          "Sign SAML assertions between identity providers and service providers",
          "Centralise authentication by querying a directory of users and groups",
          "Issue X.509 certificates from a certificate authority",
          "Delegate authorisation tokens to third-party applications",
        ],
        correctAnswer: 1,
        explanation:
          "LDAP queries/modifies directory services (Active Directory, OpenLDAP): connect → bind → query attributes. SAML assertions = SAML; X.509 issuance = CAs; token delegation = OAuth 2.0. Always use LDAPS (TLS, port 636). Source: L3 — 'Directory Services: LDAP' slide.",
      },
      {
        id: "cyb-mt1-q9",
        type: "multiple-choice",
        question:
          "Which OAuth 2.0 grant type is recommended for a server-side web application authenticating users?",
        points: 2,
        options: [
          "Client Credentials",
          "Implicit",
          "Resource Owner Password Credentials",
          "Authorization Code",
        ],
        correctAnswer: 3,
        explanation:
          "A server-side web app is a confidential client (can store a secret) → Authorization Code (with PKCE). Client Credentials is service-to-service; Implicit and ROPC are deprecated. OAuth 2.1 mandates PKCE for all clients. Source: L3 — OAuth flow selection table.",
      },
      {
        id: "cyb-mt1-q10",
        type: "multiple-choice",
        question:
          "Attribute-Based Access Control (ABAC) differs from RBAC primarily because ABAC:",
        points: 2,
        options: [
          "Only grants access based on group membership",
          "Evaluates multiple attributes (user, resource, environment) at access time",
          "Stores permissions in a static ACL on each resource",
          "Requires all decisions to be made offline before the session begins",
        ],
        correctAnswer: 1,
        explanation:
          "ABAC dynamically evaluates attributes of subject, resource, action, and environment at access time (e.g. 'this API key only works from the office IP during working hours'). Option (a) describes RBAC, (c) describes classic ACLs, (d) is invented. Source: L3 — 'RBAC vs ABAC' slides.",
      },
      {
        id: "cyb-mt1-q11",
        type: "multiple-choice",
        question:
          "A developer commits a database password in plaintext to a public GitHub repository. This is an example of:",
        points: 2,
        options: [
          "Cross-Site Scripting (XSS)",
          "Misconfiguration and Default Secrets",
          "Business Logic Abuse",
          "Memory Safety Violation",
        ],
        correctAnswer: 1,
        explanation:
          "Category 9: the software worked as designed; the implementation was insecure. Plaintext secrets in source control is the canonical example. Not XSS (no script injection), not business logic (code did nothing wrong), not memory safety. Source: L2 — '10 Vulnerability Categories'.",
      },
      {
        id: "cyb-mt1-q12",
        type: "multiple-choice",
        question:
          "A CSRF attack succeeds because the target application relies solely on:",
        points: 2,
        options: [
          "Multi-factor authentication via SMS OTP",
          "A session cookie automatically sent by the browser with every cross-origin request",
          "A Content Security Policy header restricting script sources",
          "An HttpOnly flag on the session cookie",
        ],
        correctAnswer: 1,
        explanation:
          "The browser automatically attaches the session cookie to the cross-site request, so the server can't distinguish forged from legitimate. MFA happens at login (not per request); CSP restricts script sources; HttpOnly stops JS reading the cookie (XSS defence), not the browser sending it. Source: L2 — 'CSRF' slide.",
      },
      {
        id: "cyb-mt1-q13",
        type: "multiple-choice",
        question:
          "In a dependency confusion attack, the package manager installs the malicious public package because:",
        points: 2,
        options: [
          "Internal packages are never digitally signed",
          "Package managers may prefer the higher version number found in the public registry",
          "Private registries automatically mirror all public packages",
          "Most CI/CD pipelines skip integrity checks for small packages",
        ],
        correctAnswer: 1,
        explanation:
          "The attacker registers the internal package name publicly at a higher version (e.g. 99.0.0); npm sees both and chooses the public one due to higher semantic versioning. The version trick is the whole mechanism. Prevention: scoped packages, proxying private registry, lock files with integrity hashes. Source: L2 — 'Dependency Confusion Attack' slide.",
      },
      {
        id: "cyb-mt1-q14",
        type: "multiple-choice",
        question: "A CVSS base score primarily measures:",
        points: 2,
        options: [
          "The financial cost of remediating the vulnerability",
          "The intrinsic severity of a vulnerability independent of time or environment",
          "The number of public exploits available",
          "The likelihood of exploitation within 30 days",
        ],
        correctAnswer: 1,
        explanation:
          "The Base score captures intrinsic properties (attack vector, complexity, privileges, UI, scope, C/I/A) without time (Temporal) or deployment (Environmental). 'CVSS measures severity, not risk.' Option (c) is Temporal; (d) approximates EPSS. Source: L2 — CVSS slides.",
      },
      {
        id: "cyb-mt1-q15",
        type: "multiple-choice",
        question:
          "Under the South African Cybercrimes Act (Act 19 of 2020), which activity most likely constitutes a criminal offence even when no data is stolen?",
        points: 2,
        options: [
          "Reading publicly available government security advisories",
          "Running a port scan on your own authorised systems",
          "Intentionally and without permission intercepting data transmissions",
          "Reporting a vulnerability to a vendor via responsible disclosure",
        ],
        correctAnswer: 2,
        explanation:
          "The Act criminalises unlawful access, unlawful interception of data, and possession of malware with intent. 'Intent is not enough; you must have authorisation.' Theft is not required — the unauthorised interception itself is the offence. The other options are all lawful. Source: L1 — 'Ethics, Law, and Culture'.",
      },
      {
        id: "cyb-mt1-q16",
        type: "multiple-choice",
        question: "An HSM differs from a TPM primarily in that an HSM is:",
        points: 2,
        options: [
          "Soldered onto the motherboard and cannot be removed",
          "A dedicated, tamper-resistant external device used for high-volume cryptographic operations",
          "Used exclusively to store biometric credentials",
          "Only compatible with Windows environments",
        ],
        correctAnswer: 1,
        explanation:
          "Both share the property that private keys never leave the hardware. The difference is form factor and scale: TPM is an integrated chip (one per machine); HSM is an external, shared, tamper-resistant device for high-volume crypto (CAs, payment processors, cloud KMS; FIPS 140-2 Level 3+). Source: L3 — 'Hardware Roots of Trust' slide.",
      },
      {
        id: "cyb-mt1-q17",
        type: "multiple-choice",
        question:
          "Open Policy Agent (OPA) uses Rego to implement which access control paradigm?",
        points: 2,
        options: [
          "Mandatory Access Control (MAC)",
          "Discretionary Access Control (DAC)",
          "Policy-as-Code: machine-readable, version-controlled authorisation policies",
          "Role-Based Access Control stored in LDAP groups",
        ],
        correctAnswer: 2,
        explanation:
          "OPA (CNCF) and Rego are the canonical Policy-as-Code example (alongside Cedar and Casbin): externalise authz logic from each microservice into a dedicated, version-controlled engine. OPA can encode RBAC/ABAC, but it IS Policy-as-Code, not any single classical paradigm. Source: L3 — 'Policy-as-Code' slide.",
      },
      {
        id: "cyb-mt1-q18",
        type: "multiple-choice",
        question:
          "True or False: A Physical Unclonable Function (PUF) generates a device fingerprint by exploiting natural manufacturing variations in silicon.",
        points: 1,
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "TRUE. PUFs exploit microscopic random manufacturing imperfections in silicon to produce a unique, repeatable, unclonable response — ideal for IoT devices too constrained for a discrete TPM/HSM. Source: L3 — 'Hardware Roots of Trust' slide.",
      },
      {
        id: "cyb-mt1-q19",
        type: "multiple-choice",
        question:
          "True or False: Setting the JWT alg header to 'none' means the token is signed with a null byte and can still be verified securely.",
        points: 1,
        options: ["True", "False"],
        correctAnswer: 1,
        explanation:
          "FALSE. 'alg': 'none' means the token is UNSIGNED — no signature at all. Early libraries that accepted it let attackers forge any claims. Always reject 'alg': 'none'. This is distinct from the RS256→HS256 algorithm confusion attack. Source: L3 — JWT verification checklist.",
      },
      {
        id: "cyb-mt1-q20",
        type: "multiple-choice",
        question:
          "True or False: SAML 2.0 uses XML-based assertions to convey authentication and authorisation data between an identity provider and a service provider.",
        points: 1,
        options: ["True", "False"],
        correctAnswer: 0,
        explanation:
          "TRUE. SAML 2.0 is an XML-based SSO protocol: the IdP (Okta, Azure AD) creates a signed XML assertion the SP validates. Trade-off: XML is verbose and signature validation is error-prone (canonicalisation, signature-wrapping attacks). Source: L3 — 'SAML 2.0: XML-Based SSO' slide.",
      },
      {
        id: "cyb-mt1-q21",
        type: "multiple-choice",
        question:
          "True or False: An SQL injection vulnerability is classified as a business logic flaw because it requires the attacker to understand application workflow.",
        points: 1,
        options: ["True", "False"],
        correctAnswer: 1,
        explanation:
          "FALSE. SQL injection is Injection (Category 1) — it exploits the interpreter mixing data and commands. Business logic flaws (Category 10) are cases where the code works as written but the application rules allow abuse. Classification is by failure mechanism, not by whether the attacker understands the app. Source: L2 — Categories 1 and 10.",
      },
      {
        id: "cyb-mt1-q22",
        type: "text",
        question:
          "Short answer (2 marks). Why do long-lived refresh tokens represent a significant security risk in mobile applications?",
        points: 2,
        explanation:
          "MODEL ANSWER — (1 mark) Mobile devices are an exposed storage medium: refresh tokens in local storage, keychains, or device backups can be extracted via decompiled APKs, jailbroken/rooted devices, malware, or restored backups; static client secrets baked into the binary can also be extracted. (1 mark) Without rotation or expiry, a single stolen token grants INDEFINITE access — the attacker keeps minting access tokens until the password changes or the breach is detected; real incidents have caused mass account takeover. Mitigations: rotate refresh tokens on every use; reuse detection (revoke the chain if an old token reappears); bind tokens to a device/hardware key; PKCE instead of static secrets; finite lifetime (e.g. 30 days). Source: L3 — Refresh token rotation; MS notes 'Long-Lived Refresh Token Theft (Mobile Apps)'.",
      },
      {
        id: "cyb-mt1-q23",
        type: "text",
        question:
          "Short answer (2 marks). Name the primary defensive control used to mitigate CSRF attacks on state-changing HTTP endpoints.",
        points: 2,
        explanation:
          "MODEL ANSWER — The ANTI-CSRF TOKEN (Synchroniser Token Pattern). (1 mark) Mechanism: the server generates a random, unpredictable per-session (or per-request) token, embeds it in forms, and validates it on every state-changing POST/PUT/DELETE. (1 mark) Why it works: an attacker on evil.com cannot read the token (Same-Origin Policy blocks cross-origin reads), so cannot include a valid token in a forged request; the browser still attaches the cookie, but without the matching token the server rejects it. Acceptable complements: SameSite=Lax/Strict cookies, double-submit cookie, Origin/Referer checks, JWT in the Authorization header. For full marks: name the control AND explain why a cross-origin attacker cannot supply a valid token. Source: L2 — 'CSRF Technical Defences' slide.",
      },
      {
        id: "cyb-mt1-q24",
        type: "text",
        question:
          "Short answer (2 marks). Explain the difference between a policy and a technical control, giving one example of each.",
        points: 2,
        explanation:
          "MODEL ANSWER — (1 mark) Definitions: a POLICY (administrative) control is a documented rule/procedure defining expected human behaviour; strength = low cost, weakness = relies on voluntary compliance. A TECHNICAL control is software/hardware that ENFORCES security automatically; strength = consistent enforcement, weakness = cost/usability impact. (1 mark) Examples: Policy — 'All staff must change their password every 90 days' (relies on users remembering); Technical — the auth system automatically forces a change at 90 days, blocking login until done. Other valid pairs: USB policy vs OS port blocking; mandatory training vs email gateway quarantining attachments. Framing: a policy says what should happen; a technical control makes it happen regardless of cooperation. Layering both = Defence in Depth. Source: L1 — 'Security Controls Overview' / 'Layering Control Types'.",
      },
      {
        id: "cyb-mt1-q25i",
        type: "text",
        question:
          "Scenario (2 marks). A fintech startup has deployed a REST API using RS256-signed JWTs and long-lived refresh tokens stored in the mobile app's local storage. A penetration tester reports three findings:\n(i) The API accepts tokens where the alg header has been changed from RS256 to HS256.\n(ii) Refresh tokens never expire and are not rotated after use.\n(iii) The /admin endpoint grants access based on an admin role embedded in the JWT.\n\nFinding (i): State (a) the vulnerability or attack it enables, and (b) one specific remediation.",
        points: 2,
        explanation:
          "MODEL ANSWER — (a) [1 mark] ALGORITHM CONFUSION ATTACK: the API does not whitelist the expected signing algorithm. An attacker takes a valid RS256 token, changes the header to HS256, and recomputes the signature using the server's PUBLIC KEY as the HMAC shared secret; the vulnerable verifier fetches the public key, uses it as the HMAC key, and 'verifies' the forged token — enabling forgery of tokens for any user, including admins. (b) [1 mark] Whitelist the algorithm explicitly: verify(token, publicKey, { algorithms: ['RS256'] }); reject mismatched alg headers; keep key separation (never reuse RSA key material for HMAC). Generic answers earn 0 for the remediation half.",
      },
      {
        id: "cyb-mt1-q25ii",
        type: "text",
        question:
          "Scenario, continued (2 marks). Same fintech JWT API. Finding (ii): Refresh tokens never expire and are not rotated after use. State (a) the vulnerability or attack it enables, and (b) one specific remediation.",
        points: 2,
        explanation:
          "MODEL ANSWER — (a) [1 mark] INDEFINITE TOKEN REPLAY / ACCOUNT TAKEOVER: a refresh token extracted from the device (decompiled APK, rooted device, stolen backup, malware) grants permanent access; because it never expires or rotates, the attacker keeps minting access tokens indefinitely, and there is no way to detect theft — legitimate user and attacker can use it simultaneously with no alert. (b) [1 mark] Implement REFRESH TOKEN ROTATION WITH REUSE DETECTION: issue a new refresh token on each use, invalidate the old one, and if an already-rotated token reappears, treat it as theft and REVOKE THE ENTIRE CHAIN. Also enforce a finite lifetime (e.g. 30 days) and bind the token to a device/hardware-backed key. Naming 'refresh token theft'/'long-lived replay' earns the vuln mark; remediation must mention rotation OR reuse detection OR expiry (ideally rotation+reuse detection).",
      },
      {
        id: "cyb-mt1-q25iii",
        type: "text",
        question:
          "Scenario, continued (2 marks). Same fintech JWT API. Finding (iii): The /admin endpoint grants access based on an admin role embedded in the JWT. State (a) the vulnerability or attack it enables, and (b) one specific remediation.",
        points: 2,
        explanation:
          "MODEL ANSWER — (a) [1 mark] BROKEN ACCESS CONTROL / OVER-RELIANCE ON CLIENT-PROVIDED CLAIMS: the endpoint trusts the JWT's role claim as its sole authz check. Combined with finding (i), an attacker who can forge tokens can forge their own admin role; even without forgery, a role baked into a long-lived token can't be revoked (a demoted user keeps 'admin' until expiry). (b) [1 mark] Perform SERVER-SIDE AUTHORISATION on every privileged request against an authoritative source (database or policy engine such as OPA); treat the JWT only as proof of identity and look up the current role at request time; apply default-deny. Better still: step-up MFA, just-in-time elevation, IP allowlisting, and audit logging on /admin. Remediation must move authz OUT of the JWT to the server, not just 'improve the token'.",
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
