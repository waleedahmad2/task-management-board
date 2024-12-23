# Contributing Guidelines

This document outlines our team's code acceptance criteria and best practices for our React application. Following these guidelines ensures consistency and maintainability across our codebase.

## Code Style and Formatting

### CSS Guidelines
- Avoid using percentage values for positioning attributes (e.g., `top`, `left`, `right`, `bottom`)
  ```css
  /* ❌ Don't do this */
  .element {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  /* ✅ Do this instead */
  .element {
    position: absolute;
    top: 50px;
    left: 50px;
  }
  ```

### Event Handler Naming
- Use descriptive names for event handlers that indicate the action being performed
- Avoid generic names like `handle` or `handleClick`

```jsx
/* ❌ Don't do this */
const handle = (e) => {
  // ...
};

/* ✅ Do this instead */
const updateUserProfile = (e) => {
  // ...
};
```

### Documentation
- Use JSDoc comments only for:
  1. Utility functions
  2. Component function declarations
- Avoid excessive documentation for self-explanatory code

```jsx
/* ✅ Good - JSDoc for utility function */
/**
 * Formats a date string into a localized date format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  // ...
};

/* ❌ Don't do this - over-documentation */
/**
 * Renders a button
 * @param {string} label - The button text
 * @returns {JSX.Element} The button element
 */
const Button = ({ label }) => <button>{label}</button>;
```

### JSX Formatting

#### Spacing
- Don't use empty string expressions (`{''}`) to add spacing
- Use CSS margins or padding instead

```jsx
/* ❌ Don't do this */
<div>
  First Item {''} Second Item
</div>

/* ✅ Do this instead */
<div className="space-x-2">
  <span>First Item</span>
  <span>Second Item</span>
</div>
```

#### Event Handlers
- Don't create wrapper functions just to call `preventDefault`
- Use inline prevention or combine with other necessary logic

```jsx
/* ❌ Don't do this */
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(data);
};

/* ✅ Do this instead */
const handleSubmit = (e) => {
  e.preventDefault();
  validateData(data);
  updateState(newState);
  onSubmit(data);
};

// Or if just preventing default
<form onSubmit={(e) => e.preventDefault()}>
```

#### Component Structure
- Maintain proper indentation for all JSX
- Break down complex JSX into multiple lines for readability
- Don't write static JSX in a single line without indentation

```jsx
/* ❌ Don't do this */
const Header = () => <div><h1>Welcome</h1><nav><ul><li>Home</li><li>About</li></ul></nav></div>;

/* ✅ Do this instead */
const Header = () => (
  <div>
    <h1>Welcome</h1>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </nav>
  </div>
);
```

## Pull Request Process

1. Ensure your code follows all the guidelines above
2. Update documentation if you're adding new features or changing existing ones
3. Add appropriate tests for new functionality
4. Get at least one code review before merging

