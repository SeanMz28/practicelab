# PracticeLab

A comprehensive educational platform for students to access course notes, take quizzes, and track their academic progress.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS
- **Database**: Convex (real-time database)
- **Authentication**: WorkOS AuthKit (Google OAuth + Email Magic Auth)
- **Styling**: Tailwind CSS + shadcn/ui components

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

### Prerequisites

- Node.js 20.9.0 or later
- A Convex account (free at [convex.dev](https://convex.dev))
- A WorkOS account (free at [workos.com](https://workos.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SeanMz28/practicelab.git
   cd practicelab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your credentials:
   - **Convex**: Run `npx convex dev` to get your Convex deployment URL
   - **WorkOS**: Get credentials from your [WorkOS Dashboard](https://dashboard.workos.com)

4. Start the Convex development server:
   ```bash
   npx convex dev
   ```

5. In a new terminal, run the Next.js development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Authentication Setup (WorkOS AuthKit)

1. Create an account at [workos.com](https://workos.com)
2. Go to your [WorkOS Dashboard](https://dashboard.workos.com)
3. Navigate to "Authentication" > "AuthKit"
4. Enable the following authentication methods:
   - **Google OAuth**: Enable and configure with your Google Cloud credentials
   - **Email + Magic Auth**: Enable for passwordless email sign-in

5. Configure your redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback`
   - Production: `https://yourdomain.com/api/auth/callback`

6. Copy your credentials to `.env.local`:
   ```
   WORKOS_CLIENT_ID=client_xxxxx
   WORKOS_API_KEY=sk_test_xxxxx
   WORKOS_COOKIE_PASSWORD=<32-character-random-string>
   ```

7. Generate a cookie password (32+ characters):
   ```bash
   openssl rand -base64 32
   ```

### User Roles

PracticeLab has three user roles:
- **Student** (default): Can view courses, take assessments, view grades
- **Tutor**: Can create/manage courses, grade assessments
- **Admin**: Full system access

#### Assigning Tutor Role

By default, all new users are assigned the "student" role. To assign the tutor role:

**Option 1: Via Convex Dashboard (Recommended)**
1. Go to your [Convex Dashboard](https://dashboard.convex.dev)
2. Select your project (practicelab)
3. Navigate to the "Data" tab
4. Find the `users` table
5. Locate the user you want to make a tutor
6. Click on their record and change `role` from `"student"` to `"tutor"`
7. Save the changes

**Option 2: Via Convex Function (Programmatic)**
Run this in the Convex dashboard "Functions" tab:
```javascript
// Replace with the actual user ID from your database
await ctx.runMutation(api.users.updateRole, {
  userId: "user_id_here",
  role: "tutor"
});
```

The user will immediately have access to tutor features.

### Using the App

#### As a Student

1. **Sign In**: Use Google or enter your email to receive a magic code
2. **Complete Profile**: First-time users must complete their profile (name, surname)
3. **Browse Courses**: View available courses on your dashboard
4. **Read Notes**: Click on any course to access markdown notes
5. **Take Quizzes**: Navigate to the Quizzes tab and start a quiz
   - Answer multiple choice questions
   - Type written responses
   - Upload files where requested
6. **View Grades**: Check the Grades page to see all quiz results
7. **Review Feedback**: Click "View Results" to see tutor feedback on manually graded questions

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
