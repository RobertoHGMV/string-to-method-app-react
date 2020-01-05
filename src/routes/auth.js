export const isAuthenticated = () => {
    const user_id = localStorage.getItem('user');
  
    return user_id;
}