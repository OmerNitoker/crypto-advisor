import React, { createContext, useState, useEffect } from 'react';
import { userService } from '../services/user.service';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => userService.getLoggedinUser());
  const [loading, setLoading] = useState(false);

  async function login(credentials) {
    setLoading(true)
    try {
      const loggedInUser = await userService.loginUser(credentials)
      setUser(loggedInUser)
      return loggedInUser
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  async function signup(credentials) {
    setLoading(true)
    try {
      const newUser = await userService.signupUser(credentials)
      setUser(newUser)
      return newUser
    } finally {
      setLoading(false)
    }
  }

  async function update(user) {
    if (!user?._id) throw new Error('No logged in user')
    setLoading(true)

    try {
      const updatedUser = await userService.updateUser(user)
      console.log('updatedUser:', updatedUser)
      setUser(updatedUser)
      return updatedUser
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    userService.logoutUser()
    setUser(null)
  }

  function finishOnboarding(updatedUser) {
    setUser(updatedUser);
    userService.setLoggedinUser(updatedUser);
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    update,
    finishOnboarding,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
