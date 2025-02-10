import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("renders base blog content", () => {
  const title = "vite testing fullstackopen";
  const blog = {
    title: title,
    author: "stef",
    url: "my-web.com",
  };

  render(<Blog blog={blog} />);

  let elem = screen.getByText(title, { exact: false });
  expect(elem).toBeDefined();
  screen.debug(elem);

  elem = screen.queryByText("likes");
  screen.debug(elem);
  expect(elem).toBeNull();
});

test("renders url and likes on click", () => {
  const user = userEvent.setup();

  const title = "vite testing fullstackopen";
  const blog = {
    title: title,
    author: "stef",
    url: "my-web.com",
  };
  render(<Blog blog={blog} />);

  let elem = screen.queryByText("likes");
  expect(elem).toBeNull();

  const viewButton = screen.getByText("view");
  user.click(viewButton);

  elem = screen.queryByText("likes");
  expect(elem).toBeNull();
});
test("test double like", async () => {
  const mockHandler = vi.fn();

  const title = "vite testing fullstackopen";
  const blog = {
    id: 123,
    title: title,
    author: "stef",
    url: "my-web.com",
    likes: 0,
    user: {
      id: 456,
    },
  };

  render(<Blog blog={blog} updateBlog={mockHandler} />);

  // expend to make like button 'visible'
  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
test("test new blog creation", async () => {
  const mockHandler = vi.fn();
  const title = "vite testing fullstackopen";
  const blogUser = { id: 456 };
  const blog = {
    id: 123,
    title: title,
    author: "stef",
    url: "my-web.com",
    likes: 0,
    user: blogUser,
  };

  const { container } = render(
    <BlogForm addBlogFromBlogObject={mockHandler} user={blogUser} />,
  );

  // expend to make like button 'visible'
  const user = userEvent.setup();
  const titleInput = container.querySelector("#blog-title-input");
  const authorInput = container.querySelector("#blog-author-input");
  const urlInput = container.querySelector("#blog-url-input");

  await userEvent.type(titleInput, "my blog");
  await userEvent.type(authorInput, "sruinard");
  await userEvent.type(urlInput, "my-web.com");

  const createButton = screen.getByText("create");
  await user.click(createButton);

  const expectedObject = {
    title: "my blog",
    author: "sruinard",
    url: "my-web.com",
    likes: 0,
    user: 456,
  };
  expect(mockHandler.mock.calls[0][0]).toEqual(expectedObject);
});
