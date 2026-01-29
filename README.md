# Practise Lab

A comprehensive educational platform for students to access course notes, take quizzes, and track their academic progress.

## Features

### For Students
- **Course Dashboard**: View all enrolled courses with progress tracking
- **Markdown Notes**: Access organized course notes with full markdown support including syntax highlighting
- **Interactive Quizzes**: Three types of quiz questions:
  - Multiple Choice: Auto-graded with instant feedback
  - Written Response: Type answers for manual grading by tutors
  - File Upload: Submit files (code, documents, images) for review
- **Grade Tracking**: Monitor quiz performance and view detailed results
- **Detailed Feedback**: Receive tutor feedback on manually graded questions

### For Tutors
- **Grading Queue**: View all pending student submissions
- **Manual Grading Interface**: Grade written responses and file uploads
- **Provide Feedback**: Add personalized feedback for each question
- **Points Allocation**: Award partial credit based on student performance

## Getting Started

### Installation

1. Download the project files
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000)

### Using the App

#### As a Student

1. **Register/Sign In**: Create an account or sign in at the homepage
2. **Browse Courses**: View available courses on your dashboard
3. **Read Notes**: Click on any course to access markdown notes
4. **Take Quizzes**: Navigate to the Quizzes tab and start a quiz
   - Answer multiple choice questions
   - Type written responses
   - Upload files where requested
5. **View Grades**: Check the Grades page to see all quiz results
6. **Review Feedback**: Click "View Results" to see tutor feedback on manually graded questions

#### As a Tutor

1. **Switch to Tutor View**: Click your profile avatar and select "Switch to Tutor View"
2. **Access Grading Queue**: View all pending student submissions
3. **Grade Submissions**: 
   - Click "Grade Submission" on any pending quiz
   - Review student answers for written and file upload questions
   - Download submitted files
   - Award points (0 to max points for each question)
   - Add optional feedback
4. **Submit Grades**: Click "Submit Grades" to finalize and notify the student

## Question Types

### Multiple Choice
- Auto-graded instantly
- Shows correct answer and explanation
- Full points for correct answer, zero for incorrect

### Written Response
- Students type their answer
- Requires manual grading by tutor
- Tutor awards points and provides feedback

### File Upload
- Students upload files (.py, .java, .cpp, .js, .txt, images, etc.)
- Tutor downloads and reviews the file
- Tutor awards points and provides feedback

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Markdown**: react-markdown with syntax highlighting
- **Storage**: localStorage (will be replaced with Convex database)

## Color Scheme

- **Primary**: Blue - Used for branding and primary actions
- **Secondary**: White - Main background and card surfaces
- **Tertiary**: Yellow - Accents and pending status indicators

## Future Enhancements

- **Convex Integration**: Replace localStorage with Convex database
- **Real Authentication**: Implement secure user authentication
- **Real-time Updates**: Live notifications for graded submissions
- **Course Creation**: Allow tutors to create courses and add content
- **Analytics**: Track student progress over time
- **File Storage**: Proper file upload and storage system

## Project Structure

\`\`\`
app/
├── page.tsx                    # Landing page
├── sign-in/                    # Authentication
├── register/
├── dashboard/                  # Student dashboard
├── courses/[courseId]/         # Course pages
│   ├── notes/[noteId]/        # Note viewer
│   └── quizzes/[quizId]/      # Quiz taking & results
├── grades/                     # Student grades page
└── tutor/
    └── grading/               # Tutor grading interface

components/
├── auth/                       # Authentication forms
├── dashboard/                  # Dashboard components
├── courses/                    # Course components
├── notes/                      # Markdown renderer
├── quiz/                       # Quiz interface & results
├── grades/                     # Grades display
└── tutor/                      # Grading interface

lib/
└── dummy-data.ts              # Sample data (to be replaced with Convex)
\`\`\`

## Demo Data

The app includes sample data with:
- 4 courses (CS101, CS201, CS301, CS202)
- Multiple notes per course with markdown content
- 2 quizzes with mixed question types
- Sample quiz attempts (graded and pending)

## Notes

- The app currently uses localStorage for demonstration purposes
- File uploads are simulated (files are not actually stored)
- Switch between Student and Tutor views using the profile dropdown
- All data persists in browser localStorage until cleared
