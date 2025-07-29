import { useMemo } from 'react';

import { useHomeData } from '#/data';

/**
 * useHome — Generic business logic hook
 *
 * This hook encapsulates reusable business logic for fetching and transforming user data
 * AND for preparing payloads, validating and other business rules for GET, POST, PUT, DELETE operations.
 *
 * Intended to be used in scalable React apps:
 * - Fetching logic: `data/home.js`
 * - Business rules (filtering, validation, Input functions): `hooks/useHome.js`
 * - UI rendering only: `Home.jsx`
 *
 * @returns {{
 *   users: Object[],
 *   isLoading: boolean,
 *   handleCreate: () => void,
 *   isPosting: boolean,
 * }}
 */

export const useHome = () => {
  const { usersData, isUsersLoading, createPost, isPosting } = useHomeData();

  // Example: filter only users from "Robel-Corkery"
  const filteredUsers = useMemo(() => {
    return (!isUsersLoading && Object.values(usersData).filter(user => user?.company?.name === 'Johns Group')) || [];
  }, [usersData]);

  /**
   * Business logic before creating a user.
   * - This is where you can add validations, transform payloads, etc.
   */
  const handleCreate = () => {
    // 👇 Dummy logic: payload with static title/body, later can use dynamic form
    const newUserPayload = {
      title: 'Dummy Title',
      body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    };

    // Example validation can be added here before mutation
    if (!newUserPayload.title || !newUserPayload.body) {
      console.warn('Invalid payload!');
      return;
    }

    createPost({ payload: newUserPayload });
  };

  return {
    users: filteredUsers,
    isLoading: isUsersLoading,
    handleCreate,
    isPosting,
  };
};
