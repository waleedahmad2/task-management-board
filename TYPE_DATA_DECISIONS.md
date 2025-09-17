# Type & Data Decisions

## Core Data Models

### Task Management
- **Task Entity**: Central entity with `id`, `title`, `description`, `priority`, `status`, `dueDate`, `assignee`, `projectId`, and `order`
- **TaskStatus**: Union type `'backlog' | 'in-progress' | 'review' | 'done'` for Kanban columns
- **TaskPriority**: Union type `'low' | 'medium' | 'high' | 'urgent'` for task prioritization
- **Assignee**: Optional nested object with `id`, `name`, `email`, and optional `avatar`

### Project Management
- **Project Entity**: Contains `id`, `name`, `description`, `status`, `owner`, and `members[]`
- **ProjectStatus**: Union type `'active' | 'archived' | 'draft'` for project lifecycle
- **ProjectMember**: User with `id`, `name`, `email`, `avatar?`, and `role`
- **MemberRole**: Union type `'admin' | 'editor' | 'viewer'` for permission levels

### Comments System
- **Comment Entity**: Contains `id`, `content`, `taskId`, `sender`, and timestamps
- **Sender**: Nested object with user identification and optional avatar

## API Architecture

### Response Patterns
- **Paginated Responses**: Standardized structure with `data[]`, `pagination` object containing `page`, `pageSize`, `totalCount`, `totalPages`, `hasNextPage`, `hasPreviousPage`
- **Generic API Client**: Type-safe `performRequest<TResponse, TPayload, TParams>()` function with full TypeScript generics
- **Infinite Query Support**: `InfiniteQueryConfig` for paginated data fetching with React Query

### Real-time Communication
- **WebSocket Events**: Typed event system with `WebSocketMessage` base interface
- **Event Payloads**: Specific payloads for `TaskCreated`, `TaskUpdated`, `TaskMoved`, `TaskDeleted`, `CommentAdded`, `CommentUpdated`
- **Dual Event Systems**: Both `WebSocketEventPayload` and `RealtimeEvent` patterns for different use cases

## Validation & Forms

### Schema-First Approach
- **Zod Integration**: All forms use Zod schemas with `z.infer<>` for type generation
- **Form Data Types**: Separate `TaskFormData`, `CommentFormData`, `UserFormData` types derived from schemas
- **Validation Rules**: Consistent validation patterns (required fields, length limits, email format)

### Type Safety Decisions
- **Strict TypeScript**: All entities use strict typing with no `any` types
- **Optional vs Required**: Strategic use of optional properties (`assignee?`, `avatar?`) vs required fields
- **Union Types**: Extensive use of union types for status enums and role definitions
- **Generic Constraints**: API functions use generic constraints for type safety

## Data Flow Patterns

### State Management
- **React Query**: Centralized data fetching with typed queries and mutations
- **Optimistic Updates**: UI updates immediately with background persistence
- **Error Handling**: Typed error interfaces with `ApiError` structure

### Real-time Updates
- **Event-Driven Architecture**: WebSocket events trigger UI updates
- **Payload Consistency**: WebSocket payloads mirror API response structures
- **Connection Management**: Typed connection status with reconnection logic

## Key Architectural Decisions

1. **Separation of Concerns**: Clear separation between API types, form types, and WebSocket types
2. **Type Inference**: Heavy use of `z.infer<>` to keep validation and types in sync
3. **Generic API Layer**: Reusable API client with full type safety
4. **Consistent Pagination**: Standardized pagination structure across all list endpoints
5. **Real-time Typing**: Comprehensive typing for WebSocket events and handlers
6. **Form Validation**: Schema-first approach with runtime validation and type safety
