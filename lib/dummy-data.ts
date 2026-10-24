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
  answerLayout?: "paired" | "reorderable" // Ordered lists: answer in pairs of fields, or add items in any order and rearrange them
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
  {
    id: "sin-and-repentance-notes",
    courseId: "8",
    title: "Sin and Repentance",
    content: `# Sin and Repentance

> **Purpose:** To display our love of God by understanding why we need to hate sin and repent of it. Adapted from the supplied *Sin & Repentance* study notes and First Principles class.

## Sin

### Isaiah 59:1–2

- “Sin” is an archery term that means to **miss the mark**. Jesus' standard is the bullseye.
- The Lord's arm is not too short to save, nor his ear too dull to hear. **Our sins separate us from God.**
- **The wall:** sin is a wall between man, in darkness, and God, in the light.
- **The curtain illustration:** curtains drawn over a sunny window darken the room, not because the sun has been destroyed but because we have shut out its light. Sin does not weaken God's power to save; we separate ourselves from him.
- **Discuss:** Are you in darkness or in the light right now? How do you know?

### Romans 3:23

- All have sinned and fall short of the glory of God.
- Who has sinned against God? **Everyone**, no matter how “small” a sin may seem.
- Most people consider themselves good people. We compare ourselves with the worst people in history, or assume God ranks sins the way courts rank crimes. But the standard is Jesus, and we all fall short of it.

**Person A, Person B, and Person C** have piles of sin of different sizes, but all three stand on the same side of the wall, cut off from the glory of God.

- Which person is further from God: a person who sins a little or a lot? **Neither. Sin is sin, and both fall short.**
- **The hole illustration:** if a hole is 100 km wide, a person who jumps 10 km and a person who jumps 99.9 km both fall in. Our moral efforts fall short; we need Jesus to bridge the gap.
- A good moral life doesn't save you, because **salvation cannot be earned through your deeds**.

### Galatians 5:19–21

The acts of the sinful nature are obvious: sexual immorality, impurity and debauchery; idolatry and witchcraft; hatred, discord, jealousy, fits of rage, selfish ambition, dissensions, factions and envy; drunkenness, orgies, and the like. Paul warns that those who live like this will not inherit the kingdom of God.

**Sin definitions (Appendix A):**

- **Sexual Immorality** (*porneía*): To commit sexual intercourse or any sexual sin outside of marriage.
- **Impurity** (*akatharsía*): Uncleanness or filth in a natural or physical sense; moral uncleanness, lewdness, any unnatural pollution, whether acted out by oneself (masturbation), or with another (petting, oral sex).
- **Debauchery** (*asélgeia*): Lack of self-control which involves one's behaviour (overindulgence; food, sleep, etc.)
- **Idolatry** (*eidololatreía*): Worshipping anything other than God (career, school, pleasure, sports).
- **Witchcraft** (*pharmakeía*): The occult, sorcery, witchcraft, illicit pharmaceuticals, trance, magical incantation with drugs.
- **Hatred** (*échthra*): Being hostile. Animosity towards others.
- **Discord** (*éris*): Rivalry or a lack of harmony between people.
- **Jealousy** (*zelos*): Grief and desire because you do not have what someone else has.
- **Fits of Rage** (*thumós*): A state of intense displeasure, anger, wrath, rage, indignation.
- **Selfish Ambition** (*eritheía*): Strife and rivalry because of selfish motives.
- **Dissension** (*dichostasía*): A separate faction; division between people.
- **Factions** (*haíresis*): Creating a separation between people because of a different opinion.
- **Envy** (*phthónos*): Pain and bitterness felt at the sight of another's excellence or happiness.
- **Drunkenness** (*méthe*): Excess intake of alcohol.
- **Orgies** (*komos*): Living without restraint. Partying.

**From the class:** Paul's lists of sins usually begin with sexual sin, which shows how serious it is, however much the world minimises it. Anger itself is not sin (“In your anger do not sin,” Ephesians 4:26), and ambition is not wrong (Romans 15:20); the sins are fits of rage and selfish ambition.

**“And the like”:** the list is not exhaustive. Lying, cheating, murder, and theft also miss the mark.

**“Those who live like this”:** Paul means a person who knows their sin and keeps living in it, even if they come to church.

Paul follows this list with the fruit of the Spirit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control (verses 22–23). Satan teaches us to look for love, joy, and peace through the acts of the sinful nature; God gives them through his Spirit.

- **Discuss:** Which of these sins do you need to repent of today?

### 2 Timothy 3:1–5

- These are **sins of the heart**. Some sins are blatant; others are more deceitful.
- People will be lovers of themselves, lovers of money, boastful, proud, abusive, disobedient to their parents, ungrateful, unholy, without love, unforgiving, slanderous, without self-control, brutal, not lovers of the good, treacherous, rash, conceited, lovers of pleasure rather than lovers of God.
- **Having a form of godliness but denying its power:** looking godly on the outside while living in sin, like a worship leader who spent the night before at a club. Paul says to have nothing to do with such people, and that begins with separating ourselves from these sins.
- **Discuss:** Which of these sins do you need to repent of?

### James 4:17

- Knowing what is right and not doing it is also sin: the **sin of omission**.
- With knowledge of God's Word comes responsibility to obey it. Once you understand what it means to be a disciple, choosing not to become one is sin.
- **Discuss:** Do you need to repent of this?

### James 5:16

- We are called to **confess our sins to one another**, not only to a priest, and to pray for each other so that we may be healed.
- Getting open brings sin into the light. Sometimes we need someone objective to point out sin we did not recognise.
- Prayer is powerful and effective.

### Romans 6:23

- A **wage** is what you have earned, not a wager or bet. When we sin, we earn eternal death: separation from God.
- A **gift** is unearned and free. What does God want to give you? **The gift of eternal life!**
- **Wages of sin:** death, hell, darkness.
- **Gift of God:** eternal life, heaven, light.

## Repentance

### 2 Corinthians 7:8–11

- You cannot repent without having **godly sorrow**. What are the characteristics of godly sorrow?
- **Worldly sorrow** is self-centred, such as embarrassment or shame at being found out, and it brings death. **Godly sorrow** is centred on God and brings repentance that leads to salvation and leaves no regret.
- Godly sorrow produces earnestness, eagerness to clear yourselves, indignation, alarm, longing, concern, and readiness to see justice done (verse 11). Negotiating, debating, making excuses, and shifting blame are signs of worldly sorrow.
- The answer to sin is repentance. The Greek word is ***metanoia***, a **change of mind**: we no longer see sin as something we want, but as something to flee and be rescued from.
- A change of mind should lead to a change in actions.

### Luke 13:1–5

- First-century Jews believed disasters were divine punishment for personal sins. Jesus rejected this view: the Galileans killed by Pilate and the eighteen who died when the tower in Siloam fell were no worse sinners than anyone else. We are all sinners!
- Unless a person repents, they are in peril of eternal condemnation, not just physical death. **We must repent, or we will perish!**

### Colossians 3:5–10

- **Put to death** whatever belongs to your earthly nature: sexual immorality, impurity, lust, evil desires, and greed, which is idolatry. Rid yourself of anger, rage, malice, slander, filthy language, and lying.
- The wrath of God is coming, so break free from sin's slavery!
- Putting sin to death is practical: get rid of whatever you have used to sin, and cut off whoever you have been sinning with.
- **Discuss:** Are you ready to put these sins to death once and for all?

### Matthew 5:27–30

- Anyone who looks at a woman lustfully has already committed adultery with her in his heart.
- “Gouge out your eye” and “cut off your hand” are not calls to harm our bodies. We must be **radical** in removing the things that cause us to sin.
- Repentance is not just external behaviour modification. The goal is a **heart transformation** that overflows into new attitudes and actions.

### Acts 26:20

- We **prove our repentance by our deeds**!
- One student, after getting open about his drug use, asked the brothers studying with him to come home with him that night, where he threw out all his drugs and paraphernalia. That was his plan of repentance, proven by his deeds.
- **Discuss:** What is your plan to repent of the sins in your life?

> **Challenge:** Have a clear plan of repentance — addressing both sins of commission and omission. It may be helpful to write out a personal sin list to clear your conscience and come into the light by confessing your sins. (This should remain a highly confidential process between those studying the Bible.)

## Memory scriptures (NIV)

- **John 15:8:** “This is to my Father's glory, that you bear much fruit, showing yourselves to be my disciples.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AJohn+15%3A8))
- **Matthew 22:37–39:** Jesus replied: “‘Love the Lord your God with all your heart and with all your soul and with all your mind.’ This is the first and greatest commandment. And the second is like it: ‘Love your neighbor as yourself.’” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AMatthew+22%3A37%E2%80%9339))

## Books of the Bible: Genesis through Revelation

Memorize all **66 books of the Bible in order**: the 39 books of the Old Testament and the 27 books of the New Testament.

### Old Testament: Genesis through Malachi

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

### New Testament: Matthew through Revelation

1. Matthew
2. Mark
3. Luke
4. John
5. Acts
6. Romans
7. 1 Corinthians
8. 2 Corinthians
9. Galatians
10. Ephesians
11. Philippians
12. Colossians
13. 1 Thessalonians
14. 2 Thessalonians
15. 1 Timothy
16. 2 Timothy
17. Titus
18. Philemon
19. Hebrews
20. James
21. 1 Peter
22. 2 Peter
23. 1 John
24. 2 John
25. 3 John
26. Jude
27. Revelation
`,
    createdAt: "2026-10-13T10:00:00Z",
    updatedAt: "2026-10-13T10:00:00Z",
  },
  {
    id: "light-and-darkness-notes",
    courseId: "8",
    title: "Light and Darkness",
    content: `# Light and Darkness

> **Purpose:** To understand how to be saved. Adapted from the supplied *Light & Darkness* study notes and First Principles class.

Most people we study the Bible with are already convinced they are saved. This study shows from the Scriptures what it means to be saved in God's eyes, and how a person goes from the darkness into the light.

## Your spiritual timeline

What are your spiritual highlights? If it helps, draw a timeline.

- When do you believe you were saved?
- When did you receive the Holy Spirit?
- When did you receive the forgiveness of sin?

If you have already talked with the person about their salvation, you may know these answers already.

## Light and darkness

### 1 Peter 2:9–10

- **Darkness:** not a people of God, no mercy; lost, not a Christian, not a disciple.
- **Light:** people of God, mercy; saved, Christian, disciple.
- Every person is either in the darkness or the light. **There is no twilight zone.** Where are you?
- Peter writes to disciples who were once in the darkness until God called them into his wonderful light. There is a **point in time** when a person is saved. Salvation is not a fleeting feeling that comes after a good week and goes after a bad one.
- Ask the person where they stand before God. If they believe they are already saved, the rest of the study will not reach their heart.
- Some people place themselves in a neutral zone because of their emotions or what they were taught. What counts is what the Bible teaches, not how we feel about ourselves.

### John 3:1–7

- We must be **born again of water and the Spirit**.
- This is a personal decision as an adult.
- God's kingdom is in the light, so the way into the kingdom is the way a person is saved.
- Nicodemus could not understand how a grown man could be born again. Being born again takes a mature decision, which is why it cannot be infant baptism.

### Acts 2:22–24

What message must one believe to be saved?

1. That Jesus is from God (verse 22).
2. That Jesus was physically raised from the dead (verse 24).
3. That everyone is responsible for the crucifixion of Christ (verse 23), because all have sinned.

This is why the Sin and Repentance study matters: the consequence of our sin is that Jesus had to go to the cross.

### Acts 2:37

- What does it mean to be “cut to the heart”? **Deep emotional sorrow.**
- The people recognized their responsibility for the death of Jesus.
- Their response reflected godly sorrow: “What should we do?”
- “Just tell me what I have to do” is the response of someone who has surrendered. A person who is still fighting, debating, or negotiating at this point is not ready to be a disciple.
- **Lord and Christ (verse 36):** *Christ* means Messiah, the one who saves us; we cannot save ourselves or earn heaven. *Lord* means master. We cannot have one without the other. Some people want Jesus to save them without being their master. Others serve him as master while trying to earn their salvation, like the older son in the parable of the prodigal son. Jesus calls us friends, not servants (John 15:15).

### Acts 2:38–42

Once the people believed, what did they do?

- **Repent** (turn to God).
- **Be baptized** (be immersed in water).
  - Their sins were forgiven. This is the point in time when a person is saved.
  - The Holy Spirit is given to those who are baptized.
- “With many other words he **warned** them; and he **pleaded** with them, ‘Save yourselves from this corrupt generation’” (verse 40). Peter was convinced they were lost unless they repented and were baptized, and we must share that conviction rather than be sentimental. Pleading appeals to the person because their soul is at stake; warning tells them the truth about what awaits them.
- About three thousand were added that day. They devoted themselves to the apostles' teaching, fellowship, the breaking of bread, and prayer: that is how we know they became disciples.

## Why baptism?

### Romans 6:1–8

- “Shall we go on sinning so that grace may increase? By no means! We are those who have died to sin.” Dying to sin is our repentance.
- Baptism is the **participation in the death, burial, and resurrection of Christ** — it is more than just a symbol. It is not a ritual, tradition, or custom.
- This is the point in time when we are freed from sin and united with Christ. The wall of sin is broken down — we are forgiven of our sins!
- **The diagram:** Jesus died, was buried, and was resurrected. In baptism, our old life dies with Christ, is buried with Christ, and is raised to a new life. We go into the water in the darkness and come out in the light.

From darkness to light:

- **Sin separates us from God** → **sin is forgiven** (Acts 2:38).
- **Born again of water and the Spirit** (John 3:5) → **water = baptism; the Spirit is received at baptism** (Acts 2:38).
- **Faith in the blood of Jesus saves us** (Romans 3:25) → Jesus shed his blood when he died. In baptism we share by faith in the death, burial, and resurrection of Jesus. Thus we contact the blood in baptism and are forgiven of our sins and **saved**!

### Colossians 2:11–12

- What activates the power of God at baptism? **It is our faith!**
- We are saved by faith at the moment of baptism — not by the water itself. The water is not magic.
- Reading from verse 9 gives the context: in Christ all the fullness of the Deity lives in bodily form.
- Paul compares baptism to **circumcision done by Christ**: in baptism, Christ cuts away our sinful nature and forgives our sins (verse 13).

### Matthew 15:6–9

- False doctrines often arise from **religious tradition**.
- **Infant baptism** is refuted by Ezekiel 18:20 and 28:15. It began around the second century AD and became church doctrine in 549 AD.
  - It rests on the belief that we inherit Adam's sin, but the child will not share the guilt of the parent. Each of us is responsible for our own sin.
  - A baby cannot be made a disciple, because they cannot understand the decision.
- **Praying Jesus into your heart** is a misinterpretation of Revelation 3:20. That passage was addressed to baptized disciples, and the practice originated in early-1800s America.
  - Jesus was writing to the church in **Laodicea**, who claimed to be his disciples while he was not among them.
  - The “knocking” is the warning itself, calling the church to repent. Like the farmer in the parable of the sower, who stood for Jesus as he told it, the messenger who brings the warning is how Jesus knocks.

### 1 Peter 3:18–22

- What does the water represent in this passage? **Noah's flood.**
- In the same way the flood washed away the sinful people in Noah's time, baptism cleanses us of sin through Christ!
- Baptism “now saves you” — this confirms again that baptism is not merely symbolic, but the moment our sins are forgiven.
- “Not the removal of dirt from the body”: we physically go into the water, but the water itself does not save us. It is the pledge of a clear conscience toward God.
- **Review your timeline:** does it align with the biblical process of salvation? If not, now is the time to repent and be baptized!

> **Challenge:** Respond urgently: be baptized for the forgiveness of your sins so you can be united with Jesus!

## Memory scriptures (NIV)

- **Matthew 28:18–20:** Then Jesus came to them and said, “All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AMatthew+28%3A18%E2%80%9320))
- **Luke 19:10:** “For the Son of Man came to seek and to save the lost.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3ALuke+19%3A10))

## Books of the Bible: Genesis through Revelation

Memorize all **66 books of the Bible in order**: the 39 books of the Old Testament and the 27 books of the New Testament.

### Old Testament: Genesis through Malachi

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

### New Testament: Matthew through Revelation

1. Matthew
2. Mark
3. Luke
4. John
5. Acts
6. Romans
7. 1 Corinthians
8. 2 Corinthians
9. Galatians
10. Ephesians
11. Philippians
12. Colossians
13. 1 Thessalonians
14. 2 Thessalonians
15. 1 Timothy
16. 2 Timothy
17. Titus
18. Philemon
19. Hebrews
20. James
21. 1 Peter
22. 2 Peter
23. 1 John
24. 2 John
25. 3 John
26. Jude
27. Revelation
`,
    createdAt: "2026-10-16T10:00:00Z",
    updatedAt: "2026-10-17T10:00:00Z",
  },
  {
    id: "the-cross-notes",
    courseId: "8",
    title: "The Cross",
    content: `# The Cross

> **Purpose:** To hate sin and love God because we appreciate Jesus' sacrifice. Adapted from the supplied *The Cross* study notes.

- How would you define sacrifice? Who would you die for?
- The Cross is the **foundation of Christianity**.
- Sin hurts both God and us.
- Jesus was fully God and fully human. He experienced the same feelings and emotions we do.

## The Passion of the Christ — Part One

### Matthew 26:31–35

- Jesus predicted that **all His disciples would fall away**.
- What would make you stop following Jesus?

### Matthew 26:36–46

- Jesus didn't want to die. **He chose to die.** It was an emotional struggle.
- **Prayer** enabled Jesus to bear the Cross.
- Jesus had three of His close friends with Him (Peter, James, and John), and they fell asleep while He anguished! How would you feel?

### Matthew 26:47–56

- Jesus' disciples deserted Him despite three years of pouring His life into them.
- Jesus stops Peter from defending Him. He could have called **twelve legions** of angels to save Him, but He did not. One legion was about 5,000 Roman soldiers, so twelve legions would be about **60,000 angels**!

### Matthew 26:57–68

- Jesus is arrested and taken before the religious officials, where He boldly spoke the truth.
- Peter follows Jesus **at a distance**. How does this relate to you?
- Jesus was talking about raising Himself from the dead, not tearing down a real temple (John 2:18–21).

## Three responses to the Cross

### Peter — Matthew 26:69–75

- Peter disowns Jesus, just as Jesus had prophesied.
- **The sin of cowardice:** he was afraid of a servant girl.
- He was broken at a “heart level” and wept bitterly, showing **godly sorrow**.
- He became the first leader of the first-century church in Acts after being given the “keys of the kingdom” by Jesus (Matthew 16:18–19).

### Judas — Matthew 27:1–10

- Jesus is handed over to Pilate, the Roman governor.
- **The sin of betrayal:** Judas finally realized his error.
- Judas gives in to his **worldly sorrow** and takes his life.

### Pilate — Matthew 27:11–26

- **The sin of indecision (omission):** Pilate's indecision was a decision. He cared more about people's opinions than God's opinions. He was man-focused, not God-focused.
- **We are all Barabbas** and deserve to be crucified for our sins.

## The Passion of the Christ — Part Two

### Matthew 27:27–44

- Summarize the events leading up to the crucifixion.
- Why do you think Jesus refused the **gall** (a painkiller) while on the Cross? How do you personally respond to hurt, pain, or suffering?

### Matthew 27:45–56

- Jesus was crucified at **9 AM** (Mark 15:25) and remained on the Cross for **six hours**. After three hours, darkness came over the whole land.
- At this moment, Jesus took upon Himself the sins of the entire world.
- Do you think God abandoned Jesus at this point? (Isaiah 59:1–2) **Yes — sin separates us from God.** For the first time in eternity, Jesus felt that separation.

### 2 Corinthians 5:21

- Jesus became sin on the Cross for us, even though we might never repent.
- His goal was that we might become **the righteousness of God**.

### Matthew 27:57–61

- Jesus was buried in a rich man's tomb, fulfilling the prophecy in **Isaiah 53:9**.

## The Passion of the Christ — Part Three

### Matthew 27:62–66

- Everyone knew exactly where Jesus was buried — refuting later claims that people went to the “wrong tomb.”
- Roman soldiers secured the tomb to prevent any attempt to steal Jesus' body.

### Matthew 28:1–10

- **Jesus is risen!**
- He appears to His disciples and encourages them.

## Our responsibility

### Isaiah 53:4–6

- Substitute your name into this passage. Our sins made us responsible for Jesus' death on the Cross.
- Do you truly hate your sin because of how it hurt Him? (Proverbs 13:5)

### 1 Peter 2:21–24

- Jesus suffered for each of us individually.
- We must **die to sin and live for righteousness**.
- What is the hardest sin you need to surrender?

> **Challenge:** Die to sin and live for righteousness out of gratitude for the Cross. Are you more like Peter, Judas, or Pilate? Which response will you choose? Take time for confession and develop a plan for repentance. Read Appendix B, the medical account of Jesus' crucifixion, or watch the Cross video.

## Appendix B: The medical account of the crucifixion

Key points from *A Physician Analyzes the Crucifixion* by Dr. C. Truman Davis:

- **Origins:** crucifixion was first practiced by the Persians; the Romans learned it from the Carthaginians.
- **The cross:** the upright post (*stipes*) usually stayed fixed at the execution site. The condemned man carried the cross-arm (*patibulum*), which weighed about **110 pounds**. The most common form was the T-shaped **Tau cross**.
- **Gethsemane:** Jesus' physical suffering began here. Luke, a physician, is the only Gospel writer to mention the bloody sweat, called **hematidrosis**: under great emotional stress, tiny capillaries in the sweat glands break and mix blood with sweat.
- **Before Caiaphas:** the first physical trauma. Jesus was struck, blindfolded, mocked, and spat on.
- **Pilate** tried to pass responsibility to Herod Antipas, then released Barabbas and condemned Jesus to scourging and crucifixion.
- **The scourging:** the flagrum was a short whip of leather thongs weighted with small lead balls. Jewish law forbade more than forty lashes.
- **The crown of thorns** caused heavy bleeding, since the scalp is one of the most vascular areas of the body.
- **The road to Golgotha:** Jesus fell under the beam, and Simon of Cyrene carried it for the rest of the 650-yard journey from the Fortress Antonia.
- Jesus refused wine mixed with myrrh, a mild painkiller.
- **The nails** went through the **wrists**, not the palms, which would tear under the body's weight. They pressed on the median nerves. The feet were nailed through the arches.
- **Breathing:** hanging by the arms, Jesus could breathe in but had to push up on the nails to breathe out. He spoke His seven short sayings from the cross in these moments.
- **His death:** the legs of crucified men were broken (crucifracture) so that they would suffocate quickly, but Jesus was already dead. The **blood and water** from His side (John 19:34) point to death by heart failure, from shock and fluid compressing the heart, rather than the usual suffocation.

## Memory scriptures (NIV)

- **Hebrews 10:24–25:** “And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AHebrews+10%3A24%E2%80%9325))
- **1 John 1:9:** “If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3A1+John+1%3A9))

## Books of the Bible: Genesis through Revelation

Memorize all **66 books of the Bible in order**: the 39 books of the Old Testament and the 27 books of the New Testament.

### Old Testament: Genesis through Malachi

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

### New Testament: Matthew through Revelation

1. Matthew
2. Mark
3. Luke
4. John
5. Acts
6. Romans
7. 1 Corinthians
8. 2 Corinthians
9. Galatians
10. Ephesians
11. Philippians
12. Colossians
13. 1 Thessalonians
14. 2 Thessalonians
15. 1 Timothy
16. 2 Timothy
17. Titus
18. Philemon
19. Hebrews
20. James
21. 1 Peter
22. 2 Peter
23. 1 John
24. 2 John
25. 3 John
26. Jude
27. Revelation
`,
    createdAt: "2026-10-20T10:00:00Z",
    updatedAt: "2026-10-20T10:00:00Z",
  },
  {
    id: "the-church-notes",
    courseId: "8",
    title: "The Church",
    content: `# The Church

> **Purpose:** To gain a deeper understanding of God's eternal plan for the church — and to expose the false traditions that have led to the creation of religious denominations. Adapted from the supplied *The Church* study notes.

- In the Kingdom study, we see how God foretold the coming of the church throughout the centuries.
- Jesus preached for **40 days** after His resurrection about the coming of the Kingdom of God.

## The body and the family of God

### Colossians 1:15–18

- The church is **the body of Christ**. The body needs the head. **Christ is the head** over the body.
- Could you separate your head from your body? **The church is essential to Christianity!**
- There is **no such thing as solo Christians**. You have to be connected to the body.
- **The diagram:** a figure of a person. The **head** is labeled **Christ**, and the **body** is labeled **the church**.

### Ephesians 2:19–22

- We were once strangers to Christ, but now we are **members of His household**.
- The church is not merely a meeting — it is **a household, a pillar, and the foundation of the truth** (1 Timothy 3:15).
- The church is **the family of God**.
- **The diagram:** **God** is at the top as our **Father**. Each **Christian** is His **son**, and Christians are **brothers** to one another.
- The **cornerstone** of the church is **Christ**, and the **foundation** is made up of the **Apostles and Prophets**. The Apostles represent the **New Testament**, and the Prophets represent the **Old Testament**. Together, they form the biblical foundation of the church.

## What happens at baptism?

- **1 Corinthians 12:12–13:** we are all baptized into **the body of Christ**, which is the church.
- **Romans 6:3–4:** we are also baptized **into Christ Himself**. Baptism is the moment we become Christians — sons and daughters of God — and at the same time, **members of the church**, the family of God.

## One church, not denominations

### 1 Corinthians 1:10–13

- There should be **no divisions** within the church. **Following personalities** — and eventually their writings or traditions — has caused these divisions.
- The word **“denomination”** (from Latin) means **“a group under a name.”** This is unbiblical.
- Explain the Church History graphic below.

### The Church History graphic

**Early in the first century:**

- **Christ's one church** was established (Christ's body/bride — Matthew 16:18).
- Jesus died for His church — **no denominations existed**.
- **Seed = Word** (Luke 8:11).

**The timeline (30 AD to 2000):**

- **Christ's church** begins in 30 AD and runs along the top of the timeline, continuing as a dotted line toward 2000.
- **Apostasy (falling away):** after 300 AD (between the 300 and 600 marks), a line branches off from Christ's church, with **departures in worship, doctrine, and government** (2 Thessalonians 2:1–3; 1 Timothy 4:1–4; Acts 20:28–30).
- **The split (1054 AD):** the apostasy divides into the **Roman Catholic** and **Greek Orthodox** churches.
- **“Reformation”:** denominations rise out of the Roman Catholic church — Lutheran (1530), Presbyterian (1536), Episcopal (1609), Methodist (1739, branching off from the Episcopal), Baptist (1644), and Pentecostal (1900).
- **“Restoration”:** above the Reformation, an arrow points back up to Christ's church — **replanting the seed/word**.

### Ephesians 4:4–6

- The Bible teaches that there is **only one body** of Christ (Romans 12:4–5; 1 Corinthians 12:12–13).
- God sees one church — all baptized disciples around the world who are committed to obeying His Word. This is called the **“church universal”** — the one true church.
- A local congregation is called the **“visible church.”** In the first century, all the “visible churches” made up the “church universal.”
- However, because many visible churches today have **departed from true doctrine** — and because not all sold-out baptized disciples are in the same fellowship — we should strive to be part of a local congregation where everyone is committed to living by God's Word.
- The Greek word for “church” is **ekklesia**, which means **“assembly”** or **“called out.”** (*Ek* means “out,” and *kaleo* means “to call.”)
- To be a disciple is to be called out from the world. Therefore, the church in the Bible was **the assembly of the called out**.

## Five church-building convictions

1. The dream to **evangelize all nations in this generation** (Acts 13:47)
2. **Discipling is a command from God** — not optional (Matthew 28:18–20)
3. A **central leadership under a central leader** (Numbers 27:12–18; 1 Corinthians 4:15–17)
4. A **Bible church** — not just a New Testament church (2 Timothy 3:14–17)
5. Speak where the Bible is SILENT, and be silent where the Bible speaks (Genesis 2:19)

## Life in the body

### 1 Corinthians 12:14–27

- We need the body of Christ **active in our lives**.
- **Every part of the body needs one another.**
- Be **relationally involved** in the life of the church.

### Hebrews 10:23–25

- We must **not give up meeting together** by missing church gatherings. Would you choose to live in a place without a church of sold-out disciples?
- The fellowship helps us **remain unswerving** in our commitment.
- Another purpose of fellowship is to **encourage one another** to remain faithful.
- We must **prioritize all meetings of the body** (e.g., Sunday and midweek services, Bible Talks, devotionals, discipling times, Global Conferences, etc.).

### 1 Corinthians 7:39

- Marriage must be **“in the Lord”** (NIV: “he must belong to the Lord”).
- Dating, like marriage, is a partnership where you are **“yoked together”** (2 Corinthians 6:14–18).
- **Disciples should date and marry only other disciples.**

## The Grace of Giving (Contribution)

### 1 Corinthians 16:1–2

- Our **weekly contribution** should be a thoughtful, deliberate spiritual decision.
- This is **a command of God**.

### 2 Corinthians 9:6–8

- Giving should come from a **cheerful and generous heart**.
- Our **mission contribution** serves to fulfill Jesus' dream of **world evangelism**.
- This is collected **once or twice a year** to support world evangelism.

## Memory scriptures (NIV)

- **Hebrews 12:15:** “See to it that no one falls short of the grace of God and that no bitter root grows up to cause trouble and defile many.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AHebrews+12%3A15))
- **Hebrews 13:17:** “Have confidence in your leaders and submit to their authority, because they keep watch over you as those who must give an account. Do this so that their work will be a joy, not a burden, for that would be of no benefit to you.” ([NIV text](https://www.biblica.com/bible/?osis=niv%3AHebrews+13%3A17))

## Books of the Bible: Genesis through Revelation

Memorize all **66 books of the Bible in order**: the 39 books of the Old Testament and the 27 books of the New Testament.

### Old Testament: Genesis through Malachi

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

### New Testament: Matthew through Revelation

1. Matthew
2. Mark
3. Luke
4. John
5. Acts
6. Romans
7. 1 Corinthians
8. 2 Corinthians
9. Galatians
10. Ephesians
11. Philippians
12. Colossians
13. 1 Thessalonians
14. 2 Thessalonians
15. 1 Timothy
16. 2 Timothy
17. Titus
18. Philemon
19. Hebrews
20. James
21. 1 Peter
22. 2 Peter
23. 1 John
24. 2 John
25. 3 John
26. Jude
27. Revelation
`,
    createdAt: "2026-10-24T10:00:00Z",
    updatedAt: "2026-10-24T10:00:00Z",
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

const sinAndRepentanceStudyQuiz: Assessment = {
  id: "sin-and-repentance-study-quiz",
  courseId: "8",
  title: "Sin and Repentance Study Quiz",
  description:
    "Review the Sin and Repentance study, recite John 15:8 and Matthew 22:37–39 (NIV), and put Genesis through Revelation in order.",
  type: "quiz",
  timeLimit: 55,
  createdAt: "2026-10-13T10:00:00Z",
  questions: [
    {
      id: "sr-purpose",
      type: "multiple-choice",
      question: "What is the purpose of the Sin and Repentance study?",
      points: 1,
      options: [
        "To rank sins from the least serious to the most serious",
        "To show that good deeds can make up for our sins",
        "To display our love of God by understanding why we need to hate sin and repent of it",
        "To learn how the early church practised confession",
      ],
      correctAnswer: 2,
      explanation:
        "The study's stated purpose is to display our love of God by understanding why we need to hate sin and repent of it.",
    },
    {
      id: "sr-q1",
      type: "multiple-choice",
      question: "“Sin” is an archery term. What does it mean?",
      points: 1,
      options: ["To miss the mark", "To break a promise", "To lose your way", "To cross a line"],
      correctAnswer: 0,
      explanation: "Sin means to miss the mark. Jesus' standard is the bullseye.",
    },
    {
      id: "sr-q2",
      type: "multiple-choice",
      question: "According to Isaiah 59:1–2, why does God not hear?",
      points: 1,
      options: [
        "His arm is too short to save",
        "His ear is too dull to hear",
        "Our sins have separated us from him",
        "He has stopped caring about people",
      ],
      correctAnswer: 2,
      explanation:
        "God's power is not the problem; our sins separate us from him. Like curtains drawn over a sunny window, sin shuts out his light without weakening it.",
    },
    {
      id: "sr-q3",
      type: "multiple-choice",
      question: "Many people judge whether they are good by comparing themselves with others. According to the study, what is the standard?",
      points: 1,
      options: [
        "The worst people in history",
        "Our own conscience",
        "The laws of our country",
        "Jesus",
      ],
      correctAnswer: 3,
      explanation:
        "We tend to compare ourselves with the worst people in history, or assume God ranks sins the way courts rank crimes. Jesus is the bullseye, and we all fall short of him.",
    },
    {
      id: "sr-q4",
      type: "multiple-choice",
      question:
        "Romans 3:23 says all have sinned and fall short of the glory of God. Which person is further from God: a person who sins a little or a lot?",
      points: 1,
      options: [
        "The person who sins a lot",
        "Neither; both fall short of the glory of God",
        "It depends on how much their sin hurts others",
        "It depends on how often they go to church",
      ],
      correctAnswer: 1,
      explanation:
        "Sin is sin. If a hole is 100 km wide, someone who jumps 10 km and someone who jumps 99.9 km both fall in. A good moral life doesn't save us, because salvation cannot be earned through our deeds; we need Jesus to bridge the gap.",
    },
    {
      id: "sr-q5",
      type: "matching",
      question: "Galatians 5:19–20: drag each sin onto its definition.",
      points: 5,
      matchPrompts: [
        "Worshipping anything other than God (career, school, pleasure, sports).",
        "To commit sexual intercourse or any sexual sin outside of marriage.",
        "Being hostile. Animosity towards others.",
        "Lack of self-control which involves one's behaviour (overindulgence; food, sleep, etc.)",
        "Uncleanness or filth in a natural or physical sense; moral uncleanness, lewdness, any unnatural pollution, whether acted out by oneself (masturbation), or with another (petting, oral sex).",
      ],
      options: ["Idolatry", "Sexual immorality", "Hatred", "Debauchery", "Impurity"],
      correctMatches: [0, 1, 2, 3, 4],
      explanation:
        "These are the Appendix A definitions. The Greek words are porneía (sexual immorality), akatharsía (impurity), asélgeia (debauchery), eidololatreía (idolatry), and échthra (hatred).",
    },
    {
      id: "sr-q6",
      type: "spelling",
      question: "What is the Greek word for “witchcraft” in Galatians 5:20, which also refers to drugs?",
      points: 1,
      correctAnswers: ["pharmakeia", "pharmakeía", "pharmakia"],
    },
    {
      id: "sr-q7",
      type: "matching",
      question: "Galatians 5:20–21: drag each sin onto its definition.",
      points: 5,
      matchPrompts: [
        "Grief and desire because you do not have what someone else has.",
        "Creating a separation between people because of a different opinion.",
        "Pain and bitterness felt at the sight of another's excellence or happiness.",
        "Rivalry or a lack of harmony between people.",
        "Living without restraint. Partying.",
      ],
      options: ["Jealousy", "Factions", "Envy", "Discord", "Orgies"],
      correctMatches: [0, 1, 2, 3, 4],
      explanation:
        "These are the Appendix A definitions. The Greek words are éris (discord), zelos (jealousy), haíresis (factions), phthónos (envy), and komos (orgies).",
    },
    {
      id: "sr-q8",
      type: "multiple-choice",
      question: "According to the study, when does anger become sin?",
      points: 1,
      options: [
        "Whenever we feel angry, even for a moment",
        "Only when someone is physically hurt",
        "When it becomes intense displeasure, wrath, and rage",
        "Never, as long as we have a good reason",
      ],
      correctAnswer: 2,
      explanation:
        "Anger itself is not sin: “In your anger do not sin” (Ephesians 4:26). The sin is fits of rage (thumós): a state of intense displeasure, anger, wrath, rage, indignation.",
    },
    {
      id: "sr-q9",
      type: "multiple-choice",
      question:
        "Galatians 5:21 warns that “those who live like this will not inherit the kingdom of God.” Who is Paul describing?",
      points: 1,
      options: [
        "Anyone who has ever had a sinful thought",
        "Someone who knows their sin and keeps living in it",
        "Someone who has never been to church",
        "Anyone whose sin has been found out",
      ],
      correctAnswer: 1,
      explanation:
        "Paul means a person who knows their sin and continues in it, even if they come to church. The list ends with “and the like”: lying, cheating, murder, and theft also miss the mark.",
    },
    {
      id: "sr-q10",
      type: "multi-select",
      question: "Pick the four sins of the heart listed in 2 Timothy 3:2–5.",
      points: 4,
      options: [
        "Lovers of money",
        "Witchcraft",
        "Ungrateful",
        "Orgies",
        "Unforgiving",
        "Factions",
        "Conceited",
        "Sexual immorality",
      ],
      correctOptions: [0, 2, 4, 6],
      explanation:
        "Galatians 5 lists obvious acts of the sinful nature. 2 Timothy 3 lists sins of the heart, some blatant and others more deceitful: lovers of themselves, lovers of money, boastful, proud, abusive, disobedient to their parents, ungrateful, unholy, without love, unforgiving, slanderous, without self-control, brutal, not lovers of the good, treacherous, rash, conceited, and lovers of pleasure rather than lovers of God.",
    },
    {
      id: "sr-q11",
      type: "multiple-choice",
      question: "What does “having a form of godliness but denying its power” (2 Timothy 3:5) describe?",
      points: 1,
      options: [
        "Being too shy to talk about God",
        "Reading the Bible without understanding it",
        "Praying only in private",
        "Looking godly on the outside while living in sin",
      ],
      correctAnswer: 3,
      explanation:
        "Like a worship leader who spent the night before at a club, it is looking godly while living in sin. Paul says to have nothing to do with such people, which begins with separating ourselves from these sins.",
    },
    {
      id: "sr-q12",
      type: "multiple-choice",
      question: "According to James 4:17, what is it when someone knows the good they ought to do and doesn't do it?",
      points: 1,
      options: [
        "A mistake, but not a sin",
        "The sin of commission",
        "The sin of omission",
        "Only a sin for church leaders",
      ],
      correctAnswer: 2,
      explanation:
        "Knowing what is right and not doing it is the sin of omission. With knowledge of God's Word comes the responsibility to obey it.",
    },
    {
      id: "sr-q13",
      type: "multiple-choice",
      question: "According to James 5:16, what should we do so that we may be healed?",
      points: 1,
      options: [
        "Confess our sins only to a priest",
        "Keep our sins between ourselves and God",
        "Wait until our sins are found out",
        "Confess our sins to each other and pray for each other",
      ],
      correctAnswer: 3,
      explanation:
        "We are called to confess our sins to one another and pray for each other. Getting open brings sin into the light, and prayer is powerful and effective.",
    },
    {
      id: "sr-q14",
      type: "multiple-choice",
      question: "In Romans 6:23, what is the difference between the wages of sin and the gift of God?",
      points: 1,
      options: [
        "Death is what our sin has earned; eternal life is a free gift we cannot earn",
        "Death is a gamble we take each time we sin; eternal life is the prize",
        "Death comes only to the worst sinners; eternal life comes to everyone else",
        "Both death and eternal life are earned by our deeds",
      ],
      correctAnswer: 0,
      explanation:
        "A wage is earned and owed, not a wager or bet. Our sin earns death, eternal separation from God. The gift of God is unearned and free: eternal life in Christ Jesus our Lord.",
    },
    {
      id: "sr-q15",
      type: "multiple-choice",
      question: "According to the study, what is the difference between worldly sorrow and godly sorrow?",
      points: 1,
      options: [
        "Worldly sorrow lasts longer than godly sorrow",
        "Worldly sorrow is self-centred; godly sorrow is centred on God",
        "Godly sorrow is embarrassment at being found out",
        "There is no real difference between them",
      ],
      correctAnswer: 1,
      explanation:
        "Worldly sorrow is self-centred, such as shame at being found out, and brings death. Godly sorrow is centred on God and brings repentance that leads to salvation and leaves no regret (2 Corinthians 7:10).",
    },
    {
      id: "sr-q16",
      type: "multi-select",
      question: "According to 2 Corinthians 7:11, pick the four things godly sorrow produces.",
      points: 4,
      options: [
        "Earnestness",
        "Embarrassment at being found out",
        "Eagerness to clear yourselves",
        "Blaming others",
        "Alarm",
        "Making excuses",
        "Readiness to see justice done",
        "Negotiating over what counts as sin",
      ],
      correctOptions: [0, 2, 4, 6],
      explanation:
        "Godly sorrow produces earnestness, eagerness to clear yourselves, indignation, alarm, longing, concern, and readiness to see justice done. Negotiating, excuses, and blame-shifting are signs of worldly sorrow.",
    },
    {
      id: "sr-q17",
      type: "spelling",
      question: "What is the Greek word for “repentance”?",
      points: 1,
      correctAnswers: ["metanoia"],
    },
    {
      id: "sr-q18",
      type: "multiple-choice",
      question: "In the Greek, what does the word for “repentance” mean?",
      points: 1,
      options: ["A feeling of regret", "A sorrowful heart", "A change of mind", "A promise to try harder"],
      correctAnswer: 2,
      explanation:
        "Repentance (metanoia) is a change of mind: we no longer see sin as something we want, but as something to flee. A change of mind should lead to a change in actions.",
    },
    {
      id: "sr-q19",
      type: "multiple-choice",
      question:
        "In Luke 13:1–5, what does Jesus say about the Galileans Pilate killed and the eighteen who died when the tower in Siloam fell?",
      points: 1,
      options: [
        "They were worse sinners than everyone else",
        "They were no worse sinners; unless we repent, we too will perish",
        "They were punished for their parents' sins",
        "Only the people of Jerusalem needed to repent",
      ],
      correctAnswer: 1,
      explanation:
        "First-century Jews believed disasters were punishment for personal sins. Jesus rejected this: we are all sinners, and unless we repent, we face eternal condemnation, not just physical death.",
    },
    {
      id: "sr-q20",
      type: "multiple-choice",
      question: "What does Colossians 3:5 tell us to do with whatever belongs to our earthly nature?",
      points: 1,
      options: ["Manage it carefully", "Hide it from others", "Put it to death", "Confess it once a year"],
      correctAnswer: 2,
      explanation:
        "Put it to death, so it is no longer active in our lives. The wrath of God is coming, so break free from sin's slavery!",
    },
    {
      id: "sr-q21",
      type: "multiple-choice",
      question:
        "In Matthew 5:29–30, why does Jesus say to gouge out your eye or cut off your hand if it causes you to sin?",
      points: 1,
      options: [
        "To show how radical we must be in removing what causes us to sin",
        "To command us to harm our bodies",
        "To teach that only outward actions count as sin",
        "To show that some sins are too small to worry about",
      ],
      correctAnswer: 0,
      explanation:
        "Jesus was not calling for bodily harm. He wants us to hate sin enough to be radical in removing the things that cause us to sin.",
    },
    {
      id: "sr-q22",
      type: "multiple-choice",
      question: "According to the study, what is the goal of repentance?",
      points: 1,
      options: [
        "Changing outward behaviour so that others approve",
        "Feeling sorry enough about our sins",
        "A changed heart that overflows into new attitudes and actions",
        "Avoiding the consequences of being found out",
      ],
      correctAnswer: 2,
      explanation:
        "Repentance is not just external behaviour modification. The goal is a heart transformation that overflows into new attitudes and actions.",
    },
    {
      id: "sr-q23",
      type: "multiple-choice",
      question: "According to Acts 26:20, how do we prove our repentance?",
      points: 1,
      options: ["By our feelings", "By our deeds", "By our words", "By our church attendance"],
      correctAnswer: 1,
      explanation:
        "Paul preached that people should repent, turn to God, and prove their repentance by their deeds. Repentance needs a plan and real action, not just a feeling.",
    },
    {
      id: "sr-q24",
      type: "multiple-choice",
      question: "What is the challenge at the end of the study?",
      points: 1,
      options: [
        "Repent only of the sins other people have noticed",
        "Share your written sin list with the whole church",
        "Wait until you feel ready before changing anything",
        "Have a clear plan of repentance for sins of commission and omission",
      ],
      correctAnswer: 3,
      explanation:
        "The challenge is a clear plan of repentance addressing sins of commission and omission. A personal sin list can help you confess and come into the light, but it stays highly confidential between those studying the Bible.",
    },
    {
      id: "sr-q25",
      type: "memory-verse",
      question: "Write John 15:8 from memory (NIV).",
      points: 3,
      correctText: "This is to my Father's glory, that you bear much fruit, showing yourselves to be my disciples.",
    },
    {
      id: "sr-q26",
      type: "memory-verse",
      question: "Write Matthew 22:37–39 from memory (NIV).",
      points: 3,
      correctText:
        "Jesus replied: “‘Love the Lord your God with all your heart and with all your soul and with all your mind.’ This is the first and greatest commandment. And the second is like it: ‘Love your neighbor as yourself.’”",
    },
    {
      id: "sr-q27",
      type: "ordered-list",
      question: "Write the 39 books of the Old Testament, Genesis through Malachi, in order.",
      points: 39,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
        "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
    {
      id: "sr-q28",
      type: "ordered-list",
      question: "Write the 27 books of the New Testament, Matthew through Revelation, in order.",
      points: 27,
      correctAnswers: [
        "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
        "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
        "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
        "Revelation",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
  ],
}

const lightAndDarknessStudyQuiz: Assessment = {
  id: "light-and-darkness-study-quiz",
  courseId: "8",
  title: "Light and Darkness Study Quiz",
  description:
    "Review the Light and Darkness study, recite Matthew 28:18–20 and Luke 19:10 (NIV), and put Genesis through Revelation in order.",
  type: "quiz",
  timeLimit: 50,
  createdAt: "2026-10-16T10:00:00Z",
  questions: [
    {
      id: "ld-purpose",
      type: "multiple-choice",
      question: "What is the purpose of the Light and Darkness study?",
      points: 1,
      options: [
        "To make the Bible your standard for life",
        "To understand how to be saved",
        "To discover when the kingdom of God came",
        "To understand why we need to hate sin",
      ],
      correctAnswer: 1,
      explanation: "The study's stated purpose is to understand how to be saved.",
    },
    {
      id: "ld-q1",
      type: "multiple-choice",
      question: "According to the study, where does every person stand with God?",
      points: 1,
      options: [
        "Somewhere between darkness and light",
        "In the light, as long as they are a good person",
        "Either in the darkness or the light; there is no twilight zone",
        "In the light once they attend church regularly",
      ],
      correctAnswer: 2,
      explanation:
        "Every person is either in the darkness or the light (1 Peter 2:9–10). There is no twilight zone.",
    },
    {
      id: "ld-q2",
      type: "multiple-choice",
      question: "On the light side of the 1 Peter 2:9–10 diagram, a person who is saved is also…",
      points: 1,
      options: [
        "A Christian, but not necessarily a disciple",
        "Religious, but not yet a Christian",
        "A disciple only after years of growth",
        "A Christian and a disciple",
      ],
      correctAnswer: 3,
      explanation:
        "The light side reads people of God, mercy, saved, Christian, disciple. The darkness side reads not a people of God, no mercy, lost, not a Christian, not a disciple.",
    },
    {
      id: "ld-q24",
      type: "multiple-choice",
      question: "Some people feel saved after a good week and lost after a bad one. What does 1 Peter 2:9–10 show instead?",
      points: 1,
      options: [
        "Salvation comes and goes with our feelings",
        "There is a point in time when a person goes from darkness into light",
        "We are saved once our good deeds outweigh our bad ones",
        "Everyone starts in the light until they sin",
      ],
      correctAnswer: 1,
      explanation:
        "God called them out of darkness into his wonderful light: once they were not a people, but now they are the people of God. Salvation is not a fleeting feeling.",
    },
    {
      id: "ld-q3",
      type: "spelling",
      question: "Who came to Jesus at night in John 3 and was told he must be born again?",
      points: 1,
      correctAnswers: ["Nicodemus"],
    },
    {
      id: "ld-q4",
      type: "multiple-choice",
      question: "According to the study, being born again of water and the Spirit (John 3:1–7) is…",
      points: 1,
      options: [
        "A decision parents make for their baby",
        "A personal decision we make as adults",
        "Something that happens without our decision",
        "A feeling that comes over us at church",
      ],
      correctAnswer: 1,
      explanation:
        "We must be born again of water and the Spirit, and this is a personal decision as an adult. Nicodemus could not understand how a grown man could be born again: it takes a mature decision.",
    },
    {
      id: "ld-q5",
      type: "multi-select",
      question: "Pick the three things the study says one must believe to be saved (Acts 2:22–24).",
      points: 3,
      options: [
        "Jesus is from God",
        "Jesus was only a great teacher",
        "Jesus was physically raised from the dead",
        "Jesus rose only in spirit",
        "Everyone is responsible for the crucifixion, because all have sinned",
        "Only the Romans were responsible for the crucifixion",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "Jesus is from God (verse 22), he was physically raised from the dead (verse 24), and everyone is responsible for his crucifixion (verse 23), because all have sinned.",
    },
    {
      id: "ld-q6",
      type: "multiple-choice",
      question: "In Acts 2:37 the people were “cut to the heart.” What does that mean?",
      points: 1,
      options: ["Anger at being accused", "Deep emotional sorrow", "Fear of the Romans", "Confusion about the message"],
      correctAnswer: 1,
      explanation: "To be cut to the heart is to feel deep emotional sorrow.",
    },
    {
      id: "ld-q7",
      type: "multiple-choice",
      question: "Why were the people cut to the heart in Acts 2:37?",
      points: 1,
      options: [
        "They were embarrassed in front of the crowd",
        "They disagreed with Peter's message",
        "They recognized their responsibility for the death of Jesus",
        "They were afraid of being punished",
      ],
      correctAnswer: 2,
      explanation:
        "They recognized their responsibility for Jesus' death. Their response, “What should we do?”, reflected godly sorrow.",
    },
    {
      id: "ld-q25",
      type: "multiple-choice",
      question: "In Acts 2:36, Peter says God made Jesus both Lord and Christ. What do the two titles mean?",
      points: 1,
      options: [
        "Lord means teacher; Christ is Jesus' family name",
        "Lord means Messiah; Christ means master",
        "Lord means master; Christ means the Messiah who saves us",
        "Both titles simply mean king",
      ],
      correctAnswer: 2,
      explanation:
        "Christ is the Messiah who saves us, since we cannot save ourselves. Lord is our master. We cannot have one without the other.",
    },
    {
      id: "ld-q26",
      type: "multiple-choice",
      question: "According to the class, who wants Jesus as master but not as savior?",
      points: 1,
      options: [
        "Someone who only calls on Jesus when facing death",
        "Someone trying to earn their salvation by working hard for God",
        "Someone who has never heard of Jesus",
        "Someone who confesses their sins openly",
      ],
      correctAnswer: 1,
      explanation:
        "Like the older son in the parable of the prodigal son, they serve as slaves hoping to earn what can only be given. Jesus calls us friends, not servants (John 15:15). Calling on Jesus only when facing death is the opposite: wanting a savior without a master.",
    },
    {
      id: "ld-q8",
      type: "multiple-choice",
      question: "Once the people believed, what did Peter tell them to do (Acts 2:38)?",
      points: 1,
      options: [
        "Pray and wait for a sign",
        "Fast and give to the poor",
        "Believe, and nothing more",
        "Repent and be baptized",
      ],
      correctAnswer: 3,
      explanation: "Peter told them to repent (turn to God) and be baptized (be immersed in water).",
    },
    {
      id: "ld-q9",
      type: "multiple-choice",
      question: "According to the study, what does it mean to be baptized?",
      points: 1,
      options: [
        "To be sprinkled with water",
        "To be immersed in water",
        "To have water poured over your head",
        "To pray a prayer of commitment",
      ],
      correctAnswer: 1,
      explanation: "To be baptized is to be immersed in water.",
    },
    {
      id: "ld-q10",
      type: "multiple-choice",
      question:
        "The timeline asks when you were saved, received the Holy Spirit, and received forgiveness of sin. According to Acts 2:38, when do all three happen?",
      points: 1,
      options: [
        "When we first pray to accept Jesus",
        "At baptism",
        "When we first feel sorry for our sins",
        "At different times in our lives",
      ],
      correctAnswer: 1,
      explanation:
        "At baptism our sins are forgiven and we receive the Holy Spirit. This is the point in time when a person is saved.",
    },
    {
      id: "ld-q11",
      type: "matching",
      question: "Acts 2: drag each part of the people's response into the order it happened.",
      points: 5,
      matchPrompts: ["First", "Second", "Third", "Fourth", "Fifth"],
      options: [
        "Heard the message about Jesus",
        "Were cut to the heart",
        "Repented",
        "Were baptized",
        "Received forgiveness and the Holy Spirit",
      ],
      correctMatches: [0, 1, 2, 3, 4],
      explanation:
        "They heard Peter's message (verses 22–36), were cut to the heart (verse 37), repented and were baptized, and received forgiveness of their sins and the gift of the Holy Spirit (verse 38).",
    },
    {
      id: "ld-q27",
      type: "multiple-choice",
      question: "In Acts 2:40, what did Peter do “with many other words”?",
      points: 1,
      options: [
        "He praised their talents and promised them positions",
        "He left the decision entirely to them",
        "He warned them and pleaded with them",
        "He argued with them until they gave in",
      ],
      correctAnswer: 2,
      explanation:
        "He warned them and pleaded with them: “Save yourselves from this corrupt generation.” Peter was convinced they were lost unless they repented and were baptized. Pleading appeals to the person; warning tells them the truth.",
    },
    {
      id: "ld-q12",
      type: "multiple-choice",
      question: "According to the study, what is baptism (Romans 6:1–8)?",
      points: 1,
      options: [
        "A symbol of a salvation that already happened",
        "A public announcement of faith",
        "Participation in the death, burial, and resurrection of Christ",
        "A ceremony for joining a church",
      ],
      correctAnswer: 2,
      explanation:
        "Baptism is more than just a symbol: it is the point in time when we are freed from sin and united with Christ. The wall of sin is broken down, and we are forgiven.",
    },
    {
      id: "ld-q13",
      type: "multiple-choice",
      question: "In the Romans 6 diagram, what happens to our old life in baptism?",
      points: 1,
      options: [
        "It dies with Christ, is buried with him, and is raised to a new life",
        "It improves a little at a time until we die",
        "It stays the same, but God overlooks it",
        "It ends only when we die physically",
      ],
      correctAnswer: 0,
      explanation:
        "Jesus died, was buried, and was resurrected. In baptism our old life dies with Christ, is buried with Christ, and is raised to a new life.",
    },
    {
      id: "ld-q14",
      type: "multiple-choice",
      question: "According to the study, what do “water” and “Spirit” in John 3:5 refer to?",
      points: 1,
      options: [
        "Water is physical birth; the Spirit is received later",
        "Water is baptism; the Spirit is received at baptism",
        "Water is a symbol; the Spirit is received before baptism",
        "Both describe a feeling of being saved",
      ],
      correctAnswer: 1,
      explanation: "Born again of water and the Spirit: water is baptism, and the Spirit is received at baptism (Acts 2:38).",
    },
    {
      id: "ld-q15",
      type: "multiple-choice",
      question: "Romans 3:25 teaches that faith in the blood of Jesus saves us. According to the study, where do we contact his blood?",
      points: 1,
      options: ["In prayer", "At communion", "In baptism", "At church"],
      correctAnswer: 2,
      explanation:
        "Jesus shed his blood when he died. In baptism we share by faith in his death, burial, and resurrection, so we contact the blood in baptism and are forgiven of our sins.",
    },
    {
      id: "ld-q16",
      type: "multiple-choice",
      question: "According to Colossians 2:11–12, what activates the power of God at baptism?",
      points: 1,
      options: ["The water itself", "Our faith", "The person baptizing us", "The words said over us"],
      correctAnswer: 1,
      explanation: "It is our faith! We are saved by faith at the moment of baptism, not by the water itself.",
    },
    {
      id: "ld-q28",
      type: "multiple-choice",
      question: "In Colossians 2:11–12, what does Paul compare baptism to?",
      points: 1,
      options: [
        "The Passover meal",
        "Circumcision done by Christ, cutting away our sinful nature",
        "Washing before entering the temple",
        "Crossing the Jordan River",
      ],
      correctAnswer: 1,
      explanation:
        "In baptism, Christ cuts away our sinful nature and forgives all our sins (verses 11–13). The water is not magic; it is our faith in the power of God.",
    },
    {
      id: "ld-q17",
      type: "multiple-choice",
      question: "According to the study, where do false doctrines often come from (Matthew 15:6–9)?",
      points: 1,
      options: [
        "Studying the Bible for ourselves",
        "Asking questions about God",
        "Modern Bible translations",
        "Religious tradition",
      ],
      correctAnswer: 3,
      explanation: "False doctrines often arise from religious tradition, which can nullify the word of God.",
    },
    {
      id: "ld-q18",
      type: "multiple-choice",
      question: "Which scripture does the study use to refute infant baptism?",
      points: 1,
      options: ["Romans 3:23", "Matthew 19:14", "Ezekiel 18:20", "John 3:16"],
      correctAnswer: 2,
      explanation:
        "The study refutes infant baptism with Ezekiel 18:20 and 28:15: the child will not share the guilt of the parent, so we do not inherit Adam's sin, and a baby cannot be made a disciple. The study says infant baptism began around the second century AD and became church doctrine in 549 AD.",
    },
    {
      id: "ld-q33",
      type: "multiple-choice",
      question: "Which scripture does the study say is misinterpreted to teach praying Jesus into your heart?",
      points: 1,
      options: ["Matthew 7:7", "Romans 10:9", "John 3:16", "Revelation 3:20"],
      correctAnswer: 3,
      explanation:
        "Praying Jesus into your heart comes from a misinterpretation of Revelation 3:20, which was addressed to baptized disciples in the church in Laodicea.",
    },
    {
      id: "ld-q19",
      type: "multiple-choice",
      question:
        "The study says the passage used to teach praying Jesus into your heart is misinterpreted. Why?",
      points: 1,
      options: [
        "The passage was written to people who had never heard of Jesus",
        "The passage was addressed to baptized disciples",
        "The passage describes the second coming",
        "The passage was written to Old Testament Israel",
      ],
      correctAnswer: 1,
      explanation:
        "Revelation 3:20 was addressed to baptized disciples. The study says the practice originated in early-1800s America.",
    },
    {
      id: "ld-q29",
      type: "spelling",
      question: "The passage used to teach praying Jesus into your heart was written to the church in which city?",
      points: 1,
      correctAnswers: ["Laodicea"],
    },
    {
      id: "ld-q30",
      type: "multiple-choice",
      question:
        "In the passage used to teach praying Jesus into your heart, Jesus stands at the door and knocks. According to the class, what is the knocking?",
      points: 1,
      options: [
        "Jesus knocking at the door of every unbeliever's heart",
        "A sign of Jesus' second coming",
        "An invitation to pray a prayer of salvation",
        "The warning itself, calling the church to repent",
      ],
      correctAnswer: 3,
      explanation:
        "The church claimed to be his disciples, but Jesus was not among them. The letter's warning is Jesus knocking, just as brothers warning an unrepentant brother would be.",
    },
    {
      id: "ld-q20",
      type: "multiple-choice",
      question: "In 1 Peter 3:18–22, what water does Peter compare baptism to?",
      points: 1,
      options: ["The Jordan River", "The Red Sea", "Noah's flood", "The pool of Siloam"],
      correctAnswer: 2,
      explanation:
        "As the flood washed away the sinful people in Noah's time, baptism cleanses us of sin through Christ. Baptism “now saves you”: it is not merely symbolic but the moment our sins are forgiven.",
    },
    {
      id: "ld-q21",
      type: "multiple-choice",
      question: "What is the challenge at the end of the study?",
      points: 1,
      options: [
        "Wait until you feel completely ready",
        "Pray Jesus into your heart",
        "Be baptized as a sign that you are already saved",
        "Respond urgently: be baptized for the forgiveness of your sins",
      ],
      correctAnswer: 3,
      explanation:
        "The challenge is to respond urgently: be baptized for the forgiveness of your sins so you can be united with Jesus.",
    },
    {
      id: "ld-q22",
      type: "memory-verse",
      question: "Write Matthew 28:18–20 from memory (NIV).",
      points: 3,
      correctText:
        "Then Jesus came to them and said, “All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.”",
    },
    {
      id: "ld-q23",
      type: "memory-verse",
      question: "Write Luke 19:10 from memory (NIV).",
      points: 3,
      correctText: "“For the Son of Man came to seek and to save the lost.”",
    },
    {
      id: "ld-q31",
      type: "ordered-list",
      question: "Write the 39 books of the Old Testament, Genesis through Malachi, in order.",
      points: 39,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
        "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
    {
      id: "ld-q32",
      type: "ordered-list",
      question: "Write the 27 books of the New Testament, Matthew through Revelation, in order.",
      points: 27,
      correctAnswers: [
        "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
        "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
        "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
        "Revelation",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
  ],
}

const theCrossStudyQuiz: Assessment = {
  id: "the-cross-study-quiz",
  courseId: "8",
  title: "The Cross Study Quiz",
  description:
    "Review The Cross study, recite Hebrews 10:24–25 and 1 John 1:9 (NIV), and put Genesis through Revelation in order.",
  type: "quiz",
  timeLimit: 50,
  createdAt: "2026-10-20T10:00:00Z",
  questions: [
    {
      id: "cr-purpose",
      type: "multiple-choice",
      question: "What is the purpose of The Cross study?",
      points: 1,
      options: [
        "To understand how to be saved",
        "To hate sin and love God because we appreciate Jesus' sacrifice",
        "To make the Bible your standard for life",
        "To prove historically that Jesus was crucified",
      ],
      correctAnswer: 1,
      explanation:
        "The study's stated purpose is to hate sin and love God because we appreciate Jesus' sacrifice.",
    },
    {
      id: "cr-q1",
      type: "multiple-choice",
      question: "According to the study, what is the foundation of Christianity?",
      points: 1,
      options: [
        "Good works",
        "Church attendance",
        "The Ten Commandments",
        "The Cross",
      ],
      correctAnswer: 3,
      explanation:
        "The Cross is the foundation of Christianity. Sin hurts both God and us.",
    },
    {
      id: "cr-q2",
      type: "multiple-choice",
      question: "The study says Jesus was fully God and fully human. What does that mean for His suffering?",
      points: 1,
      options: [
        "He experienced the same feelings and emotions we do",
        "He felt no pain because He was God",
        "He suffered physically but not emotionally",
        "He only appeared to suffer",
      ],
      correctAnswer: 0,
      explanation:
        "Jesus was fully God and fully human, so He experienced the same feelings and emotions we do.",
    },
    {
      id: "cr-q3",
      type: "multiple-choice",
      question: "What did Jesus predict in Matthew 26:31–35?",
      points: 1,
      options: [
        "Only Judas would leave Him",
        "His disciples would fight to defend Him",
        "All His disciples would fall away",
        "The crowds would make Him king",
      ],
      correctAnswer: 2,
      explanation:
        "Peter insisted he would never fall away, yet that night all the disciples deserted Him and fled (verse 56), despite three years of pouring His life into them.",
    },
    {
      id: "cr-q4",
      type: "multiple-choice",
      question: "What does the study say about Jesus' attitude toward His death in Gethsemane (Matthew 26:36–46)?",
      points: 1,
      options: [
        "He wanted to die and felt no struggle",
        "He tried to escape before the soldiers came",
        "He did not know He was going to die",
        "He didn't want to die, but He chose to die",
      ],
      correctAnswer: 3,
      explanation:
        "It was an emotional struggle. He asked for the cup to be taken from Him, yet prayed, “Yet not as I will, but as you will” (verse 39).",
    },
    {
      id: "cr-q5",
      type: "multiple-choice",
      question: "According to the study, what enabled Jesus to bear the Cross?",
      points: 1,
      options: [
        "The support of His closest friends",
        "Prayer",
        "Anger at His enemies",
        "The approval of the crowds",
      ],
      correctAnswer: 1,
      explanation:
        "Prayer enabled Jesus to bear the Cross, while His three closest friends fell asleep as He anguished.",
    },
    {
      id: "cr-q6",
      type: "multi-select",
      question: "Pick the three close friends Jesus took with Him in Gethsemane, who fell asleep while He prayed.",
      points: 3,
      options: [
        "Peter",
        "Andrew",
        "James",
        "Judas",
        "John",
        "Thomas",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "Matthew 26:37 says He took Peter and the two sons of Zebedee, James and John.",
    },
    {
      id: "cr-q7",
      type: "multiple-choice",
      question: "Jesus said He could call on more than twelve legions of angels (Matthew 26:53). About how many angels is that, according to the study?",
      points: 1,
      options: [
        "Twelve",
        "About 5,000",
        "About 60,000",
        "About 600",
      ],
      correctAnswer: 2,
      explanation:
        "One legion was about 5,000 Roman soldiers, so twelve legions would be about 60,000 angels. Jesus could have been rescued, but He stopped Peter from defending Him.",
    },
    {
      id: "cr-q8",
      type: "multiple-choice",
      question: "When Jesus spoke of destroying the temple and raising it in three days, what was He talking about (John 2:18–21)?",
      points: 1,
      options: [
        "Tearing down the temple in Jerusalem",
        "Raising Himself from the dead",
        "Building a new church building",
        "The fall of the Roman Empire",
      ],
      correctAnswer: 1,
      explanation:
        "At His trial, His words were twisted (Matthew 26:61). The temple He spoke of was His body: He was talking about raising Himself from the dead.",
    },
    {
      id: "cr-q9",
      type: "multiple-choice",
      question: "After Jesus was arrested, how did Peter follow Him (Matthew 26:58)?",
      points: 1,
      options: [
        "At a distance",
        "Right beside Him",
        "He did not follow at all",
        "Disguised as a soldier",
      ],
      correctAnswer: 0,
      explanation:
        "Peter followed at a distance. The study asks: how does this relate to you?",
    },
    {
      id: "cr-q10",
      type: "matching",
      question: "Three responses to the Cross: drag each person onto the sin the study names for them.",
      points: 3,
      matchPrompts: ["The sin of indecision (omission)", "The sin of cowardice", "The sin of betrayal"],
      options: ["Pilate", "Peter", "Judas", "Caiaphas", "Barabbas"],
      correctMatches: [0, 1, 2],
      explanation:
        "Peter's sin was cowardice, Judas's was betrayal, and Pilate's was indecision, a sin of omission. Caiaphas and Barabbas are not among the three responses.",
    },
    {
      id: "cr-q11",
      type: "multiple-choice",
      question: "In Matthew 26:69, who first questioned Peter about being with Jesus?",
      points: 1,
      options: [
        "The high priest",
        "A Roman centurion",
        "A servant girl",
        "Pilate",
      ],
      correctAnswer: 2,
      explanation:
        "Peter was afraid of a servant girl. He disowned Jesus three times, just as Jesus had predicted.",
    },
    {
      id: "cr-q12",
      type: "multiple-choice",
      question: "Peter and Judas both grieved over what they had done. What was the difference?",
      points: 1,
      options: [
        "Judas showed godly sorrow; Peter showed worldly sorrow",
        "Peter wept bitterly with godly sorrow; Judas gave in to worldly sorrow and took his life",
        "There was no difference; both turned back to Jesus",
        "Neither of them felt any sorrow",
      ],
      correctAnswer: 1,
      explanation:
        "Peter was broken at a heart level. Godly sorrow brings repentance; worldly sorrow brings death (2 Corinthians 7:10, from the Sin and Repentance study).",
    },
    {
      id: "cr-q13",
      type: "multiple-choice",
      question: "What did Peter go on to become after he disowned Jesus?",
      points: 1,
      options: [
        "A member of the Jewish ruling council",
        "A Roman official",
        "The first leader of the church in Acts",
        "He never followed Jesus again",
      ],
      correctAnswer: 2,
      explanation:
        "Jesus had given him the “keys of the kingdom” (Matthew 16:18–19), and Peter became the first leader of the first-century church in Acts.",
    },
    {
      id: "cr-q14",
      type: "multiple-choice",
      question: "What does the study say about how Pilate handled Jesus' case (Matthew 27:11–26)?",
      points: 1,
      options: [
        "He stayed out of it, so he carried no blame",
        "He bravely defended Jesus to the crowd",
        "He followed his conscience and set Jesus free",
        "He cared more about people's opinions than God's",
      ],
      correctAnswer: 3,
      explanation:
        "Pilate's indecision was a decision, a sin of omission. He was man-focused, not God-focused.",
    },
    {
      id: "cr-q15",
      type: "multiple-choice",
      question: "The study says, “We are all Barabbas.” What does it mean?",
      points: 1,
      options: [
        "We were all criminals in the eyes of Rome",
        "We all deserve to be crucified for our sins, yet Jesus took our place",
        "We would all have chosen to release Jesus",
        "We all once led a rebellion",
      ],
      correctAnswer: 1,
      explanation:
        "Barabbas was guilty and went free while Jesus was crucified. We all deserve to be crucified for our sins.",
    },
    {
      id: "cr-q16",
      type: "multiple-choice",
      question: "In Matthew 27:34, Jesus tasted wine mixed with gall and refused to drink it. What was the gall?",
      points: 1,
      options: [
        "A poison to end His life quickly",
        "A sign of honor from the soldiers",
        "A painkiller",
        "Medicine to heal His wounds",
      ],
      correctAnswer: 2,
      explanation:
        "Gall was a painkiller. The study asks why you think Jesus refused it, and how you respond to hurt, pain, or suffering.",
    },
    {
      id: "cr-q17",
      type: "spelling",
      question: "Who was forced to carry Jesus' cross (Matthew 27:32)?",
      points: 1,
      correctAnswers: ["Simon of Cyrene", "Simon"],
    },
    {
      id: "cr-q18",
      type: "multiple-choice",
      question: "Jesus was crucified at 9 AM (Mark 15:25). How long was He on the cross, and what happened after three hours?",
      points: 1,
      options: [
        "Three hours; an earthquake shook the city",
        "Twelve hours; the sun shone brightly",
        "Six hours; darkness came over the whole land",
        "Six hours; the soldiers broke His legs",
      ],
      correctAnswer: 2,
      explanation:
        "He hung on the cross from 9 AM until about 3 PM. Darkness came over the land from noon, and at this moment Jesus took upon Himself the sins of the entire world.",
    },
    {
      id: "cr-q19",
      type: "multiple-choice",
      question: "Did God abandon Jesus on the cross (Matthew 27:46; Isaiah 59:1–2)?",
      points: 1,
      options: [
        "No; God never turned away from Him",
        "Only His disciples abandoned Him",
        "Yes; Jesus took on the sins of the world, and sin separates us from God",
        "Jesus only felt abandoned because of the pain",
      ],
      correctAnswer: 2,
      explanation:
        "Sin separates us from God (Isaiah 59:1–2). For the first time in eternity, Jesus felt that separation.",
    },
    {
      id: "cr-q20",
      type: "multiple-choice",
      question: "According to 2 Corinthians 5:21, why did God make Jesus, who had no sin, to be sin for us?",
      points: 1,
      options: [
        "So that we would never need to repent",
        "Because Jesus had sinned as well",
        "So that the law would no longer apply",
        "So that in Him we might become the righteousness of God",
      ],
      correctAnswer: 3,
      explanation:
        "Jesus became sin on the Cross for us, even though we might never repent. His goal was that we might become the righteousness of God.",
    },
    {
      id: "cr-q21",
      type: "multiple-choice",
      question: "Jesus was buried in a rich man's tomb (Matthew 27:57–61). Which prophecy did this fulfill?",
      points: 1,
      options: [
        "Isaiah 53:9",
        "Psalm 22:18",
        "Micah 5:2",
        "Zechariah 9:9",
      ],
      correctAnswer: 0,
      explanation:
        "Isaiah 53:9 says He was assigned a grave “with the rich in his death.” The tomb belonged to Joseph of Arimathea.",
    },
    {
      id: "cr-q22",
      type: "multi-select",
      question: "Pick the two facts from Matthew 27:62–66 that answer later claims against the resurrection.",
      points: 2,
      options: [
        "Everyone knew exactly where Jesus was buried",
        "Jesus was buried in an unmarked grave",
        "The tomb was sealed and guarded so no one could steal the body",
        "The disciples took turns guarding the tomb",
        "The tomb was left open overnight",
        "The body was moved to another tomb on Saturday",
      ],
      correctOptions: [0, 2],
      explanation:
        "Everyone knew where Jesus was buried, refuting claims that people went to the “wrong tomb,” and Roman soldiers secured the tomb to prevent any attempt to steal His body.",
    },
    {
      id: "cr-q23",
      type: "multiple-choice",
      question: "The study asks you to substitute your name into Isaiah 53:4–6. What is the point?",
      points: 1,
      options: [
        "Only the people of Jesus' day were responsible for His death",
        "Our own sins made us responsible for Jesus' death",
        "Isaiah was describing his own suffering",
        "God punished Jesus for His own mistakes",
      ],
      correctAnswer: 1,
      explanation:
        "He was pierced for our transgressions. Do you truly hate your sin because of how it hurt Him? (Proverbs 13:5)",
    },
    {
      id: "cr-q24",
      type: "multiple-choice",
      question: "According to 1 Peter 2:24, why did Jesus bear our sins in His body on the cross?",
      points: 1,
      options: [
        "So that we could keep sinning without consequence",
        "So that we would never face suffering",
        "So that we might die to sins and live for righteousness",
        "So that we would no longer need the Bible",
      ],
      correctAnswer: 2,
      explanation:
        "Jesus suffered for each of us individually. We must die to sin and live for righteousness. What is the hardest sin you need to surrender?",
    },
    {
      id: "cr-q25",
      type: "multiple-choice",
      question: "What is the challenge at the end of the study?",
      points: 1,
      options: [
        "Remember the Cross mainly at Easter",
        "Wait until you feel ready before repenting",
        "Die to sin and live for righteousness out of gratitude for the Cross",
        "Avoid thinking about the Cross because it is too painful",
      ],
      correctAnswer: 2,
      explanation:
        "Are you more like Peter, Judas, or Pilate? Which response will you choose? Take time for confession and develop a plan for repentance.",
    },
    {
      id: "cr-q26",
      type: "multiple-choice",
      question: "According to the medical account, what caused Jesus' sweat to become like drops of blood in Gethsemane (Luke 22:44)?",
      points: 1,
      options: [
        "Wounds from the soldiers' beating",
        "Great emotional stress breaking tiny capillaries in the sweat glands",
        "The crown of thorns",
        "Extreme heat in the garden",
      ],
      correctAnswer: 1,
      explanation:
        "This is hematidrosis. Luke, a physician, is the only Gospel writer to mention it. Jesus' physical suffering began in Gethsemane, before anyone struck Him.",
    },
    {
      id: "cr-q27",
      type: "multiple-choice",
      question: "According to the medical account, where were the nails driven to fix Jesus' arms to the cross?",
      points: 1,
      options: [
        "Through the wrists",
        "Through the palms",
        "Through the forearms",
        "His arms were tied, not nailed",
      ],
      correctAnswer: 0,
      explanation:
        "Nails through the palms would tear out under the body's weight. The nails in the wrists pressed on the median nerves; anatomists have always counted the wrist as part of the hand.",
    },
    {
      id: "cr-q28",
      type: "multiple-choice",
      question: "According to the medical account, what did Jesus carry toward the place of execution?",
      points: 1,
      options: [
        "The whole cross, upright post and all",
        "Only the sign stating His crime",
        "The cross-arm (patibulum), about 110 pounds",
        "Nothing; the soldiers carried it",
      ],
      correctAnswer: 2,
      explanation:
        "The upright post (stipes) usually stayed fixed at the execution site. Jesus fell under the beam, and Simon of Cyrene carried it the rest of the 650 yards to Golgotha.",
    },
    {
      id: "cr-q29",
      type: "multiple-choice",
      question: "According to the medical account, what does the blood and water from Jesus' side (John 19:34) show?",
      points: 1,
      options: [
        "He was still alive when taken down from the cross",
        "He died from blood loss caused by the scourging",
        "His legs had been broken to speed up His death",
        "He died of heart failure from shock and fluid around the heart",
      ],
      correctAnswer: 3,
      explanation:
        "Most crucified men died of suffocation, which is why their legs were broken. Jesus was already dead, and the blood and water point to heart failure from shock and fluid compressing the heart.",
    },
    {
      id: "cr-q30",
      type: "memory-verse",
      question: "Write Hebrews 10:24–25 from memory (NIV).",
      points: 3,
      correctText:
        "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.",
    },
    {
      id: "cr-q31",
      type: "memory-verse",
      question: "Write 1 John 1:9 from memory (NIV).",
      points: 3,
      correctText: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
    },
    {
      id: "cr-q32",
      type: "ordered-list",
      question: "Write the 39 books of the Old Testament, Genesis through Malachi, in order.",
      points: 39,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
        "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
    {
      id: "cr-q33",
      type: "ordered-list",
      question: "Write the 27 books of the New Testament, Matthew through Revelation, in order.",
      points: 27,
      correctAnswers: [
        "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
        "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
        "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
        "Revelation",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
  ],
}

const theChurchStudyQuiz: Assessment = {
  id: "the-church-study-quiz",
  courseId: "8",
  title: "The Church Study Quiz",
  description:
    "Review The Church study, recite Hebrews 12:15 and 13:17 (NIV), and put Genesis through Revelation in order.",
  type: "quiz",
  timeLimit: 50,
  createdAt: "2026-10-24T10:00:00Z",
  questions: [
    {
      id: "ch-purpose",
      type: "multiple-choice",
      question: "What is the purpose of The Church study?",
      points: 1,
      options: [
        "To hate sin and love God because we appreciate Jesus' sacrifice",
        "To understand how to be saved and when our sins are forgiven",
        "To understand God's plan for the church and expose false traditions",
        "To trace how the early church spread from Jerusalem to Rome",
      ],
      correctAnswer: 2,
      explanation:
        "The study's purpose is to gain a deeper understanding of God's eternal plan for the church — and to expose the false traditions that have led to the creation of religious denominations.",
    },
    {
      id: "ch-q1",
      type: "multiple-choice",
      question: "The study begins by recalling the Kingdom study. For how long did Jesus speak about the kingdom of God after His resurrection (Acts 1:3)?",
      points: 1,
      options: [
        "40 days",
        "3 days",
        "50 days",
        "12 days",
      ],
      correctAnswer: 0,
      explanation:
        "“He appeared to them over a period of forty days and spoke about the kingdom of God” (Acts 1:3). The Kingdom study showed how God foretold the coming of the church throughout the centuries.",
    },
    {
      id: "ch-q2",
      type: "multiple-choice",
      question: "In its notes on Colossians 1:15–18, the study says, “There is no such thing as solo Christians.” Why?",
      points: 1,
      options: [
        "Christians should never spend time alone with God",
        "Only church leaders can understand the Bible",
        "God saves whole congregations, not individuals",
        "Every Christian has to be connected to the body",
      ],
      correctAnswer: 3,
      explanation:
        "Could you separate your head from your body? The church is essential to Christianity, and you have to be connected to the body: Christ “is the head of the body, the church” (Colossians 1:18).",
    },
    {
      id: "ch-q3",
      type: "matching",
      question: "Drag each label onto its place in the study's two diagrams (Colossians 1:18; Ephesians 2:19).",
      points: 5,
      matchPrompts: [
        "The head (body diagram)",
        "The body (body diagram)",
        "God (family diagram)",
        "Each Christian (family diagram)",
        "Christians to one another (family diagram)",
      ],
      options: ["Brothers", "The church", "Son", "Christ", "Father", "Strangers", "Servants"],
      correctMatches: [3, 1, 4, 2, 0],
      explanation:
        "The church is the body of Christ, and Christ is the head over the body. The church is also the family of God: God is our Father, each Christian is His son, and Christians are brothers to one another.",
    },
    {
      id: "ch-q4",
      type: "multiple-choice",
      question: "The study says the church is not merely a meeting. According to 1 Timothy 3:15, God's household, the church, is also…",
      points: 1,
      options: [
        "The judge and keeper of the law",
        "The pillar and foundation of the truth",
        "The source and author of Scripture",
        "The gate and guardian of heaven",
      ],
      correctAnswer: 1,
      explanation:
        "Paul calls God's household “the church of the living God, the pillar and foundation of the truth” (1 Timothy 3:15). The church is a household: the family of God.",
    },
    {
      id: "ch-q5",
      type: "matching",
      question: "Ephesians 2:20 says the church is built on the foundation of the apostles and prophets. Drag each answer onto the right description, according to the study.",
      points: 3,
      matchPrompts: ["Who the cornerstone is", "What the Apostles represent", "What the Prophets represent"],
      options: ["The Old Testament", "Christ", "Church tradition", "The New Testament", "Peter"],
      correctMatches: [1, 3, 0],
      explanation:
        "Christ Jesus is “the chief cornerstone” (Ephesians 2:20). The Apostles represent the New Testament and the Prophets the Old Testament; together they form the biblical foundation of the church.",
    },
    {
      id: "ch-q6",
      type: "multi-select",
      question: "What happens at baptism? Pick the two things the study says we are baptized into (1 Corinthians 12:12–13; Romans 6:3–4).",
      points: 2,
      options: [
        "Christ Himself",
        "A denomination",
        "The church",
        "The name of Paul",
        "John's baptism",
        "The law of Moses",
      ],
      correctOptions: [0, 2],
      explanation:
        "“We were all baptized by one Spirit so as to form one body” (1 Corinthians 12:13), and all of us “were baptized into Christ Jesus” (Romans 6:3).",
    },
    {
      id: "ch-q7",
      type: "multiple-choice",
      question: "According to the study, what happens to a person at the moment of baptism?",
      points: 1,
      options: [
        "They become a Christian now and can choose a church to join later",
        "They join the church now but become a Christian only after years of service",
        "They become a Christian and, at the same time, a member of the church",
        "They receive the name of the denomination that baptized them",
      ],
      correctAnswer: 2,
      explanation:
        "Baptism is the moment we become Christians — sons and daughters of God — and at the same time members of the church, the family of God.",
    },
    {
      id: "ch-q8",
      type: "multiple-choice",
      question: "According to the study of 1 Corinthians 1:10–13, what has caused divisions in the church?",
      points: 1,
      options: [
        "Following personalities and their traditions",
        "Persecution from the Roman government",
        "Differences in language and culture",
        "Too many disciples in one city",
      ],
      correctAnswer: 0,
      explanation:
        "There should be no divisions within the church. Some said, “I follow Paul,” and others, “I follow Apollos” or “I follow Cephas,” but Paul asked, “Is Christ divided?” (verses 12–13).",
    },
    {
      id: "ch-q9",
      type: "multiple-choice",
      question: "According to the study, what does the word “denomination” (from Latin) mean?",
      points: 1,
      options: [
        "A congregation in one city",
        "A branch of the true vine",
        "A church with its own building",
        "A group under a name",
      ],
      correctAnswer: 3,
      explanation:
        "A denomination is “a group under a name,” which is unbiblical. Paul asked, “Were you baptized in the name of Paul?” (1 Corinthians 1:13).",
    },
    {
      id: "ch-q10",
      type: "multiple-choice",
      question: "According to the Church History graphic, what was true early in the first century?",
      points: 1,
      options: [
        "Several denominations worked together as one church",
        "Christ's one church was established, and no denominations existed",
        "Each apostle founded his own separate church",
        "The church was governed by the Roman emperor",
      ],
      correctAnswer: 1,
      explanation:
        "Jesus said, “I will build my church” (Matthew 16:18). The church is Christ's body and bride; Jesus died for His church, and no denominations existed.",
    },
    {
      id: "ch-q11",
      type: "multiple-choice",
      question: "The Church History graphic cites Luke 8:11, from the parable of the sower. What does Jesus say the seed is?",
      points: 1,
      options: [
        "Faith",
        "Good deeds",
        "The word of God",
        "The Holy Spirit",
      ],
      correctAnswer: 2,
      explanation:
        "“The seed is the word of God” (Luke 8:11). That is why the graphic calls the Restoration “replanting the seed/word”: planting the same Word leads back to Christ's church.",
    },
    {
      id: "ch-q12",
      type: "multiple-choice",
      question: "On the Church History graphic, a line branches off from Christ's church after 300 AD. What does the word “apostasy” mean?",
      points: 1,
      options: [
        "Falling away",
        "Starting over",
        "Splitting in two",
        "Sending out",
      ],
      correctAnswer: 0,
      explanation:
        "The apostasy is a falling away from Christ's church. “The Spirit clearly says that in later times some will abandon the faith” (1 Timothy 4:1).",
    },
    {
      id: "ch-q13",
      type: "multi-select",
      question: "Pick the three areas in which the graphic says the apostasy departed from Christ's church.",
      points: 3,
      options: [
        "Doctrine",
        "Evangelism",
        "Worship",
        "Fellowship",
        "Government",
        "Giving",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "The graphic lists departures in worship, doctrine, and government, citing 2 Thessalonians 2:1–3, 1 Timothy 4:1–4, and Acts 20:28–30.",
    },
    {
      id: "ch-q14",
      type: "multiple-choice",
      question: "Which passage cited on the graphic records Paul warning the Ephesian elders that savage wolves would come in among them and that men would distort the truth?",
      points: 1,
      options: [
        "2 Thessalonians 2:1–3",
        "1 Timothy 4:1–4",
        "Matthew 16:18",
        "Acts 20:28–30",
      ],
      correctAnswer: 3,
      explanation:
        "“Even from your own number men will arise and distort the truth in order to draw away disciples after them” (Acts 20:30). The falling away would come from within.",
    },
    {
      id: "ch-q15",
      type: "multi-select",
      question: "According to the graphic, the apostasy later split in two. Pick the two branches it split into.",
      points: 2,
      options: [
        "Lutheran",
        "Roman Catholic",
        "Baptist",
        "Greek Orthodox",
        "Methodist",
        "Pentecostal",
      ],
      correctOptions: [1, 3],
      explanation:
        "The apostasy split into the Roman Catholic and Greek Orthodox churches. The Lutheran, Baptist, Methodist, and Pentecostal churches came later, out of the “Reformation.”",
    },
    {
      id: "ch-q16",
      type: "multiple-choice",
      question: "According to the Church History graphic, in what year did the apostasy split in two?",
      points: 1,
      options: [
        "1530 AD",
        "600 AD",
        "1054 AD",
        "1644 AD",
      ],
      correctAnswer: 2,
      explanation:
        "The graphic marks the split at 1054 AD. The years 1530 and 1644 belong to later “Reformation” denominations, the Lutheran and Baptist churches.",
    },
    {
      id: "ch-q17",
      type: "multiple-choice",
      question: "On the graphic, what is the difference between the “Reformation” and the “Restoration”?",
      points: 1,
      options: [
        "Reformation: a return to Christ's first-century church; Restoration: the movement that started the apostasy",
        "Reformation: denominations formed out of the apostate church; Restoration: replanting the seed to return to Christ's church",
        "Reformation: the first departure from the truth; Restoration: uniting every denomination under one name",
        "Reformation: the church Jesus established; Restoration: the split of the church in the Middle Ages",
      ],
      correctAnswer: 1,
      explanation:
        "The Reformation bars rise out of the Roman Catholic church as denominations such as the Lutheran, Presbyterian, and Baptist churches. The Restoration, “replanting the seed/word,” points back to Christ's church.",
    },
    {
      id: "ch-q18",
      type: "multiple-choice",
      question: "According to Ephesians 4:4, how many bodies of Christ are there?",
      points: 1,
      options: [
        "One for every denomination",
        "One in every nation",
        "Only one",
        "Two, one Jewish and one Gentile",
      ],
      correctAnswer: 2,
      explanation:
        "“There is one body and one Spirit” (Ephesians 4:4), and “in Christ we, though many, form one body” (Romans 12:5). God sees one church.",
    },
    {
      id: "ch-q19",
      type: "matching",
      question: "Drag each term onto the description it matches, according to the study of Ephesians 4:4–6.",
      points: 2,
      matchPrompts: [
        "All baptized disciples around the world who are committed to obeying God's Word",
        "A local congregation",
      ],
      options: ["The visible church", "A denomination", "The church universal", "The apostasy"],
      correctMatches: [2, 0],
      explanation:
        "God sees one church, the “church universal” — the one true church. A local congregation is a “visible church,” and in the first century all the visible churches made up the church universal.",
    },
    {
      id: "ch-q20",
      type: "multiple-choice",
      question: "Why does the study say we should strive to be part of a local congregation where everyone is committed to living by God's Word?",
      points: 1,
      options: [
        "Many congregations today have departed from true doctrine",
        "God only saves people in the largest congregation",
        "The one true church no longer exists anywhere",
        "Local congregations can never make mistakes",
      ],
      correctAnswer: 0,
      explanation:
        "Many visible churches today have departed from true doctrine, and not all sold-out baptized disciples are in the same fellowship.",
    },
    {
      id: "ch-q21",
      type: "spelling",
      question: "What is the Greek word for “church”?",
      points: 1,
      correctAnswers: ["ekklesia", "ekklēsia", "ecclesia"],
    },
    {
      id: "ch-q22",
      type: "multiple-choice",
      question: "According to the study, what does the Greek word for “church” mean?",
      points: 1,
      options: [
        "A building, or temple",
        "Sent ones, or messengers",
        "Kingdom, or reign",
        "Assembly, or called out",
      ],
      correctAnswer: 3,
      explanation:
        "Ek means “out,” and kaleo means “to call.” To be a disciple is to be called out from the world, so the church in the Bible was the assembly of the called out.",
    },
    {
      id: "ch-q23",
      type: "matching",
      question: "Five church-building convictions: drag each scripture onto the conviction it supports.",
      points: 5,
      matchPrompts: [
        "The dream to evangelize all nations in this generation",
        "Discipling is a command from God — not optional",
        "A central leadership under a central leader",
        "A Bible church — not just a New Testament church",
        "Speak where the Bible is SILENT, and be silent where the Bible speaks",
      ],
      options: [
        "Genesis 2:19",
        "Acts 13:47",
        "2 Timothy 3:14–17",
        "Matthew 28:18–20",
        "Numbers 27:12–18; 1 Corinthians 4:15–17",
        "Hebrews 10:23–25",
      ],
      correctMatches: [1, 3, 4, 2, 0],
      explanation:
        "In Acts 13:47 Paul and Barnabas say the Lord commanded them to bring salvation “to the ends of the earth”; Jesus says, “make disciples of all nations” (Matthew 28:19); Moses commissions Joshua (Numbers 27:18–23), and Paul says, “I urge you to imitate me” (1 Corinthians 4:16); “all Scripture is God-breathed” (2 Timothy 3:16); and God brought the animals to the man “to see what he would name them” (Genesis 2:19). Hebrews 10:23–25 is about meeting together and is not one of the five.",
    },
    {
      id: "ch-q24",
      type: "multiple-choice",
      question: "What does the study draw from 1 Corinthians 12:14–27?",
      points: 1,
      options: [
        "Only the most gifted members are essential to the church",
        "Every part of the body needs one another, so be relationally involved",
        "Each Christian can serve God just as well apart from the body",
        "Leaders matter more to God than other members",
      ],
      correctAnswer: 1,
      explanation:
        "“The eye cannot say to the hand, ‘I don't need you!’” (verse 21). We need the body of Christ active in our lives.",
    },
    {
      id: "ch-q25",
      type: "multi-select",
      question: "Pick the two purposes of fellowship the study draws from Hebrews 10:23–25.",
      points: 2,
      options: [
        "To help us remain unswerving in our commitment",
        "To help us study the Bible without needing a teacher",
        "To encourage one another to remain faithful",
        "To give us a social life outside work and school",
        "To earn God's favor through regular attendance",
        "To let leaders keep track of who is committed",
      ],
      correctOptions: [0, 2],
      explanation:
        "“Let us hold unswervingly to the hope we profess” (verse 23). We must not give up meeting together, and we should prioritize all meetings of the body: Sunday and midweek services, Bible Talks, devotionals, discipling times, and Global Conferences.",
    },
    {
      id: "ch-q26",
      type: "multiple-choice",
      question: "According to the study of 1 Corinthians 7:39, whom should disciples date and marry?",
      points: 1,
      options: [
        "Anyone who believes in God",
        "Anyone who attends some church",
        "Only other disciples",
        "Anyone their family approves of",
      ],
      correctAnswer: 2,
      explanation:
        "The study says marriage must be in the Lord: a widow is free to marry anyone she wishes, but “he must belong to the Lord” (verse 39). Dating, like marriage, is a partnership: “Do not be yoked together with unbelievers” (2 Corinthians 6:14).",
    },
    {
      id: "ch-q27",
      type: "multiple-choice",
      question: "According to 1 Corinthians 16:1–2, how often should we set aside our contribution?",
      points: 1,
      options: [
        "Every week, on the first day of the week",
        "Once a year, at the end of the year",
        "Only when we have money left over",
        "Once a month, after payday",
      ],
      correctAnswer: 0,
      explanation:
        "“On the first day of every week, each one of you should set aside a sum of money in keeping with your income” (verse 2). Our weekly contribution is a thoughtful, deliberate spiritual decision and a command of God.",
    },
    {
      id: "ch-q28",
      type: "multiple-choice",
      question: "According to 2 Corinthians 9:6–8, how should we give?",
      points: 1,
      options: [
        "Only when the church leaders ask us to",
        "Exactly a tenth, no more and no less",
        "Whatever is left after our other spending",
        "Cheerfully and generously, from the heart",
      ],
      correctAnswer: 3,
      explanation:
        "“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver” (verse 7).",
    },
    {
      id: "ch-q29",
      type: "multiple-choice",
      question: "According to the study, what is the mission contribution for, and how often is it collected?",
      points: 1,
      options: [
        "World evangelism; every week",
        "World evangelism; once or twice a year",
        "Church buildings; once or twice a year",
        "Leaders' salaries; every month",
      ],
      correctAnswer: 1,
      explanation:
        "Our mission contribution serves to fulfill Jesus' dream of world evangelism, and it is collected once or twice a year.",
    },
    {
      id: "ch-q30",
      type: "memory-verse",
      question: "Write Hebrews 12:15 from memory (NIV).",
      points: 3,
      correctText: "See to it that no one falls short of the grace of God and that no bitter root grows up to cause trouble and defile many.",
    },
    {
      id: "ch-q31",
      type: "memory-verse",
      question: "Write Hebrews 13:17 from memory (NIV).",
      points: 3,
      correctText:
        "Have confidence in your leaders and submit to their authority, because they keep watch over you as those who must give an account. Do this so that their work will be a joy, not a burden, for that would be of no benefit to you.",
    },
    {
      id: "ch-q32",
      type: "ordered-list",
      question: "Write the 39 books of the Old Testament, Genesis through Malachi, in order.",
      points: 39,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
        "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
    {
      id: "ch-q33",
      type: "ordered-list",
      question: "Write the 27 books of the New Testament, Matthew through Revelation, in order.",
      points: 27,
      correctAnswers: [
        "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
        "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
        "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
        "Revelation",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
  ],
}

const actsChapters1To7Quiz: Assessment = {
  id: "acts-1-7-quiz",
  courseId: "8",
  title: "Acts Chapters 1–7 Quiz",
  description:
    "Review the events, people, places, and timeline of Acts 1–7, from Jesus' ascension to the stoning of Stephen.",
  type: "quiz",
  timeLimit: 45,
  createdAt: "2026-10-24T10:00:00Z",
  questions: [
    {
      id: "acts1-q1",
      type: "spelling",
      question: "To whom is the book of Acts addressed (Acts 1:1)?",
      points: 1,
      correctAnswers: ["Theophilus"],
    },
    {
      id: "acts1-q2",
      type: "multiple-choice",
      question: "For how long did Jesus appear to the apostles after His suffering, giving them many convincing proofs that He was alive (Acts 1:3)?",
      points: 1,
      options: [
        "Three days",
        "Seven days",
        "Forty days",
        "Fifty days",
      ],
      correctAnswer: 2,
      explanation:
        "He appeared to them “over a period of forty days and spoke about the kingdom of God” (Acts 1:3), and told them to wait in Jerusalem to be baptized with the Holy Spirit (1:4–5).",
    },
    {
      id: "acts1-q3",
      type: "multiple-choice",
      question: "In Acts 1:8, Jesus said the apostles would receive power when the Holy Spirit came on them. Where did He say they would be His witnesses?",
      points: 1,
      options: [
        "In Jerusalem, and in all Judea and Samaria, and to the ends of the earth",
        "In Galilee, and in all Syria and the Decapolis, but not yet among the Gentiles",
        "In the synagogues of Judea, until the kingdom was restored to Israel",
        "In Rome first, and then in Greece, Asia and Egypt",
      ],
      correctAnswer: 0,
      explanation:
        "This verse is often seen as an outline of Acts: the church grows in Jerusalem (chapters 1–7), is scattered through Judea and Samaria (8:1), and then reaches toward the ends of the earth.",
    },
    {
      id: "acts1-q4",
      type: "multiple-choice",
      question: "After Jesus was taken up and a cloud hid Him from their sight, from which hill did the apostles return to Jerusalem (Acts 1:9–12)?",
      points: 1,
      options: [
        "Mount Zion",
        "Mount Hermon",
        "Mount Carmel",
        "Mount of Olives",
      ],
      correctAnswer: 3,
      explanation:
        "The Mount of Olives was “a Sabbath day's walk from the city” (Acts 1:12). Two men dressed in white had said Jesus “will come back in the same way you have seen him go into heaven” (1:11).",
    },
    {
      id: "acts1-q5",
      type: "multiple-choice",
      question: "Judas bought a field with the payment he received for his wickedness, and there he fell headlong. What did everyone in Jerusalem call that field (Acts 1:18–19)?",
      points: 1,
      options: [
        "Akeldama",
        "Golgotha",
        "Gethsemane",
        "Gabbatha",
      ],
      correctAnswer: 0,
      explanation:
        "They called it “in their language Akeldama, that is, Field of Blood” (Acts 1:19). Peter quoted the Psalms: “May another take his place of leadership” (1:20).",
    },
    {
      id: "acts1-q6",
      type: "spelling",
      question: "After praying, the believers cast lots between two men. Who was chosen and added to the eleven apostles in place of Judas (Acts 1:23–26)?",
      points: 1,
      correctAnswers: ["Matthias"],
    },
    {
      id: "acts1-q7",
      type: "multiple-choice",
      question: "When the day of Pentecost came and the believers were all together in one place, what did they hear and see (Acts 2:1–3)?",
      points: 1,
      options: [
        "A bright cloud filling the house where they were sitting",
        "A sound like a violent wind and what seemed to be tongues of fire",
        "A light from heaven and a voice calling their names",
        "A dove coming down and a voice from heaven",
      ],
      correctAnswer: 1,
      explanation:
        "A sound “like the blowing of a violent wind” filled the house, and “what seemed to be tongues of fire” came to rest on each of them (Acts 2:2–3). All of them were filled with the Holy Spirit (2:4).",
    },
    {
      id: "acts1-q8",
      type: "multi-select",
      question: "At Pentecost, God-fearing Jews from every nation heard the believers speaking in their own languages. Pick the four places named in Acts 2:9–11.",
      points: 4,
      options: [
        "Macedonia",
        "Cappadocia",
        "Achaia",
        "Pamphylia",
        "Egypt",
        "Galatia",
        "Syria",
        "Mesopotamia",
      ],
      correctOptions: [1, 3, 4, 7],
      explanation:
        "The list includes Mesopotamia, Cappadocia, Pamphylia and Egypt, along with Judea, Pontus, Asia, Phrygia, Libya and Rome (2:9–11). Macedonia, Achaia, Galatia and Syria come later in Acts.",
    },
    {
      id: "acts1-q9",
      type: "multiple-choice",
      question: "Some in the crowd said the believers had had too much wine. Which prophet did Peter quote to explain what was happening (Acts 2:13–17)?",
      points: 1,
      options: [
        "Isaiah",
        "Jeremiah",
        "Joel",
        "Amos",
      ],
      correctAnswer: 2,
      explanation:
        "Peter pointed out, “It's only nine in the morning!” (2:15), then quoted Joel: “In the last days, God says, I will pour out my Spirit on all people” (2:17).",
    },
    {
      id: "acts1-q10",
      type: "multiple-choice",
      question: "When the crowd was cut to the heart and asked, “Brothers, what shall we do?”, what did Peter tell them (Acts 2:37–38)?",
      points: 1,
      options: [
        "Repent and be baptized in the name of Jesus Christ for the forgiveness of your sins",
        "Sell your possessions and give to the poor, and you will have treasure in heaven",
        "Offer a sacrifice at the temple and keep the law of Moses faithfully",
        "Stay in Jerusalem and pray until the Holy Spirit comes on you",
      ],
      correctAnswer: 0,
      explanation:
        "Peter had declared that God made Jesus “both Lord and Messiah” (2:36). He told them to repent and be baptized, and said they would “receive the gift of the Holy Spirit” (2:38).",
    },
    {
      id: "acts1-q11",
      type: "multiple-choice",
      question: "About how many people accepted Peter's message and were baptized on the day of Pentecost (Acts 2:41)?",
      points: 1,
      options: [
        "About a hundred and twenty",
        "About five hundred",
        "About five thousand",
        "About three thousand",
      ],
      correctAnswer: 3,
      explanation:
        "“About three thousand were added to their number that day” (Acts 2:41), up from a group of about a hundred and twenty (1:15). After that, “the Lord added to their number daily those who were being saved” (2:47).",
    },
    {
      id: "acts1-q12",
      type: "multi-select",
      question: "Pick the four things the first believers devoted themselves to in Acts 2:42.",
      points: 4,
      options: [
        "Prayer",
        "Fasting",
        "The apostles' teaching",
        "Reading the Scriptures",
        "The breaking of bread",
        "Fellowship",
        "Caring for widows",
      ],
      correctOptions: [0, 2, 4, 5],
      explanation:
        "“They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer” (Acts 2:42). They also had everything in common and met every day in the temple courts (2:44–46).",
    },
    {
      id: "acts1-q13",
      type: "multiple-choice",
      question: "At what hour were Peter and John going up to the temple at the time of prayer when they met the lame man (Acts 3:1)?",
      points: 1,
      options: [
        "Nine in the morning",
        "Three in the afternoon",
        "Twelve noon",
        "Six in the evening",
      ],
      correctAnswer: 1,
      explanation:
        "They went up “at the time of prayer—at three in the afternoon” (Acts 3:1). The man, lame from birth, was carried every day to the temple gate called Beautiful to beg.",
    },
    {
      id: "acts1-q14",
      type: "multiple-choice",
      question: "What did Peter say to the man lame from birth before taking him by the right hand and helping him up (Acts 3:6–7)?",
      points: 1,
      options: [
        "Your faith has healed you. Go in peace and be freed from your suffering",
        "Get up, take your mat and go home. Your sins are forgiven",
        "Silver or gold I do not have… In the name of Jesus Christ of Nazareth, walk",
        "Be clean! Go, show yourself to the priest and offer the gift Moses commanded",
      ],
      correctAnswer: 2,
      explanation:
        "The man had asked them for money (3:3). Instantly his feet and ankles became strong, and he went into the temple courts “walking and jumping, and praising God” (Acts 3:7–8).",
    },
    {
      id: "acts1-q15",
      type: "multiple-choice",
      question: "While the healed man held on to Peter and John, where did all the astonished people come running to them (Acts 3:11)?",
      points: 1,
      options: [
        "The gate called Beautiful",
        "Solomon's Colonnade",
        "The Pool of Siloam",
        "The high priest's courtyard",
      ],
      correctAnswer: 1,
      explanation:
        "The crowd ran to “the place called Solomon's Colonnade” (Acts 3:11), where Peter told them they had “killed the author of life, but God raised him from the dead” (3:15).",
    },
    {
      id: "acts1-q16",
      type: "multiple-choice",
      question: "Peter and John were arrested for proclaiming in Jesus the resurrection of the dead, yet many who heard the message believed. To about how many did the number of men who believed grow (Acts 4:1–4)?",
      points: 1,
      options: [
        "About four thousand",
        "About five thousand",
        "About seven thousand",
        "About ten thousand",
      ],
      correctAnswer: 1,
      explanation:
        "The priests, the captain of the temple guard and the Sadducees put Peter and John in jail until the next day, but “the number of men who believed grew to about five thousand” (Acts 4:3–4).",
    },
    {
      id: "acts1-q17",
      type: "multiple-choice",
      question: "When the rulers and elders saw the courage of Peter and John, what did they realize (Acts 4:13)?",
      points: 1,
      options: [
        "That they had been trained by the teachers of the law",
        "That they were prophets like Elijah and Elisha",
        "That they were leading a revolt against Rome",
        "That these unschooled, ordinary men had been with Jesus",
      ],
      correctAnswer: 3,
      explanation:
        "The council “took note that these men had been with Jesus” (Acts 4:13). Ordered not to speak in Jesus' name, Peter and John replied, “As for us, we cannot help speaking about what we have seen and heard” (4:20).",
    },
    {
      id: "acts1-q18",
      type: "multiple-choice",
      question: "After Peter and John were released, the believers prayed for boldness. What happened next (Acts 4:31)?",
      points: 1,
      options: [
        "The place where they were meeting was shaken",
        "They all began speaking in other languages",
        "An angel appeared and gave them a message",
        "A light from heaven flashed around them",
      ],
      correctAnswer: 0,
      explanation:
        "“After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly” (Acts 4:31).",
    },
    {
      id: "acts1-q19",
      type: "spelling",
      question: "Joseph, a Levite from Cyprus, sold a field and put the money at the apostles' feet. What did the apostles call him, a name meaning “son of encouragement” (Acts 4:36–37)?",
      points: 1,
      correctAnswers: ["Barnabas"],
    },
    {
      id: "acts1-q20",
      type: "spelling",
      question: "Ananias and his wife sold a piece of property and kept back part of the money. What was his wife's name (Acts 5:1–2)?",
      points: 1,
      correctAnswers: ["Sapphira"],
    },
    {
      id: "acts1-q21",
      type: "multiple-choice",
      question: "When Ananias brought only part of the money to the apostles, what did Peter say he had done (Acts 5:3–4)?",
      points: 1,
      options: [
        "Cheated the widows out of their share",
        "Broken the law of Moses about offerings",
        "Lied to the Holy Spirit",
        "Insulted the apostles before the church",
      ],
      correctAnswer: 2,
      explanation:
        "Peter said Satan had filled his heart so “that you have lied to the Holy Spirit” (5:3), and not just to people but to God (5:4). About three hours later Sapphira also died (5:7–10).",
    },
    {
      id: "acts1-q22",
      type: "multiple-choice",
      question: "Why did people bring the sick into the streets and lay them on beds and mats as Peter passed by (Acts 5:15)?",
      points: 1,
      options: [
        "So that he could lay his hands on each of them",
        "So that he would anoint them with oil in Jesus' name",
        "So that they could touch the edge of his cloak",
        "So that at least his shadow might fall on some of them",
      ],
      correctAnswer: 3,
      explanation:
        "The sick were laid out “so that at least Peter's shadow might fall on some of them as he passed by” (5:15). Crowds came from the towns around Jerusalem, “and all of them were healed” (5:16).",
    },
    {
      id: "acts1-q23",
      type: "multiple-choice",
      question: "The high priest's party put the apostles in the public jail, yet the next morning they were teaching in the temple courts. What did Peter and the other apostles say when questioned (Acts 5:29)?",
      points: 1,
      options: [
        "We will teach only in our homes from now on",
        "We must obey God rather than human beings",
        "We will let the Roman governor decide",
        "We will stop if the people stop following us",
      ],
      correctAnswer: 1,
      explanation:
        "Peter and the other apostles replied, “We must obey God rather than human beings!” (Acts 5:29), adding that God had exalted Jesus to His own right hand as Prince and Savior (5:31).",
    },
    {
      id: "acts1-q24",
      type: "spelling",
      question: "Which Pharisee, a teacher of the law honored by all the people, warned the Sanhedrin that they might find themselves fighting against God (Acts 5:34–39)?",
      points: 1,
      correctAnswers: ["Gamaliel"],
    },
    {
      id: "acts1-q25",
      type: "multiple-choice",
      question: "After the apostles were flogged and ordered not to speak in the name of Jesus, how did they leave the Sanhedrin (Acts 5:40–41)?",
      points: 1,
      options: [
        "Afraid, and they hid together in the upstairs room for many days",
        "Angry, and they appealed to Caesar against the high priest's ruling",
        "Discouraged, and they went back to their fishing boats in Galilee",
        "Rejoicing, because they had been counted worthy of suffering for the Name",
      ],
      correctAnswer: 3,
      explanation:
        "They left “rejoicing because they had been counted worthy of suffering disgrace for the Name” (Acts 5:41), and day after day they kept proclaiming that Jesus is the Messiah (5:42).",
    },
    {
      id: "acts1-q26",
      type: "matching",
      question: "Put these events from Acts 4–5 in the order they happened: drag each event onto its place in the timeline.",
      points: 4,
      matchPrompts: ["1st", "2nd", "3rd", "4th"],
      options: [
        "An angel opens the doors of the public jail",
        "Peter and John are held in jail overnight",
        "The apostles are flogged and let go",
        "Ananias and his wife fall dead",
      ],
      correctMatches: [1, 3, 0, 2],
      explanation:
        "Peter and John were jailed overnight (4:3); Ananias and Sapphira died (5:1–10); an angel opened the doors of the public jail (5:18–19); and after Gamaliel spoke, the apostles were flogged and released (5:40).",
    },
    {
      id: "acts1-q27",
      type: "multiple-choice",
      question: "What problem led the Twelve to have seven men chosen (Acts 6:1)?",
      points: 1,
      options: [
        "The Sanhedrin had banned the believers from meeting in the temple courts",
        "The apostles could not agree on who should lead the church in Jerusalem",
        "Widows of the Hellenistic Jews were overlooked in the daily distribution of food",
        "Too many Gentiles were asking to join the church and needed teaching",
      ],
      correctAnswer: 2,
      explanation:
        "The Hellenistic Jews complained that “their widows were being overlooked” (6:1). The Twelve did not want “to neglect the ministry of the word of God in order to wait on tables” (6:2).",
    },
    {
      id: "acts1-q28",
      type: "multi-select",
      question: "Stephen was one of the Seven. Pick the three men from this list who were chosen with him (Acts 6:5).",
      points: 3,
      options: [
        "Silas",
        "Philip",
        "Nicanor",
        "Apollos",
        "Parmenas",
        "Aquila",
      ],
      correctOptions: [1, 2, 4],
      explanation:
        "They chose Stephen, “a man full of faith and of the Holy Spirit,” along with Philip, Procorus, Nicanor, Timon, Parmenas and Nicolas (Acts 6:5). Silas, Apollos and Aquila appear later in Acts.",
    },
    {
      id: "acts1-q29",
      type: "multiple-choice",
      question: "Members of the Synagogue of the Freedmen could not stand up to Stephen's wisdom, so they brought false witnesses. What did the witnesses accuse him of (Acts 6:9–14)?",
      points: 1,
      options: [
        "Speaking against the temple and the law of Moses",
        "Bringing Greeks into the temple courts",
        "Refusing to pay taxes to Caesar",
        "Stealing from the daily food distribution",
      ],
      correctAnswer: 0,
      explanation:
        "They said, “This fellow never stops speaking against this holy place and against the law” (Acts 6:13). As the Sanhedrin looked at him, “his face was like the face of an angel” (6:15).",
    },
    {
      id: "acts1-q30",
      type: "matching",
      question: "Drag each person from Acts 4–6 onto what the text says about them.",
      points: 4,
      matchPrompts: ["Annas", "Theudas", "Judas the Galilean", "Nicolas"],
      options: [
        "Led a band of people in revolt in the days of the census",
        "Was one of two men nominated, but the lot did not fall to him",
        "Was the high priest when Peter and John were questioned",
        "A convert to Judaism from Antioch, chosen as one of the Seven",
        "Claimed to be somebody, and about four hundred men rallied to him",
        "Was captain of the temple guard who brought the apostles in",
      ],
      correctMatches: [2, 4, 0, 3],
      explanation:
        "Annas was high priest (4:6); Theudas and Judas the Galilean were killed and their followers scattered (5:36–37); Nicolas was one of the Seven (6:5). The extras fit Joseph Barsabbas (1:23) and the temple captain (5:26).",
    },
    {
      id: "acts1-q31",
      type: "matching",
      question: "Stephen's speech (Acts 7) names many places. Drag each event onto the place where it happened.",
      points: 4,
      matchPrompts: ["Mesopotamia", "Harran", "Shechem", "Midian"],
      options: [
        "Moses fled there and had two sons",
        "Moses killed an Egyptian who was mistreating an Israelite",
        "God first appeared to Abraham",
        "The ancestors' bodies were laid in a tomb Abraham had bought",
        "The people made an idol in the form of a calf",
        "Abraham settled there until his father died",
      ],
      correctMatches: [2, 5, 3, 0],
      explanation:
        "God appeared to Abraham in Mesopotamia, and he lived in Harran until his father died (7:2–4). The ancestors were buried at Shechem (7:16); Moses fled to Midian (7:29). The extras were in Egypt and at Sinai.",
    },
    {
      id: "acts1-q32",
      type: "matching",
      question: "Stephen's speech (Acts 7) gives several numbers. Drag each number onto what it counts.",
      points: 4,
      matchPrompts: [
        "Years Abraham's descendants would be enslaved and mistreated (7:6)",
        "People in Jacob's whole family who came to Egypt (7:14–15)",
        "Months the baby Moses was cared for by his family (7:20)",
        "Moses' age in years when he decided to visit his own people (7:23)",
      ],
      options: [
        "Seventy-five",
        "Four hundred",
        "Forty",
        "Three",
        "Twelve",
        "Eighty",
      ],
      correctMatches: [1, 0, 3, 2],
      explanation:
        "Abraham's descendants would be strangers “for four hundred years” (7:6); Jacob's family was “seventy-five in all” (7:14); Moses was cared for “for three months” (7:20) and was “forty years old” at his visit (7:23).",
    },
    {
      id: "acts1-q33",
      type: "ordered-list",
      question: "Stephen's speech (Acts 7) retells Israel's history. Name the six men described below, then arrange them in the order Stephen speaks of them: the king who built a house for God; the man God called to leave his country and his people; the leader under whom the tabernacle was brought into the land; the man who saw the burning bush; the son his jealous brothers sold into Egypt; the king who asked to provide a dwelling place for God.",
      points: 6,
      correctAnswers: ["Abraham", "Joseph", "Moses", "Joshua", "David", "Solomon"],
      orderedListHint: "Type the next person…",
      answerLayout: "reorderable",
    },
    {
      id: "acts1-q34",
      type: "multiple-choice",
      question: "Just before he was stoned, Stephen looked up to heaven. What did he say he saw (Acts 7:55–56)?",
      points: 1,
      options: [
        "A sheet let down from heaven by its four corners",
        "Heaven open and the Son of Man standing at the right hand of God",
        "A man of Macedonia begging him to come and help",
        "The Lord seated on a throne, high and exalted",
      ],
      correctAnswer: 1,
      explanation:
        "After he called the council “stiff-necked people” (7:51), they were furious, but Stephen, full of the Holy Spirit, “saw the glory of God, and Jesus standing at the right hand of God” (7:55).",
    },
    {
      id: "acts1-q35",
      type: "multiple-choice",
      question: "As Stephen was dragged out of the city and stoned, what does Acts 7:58 record about a young man named Saul?",
      points: 1,
      options: [
        "He threw the first stone at Stephen",
        "He pleaded with the crowd to spare Stephen",
        "The witnesses laid their coats at his feet",
        "He brought the false charges against Stephen",
      ],
      correctAnswer: 2,
      explanation:
        "“The witnesses laid their coats at the feet of a young man named Saul” (Acts 7:58). This is the first time Acts mentions Saul, who was also called Paul (13:9).",
    },
    {
      id: "acts1-q36",
      type: "multi-select",
      question: "Pick the two things Stephen cried out as he was being stoned (Acts 7:59–60).",
      points: 2,
      options: [
        "Lord Jesus, receive my spirit",
        "It is finished",
        "Lord, do not hold this sin against them",
        "My God, my God, why have you forsaken me?",
        "Saul, Saul, why do you persecute me?",
        "Today you will be with me in paradise",
      ],
      correctOptions: [0, 2],
      explanation:
        "Stephen prayed, “Lord Jesus, receive my spirit,” then fell on his knees and cried out, “Lord, do not hold this sin against them” (Acts 7:59–60). “When he had said this, he fell asleep.”",
    },
  ],
}

const actsChapters8To14Quiz: Assessment = {
  id: "acts-8-14-quiz",
  courseId: "8",
  title: "Acts Chapters 8–14 Quiz",
  description:
    "Review the events, people, places, and timeline of Acts 8–14, from the scattering of the church after Stephen's death to the close of the first missionary journey.",
  type: "quiz",
  timeLimit: 40,
  createdAt: "2026-10-24T10:00:00Z",
  questions: [
    {
      id: "acts2-q1",
      type: "multiple-choice",
      question: "When a great persecution broke out against the church in Jerusalem after Stephen's death, who were the only believers not scattered (Acts 8:1)?",
      points: 1,
      options: [
        "The apostles",
        "The Seven",
        "The elders",
        "The Hellenistic Jews",
      ],
      correctAnswer: 0,
      explanation:
        "Acts 8:1 says “all except the apostles were scattered throughout Judea and Samaria,” while Saul went from house to house dragging off men and women to prison (8:3). Those scattered preached the word wherever they went (8:4).",
    },
    {
      id: "acts2-q2",
      type: "multiple-choice",
      question: "When Peter and John arrived in Samaria, what did they pray for the new believers there (Acts 8:14–17)?",
      points: 1,
      options: [
        "That they would be kept safe from Saul",
        "That they might receive the Holy Spirit",
        "That their sick would be healed",
        "That they would be baptized in Jesus' name",
      ],
      correctAnswer: 1,
      explanation:
        "The Spirit had not yet come on any of them; “they had simply been baptized in the name of the Lord Jesus” (8:16). Then Peter and John placed their hands on them, and they received the Holy Spirit (8:17).",
    },
    {
      id: "acts2-q3",
      type: "multiple-choice",
      question: "In Samaria, what did Simon the sorcerer offer Peter and John (Acts 8:18–19)?",
      points: 1,
      options: [
        "His house, as a meeting place for the believers",
        "His sorcery scrolls, to be burned in public",
        "Money, to buy the ability the apostles had",
        "Half of his land, to provide for the poor",
      ],
      correctAnswer: 2,
      explanation:
        "Simon, whom Samaria had called “the Great Power of God” (8:10), saw the Spirit given when the apostles laid their hands on people. Peter replied, “May your money perish with you” (8:20).",
    },
    {
      id: "acts2-q4",
      type: "multiple-choice",
      question: "Where did an angel of the Lord send Philip after his work in Samaria (Acts 8:26)?",
      points: 1,
      options: [
        "To the road from Jerusalem to Jericho",
        "To the road from Jerusalem to Damascus",
        "To the coast road from Joppa to Caesarea",
        "To the desert road from Jerusalem to Gaza",
      ],
      correctAnswer: 3,
      explanation:
        "The angel said, “Go south to the road—the desert road—that goes down from Jerusalem to Gaza.” There Philip met an Ethiopian eunuch in charge of the treasury of the Kandake, queen of the Ethiopians (8:27).",
    },
    {
      id: "acts2-q5",
      type: "multiple-choice",
      question: "What was the Ethiopian official reading in his chariot when Philip ran up to him (Acts 8:28–33)?",
      points: 1,
      options: [
        "Jeremiah's promise of a new covenant",
        "Isaiah's prophecy of a sheep led to the slaughter",
        "David's psalm about the stone the builders rejected",
        "Daniel's vision of one like a son of man",
      ],
      correctAnswer: 1,
      explanation:
        "He was reading Isaiah 53:7–8. Philip “began with that very passage of Scripture and told him the good news about Jesus” (8:35); after the eunuch's baptism, Philip appeared at Azotus and preached his way to Caesarea (8:40).",
    },
    {
      id: "acts2-q6",
      type: "multi-select",
      question: "Pick the three things that happened during Saul's conversion (Acts 9:3–18).",
      points: 3,
      options: [
        "A light from heaven flashed around him",
        "His companions saw Jesus and spoke with him",
        "A voice asked, “Saul, Saul, why do you persecute me?”",
        "Peter healed his blindness in Damascus",
        "Something like scales fell from his eyes",
        "He began speaking in tongues on the road",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "The men with Saul “heard the sound but did not see anyone” (9:7). Saul was led blind into Damascus, and when Ananias placed his hands on him, “something like scales fell from Saul's eyes” and he was baptized (9:17–18).",
    },
    {
      id: "acts2-q7",
      type: "spelling",
      question: "In a vision, the Lord sent a disciple in Damascus to the house of Judas on Straight Street to find Saul. What was that disciple's name (Acts 9:10–11)?",
      points: 1,
      correctAnswers: ["Ananias"],
    },
    {
      id: "acts2-q8",
      type: "multiple-choice",
      question: "When the disciple protested that Saul had done great harm to the Lord's holy people in Jerusalem, what did the Lord call Saul (Acts 9:13–15)?",
      points: 1,
      options: [
        "My beloved son",
        "The least of the apostles",
        "My chosen instrument",
        "A man after my own heart",
      ],
      correctAnswer: 2,
      explanation:
        "The Lord said, “This man is my chosen instrument to proclaim my name to the Gentiles and their kings and to the people of Israel” (9:15).",
    },
    {
      id: "acts2-q9",
      type: "multiple-choice",
      question: "After Saul had preached in Damascus for many days, the Jews there conspired to kill him. How did he escape (Acts 9:23–25)?",
      points: 1,
      options: [
        "He was lowered in a basket through the wall",
        "An angel opened the city gate for him at night",
        "Roman soldiers escorted him out of the city",
        "He hid in a caravan traveling to Jerusalem",
      ],
      correctAnswer: 0,
      explanation:
        "They kept close watch on the city gates day and night, but his followers took him by night and “lowered him in a basket through an opening in the wall” (9:24–25).",
    },
    {
      id: "acts2-q10",
      type: "spelling",
      question: "In Joppa, Peter raised to life a disciple who was always doing good and helping the poor. What was her name (Acts 9:36–41)?",
      points: 1,
      correctAnswers: ["Tabitha", "Dorcas"],
    },
    {
      id: "acts2-q11",
      type: "multiple-choice",
      question: "Who was Cornelius, the God-fearing man at Caesarea who saw an angel in a vision (Acts 10:1–3)?",
      points: 1,
      options: [
        "The commander of the Roman troops in Jerusalem",
        "The jailer of the prison at Philippi",
        "An official in charge of the queen's treasury",
        "A centurion in the Italian Regiment",
      ],
      correctAnswer: 3,
      explanation:
        "Cornelius and all his family were “devout and God-fearing” (10:2). The angel told him to send men to Joppa for Simon Peter, who was staying with Simon the tanner by the sea (10:5–6).",
    },
    {
      id: "acts2-q12",
      type: "multiple-choice",
      question: "On the roof in Joppa, Peter saw a vision and was told to kill and eat. He answered, “Surely not, Lord!” What did the voice say next (Acts 10:14–15)?",
      points: 1,
      options: [
        "“Now get up and go into the city, and you will be told what you must do.”",
        "“Do not call anything impure that God has made clean.”",
        "“Go, stand in the temple courts, and tell the people all about this new life.”",
        "“Do not be afraid; keep on speaking, do not be silent.”",
      ],
      correctAnswer: 1,
      explanation:
        "This happened three times (10:16). While Peter was still thinking about the vision, the men sent by Cornelius arrived, and the Spirit told him, “Do not hesitate to go with them, for I have sent them” (10:17–20).",
    },
    {
      id: "acts2-q13",
      type: "multi-select",
      question: "Pick the three things that happened at Cornelius's house while Peter was speaking and afterward (Acts 10:44–48).",
      points: 3,
      options: [
        "Peter laid his hands on them before the Spirit came",
        "The Holy Spirit came on all who heard the message",
        "The circumcised believers with Peter were astonished",
        "Cornelius's paralyzed servant was healed",
        "Cornelius gave Peter money for the poor in Jerusalem",
        "Peter ordered that they be baptized with water",
      ],
      correctOptions: [1, 2, 5],
      explanation:
        "The Spirit came while Peter was still speaking, and the circumcised believers heard the Gentiles “speaking in tongues and praising God” (10:45–46). Peter said no one could stand in the way of their being baptized with water, and he ordered that they be baptized in the name of Jesus Christ (10:47–48).",
    },
    {
      id: "acts2-q14",
      type: "multiple-choice",
      question: "When Peter returned to Jerusalem, what did the circumcised believers criticize him for (Acts 11:2–3)?",
      points: 1,
      options: [
        "Baptizing people without asking the other apostles",
        "Accepting money from a Roman officer",
        "Going into the house of uncircumcised men and eating with them",
        "Preaching in the temple courts against the council's orders",
      ],
      correctAnswer: 2,
      explanation:
        "Peter explained everything in order, adding that “these six brothers also went with me” (11:12). They had no further objections and said, “So then, even to Gentiles God has granted repentance that leads to life” (11:18).",
    },
    {
      id: "acts2-q15",
      type: "multiple-choice",
      question: "Believers scattered by the persecution after Stephen's death spread the word only among Jews. Who began telling Greeks in Antioch the good news about the Lord Jesus (Acts 11:19–20)?",
      points: 1,
      options: [
        "Peter and John",
        "Some men from Cyprus and Cyrene",
        "Disciples who had fled from Damascus",
        "Barnabas and Saul",
      ],
      correctAnswer: 1,
      explanation:
        "The scattered believers traveled as far as Phoenicia, Cyprus, and Antioch (11:19). A great number of people believed, so the Jerusalem church sent Barnabas, “a good man, full of the Holy Spirit and faith” (11:21–24).",
    },
    {
      id: "acts2-q16",
      type: "multiple-choice",
      question: "Barnabas brought Saul to Antioch to help teach the church. What does Acts 11:26 say happened there for the first time?",
      points: 1,
      options: [
        "A Gentile household received the Holy Spirit",
        "The believers shared all their possessions",
        "The disciples were called Christians",
        "The apostles appointed seven men to serve",
      ],
      correctAnswer: 2,
      explanation:
        "Barnabas and Saul met with the church for a whole year and taught great numbers of people, and “the disciples were called Christians first at Antioch” (11:26).",
    },
    {
      id: "acts2-q17",
      type: "spelling",
      question: "Which prophet came down from Jerusalem to Antioch and predicted a severe famine over the entire Roman world (Acts 11:27–28)?",
      points: 1,
      correctAnswers: ["Agabus"],
    },
    {
      id: "acts2-q18",
      type: "matching",
      question: "Time markers in Acts 9–11: drag each time onto the event it belongs to.",
      points: 6,
      matchPrompts: [
        "How long Saul is blind in Damascus (9:9)",
        "How long Aeneas has been bedridden (9:33)",
        "Time of day Cornelius sees an angel in a vision (10:3)",
        "Time of day Peter goes up on the roof to pray (10:9)",
        "How long Barnabas and Saul teach the church in Antioch (11:26)",
        "When the predicted famine over the entire Roman world takes place (11:28)",
      ],
      options: ["About noon", "Eight years", "During the reign of Tiberius", "A whole year", "Three days", "During the reign of Claudius", "About three in the afternoon", "About midnight"],
      correctMatches: [4, 1, 6, 0, 3, 5],
      explanation:
        "Saul was blind for three days (9:9), and Aeneas had been bedridden for eight years (9:33). Cornelius's vision came at about three in the afternoon and Peter's at about noon the next day (10:3, 9); Barnabas and Saul taught at Antioch for a whole year (11:26), and the famine came “during the reign of Claudius” (11:28).",
    },
    {
      id: "acts2-q19",
      type: "multiple-choice",
      question: "How did James, the brother of John, die (Acts 12:1–2)?",
      points: 1,
      options: [
        "He was stoned outside the city by the Sanhedrin",
        "He was put to death with the sword by King Herod",
        "He was crucified in Rome",
        "He was thrown from the temple wall",
      ],
      correctAnswer: 1,
      explanation:
        "Herod “had James, the brother of John, put to death with the sword” (12:2). Seeing that this pleased the Jews, he arrested Peter too, during the Festival of Unleavened Bread (12:3).",
    },
    {
      id: "acts2-q20",
      type: "multiple-choice",
      question: "After an angel led Peter out of prison, where did he go (Acts 12:12)?",
      points: 1,
      options: [
        "To the upstairs room where the apostles had stayed",
        "To the temple courts to preach to the people",
        "To the home of Philip the evangelist in Caesarea",
        "To the house of Mary, the mother of John Mark",
      ],
      correctAnswer: 3,
      explanation:
        "Many people had gathered there and were praying (12:12). The church had been “earnestly praying” for Peter while he slept bound between two soldiers, guarded by four squads of four soldiers each (12:4–6).",
    },
    {
      id: "acts2-q21",
      type: "spelling",
      question: "When Peter knocked at the outer entrance, a servant came to the door, recognized his voice, and was so overjoyed that she ran back without opening it. What was her name (Acts 12:13–14)?",
      points: 1,
      correctAnswers: ["Rhoda"],
    },
    {
      id: "acts2-q22",
      type: "multiple-choice",
      question: "What reason does Acts 12:23 give for an angel of the Lord striking Herod down at Caesarea?",
      points: 1,
      options: [
        "He did not give praise to God when the crowd called him a god",
        "He had executed the guards from whom Peter escaped",
        "He had put James, the brother of John, to death",
        "He had refused to make peace with Tyre and Sidon",
      ],
      correctAnswer: 0,
      explanation:
        "When the people shouted, “This is the voice of a god, not of a man,” Herod did not give praise to God, and he “was eaten by worms and died” (12:22–23). Yet “the word of God continued to spread and flourish” (12:24).",
    },
    {
      id: "acts2-q23",
      type: "multi-select",
      question: "Pick the three men Acts 13:1 names, along with Barnabas and Saul, as prophets and teachers in the church at Antioch.",
      points: 3,
      options: [
        "Simeon called Niger",
        "Silas",
        "Judas called Barsabbas",
        "Lucius of Cyrene",
        "Manaen",
        "John Mark",
      ],
      correctOptions: [0, 3, 4],
      explanation:
        "Manaen had been brought up with Herod the tetrarch (13:1). Judas called Barsabbas and Silas were prophets who came to Antioch later (15:22, 32), and John went with Barnabas and Saul as their helper (13:5).",
    },
    {
      id: "acts2-q24",
      type: "multiple-choice",
      question: "After the Holy Spirit said, “Set apart for me Barnabas and Saul,” what did the prophets and teachers at Antioch do before sending them off (Acts 13:2–3)?",
      points: 1,
      options: [
        "Cast lots to choose a third companion",
        "Wrote a letter to the believers in Jerusalem",
        "Fasted, prayed, and placed their hands on them",
        "Took up a collection to pay for their voyage",
      ],
      correctAnswer: 2,
      explanation:
        "“So after they had fasted and prayed, they placed their hands on them and sent them off” (13:3). Sent on their way by the Holy Spirit, the two went down to Seleucia and sailed to Cyprus (13:4).",
    },
    {
      id: "acts2-q25",
      type: "multiple-choice",
      question: "At Paphos on Cyprus, the Jewish sorcerer Bar-Jesus, also called Elymas, tried to turn the proconsul from the faith. What happened to him (Acts 13:6–11)?",
      points: 1,
      options: [
        "He fell down dead at Paul's feet",
        "He burned his scrolls and believed",
        "He was struck blind for a time",
        "He was driven out of Paphos by a mob",
      ],
      correctAnswer: 2,
      explanation:
        "Saul, “who was also called Paul” (13:9), called him “a child of the devil” and said he would be blind for a time; immediately mist and darkness came over him (13:10–11). This is the first time Acts calls Saul by the name Paul.",
    },
    {
      id: "acts2-q26",
      type: "spelling",
      question: "Which proconsul believed when he saw what happened to the sorcerer, “amazed at the teaching about the Lord” (Acts 13:7–12)?",
      points: 1,
      correctAnswers: ["Sergius Paulus", "Sergius"],
    },
    {
      id: "acts2-q27",
      type: "multiple-choice",
      question: "In the synagogue at Pisidian Antioch, the leaders invited Paul and Barnabas to speak. How did Paul begin his message (Acts 13:15–22)?",
      points: 1,
      options: [
        "By describing his own conversion on the Damascus road",
        "By retelling Israel's history from Egypt to King David",
        "By pointing to an altar to an unknown god",
        "By reading aloud from the scroll of Isaiah",
      ],
      correctAnswer: 1,
      explanation:
        "Paul traced God's dealings with Israel from Egypt, the wilderness, and the judges to Saul son of Kish and to David, “a man after my own heart” (13:17–22). From David's descendants God brought Israel the Savior Jesus, whom God raised from the dead (13:23, 30).",
    },
    {
      id: "acts2-q28",
      type: "multiple-choice",
      question: "On the next Sabbath almost the whole city gathered, and the jealous Jews heaped abuse on Paul. What did Paul and Barnabas boldly reply (Acts 13:44–46)?",
      points: 1,
      options: [
        "“We must obey God rather than human beings!”",
        "“I appeal to Caesar!”",
        "“Lord, do not hold this sin against them.”",
        "“We now turn to the Gentiles.”",
      ],
      correctAnswer: 3,
      explanation:
        "Quoting Isaiah 49:6, they said this was what the Lord had commanded them: “I have made you a light for the Gentiles” (13:47). The Gentiles rejoiced, but Paul and Barnabas were expelled from the region and shook the dust off their feet (13:48–51).",
    },
    {
      id: "acts2-q29",
      type: "multi-select",
      question: "Pick the three things that happened at Iconium (Acts 14:1–6).",
      points: 3,
      options: [
        "A great number of Jews and Greeks believed",
        "Paul and Barnabas were flogged and thrown into prison",
        "The people of the city were divided",
        "The crowd tried to offer sacrifices to them",
        "They fled after learning of a plot to stone them",
        "The Jews brought them before the proconsul",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "They spoke so effectively that “a great number of Jews and Greeks believed” (14:1), but the city was divided (14:4). When they learned of a plot to mistreat and stone them, they fled to the Lycaonian cities of Lystra and Derbe (14:5–6).",
    },
    {
      id: "acts2-q30",
      type: "multiple-choice",
      question: "At Lystra, Paul healed a man who had been lame from birth. What did the crowd call Barnabas and Paul (Acts 14:8–12)?",
      points: 1,
      options: [
        "Barnabas was called Zeus, and Paul Hermes",
        "Barnabas was called Hermes, and Paul Zeus",
        "Barnabas was called Castor, and Paul Pollux",
        "Barnabas was called Pollux, and Paul Castor",
      ],
      correctAnswer: 0,
      explanation:
        "Paul was called Hermes “because he was the chief speaker” (14:12). When the priest of Zeus brought bulls to sacrifice, they tore their clothes and cried, “We too are only human, like you” (14:14–15).",
    },
    {
      id: "acts2-q31",
      type: "multiple-choice",
      question: "At Lystra, who won the crowd over and stoned Paul (Acts 14:19)?",
      points: 1,
      options: [
        "Jews who came from Thessalonica and Berea",
        "Jews who came from Jerusalem and Damascus",
        "Jews who came from Caesarea and Joppa",
        "Jews who came from Antioch and Iconium",
      ],
      correctAnswer: 3,
      explanation:
        "They dragged Paul outside the city, thinking he was dead. But after the disciples gathered around him he got up and went back into the city, and the next day he and Barnabas left for Derbe (14:19–20).",
    },
    {
      id: "acts2-q32",
      type: "multiple-choice",
      question: "As they retraced their steps on the way home, what did Paul and Barnabas do for each church (Acts 14:21–23)?",
      points: 1,
      options: [
        "Appointed elders for the believers",
        "Collected an offering for the famine in Judea",
        "Delivered the letter from the council in Jerusalem",
        "Chose seven men to wait on tables",
      ],
      correctAnswer: 0,
      explanation:
        "With prayer and fasting, they “committed them to the Lord, in whom they had put their trust” (14:23). Then they sailed from Attalia back to Antioch and reported how God “had opened a door of faith to the Gentiles” (14:26–27).",
    },
    {
      id: "acts2-q33",
      type: "ordered-list",
      question: "On their first missionary journey, Paul and Barnabas sailed from Seleucia to Cyprus (Acts 13:4). Type the seven towns Acts names them visiting, in order, up to the farthest town they reached before turning back (Acts 13:5–14:21). Use the NIV's name for the second Antioch, Pisidian Antioch (13:14).",
      points: 7,
      correctAnswers: ["Salamis", "Paphos", "Perga", "Pisidian Antioch", "Iconium", "Lystra", "Derbe"],
      orderedListHint: "Type the next town…",
      answerLayout: "reorderable",
    },
    {
      id: "acts2-q34",
      type: "matching",
      question: "Drag each person onto what Acts 9–13 says about them.",
      points: 4,
      matchPrompts: ["Barnabas", "Simon the tanner", "Blastus", "John Mark"],
      options: [
        "Left the mission partway and returned to Jerusalem",
        "Told the apostles how Saul had seen the Lord",
        "Restored Saul's sight in Damascus",
        "Was a trusted personal servant of King Herod",
        "Hosted Peter at his house by the sea in Joppa",
        "Was brought up with Herod the tetrarch",
      ],
      correctMatches: [1, 4, 3, 0],
      explanation:
        "Barnabas told the apostles how Saul had seen the Lord (9:27), Peter stayed with Simon the tanner by the sea (10:6), Blastus was King Herod's trusted personal servant (12:20), and John left the mission at Perga (13:13). Ananias restored Saul's sight; Manaen was brought up with Herod the tetrarch.",
    },
    {
      id: "acts2-q35",
      type: "matching",
      question: "Drag each place onto what Acts 8–14 says about it.",
      points: 4,
      matchPrompts: ["Azotus", "Tarsus", "Lydda", "Attalia"],
      options: [
        "Paul and Barnabas sailed from here back to Antioch",
        "Philip appeared here after the eunuch's baptism",
        "Peter healed a man named Aeneas here",
        "The believers sent Saul here to escape a plot",
        "Paul was stoned and dragged outside the city here",
      ],
      correctMatches: [1, 3, 2, 0],
      explanation:
        "Philip appeared at Azotus (8:40), and when the Hellenistic Jews tried to kill Saul, the believers sent him off to Tarsus (9:29–30). Peter healed Aeneas at Lydda (9:32–34), and Paul and Barnabas sailed from Attalia back to Antioch (14:25–26); Paul was stoned at Lystra (14:19).",
    },
    {
      id: "acts2-q36",
      type: "matching",
      question: "Timeline: drag each event onto its place in the order Acts records them.",
      points: 5,
      matchPrompts: ["1st", "2nd", "3rd", "4th", "5th"],
      options: [
        "An angel frees Peter from prison",
        "Philip baptizes an Ethiopian official",
        "The Jerusalem church sends Barnabas to Antioch",
        "Saul escapes from Damascus by night",
        "Peter sees a sheet full of animals in a vision",
      ],
      correctMatches: [1, 3, 4, 2, 0],
      explanation:
        "Philip baptized the Ethiopian on the road to Gaza (8:38), and Saul escaped Damascus by night after preaching there for many days (9:23–25). Peter's vision in Joppa prepared him to visit Cornelius (10:9–16), the Jerusalem church then sent Barnabas to Antioch (11:22), and an angel freed Peter after Herod killed James (12:1–11).",
    },
  ],
}

const actsChapters15To21Quiz: Assessment = {
  id: "acts-15-21-quiz",
  courseId: "8",
  title: "Acts Chapters 15–21 Quiz",
  description:
    "Review the events, people, places, and timeline of Acts 15–21, from the Jerusalem council to Paul's arrest in the temple.",
  type: "quiz",
  timeLimit: 50,
  createdAt: "2026-10-24T10:00:00Z",
  questions: [
    {
      id: "acts3-q1",
      type: "multiple-choice",
      question: "In Acts 15:1, what were certain people from Judea teaching the believers in Antioch?",
      points: 1,
      options: [
        "Unless you are circumcised, you cannot be saved",
        "Unless you sell your property, you cannot follow Jesus",
        "Unless the apostles baptize you, you cannot receive the Spirit",
        "Unless you worship in Jerusalem, you cannot be saved",
      ],
      correctAnswer: 0,
      explanation:
        "They taught, “Unless you are circumcised, according to the custom taught by Moses, you cannot be saved” (15:1). This brought Paul and Barnabas into sharp dispute, and they were sent up to the apostles and elders in Jerusalem (15:2).",
    },
    {
      id: "acts3-q2",
      type: "matching",
      question: "Drag each part in the Jerusalem council and its decision onto the person or pair who played it (Acts 15:6–32).",
      points: 4,
      matchPrompts: ["Peter", "Barnabas and Paul", "James", "Judas and Silas"],
      options: [
        "Quoted the prophets and gave his judgment on what to ask of the Gentiles",
        "Confirmed the letter by word of mouth and strengthened the believers",
        "Told how God gave the Gentiles the Holy Spirit and saved them by grace",
        "Told of the signs and wonders God had done among the Gentiles through them",
        "Insisted that the Gentiles must be circumcised and keep the law of Moses",
      ],
      correctMatches: [2, 3, 0, 1],
      explanation:
        "After much discussion, Peter got up and spoke (15:7–11), then Barnabas and Paul (15:12), and James gave his judgment, quoting the prophets (15:13–21). Judas and Silas confirmed the letter “by word of mouth” (15:27, 32); the party of the Pharisees had insisted on circumcision (15:5).",
    },
    {
      id: "acts3-q3",
      type: "multi-select",
      question: "Pick the four things the council's letter told Gentile believers to abstain from (Acts 15:29).",
      points: 4,
      options: [
        "Food sacrificed to idols",
        "Pork and other unclean food",
        "Blood",
        "Working on the Sabbath",
        "The meat of strangled animals",
        "Drinking wine",
        "Sexual immorality",
      ],
      correctOptions: [0, 2, 4, 6],
      explanation:
        "The letter told them, “You are to abstain from food sacrificed to idols, from blood, from the meat of strangled animals and from sexual immorality” (15:29). The believers in Antioch “were glad for its encouraging message” (15:31).",
    },
    {
      id: "acts3-q4",
      type: "multiple-choice",
      question: "Why did Paul and Barnabas have such a sharp disagreement that they parted company (Acts 15:36–39)?",
      points: 1,
      options: [
        "They disagreed about whether Gentiles must be circumcised",
        "Barnabas wanted to stay in Antioch instead of traveling",
        "Barnabas wanted to take John Mark, who had deserted them in Pamphylia",
        "Paul wanted to sail for Rome, but Barnabas wanted to go to Egypt",
      ],
      correctAnswer: 2,
      explanation:
        "Paul did not think it wise to take Mark, “because he had deserted them in Pamphylia” (15:38). Barnabas took Mark and sailed for Cyprus, while Paul chose Silas and went through Syria and Cilicia (15:39–41).",
    },
    {
      id: "acts3-q5",
      type: "multiple-choice",
      question: "What does Acts 16:1 say about the parents of Timothy, the disciple Paul took along with him?",
      points: 1,
      options: [
        "His mother was a Jewish believer and his father was a Greek",
        "His father was a Jewish believer and his mother was a Greek",
        "Both of his parents were Jews from Tarsus",
        "His father was a Roman centurion who had believed",
      ],
      correctAnswer: 0,
      explanation:
        "Timothy lived in Lystra, and the believers at Lystra and Iconium spoke well of him (16:1–2). Paul circumcised him “because of the Jews who lived in that area, for they all knew that his father was a Greek” (16:3).",
    },
    {
      id: "acts3-q6",
      type: "multiple-choice",
      question: "In Acts 16:6–7, the Holy Spirit kept Paul's group from preaching in one province, and then the Spirit of Jesus would not allow them to enter another region. Which were they, in that order?",
      points: 1,
      options: [
        "Galatia, then Phrygia",
        "Cilicia, then Pamphylia",
        "Macedonia, then Achaia",
        "Asia, then Bithynia",
      ],
      correctAnswer: 3,
      explanation:
        "They traveled through Phrygia and Galatia, “having been kept by the Holy Spirit from preaching the word in the province of Asia” (16:6). At the border of Mysia they tried to enter Bithynia, “but the Spirit of Jesus would not allow them to” (16:7).",
    },
    {
      id: "acts3-q7",
      type: "multiple-choice",
      question: "Where was Paul when he had a vision of a man of Macedonia begging him, “Come over to Macedonia and help us” (Acts 16:8–9)?",
      points: 1,
      options: [
        "Ephesus",
        "Troas",
        "Antioch",
        "Tarsus",
      ],
      correctAnswer: 1,
      explanation:
        "They passed by Mysia and went down to Troas (16:8). From 16:10 the account switches to “we” (“we got ready at once to leave for Macedonia”), which many take to mean the writer of Acts had joined the group.",
    },
    {
      id: "acts3-q8",
      type: "spelling",
      question: "Lydia, a dealer in purple cloth and a worshiper of God, was baptized in Philippi with her household. Which city was she from (Acts 16:14)?",
      points: 1,
      correctAnswers: ["Thyatira"],
    },
    {
      id: "acts3-q9",
      type: "multiple-choice",
      question: "When the Philippian jailer asked, “Sirs, what must I do to be saved?” what did Paul and Silas answer (Acts 16:30–31)?",
      points: 1,
      options: [
        "Keep the law of Moses and be circumcised",
        "Sell everything you have and give to the poor",
        "Set us free, and the Lord will spare your household",
        "Believe in the Lord Jesus, and you will be saved",
      ],
      correctAnswer: 3,
      explanation:
        "They replied, “Believe in the Lord Jesus, and you will be saved—you and your household” (16:31). They spoke the word of the Lord to all his household; that same night the jailer washed their wounds, and he and all his household were baptized (16:32–33).",
    },
    {
      id: "acts3-q10",
      type: "matching",
      question: "Put these events in Philippi in order (Acts 16:13–37): drag each onto 1st, 2nd, 3rd or 4th.",
      points: 4,
      matchPrompts: ["1st", "2nd", "3rd", "4th"],
      options: [
        "An earthquake shakes the prison at midnight",
        "Paul insists the magistrates come and escort them out",
        "Lydia and her household are baptized",
        "Paul commands a spirit to come out of a female slave",
      ],
      correctMatches: [2, 3, 0, 1],
      explanation:
        "Lydia was baptized after hearing Paul by the river (16:13–15), and Paul drove the spirit out of the female slave after “many days” (16:16–18). The earthquake struck at midnight (16:25–26), and the next day Paul, a Roman citizen, refused to leave quietly (16:37).",
    },
    {
      id: "acts3-q11",
      type: "ordered-list",
      question: "After leaving Philippi (Acts 16:40), Paul preached in four more cities before sailing for Syria from Cenchreae (18:18). Type them in the order he visited them.",
      points: 4,
      correctAnswers: ["Thessalonica", "Berea", "Athens", "Corinth"],
      orderedListHint: "Type the next city…",
      answerLayout: "reorderable",
    },
    {
      id: "acts3-q12",
      type: "multiple-choice",
      question: "In Thessalonica, jealous Jews formed a mob and rushed to whose house looking for Paul and Silas (Acts 17:5)?",
      points: 1,
      options: [
        "Crispus",
        "Titius Justus",
        "Jason",
        "Lydia",
      ],
      correctAnswer: 2,
      explanation:
        "Not finding Paul and Silas, they dragged Jason and some other believers before the city officials, and Jason and the others had to post bond (17:6–9). That night the believers sent Paul and Silas away to Berea (17:10).",
    },
    {
      id: "acts3-q13",
      type: "multiple-choice",
      question: "Why does Acts 17:11 say the Berean Jews were “of more noble character” than those in Thessalonica?",
      points: 1,
      options: [
        "They received the message eagerly and examined the Scriptures every day",
        "They gave generously to help the believers in Jerusalem during the famine",
        "They sold their fields and shared the money with everyone in need",
        "They tore down their idols and turned to God as soon as Paul preached",
      ],
      correctAnswer: 0,
      explanation:
        "They examined the Scriptures every day “to see if what Paul said was true,” and many believed (17:11–12). When agitators came from Thessalonica, the believers sent Paul to the coast while Silas and Timothy stayed in Berea (17:13–14).",
    },
    {
      id: "acts3-q14",
      type: "multiple-choice",
      question: "Paul was greatly distressed to see that Athens was full of idols. At the Areopagus, what inscription did he say he had found on one of their altars (Acts 17:23)?",
      points: 1,
      options: [
        "To the god of wisdom",
        "To Zeus, father of all",
        "To an unknown god",
        "To the god of the harvest",
      ],
      correctAnswer: 2,
      explanation:
        "Paul told them, “So you are ignorant of the very thing you worship—and this is what I am going to proclaim to you” (17:23). He then spoke of the God who made the world and “does not live in temples built by human hands” (17:24).",
    },
    {
      id: "acts3-q15",
      type: "multiple-choice",
      question: "In his speech at the Areopagus, what did Paul say God has given as proof that He will judge the world by the man He has appointed (Acts 17:31)?",
      points: 1,
      options: [
        "Sending rain and crops in their seasons",
        "Raising Him from the dead",
        "Writing His law on tablets of stone",
        "Sending signs in the sun, moon and stars",
      ],
      correctAnswer: 1,
      explanation:
        "God “has given proof of this to everyone by raising him from the dead” (17:31). When they heard about the resurrection, some sneered, but others said, “We want to hear you again on this subject” (17:32).",
    },
    {
      id: "acts3-q16",
      type: "multi-select",
      question: "Pick the two people Acts 17:34 names among those in Athens who believed.",
      points: 2,
      options: [
        "Dorcas",
        "Dionysius",
        "Drusilla",
        "Damaris",
        "Demetrius",
        "Bernice",
      ],
      correctOptions: [1, 3],
      explanation:
        "Dionysius was a member of the Areopagus, and Damaris was a woman; they believed along with “a number of others” (17:34).",
    },
    {
      id: "acts3-q17",
      type: "multiple-choice",
      question: "One night in Corinth, the Lord spoke to Paul in a vision. What did He say (Acts 18:9–10)?",
      points: 1,
      options: [
        "Do not be afraid; keep on speaking, do not be silent",
        "Leave this city quickly, because they will not accept your testimony",
        "Go back to Antioch and strengthen the churches there",
        "As you have testified in Jerusalem, so you must testify in Rome",
      ],
      correctAnswer: 0,
      explanation:
        "The Lord added, “For I am with you, and no one is going to attack and harm you, because I have many people in this city” (18:10). Paul stayed in Corinth for a year and a half, teaching the word of God (18:11).",
    },
    {
      id: "acts3-q18",
      type: "spelling",
      question: "Who was the proconsul of Achaia who refused to judge the case against Paul, saying it involved “words and names and your own law” (Acts 18:12–15)?",
      points: 1,
      correctAnswers: ["Gallio"],
    },
    {
      id: "acts3-q19",
      type: "multi-select",
      question: "Pick the four statements that are true of Aquila and Priscilla in Acts 18.",
      points: 4,
      options: [
        "They first met Paul in Athens",
        "Aquila was a native of Pontus",
        "They had left Italy because of an order from Claudius",
        "They were tentmakers, as Paul was",
        "They stayed in Corinth when Paul sailed for Syria",
        "Paul had baptized them in Philippi",
        "They explained the way of God more adequately to Apollos",
      ],
      correctOptions: [1, 2, 3, 6],
      explanation:
        "Aquila, a native of Pontus, had left Italy “because Claudius had ordered all Jews to leave Rome” (18:2), and he and Priscilla were tentmakers like Paul (18:3). They sailed with Paul to Ephesus (18:18–19), where they explained the way of God to Apollos more adequately (18:26).",
    },
    {
      id: "acts3-q20",
      type: "multiple-choice",
      question: "In Ephesus, Paul found about twelve disciples who had received only John's baptism. After they were baptized in the name of the Lord Jesus, what happened when Paul placed his hands on them (Acts 19:5–7)?",
      points: 1,
      options: [
        "They were healed of their sicknesses and began praising God aloud",
        "The Holy Spirit came on them, and they spoke in tongues and prophesied",
        "They saw a bright light from heaven and heard a voice speaking to them",
        "The building where they were meeting was shaken by an earthquake",
      ],
      correctAnswer: 1,
      explanation:
        "When Paul first asked them, they said, “No, we have not even heard that there is a Holy Spirit” (19:2). After being baptized in the name of the Lord Jesus, they received the Holy Spirit (19:5–6).",
    },
    {
      id: "acts3-q21",
      type: "spelling",
      question: "After some in the synagogue at Ephesus publicly maligned the Way, Paul took the disciples and held daily discussions in the lecture hall of a man named what (Acts 19:9)?",
      points: 1,
      correctAnswers: ["Tyrannus"],
    },
    {
      id: "acts3-q22",
      type: "matching",
      question: "How long did each last? Drag the right time span onto each part of Paul's ministry.",
      points: 4,
      matchPrompts: [
        "Reasoning in the synagogue at Thessalonica (17:2)",
        "Teaching the word of God in Corinth (18:11)",
        "Speaking boldly in the synagogue at Ephesus (19:8)",
        "Daily discussions in Ephesus after leaving the synagogue (19:10)",
      ],
      options: ["Two years", "Three Sabbath days", "Fourteen days", "Three months", "A year and a half", "Forty days"],
      correctMatches: [1, 4, 3, 0],
      explanation:
        "Paul reasoned in Thessalonica “on three Sabbath days” (17:2), stayed in Corinth “for a year and a half” (18:11), spoke in the Ephesus synagogue “for three months” (19:8), and held daily discussions in the lecture hall of Tyrannus “for two years” (19:10).",
    },
    {
      id: "acts3-q23",
      type: "spelling",
      question: "What was the name of the Jewish chief priest whose seven sons tried to drive out an evil spirit by invoking “the Jesus whom Paul preaches” (Acts 19:13–14)?",
      points: 1,
      correctAnswers: ["Sceva"],
    },
    {
      id: "acts3-q24",
      type: "multiple-choice",
      question: "In Ephesus, many believers came and openly confessed what they had done. What did those who had practiced sorcery do with their scrolls (Acts 19:18–19)?",
      points: 1,
      options: [
        "Sold them in the marketplace and gave the money to the church",
        "Buried them outside the city wall near the great temple of Artemis",
        "Gave them to the elders to be kept locked away in the synagogue",
        "Burned them publicly, though they were worth fifty thousand drachmas",
      ],
      correctAnswer: 3,
      explanation:
        "After God's extraordinary miracles through Paul and the beating of the seven sons, “the name of the Lord Jesus was held in high honor” (19:11–17). Those who had practiced sorcery burned their scrolls publicly, worth “fifty thousand drachmas” (19:19).",
    },
    {
      id: "acts3-q25",
      type: "multiple-choice",
      question: "Why did Demetrius stir up the craftsmen of Ephesus against Paul (Acts 19:24–27)?",
      points: 1,
      options: [
        "Paul had driven a fortune-telling spirit out of a female slave they owned",
        "Paul had refused to pay the tax for the city's temple",
        "Paul had publicly insulted the city's officials",
        "Paul's teaching threatened their trade in silver shrines of Artemis",
      ],
      correctAnswer: 3,
      explanation:
        "Demetrius, a silversmith, warned that “our trade will lose its good name” (19:27). In the theater, once the crowd realized Alexander was a Jew, they shouted “Great is Artemis of the Ephesians!” for about two hours (19:29–34).",
    },
    {
      id: "acts3-q26",
      type: "matching",
      question: "Drag each complaint made against Paul and his companions onto the city where it was made (Acts 16–19).",
      points: 4,
      matchPrompts: ["Philippi", "Thessalonica", "Corinth", "Ephesus"],
      options: [
        "He says that gods made by human hands are no gods at all",
        "They are advocating customs unlawful for us Romans to accept or practice",
        "He seems to be advocating foreign gods",
        "They are all defying Caesar's decrees, saying that there is another king",
        "This man is persuading the people to worship God in ways contrary to the law",
      ],
      correctMatches: [1, 3, 4, 0],
      explanation:
        "The female slave's owners spoke in Philippi (16:20–21), the mob that dragged Jason before the city officials in Thessalonica (17:6–7), the Jews before Gallio in Corinth (18:13), and Demetrius the silversmith in Ephesus (19:26). In Athens, some only remarked that Paul “seems to be advocating foreign gods” (17:18).",
    },
    {
      id: "acts3-q27",
      type: "spelling",
      question: "During Paul's long talk on the first day of the week, a young man sitting in a window sank into a deep sleep and fell from the third story. What was his name (Acts 20:9)?",
      points: 1,
      correctAnswers: ["Eutychus"],
    },
    {
      id: "acts3-q28",
      type: "multiple-choice",
      question: "Why did Paul decide to sail past Ephesus (Acts 20:16)?",
      points: 1,
      options: [
        "He had been banished from the city by the officials after the riot",
        "He was in a hurry to reach Jerusalem by the day of Pentecost",
        "He wanted to reach Rome before the winter sailing season ended",
        "A storm drove the ship past the harbor and on to Miletus",
      ],
      correctAnswer: 1,
      explanation:
        "Paul wanted “to avoid spending time in the province of Asia” and hoped to reach Jerusalem by Pentecost (20:16), so he sent to Ephesus for the elders of the church to meet him at Miletus (20:17).",
    },
    {
      id: "acts3-q29",
      type: "multiple-choice",
      question: "What did Paul warn the Ephesian elders would come in among them after he left (Acts 20:29)?",
      points: 1,
      options: [
        "A famine that would spread over the whole world",
        "Roman soldiers who would close the synagogues",
        "Savage wolves who would not spare the flock",
        "Magicians who would lead the people back to sorcery",
      ],
      correctAnswer: 2,
      explanation:
        "“Savage wolves will come in among you and will not spare the flock,” and even some of their own number would distort the truth (20:29–30). For three years Paul had warned each of them “night and day with tears” (20:31).",
    },
    {
      id: "acts3-q30",
      type: "multiple-choice",
      question: "In his farewell to the Ephesian elders at Miletus, Paul quoted words the Lord Jesus Himself said. What were they (Acts 20:35)?",
      points: 1,
      options: [
        "Freely you have received; freely give",
        "The worker deserves his wages",
        "Do to others as you would have them do to you",
        "It is more blessed to give than to receive",
      ],
      correctAnswer: 3,
      explanation:
        "Paul reminded them how his own hands had supplied his needs and how “we must help the weak” (20:34–35). Then they all knelt and prayed, grieved most of all that they “would never see his face again” (20:36–38).",
    },
    {
      id: "acts3-q31",
      type: "ordered-list",
      question: "From Miletus, Paul's group sailed straight to Kos on their way to Jerusalem. Type the five islands and towns where they stopped after Kos, in order (Acts 21:1–8, NIV spellings).",
      points: 5,
      correctAnswers: ["Rhodes", "Patara", "Tyre", "Ptolemais", "Caesarea"],
      orderedListHint: "Type the next place…",
      answerLayout: "reorderable",
    },
    {
      id: "acts3-q32",
      type: "multi-select",
      question: "On the way to Jerusalem, Paul's group stayed at the house of Philip (Acts 21:8–9). Pick the three things these verses say about him.",
      points: 3,
      options: [
        "He was one of the twelve apostles",
        "He was known as the evangelist",
        "He was a centurion in the Italian Regiment",
        "He was one of the Seven",
        "He lived by the sea in Joppa",
        "He had four unmarried daughters who prophesied",
      ],
      correctOptions: [1, 3, 5],
      explanation:
        "This was “Philip the evangelist, one of the Seven” (21:8), chosen with Stephen in Acts 6:5, not Philip the apostle. “He had four unmarried daughters who prophesied” (21:9).",
    },
    {
      id: "acts3-q33",
      type: "multiple-choice",
      question: "In Acts 21:10–11, the prophet Agabus came down from Judea and took Paul's belt. What did he do with it?",
      points: 1,
      options: [
        "Tore it in two, saying the church in Jerusalem would be divided over Paul",
        "Tied his own hands and feet, saying its owner would be bound in Jerusalem",
        "Threw it into the sea, saying Paul's ship would be wrecked on the way to Rome",
        "Wrapped it around Paul, saying the Lord would keep him safe in Jerusalem",
      ],
      correctAnswer: 1,
      explanation:
        "Agabus said the Jewish leaders in Jerusalem would “bind the owner of this belt and will hand him over to the Gentiles” (21:11). Paul answered that he was ready “not only to be bound, but also to die in Jerusalem for the name of the Lord Jesus” (21:13).",
    },
    {
      id: "acts3-q34",
      type: "multiple-choice",
      question: "Who was Mnason, and where was he from (Acts 21:16)?",
      points: 1,
      options: [
        "A man from Cyprus, one of the early disciples, who hosted Paul's group",
        "A believer from Thessalonica who had traveled with Paul from Greece",
        "A believer from Crete who sailed with Paul's group from Miletus",
        "A Roman soldier from Italy who guarded Paul in the barracks at night",
      ],
      correctAnswer: 0,
      explanation:
        "Disciples from Caesarea brought Paul's group to the home of Mnason, where they were to stay; he was “a man from Cyprus and one of the early disciples” (21:16).",
    },
    {
      id: "acts3-q35",
      type: "multiple-choice",
      question: "In Jerusalem, what did James and the elders urge Paul to do so that everyone would know he was living in obedience to the law (Acts 21:18–24)?",
      points: 1,
      options: [
        "Offer a sacrifice in the temple on behalf of the Gentile believers",
        "Stop preaching in the synagogues of Jerusalem",
        "Join four men in their purification rites and pay their expenses",
        "Read the council's letter aloud in the temple courts",
      ],
      correctAnswer: 2,
      explanation:
        "Thousands of Jewish believers had been told that Paul taught the Jews living among the Gentiles “to turn away from Moses” (21:20–21). The next day Paul purified himself with the four men, and when the seven days were nearly over he was seized at the temple (21:26–27).",
    },
    {
      id: "acts3-q36",
      type: "multiple-choice",
      question: "In Acts 21:27–29, Jews from the province of Asia seized Paul at the temple, assuming he had brought a Greek into it. Whom had they seen with him in the city?",
      points: 1,
      options: [
        "Aristarchus",
        "Sopater",
        "Trophimus",
        "Gaius",
      ],
      correctAnswer: 2,
      explanation:
        "They had seen Trophimus the Ephesian with Paul and assumed Paul had brought him into the temple (21:29). The Roman commander rescued Paul from the mob, arrested him and bound him with two chains (21:31–33).",
    },
    {
      id: "acts3-q37",
      type: "multiple-choice",
      question: "As Paul was about to be taken into the barracks, he spoke to the Roman commander in Greek. Whom had the commander taken him to be (Acts 21:37–38)?",
      points: 1,
      options: [
        "Theudas, who claimed to be somebody and gathered four hundred men",
        "The Egyptian who led four thousand terrorists out into the wilderness",
        "Judas the Galilean, who led a band of people in revolt at the census",
        "Simon, who had amazed all the people of Samaria with his sorcery",
      ],
      correctAnswer: 1,
      explanation:
        "The commander asked, “Aren't you the Egyptian who started a revolt and led four thousand terrorists out into the wilderness some time ago?” (21:38). Paul answered, “I am a Jew, from Tarsus in Cilicia, a citizen of no ordinary city” (21:39).",
    },
  ],
}

const actsChapters22To28Quiz: Assessment = {
  id: "acts-22-28-quiz",
  courseId: "8",
  title: "Acts Chapters 22–28 Quiz",
  description:
    "Review the events, people, places, and timeline of Acts 22–28, from Paul's defense before the crowd in Jerusalem to the close of the book.",
  type: "quiz",
  timeLimit: 45,
  createdAt: "2026-10-24T10:00:00Z",
  questions: [
    {
      id: "acts4-q1",
      type: "spelling",
      question: "Paul told the crowd he was brought up in Jerusalem. Under which teacher was he thoroughly trained in the law (Acts 22:3)?",
      points: 1,
      correctAnswers: ["Gamaliel"],
    },
    {
      id: "acts4-q2",
      type: "multiple-choice",
      question: "The crowd in Jerusalem listened quietly to Paul's defense until he said what (Acts 22:21–22)?",
      points: 1,
      options: [
        "The Lord was sending him far away to the Gentiles",
        "He had seen Jesus on the road to Damascus",
        "He had been trained in the law in Jerusalem",
        "He had approved of the killing of Stephen",
      ],
      correctAnswer: 0,
      explanation:
        "Paul spoke to them in Aramaic (22:2). When he told them the Lord had said, “Go; I will send you far away to the Gentiles” (22:21), they raised their voices and called for his death.",
    },
    {
      id: "acts4-q3",
      type: "multiple-choice",
      question: "What stopped the commander from having Paul flogged and interrogated (Acts 22:24–29)?",
      points: 1,
      options: [
        "The crowd demanded that Paul be set free",
        "The Sanhedrin claimed the case for itself",
        "Paul offered to pay a fine for the riot",
        "Paul revealed that he was a Roman citizen",
      ],
      correctAnswer: 3,
      explanation:
        "Paul asked the centurion, “Is it legal for you to flog a Roman citizen who hasn't even been found guilty?” (22:25). The commander had paid a lot of money for his own citizenship, but Paul said, “I was born a citizen” (22:28).",
    },
    {
      id: "acts4-q4",
      type: "multiple-choice",
      question: "Who was the high priest when Paul appeared before the Sanhedrin (Acts 23:2)?",
      points: 1,
      options: [
        "Caiaphas",
        "Ananias",
        "Annas",
        "Sceva",
      ],
      correctAnswer: 1,
      explanation:
        "Ananias ordered those near Paul to strike him on the mouth, and Paul called him a “whitewashed wall” (23:3). Told he had insulted God's high priest, Paul replied, “Brothers, I did not realize that he was the high priest” (23:5).",
    },
    {
      id: "acts4-q5",
      type: "multi-select",
      question: "When Paul called out in the Sanhedrin that he was a Pharisee, the assembly was divided. Pick the three things Acts 23:8 says the Sadducees do not believe in.",
      points: 3,
      options: [
        "Angels",
        "Circumcision",
        "The resurrection",
        "The Sabbath",
        "Spirits",
        "Sacrifices",
      ],
      correctOptions: [0, 2, 4],
      explanation:
        "“The Sadducees say that there is no resurrection, and that there are neither angels nor spirits, but the Pharisees believe all these things” (23:8). Paul had said he was on trial “because of the hope of the resurrection of the dead” (23:6).",
    },
    {
      id: "acts4-q6",
      type: "multiple-choice",
      question: "The night after the Sanhedrin hearing, the Lord stood near Paul. What were His first words to Paul (Acts 23:11)?",
      points: 1,
      options: [
        "Do not be afraid!",
        "Take courage!",
        "Get up and go!",
        "Peace be with you!",
      ],
      correctAnswer: 1,
      explanation:
        "“Take courage! As you have testified about me in Jerusalem, so you must also testify in Rome” (23:11). The rest of Acts shows that promise being kept.",
    },
    {
      id: "acts4-q7",
      type: "multiple-choice",
      question: "More than forty men bound themselves with an oath not to eat or drink until they had killed Paul. Who heard of the ambush and warned him (Acts 23:12–16)?",
      points: 1,
      options: [
        "The son of Paul's sister",
        "A servant of the high priest",
        "A centurion in the barracks",
        "A Pharisee from the Sanhedrin",
      ],
      correctAnswer: 0,
      explanation:
        "Paul's nephew went into the barracks and told Paul, who sent him to the commander (23:16–17). That night the commander ordered a detachment of 200 soldiers, 70 horsemen and 200 spearmen to take Paul safely to Governor Felix in Caesarea (23:23–24).",
    },
    {
      id: "acts4-q8",
      type: "spelling",
      question: "What was the name of the commander who sent Paul to Governor Felix with a letter (Acts 23:26)?",
      points: 1,
      correctAnswers: ["Claudius Lysias", "Lysias", "Claudius"],
    },
    {
      id: "acts4-q9",
      type: "multiple-choice",
      question: "The soldiers took Paul out of Jerusalem by night. Where did they bring him before the cavalry took him on to Caesarea (Acts 23:31–32)?",
      points: 1,
      options: [
        "Antipatris",
        "Joppa",
        "Lydda",
        "Samaria",
      ],
      correctAnswer: 0,
      explanation:
        "The soldiers brought Paul as far as Antipatris; the next day the cavalry went on with him to Caesarea, where Felix had him kept under guard in Herod's palace (23:32–35).",
    },
    {
      id: "acts4-q10",
      type: "spelling",
      question: "The high priest came down to Caesarea with some elders and a lawyer, who presented the case against Paul before Governor Felix. What was the lawyer's name (Acts 24:1–2)?",
      points: 1,
      correctAnswers: ["Tertullus"],
    },
    {
      id: "acts4-q11",
      type: "multiple-choice",
      question: "Before Felix, the lawyer called Paul a troublemaker, stirring up riots among the Jews. Of which group did he say Paul was a ringleader (Acts 24:5)?",
      points: 1,
      options: [
        "The Pharisees",
        "The Zealots",
        "The Nazarene sect",
        "The Hellenistic Jews",
      ],
      correctAnswer: 2,
      explanation:
        "“He is a ringleader of the Nazarene sect” (24:5). Paul answered that he worshiped the God of their ancestors “as a follower of the Way, which they call a sect” (24:14).",
    },
    {
      id: "acts4-q12",
      type: "multi-select",
      question: "Felix came with his wife Drusilla and sent for Paul to hear him speak about faith in Christ Jesus. Pick the three topics that made Felix afraid (Acts 24:24–25).",
      points: 3,
      options: [
        "Righteousness",
        "Circumcision",
        "Giving to the poor",
        "Self-control",
        "The kingdom of God",
        "The judgment to come",
      ],
      correctOptions: [0, 3, 5],
      explanation:
        "As Paul talked about righteousness, self-control and the judgment to come, Felix was afraid and sent him away until he found it convenient to listen again (24:25).",
    },
    {
      id: "acts4-q13",
      type: "multiple-choice",
      question: "Why did Felix send for Paul so often and talk with him (Acts 24:26)?",
      points: 1,
      options: [
        "He wanted Paul to baptize him",
        "He needed evidence for the Sanhedrin",
        "He wanted Paul's help to calm the Jews",
        "He hoped Paul would offer him a bribe",
      ],
      correctAnswer: 3,
      explanation:
        "Felix was hoping for a bribe. When Porcius Festus succeeded him, Felix left Paul in prison as a favor to the Jews (24:27).",
    },
    {
      id: "acts4-q14",
      type: "multiple-choice",
      question: "When Festus first went up to Jerusalem, what did the chief priests and Jewish leaders ask him to do (Acts 25:1–3)?",
      points: 1,
      options: [
        "Send Paul to Rome to stand trial before Caesar",
        "Transfer Paul to Jerusalem as a favor to them",
        "Hand Paul over to King Agrippa to be judged",
        "Release Paul since they dropped their charges",
      ],
      correctAnswer: 1,
      explanation:
        "They were preparing an ambush to kill Paul along the way (25:3). Festus answered that Paul was being held at Caesarea and told some of their leaders to come with him and press charges there (25:4–5).",
    },
    {
      id: "acts4-q15",
      type: "multi-select",
      question: "Standing before Festus in Caesarea, Paul made his defense. Pick the three things he said he had done nothing wrong against (Acts 25:8).",
      points: 3,
      options: [
        "The Roman army",
        "The Jewish law",
        "The temple",
        "The city of Jerusalem",
        "The governor",
        "Caesar",
      ],
      correctOptions: [1, 2, 5],
      explanation:
        "“I have done nothing wrong against the Jewish law or against the temple or against Caesar” (25:8). His accusers brought many serious charges, but they could not prove them (25:7).",
    },
    {
      id: "acts4-q16",
      type: "multiple-choice",
      question: "What led Paul to appeal to Caesar (Acts 25:9–11)?",
      points: 1,
      options: [
        "Festus asked if he would stand trial in Jerusalem",
        "Festus sentenced him to death for desecrating the temple",
        "King Agrippa refused to hear his case",
        "The Sanhedrin found him guilty of blasphemy",
      ],
      correctAnswer: 0,
      explanation:
        "Festus, wishing to do the Jews a favor, asked whether Paul would go up to Jerusalem and stand trial there (25:9). Paul answered that he was already standing before Caesar's court and declared, “I appeal to Caesar!” (25:10–11).",
    },
    {
      id: "acts4-q17",
      type: "spelling",
      question: "A few days later King Agrippa arrived at Caesarea to pay his respects to Festus. Who came with him (Acts 25:13)?",
      points: 1,
      correctAnswers: ["Bernice", "Berenice"],
    },
    {
      id: "acts4-q18",
      type: "multiple-choice",
      question: "Telling Agrippa about the road to Damascus, Paul said the voice asked, “Saul, Saul, why do you persecute me?” What did it go on to say was hard for him (Acts 26:14)?",
      points: 1,
      options: [
        "To look into the light from heaven",
        "To stand before kings and governors",
        "To kick against the goads",
        "To bear the weight of his sin",
      ],
      correctAnswer: 2,
      explanation:
        "“It is hard for you to kick against the goads” (26:14). In farming, a goad was a pointed stick for driving oxen; an animal that kicked against it only hurt itself.",
    },
    {
      id: "acts4-q19",
      type: "multiple-choice",
      question: "According to Acts 26:16–18, what did Jesus appoint Paul to do?",
      points: 1,
      options: [
        "Lead the church in Jerusalem alongside Peter and James",
        "Write down the law of Moses for the Gentiles",
        "Return to Tarsus and teach in its synagogues",
        "Be His witness and turn people from darkness to light",
      ],
      correctAnswer: 3,
      explanation:
        "Jesus appointed Paul “as a servant and as a witness” and sent him “to open their eyes and turn them from darkness to light” (26:16–18). Paul said, “I was not disobedient to the vision from heaven” (26:19).",
    },
    {
      id: "acts4-q20",
      type: "multi-select",
      question: "After Paul's defense before Agrippa, those who had heard him said to one another, “This man is not doing anything that deserves ___ or ___.” Pick the two punishments Acts 26:31 names.",
      points: 2,
      options: [
        "Death",
        "Flogging",
        "Imprisonment",
        "Exile",
        "Stoning",
        "A fine",
      ],
      correctOptions: [0, 2],
      explanation:
        "“This man is not doing anything that deserves death or imprisonment” (26:31). Agrippa told Festus, “This man could have been set free if he had not appealed to Caesar” (26:32).",
    },
    {
      id: "acts4-q21",
      type: "matching",
      question: "Drag each speaker onto the words they said.",
      points: 4,
      matchPrompts: [
        "“Rid the earth of him! He's not fit to live!”",
        "“That's enough for now! You may leave.”",
        "“You are out of your mind, Paul!”",
        "“Do you think that in such a short time you can persuade me to be a Christian?”",
      ],
      options: ["Festus", "The crowd in Jerusalem", "King Agrippa", "Drusilla", "Felix"],
      correctMatches: [1, 4, 0, 2],
      explanation:
        "The crowd shouted for Paul's death when he mentioned the Gentiles (22:22); Felix sent Paul away when he grew afraid (24:25); Festus interrupted Paul's defense (26:24); and Agrippa answered Paul's question about the prophets (26:27–28). Drusilla is not quoted.",
    },
    {
      id: "acts4-q22",
      type: "multiple-choice",
      question: "Paul and some other prisoners were handed over to a centurion of the Imperial Regiment for the voyage to Italy. What was his name (Acts 27:1)?",
      points: 1,
      options: [
        "Cornelius",
        "Aristarchus",
        "Demetrius",
        "Julius",
      ],
      correctAnswer: 3,
      explanation:
        "Julius treated Paul kindly (27:3). Aristarchus, a Macedonian from Thessalonica, sailed with them (27:2), and Cornelius was the centurion Peter visited in Caesarea (Acts 10).",
    },
    {
      id: "acts4-q23",
      type: "matching",
      question: "Drag each place onto the part of the voyage it belongs to (Acts 27:1–12).",
      points: 4,
      matchPrompts: [
        "The centurion let Paul visit his friends so they could provide for his needs",
        "The centurion found an Alexandrian ship sailing for Italy",
        "Paul warned that the voyage would be disastrous",
        "The harbor in Crete where the majority hoped to spend the winter",
      ],
      options: ["Fair Havens", "Phoenix", "Sidon", "Cnidus", "Myra"],
      correctMatches: [2, 4, 0, 1],
      explanation:
        "At Sidon Julius let Paul visit friends (27:3); at Myra in Lycia they boarded an Alexandrian ship (27:5–6); at Fair Havens on Crete Paul warned of disaster (27:8–10); and the majority hoped to reach Phoenix for the winter (27:12). The wind kept them from holding course near Cnidus (27:7).",
    },
    {
      id: "acts4-q24",
      type: "multiple-choice",
      question: "Sailing had already become dangerous because which Jewish holy day had passed (Acts 27:9)?",
      points: 1,
      options: [
        "The Day of Atonement",
        "Passover",
        "Pentecost",
        "The Festival of Unleavened Bread",
      ],
      correctAnswer: 0,
      explanation:
        "The Day of Atonement fell on the tenth day of the seventh month (Leviticus 23:27), in September or October, when storms made sailing dangerous. Paul warned that the voyage would be “disastrous and bring great loss” (27:10).",
    },
    {
      id: "acts4-q25",
      type: "multiple-choice",
      question: "After many days of storm, what did the angel of God tell Paul (Acts 27:23–24)?",
      points: 1,
      options: [
        "The ship and its cargo would reach Italy safely",
        "Only Paul and his companions would survive",
        "He would stand before Caesar, and all would live",
        "He would stand before Caesar, but the crew would be lost",
      ],
      correctAnswer: 2,
      explanation:
        "“Do not be afraid, Paul. You must stand trial before Caesar; and God has graciously given you the lives of all who sail with you” (27:24). Only the ship would be lost (27:22).",
    },
    {
      id: "acts4-q26",
      type: "multiple-choice",
      question: "Just before dawn, as everyone waited for daylight, what did Paul do (Acts 27:33–35)?",
      points: 1,
      options: [
        "Ordered the grain to be thrown into the sea",
        "Told the sailors to cut the anchors loose",
        "Urged everyone to eat, then gave thanks and broke bread",
        "Asked the centurion to free the prisoners",
      ],
      correctAnswer: 2,
      explanation:
        "“You need it to survive. Not one of you will lose a single hair from his head” (27:34). He gave thanks to God in front of them all and began to eat, and they were all encouraged (27:35–36).",
    },
    {
      id: "acts4-q27",
      type: "multiple-choice",
      question: "How many people were on board the ship (Acts 27:37)?",
      points: 1,
      options: [
        "120",
        "276",
        "75",
        "200",
      ],
      correctAnswer: 1,
      explanation:
        "“Altogether there were 276 of us on board” (27:37). Every one of them reached land safely, some swimming and the rest on planks or pieces of the ship (27:44).",
    },
    {
      id: "acts4-q28",
      type: "spelling",
      question: "What was the name of the island where Paul was shipwrecked (Acts 28:1)?",
      points: 1,
      correctAnswers: ["Malta", "Melita"],
    },
    {
      id: "acts4-q29",
      type: "multiple-choice",
      question: "As Paul put a pile of brushwood on the fire, what fastened itself on his hand (Acts 28:3)?",
      points: 1,
      options: [
        "A viper",
        "A scorpion",
        "A wasp",
        "A lizard",
      ],
      correctAnswer: 0,
      explanation:
        "The islanders first said he must be a murderer whom the goddess Justice would not allow to live. When he suffered no ill effects, they changed their minds and said he was a god (28:4–6).",
    },
    {
      id: "acts4-q30",
      type: "multiple-choice",
      question: "Who was the island's chief official, whose father Paul healed of fever and dysentery (Acts 28:7–8)?",
      points: 1,
      options: [
        "Sergius Paulus",
        "Gallio",
        "Publius",
        "Dionysius",
      ],
      correctAnswer: 2,
      explanation:
        "Publius welcomed them and showed them generous hospitality. Paul prayed, placed his hands on his father and healed him, and the rest of the sick on the island came and were cured (28:8–9).",
    },
    {
      id: "acts4-q31",
      type: "matching",
      question: "Drag each length of time onto the event it measures.",
      points: 4,
      matchPrompts: [
        "Paul kept in custody in Caesarea until Porcius Festus succeeded Felix (Acts 24:27)",
        "Everyone on board going without food during the storm (Acts 27:33)",
        "The chief official's generous hospitality after the shipwreck (Acts 28:7)",
        "The stay on the island before sailing on in an Alexandrian ship (Acts 28:11)",
      ],
      options: ["Three months", "Two years", "Forty days", "Three days", "Fourteen days"],
      correctMatches: [1, 4, 3, 0],
      explanation:
        "Paul was held for two years before Festus succeeded Felix (24:27); Paul urged the men to eat after fourteen days without food (27:33); Publius hosted them for three days (28:7); and they set sail after three months (28:11).",
    },
    {
      id: "acts4-q32",
      type: "ordered-list",
      question: "Leaving the island in an Alexandrian ship, Paul's party put in at three ports before going on to Rome. Type the three ports Acts 28:12–13 names, then arrange them in the order they were reached.",
      points: 3,
      correctAnswers: ["Syracuse", "Rhegium", "Puteoli"],
      orderedListHint: "Type the next place…",
      answerLayout: "reorderable",
    },
    {
      id: "acts4-q33",
      type: "multiple-choice",
      question: "Believers from Rome traveled as far as the Forum of Appius and the Three Taverns to meet Paul. How did he respond when he saw them (Acts 28:15)?",
      points: 1,
      options: [
        "He wept because he was in chains",
        "He urged them to go back before the guards saw them",
        "He sent them to gather the Jewish leaders",
        "He thanked God and was encouraged",
      ],
      correctAnswer: 3,
      explanation:
        "“At the sight of these people Paul thanked God and was encouraged” (28:15). In Rome he was allowed to live by himself, with a soldier to guard him (28:16).",
    },
    {
      id: "acts4-q34",
      type: "multiple-choice",
      question: "When some of the Jewish leaders in Rome would not believe, which prophet did Paul quote about people who are “ever hearing but never understanding” (Acts 28:25–27)?",
      points: 1,
      options: [
        "Jeremiah",
        "Isaiah",
        "Joel",
        "Ezekiel",
      ],
      correctAnswer: 1,
      explanation:
        "Paul quoted Isaiah 6:9–10, then declared that God's salvation had been sent to the Gentiles, “and they will listen!” (28:28).",
    },
    {
      id: "acts4-q35",
      type: "multiple-choice",
      question: "How does the book of Acts end (Acts 28:30–31)?",
      points: 1,
      options: [
        "Paul is tried before Caesar and set free",
        "Paul sails on to preach the gospel in Spain",
        "Paul is put to death in Rome under Nero",
        "Paul preaches boldly from his rented house",
      ],
      correctAnswer: 3,
      explanation:
        "For two whole years Paul stayed in his own rented house, welcomed all who came to see him, and proclaimed the kingdom of God “with all boldness and without hindrance!” (28:30–31).",
    },
    {
      id: "acts4-q36",
      type: "matching",
      question: "Put these events from Acts 22–28 in order: drag each one onto its place in the timeline.",
      points: 5,
      matchPrompts: ["1st", "2nd", "3rd", "4th", "5th"],
      options: [
        "Festus discusses Paul's case with King Agrippa",
        "Paul heals the chief official's father",
        "The high priest orders Paul struck on the mouth",
        "The sailors try to escape in the lifeboat",
        "Paul appeals to Caesar",
      ],
      correctMatches: [2, 4, 0, 3, 1],
      explanation:
        "The high priest ordered Paul struck (23:2); Paul appealed to Caesar (25:11) before Festus discussed his case with King Agrippa (25:14); the sailors tried to escape in the lifeboat (27:30); and on the island Paul healed the chief official's father (28:8).",
    },
  ],
}

const booksOfTheBibleQuiz: Assessment = {
  id: "books-of-the-bible-quiz",
  courseId: "8",
  title: "Books of the Bible Quiz",
  description:
    "Put all 66 books of the Bible in order: the 39 books of the Old Testament and the 27 books of the New Testament.",
  type: "quiz",
  timeLimit: 20,
  createdAt: "2026-10-24T10:00:00Z",
  questions: [
    {
      id: "bob-q1",
      type: "ordered-list",
      question: "Write the 39 books of the Old Testament, Genesis through Malachi, in order.",
      points: 39,
      correctAnswers: [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
        "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs", "Isaiah", "Jeremiah",
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
        "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
    {
      id: "bob-q2",
      type: "ordered-list",
      question: "Write the 27 books of the New Testament, Matthew through Revelation, in order.",
      points: 27,
      correctAnswers: [
        "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
        "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
        "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
        "Revelation",
      ],
      orderedListHint: "Type the next book…",
      answerLayout: "reorderable",
    },
  ],
}

export const dummyAssessments: Assessment[] = [
  wordOfGodStudyQuiz,
  discipleshipStudyQuiz,
  comingOfTheKingdomStudyQuiz,
  sinAndRepentanceStudyQuiz,
  lightAndDarknessStudyQuiz,
  theCrossStudyQuiz,
  theChurchStudyQuiz,
  actsChapters1To7Quiz,
  actsChapters8To14Quiz,
  actsChapters15To21Quiz,
  actsChapters22To28Quiz,
  booksOfTheBibleQuiz,
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
