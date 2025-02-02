import { chatAppAuth, chatAppNoAuth } from "./index";

// // Auth requests
export const login = async (credentials) => {
  const response = await chatAppNoAuth.post("/login", credentials);
  return response.data; // Return user data and token
};

export const fetchCurrent = async () => {
  const response = await chatAppAuth.get("/current/user");
  return response.data; // Return user data and token
};

export const register = async (userData) => {
  const response = await chatAppNoAuth.post("/register", userData);
  return response.data; // Return user data and token
};

// // Post requests
export const createPost = async (postContent) => {
  const response = await chatAppAuth.post("/posts", postContent);
  return response.data; // Return created post data
};

// // Comment requests
export const replyToPost = async (postId, formData) => {
  const response = await chatAppAuth.post(
    `/posts/${postId}/comments`,
    formData
  );
  return response.data; // Return created reply data
};

export const replyToComment = async (commentId, replyContent) => {
  const response = await chatAppAuth.post(
    `/comments/${commentId}/reply`,
    replyContent
  );
  return response.data; // Return created reply data
};

export const replyToReply = async (replyId, formData) => {
  const response = await chatAppAuth.post(
    `/replies/${replyId}/reply`,
    formData
  );
  return response.data; // Return created reply data
};

export const fetchAllUsers = async () => {
  const response = await chatAppAuth.get("/users"); // Replace with your actual API endpoint
  return response.data; // Return user data
};

// // Function to follow a user
export const userFollow = async (userId) => {
  const response = await chatAppAuth.post(`/follow/${userId}`);
  return response.data; // Return the updated user data or a success message
};

export const getFeeds = async (pageNum) => {
  const response = await chatAppAuth.get(`/feeds?page=${pageNum}`);
  return response.data; // Return the updated user data or a success message
};

export const getTrends = async () => {
  const response = await chatAppAuth.get("/trends");
  return response.data; // Return the updated user data or a success message
};

export const passAlongPost = async (postId) => {
  const response = await chatAppAuth.post(`/posts/${postId}/share`);
  return response.data; // Return created reply data
};

export const quotePost = async (postId, formData) => {
  const response = await chatAppAuth.post(`/posts/${postId}/quote`, formData);
  return response.data; // Return created reply data
};

export const likePost = async (postId) => {
  const response = await chatAppAuth.post(`/posts/${postId}/like`);
  return response.data; // Return created reply data
};
export const bookMarkPost = async (postId) => {
  const response = await chatAppAuth.post(`/posts/${postId}/bookmark`);
  return response.data; // Return created reply data
};

export const getSuggestedUsers = () => {
  const response = chatAppAuth.get(`/suggestion`); // Adjust the endpoint to match your backend route
  return response; // Return created reply data
};

export const getUserNotifications = () => {
  const response = chatAppAuth.get(`/notifications`); // Adjust the endpoint to match your backend route
  // console.log(response);
  return response; // Return created reply data
};

// // Post requests
export const getPostById = async (postId) => {
  const response = await chatAppAuth.get(`/posts/${postId}`);
  return response.data; // Return created reply data
};

export const getUserSuggestions = async (query) => {
  const response = await chatAppAuth.get(`/users/suggest?q=${query}`);
  return response.data; // Return created reply data
};

export const readNotification = async (id) => {
  const response = await chatAppAuth.get(`/notification/${id}/read`);
  return response.data; // Return created reply data
};

export const getUserById = async (id) => {
  const response = await chatAppAuth.get(`/u/${id}`);
  return response.data; // Return created reply data
};

export const conversationExists = async (id) => {
  const response = await chatAppAuth.get(`/c/${id}`);
  return response.data; // Return created reply data
};

export const getUserConnections = async (id) => {
  const response = await chatAppAuth.get(`/u/${id}/c`);
  return response.data; // Return
};

export const globalSearch = async (query) => {
  const response = await chatAppAuth.get(`/search?query=${query}`);
  return response.data; // Return
};

export const getMutualFollow = async () => {
  const response = await chatAppAuth.get(`/mutual`);
  return response.data; // Return
};

export const createGroupConversation = async (data) => {
  const response = await chatAppAuth.post(`/group`, data);
  return response.data; // Re
};

export const getUserConversation = async () => {
  const response = await chatAppAuth.get(`/user/conversation`);
  return response.data;
};

export const getUserConversationMessages = async (id) => {
  const response = await chatAppAuth.get(`/conversations/${id}/messages`);
  return response.data;
};

export const getConversation = async (id) => {
  const response = await chatAppAuth.get(`/conversations/${id}`);
  return response.data;
};

export const sendTextMessage = async (data) => {
  const response = await chatAppAuth.post(`/send`, data);
  return response.data;
};

export const getNonparticipants = async (id) => {
  const response = await chatAppAuth.get(`/participants?conversationId=${id}`);
  return response.data;
};

export const addToGroup = async (data) => {
  const response = await chatAppAuth.put(`/add`, data);
  return response.data;
};

export const createStory = async (data) => {
  const response = await chatAppAuth.post(`/story`, data);
  return response.data;
};

export const userStory = async () => {
  const response = await chatAppAuth.get(`/stories`);
  return response.data;
};

export const viewStory = async (id) => {
  const response = await chatAppAuth.post(`/story/${id}/view`);
  return response.data;
};

export const getMe = async () => {
  const response = await chatAppAuth.get(`/me`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await chatAppAuth.put(`/me`, data);
  return response.data;
};

export const createPoll = async (data) => {
  const response = await chatAppAuth.post(`/poll/create`, data);
  return response.data;
};

export const votePoll = async (data) => {
  const response = await chatAppAuth.post(`/poll/vote`, data);
  return response.data;
};

export const schedulePost = async (data) => {
  const response = await chatAppAuth.post(`/schedule/post`, data);
  return response.data;
};

export const fetchUserActivity = async (tag, userId) => {
  const response = await chatAppAuth.get(`/activity/${userId}?tag=${tag}`);
  return response.data;
};

export const fetchUserInfo = async (tag) => {
  const response = await chatAppAuth.get(`/activity?tag=${tag}`);
  return response.data;
};

export const createFolder = async (data) => {
  const response = await chatAppAuth.post(`/folder/create`, data);
  return response.data;
};

export const getUserBookmark = async () => {
  const response = await chatAppAuth.get(`/bookmarks`);
  return response.data;
};

export const addBookmarkToFolder = async (data) => {
  const response = await chatAppAuth.post(`/folder/bookmark`, data);
  return response.data;
};

export const getFolderById = async (data) => {
  const response = await chatAppAuth.get(`/folder/${data}`);
  return response.data;
};

export const removeFromFolder = async (data) => {
  const response = await chatAppAuth.delete(`/folder/bookmark/${data}`);
  return response.data;
};

export const deleteFolder = async (data) => {
  const response = await chatAppAuth.delete(`/folder/${data}`);
  return response.data;
};

export const updateFolder = async (data) => {
  const response = await chatAppAuth.put(`/folder/${data.id}`, data);
  return response.data;
};

export const deletePost = async (data) => {
  const response = await chatAppAuth.delete(`/post/${data}`);
  return response.data;
};

export const updatePost = async (data) => {
  const response = await chatAppAuth.put(`/post/${data.id}`, data);
  return response.data;
};

export const createFutureAccount = async (data) => {
  const response = await chatAppAuth.post(`/create/future`, data);
  return response.data;
};

export const getUserSignal = async () => {
  const response = await chatAppAuth.get(`/user/signal`);
  return response.data;
};

export const getSignal = async () => {
  const response = await chatAppAuth.get(`/signal`);
  return response.data;
};

export const getAllSignal = async () => {
  const response = await chatAppAuth.get(`/all/signal`);
  return response.data;
};

export const getSignalById = async (id) => {
  const response = await chatAppAuth.get(`/signal/${id}`);
  return response.data;
};

export const updateSignalById = async (id, received) => {
  const response = await chatAppAuth.put(`/signal/${id}`, { received });
  return response.data;
};

export const fecthDailySignal = async () => {
  const response = await chatAppAuth.get(`/signal/daily`);
  return response.data;
};

// Create a new folder
export const createFolderList = async (folderName) => {
  const response = await chatAppAuth.post("/folder", {
    name: folderName,
  });
  return response.data;
};

// Get all folders
export const getAllFoldersList = async () => {
  const response = await chatAppAuth.get("/folder");
  return response.data;
};

// Get a specific folder
export const getFolder = async (folderId) => {
  const response = await chatAppAuth.get(`/${folderId}`);
  return response.data;
};

// Add item to folder
export const addItemToFolderList = async (folderId, itemData) => {
  const response = await chatAppAuth.post(`/folder/${folderId}/items`, {
    name: itemData.name,
    date: itemData.date,
    price: itemData.price,
    currency: itemData.currency,
  });
  return response.data;
};

// Update item in folder
export const updateItem = async (folderId, itemId, itemData) => {
  const response = await chatAppAuth.put(
    `/${folderId}/items/${itemId}`,
    itemData
  );
  return response.data;
};

// Delete item from folder
export const deleteItem = async (folderId, itemId) => {
  const response = await chatAppAuth.delete(`/${folderId}/items/${itemId}`);
  return response.data;
};

// Delete folder
export const deleteFolderList = async (folderId) => {
  const response = await chatAppAuth.delete(`/${folderId}`);
  return response.data;
};

// Get folder statistics
export const getFolderStats = async (folderId) => {
  const response = await chatAppAuth.get(`/${folderId}/stats`);
  return response.data;
};

// Search folders
export const searchFolders = async (searchQuery) => {
  const response = await chatAppAuth.get(`/search/${searchQuery}`);
  return response.data;
};
