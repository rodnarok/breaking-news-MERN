import postRepositories from "../repositories/post.repositories.js";

async function createNewsService({ title, banner, text }, userId) {
  if (!title || !banner || !text)
    throw new Error("Submit all fields for registration");

  const { id } = await postRepositories.createNewsRepository(
    title,
    banner,
    text,
    userId
  );

  return {
    message: "Post created successfully!",
    post: { id, title, banner, text },
  };
}

async function findAllNewsService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const posts = await postRepositories.findAllNewsRepository(offset, limit);

  const total = await postRepositories.countNews();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  posts.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: posts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function topNewsService() {
  const post = await postRepositories.topNewsRepository();

  if (!post) throw new Error("There is no registered post");

  return {
    post: {
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    },
  };
}

async function searchNewsService(title) {
  const foundPosts = await postRepositories.searchNewsRepository(title);

  if (foundPosts.length === 0)
    throw new Error("There are no posts with this title");

  return {
    foundPosts: foundPosts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function findNewsByIdService(id) {
  const post = await postRepositories.findNewsByIdRepository(id);

  if (!post) throw new Error("Post not found");

  return {
    id: post._id,
    title: post.title,
    banner: post.banner,
    text: post.text,
    likes: post.likes,
    comments: post.comments,
    name: post.user.name,
    username: post.user.username,
    avatar: post.user.avatar,
  };
}

async function findNewsByUserIdService(id) {
  const posts = await postRepositories.findNewsByUserIdRepository(id);

  return {
    postsByUser: posts.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function updateNewsService(id, title, banner, text, userId) {
  if (!title && !banner && !text)
    throw new Error("Submit at least one field to update the post");

  const post = await postRepositories.findNewsByIdRepository(id);

  if (!post) throw new Error("Post not found");

  if (post.user._id != userId) throw new Error("You didn't create this post");

  await postRepositories.updateNewsRepository(id, title, banner, text);
}

async function deleteNewsService(id, userId) {
  const post = await postRepositories.findNewsByIdRepository(id);

  if (!post) throw new Error("Post not found");

  if (post.user._id != userId) throw new Error("You didn't create this post");

  await postRepositories.deleteNewsRepository(id);
}

async function likeNewsService(id, userId) {
  const postLiked = await postService.likesService(id, userId);

  if (postLiked.lastErrorObject.n === 0) {
    await postService.likesDeleteService(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentNewsService(postId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const post = await postRepositories.findPostByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await postRepositories.commentsRepository(postId, message, userId);
}

async function commentDeleteNewsService(postId, userId, idComment) {
  const post = await postRepositories.findNewsByIdRepository(postId);

  if (!post) throw new Error("Post not found");

  await postRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  createNewsService,
  findAllNewsService,
  topNewsService,
  searchNewsService,
  findNewsByIdService,
  findNewsByUserIdService,
  updateNewsService,
  deleteNewsService,
  likeNewsService,
  commentNewsService,
  commentDeleteNewsService,
};
