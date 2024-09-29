# PhilaReact Community Platform

A community platform for React developers in Philadelphia, built with Next.js 14, TypeScript, and Tailwind CSS. PhilaReact enables developers to connect, share knowledge, and collaborate through events, forums, and resource sharing.

![PhilaReact Logo](/public/philly-react-4.png)

## Features

- 🗓️ **Event Management**: Schedule and manage community meetups
- 💬 **Discussion Forum**: Engage in technical discussions
- 📚 **Resource Library**: Access curated React and Next.js resources
- 📰 **News Feed**: Stay updated with latest React articles
- 🐛 **Bug Tracking**: Contribute to platform improvement

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google Provider
- **State Management**: React Hooks
- **UI Components**: HeadlessUI
- **Icons**: Heroicons, FontAwesome, pqoqubbw
- **Calendar**: React Big Calendar
- **Notifications**: Sonner
- **Development**: ESLint, Prettier

## Prerequisites

- Node.js 18+
- PostgreSQL
- Git
- npm or yarn
- Google OAuth credentials

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/dmostoller/philareact.git
   cd philareact
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/philareact"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development Workflow

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Follow the existing code style
   - Add comments for complex logic
   - Update tests if needed

3. **Commit Changes**

   - Use conventional commit messages:

     ```bash
     git commit -m "feat: add new feature"
     git commit -m "fix: resolve bug issue"
     git commit -m "docs: update documentation"
     ```

4. **Push Changes**

   ```bash
   git push origin feature/your-feature-name
   ```

## Making a Pull Request

1. **Update Your Fork**

   ```bash
   git remote add upstream https://github.com/dmostoller/philareact.git
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create Pull Request**

   - Go to GitHub and create a new PR
   - Use the PR template
   - Add detailed description of changes
   - Link related issues
   - Add screenshots if UI changes

3. **PR Review Process**
   - Automated checks must pass
   - Review required from maintainers
   - Address feedback promptly
   - Squash commits if requested

## Contribution Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Update documentation for new features
- Add tests for new functionality
- Keep PRs focused and atomic

## Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Run Prettier before committing
- Use meaningful variable names
- Keep functions small and focused

## Testing

```bash
# Run tests
npm run test

# Run linting
npm run lint
```

## Troubleshooting

Common issues and solutions:

1. **Database Connection**

   - Verify PostgreSQL is running
   - Check `DATABASE_URL` format
   - Run `prisma generate`

2. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check `NEXTAUTH` configuration
   - Ensure environment variables are set

## Support

- Create an issue for bugs
- Use discussions for questions

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

- [Visit our Website](https://www.philareact.org/)

Made with ❤️ by the PhilaReact Community
