const API_URL = 'http://localhost:5000';

export const addUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
};

export const loginEmail = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/loginEmail/${email}/${password}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const loginUsername = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/loginUsername/${username}/${password}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};
export const getQs = async (email) => {
  try {
    const response = await fetch(`${API_URL}/getQs/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};
export const getUser = async (email) => {
  try {
    const response = await fetch(`${API_URL}/getUserObj/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const addComment = async (movieId, email, username, content) => {
  //console.log(content);
  try {
    const response = await fetch(`${API_URL}/addComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId, email, username, content }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;
  }
};

export const getComments = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}/getComments/${movieId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving comments:', error);
    return null;
  }
};

export const updateUser = async (email, updatedUser) => {
  try {
    const response = await fetch(`${API_URL}/updateUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, updatedUser }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export async function fetchAIRecommendations(text) {
  const url = `${API_URL}/aiRecommend`; 
  const payload = { text };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    return [];
  }
}

export const fetchAiChatResponse = async (query, movieName) => {
  try {
      const res = await fetch(`${API_URL}/aiChat`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, movieName }),
      });

      if (res.ok) {
          const data = await res.json();
          return data.res;
      } else {
          console.error('Error fetching AI response:', res.statusText);
          throw new Error('Error fetching AI response');
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};
