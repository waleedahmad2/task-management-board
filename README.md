# Task Management Board

A modern, responsive task management application built with React, TypeScript, and Vite. Features a comprehensive project management system with Kanban boards, drag-and-drop functionality, and real-time updates.

## 🚀 Features

### Project Management
- **Project Listings**: View all projects with search and pagination
- **Project Cards**: Beautiful project cards with team member avatars
- **Status Tracking**: Projects organized by status (Active, Draft, Archived)
- **Team Management**: Project owners and team member management

### Kanban Board
- **Drag & Drop**: Intuitive task movement between columns
- **Multiple Columns**: Backlog, In Progress, Review, Done
- **Task Management**: Create, edit, and delete tasks with validation
- **Optimistic Updates**: Instant UI feedback with background persistence
- **Lazy Loading**: Paginated task loading for performance

### User Experience
- **Responsive Design**: Works seamlessly on desktop
- **Dark/Light Theme**: Modern UI with Tailwind CSS
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, ShadCN/UI components
- **State Management**: React Hooks (useState, useCallback, useMemo)
- **Drag & Drop**: @dnd-kit for smooth interactions
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Development**: ESLint, Prettier, TypeScript strict mode

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── Pagination/  # Modular pagination components
│   │   ├── GenericTable.tsx
│   │   └── AppHeader.tsx
│   ├── projects/        # Project-related components
│   ├── kanban/          # Kanban board components
│   ├── skeletons/       # Loading skeleton components
│   └── ui/             # Base UI components
├── types/              # TypeScript type definitions
│   ├── projects/       # Project-specific types
│   ├── genericTable/   # Table component types
│   └── auth/          # Authentication types
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants/         # Application constants
├── services/          # API services
└── pages/            # Page components
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v24 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-board
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3001
   ```

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build

# Code Quality
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn type-check   # Run TypeScript compiler

# Testing
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode
```

## 🎯 Key Features Implementation

### Drag & Drop System
- **@dnd-kit Integration**: Smooth drag and drop with accessibility support
- **Optimistic Updates**: Immediate UI feedback with rollback on errors
- **Cross-column Movement**: Tasks can be moved between any columns
- **Order Persistence**: Maintains task order within columns

### Component Architecture
- **Modular Design**: Components split into logical, reusable pieces
- **Type Safety**: Comprehensive TypeScript interfaces
- **Barrel Exports**: Clean import/export structure
- **Custom Hooks**: Reusable logic extraction

### Performance Optimizations
- **Memoization**: Strategic use of useMemo and useCallback
- **Lazy Loading**: Paginated data loading
- **Skeleton Loaders**: Perceived performance improvements
- **Code Splitting**: Route-based code splitting

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-first approach
- **Loading States**: Skeleton loaders for better UX
- **Error Boundaries**: Graceful error handling
- **Toast Notifications**: User feedback system
- **Accessibility**: ARIA labels and keyboard navigation

## 📝 Development Guidelines

### Import Order
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. External libraries
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// 3. Internal imports (use # alias)
import { Button } from '#/components/ui/Button';
import { Project } from '#/types';
import { cn } from '#/utils';
```

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all props and data structures
- Prefer type over interface for simple unions
- Use generic types for reusable components

### Component Structure
```typescript
// 1. Imports
// 2. Type definitions
// 3. Component implementation
// 4. Export
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   yarn lint
   yarn type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Maintain test coverage for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [React](https://reactjs.org/) for the amazing UI library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [@dnd-kit](https://dndkit.com/) for the accessible drag and drop functionality
- [ShadCN/UI](https://ui.shadcn.com/) for the beautiful component library