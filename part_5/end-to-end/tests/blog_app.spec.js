const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, newBlog } = require('./helpers')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(page.getByText('blogs')).toBeVisible()
})


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Stef Ruinard',
        username: 'sruinard',
        password: 'sekret'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'test-user',
        username: 'test-user',
        password: 'test-user-sekret'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Check if title is show
    await expect(page.getByText('login to application')).toBeVisible()
    // Check Inputs
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })
  test('succeeds with correct credentials', async ({ page }) => {
    await loginWith('sruinard', 'sekret', page)
    await expect(page.getByText('Stef Ruinard logged-in')).toBeVisible()
  })

  test('fails with correct credentials', async ({ page }) => {
    await loginWith('sruinard', 'this-is-no-sekret', page)
    await expect(page.getByText('Stef Ruinard logged-in')).not.toBeVisible()
  })

  describe('when logged in', async () => {
    beforeEach(async ({ page }) => {
      await loginWith('sruinard', 'sekret', page)
    })
    test('user can create blog', async ({ page }) => {
      await newBlog('my new blog', 'stef', 'my-url', page)
      await expect(page.getByText('my new blog')).toBeVisible()
    })

    describe('with blog created', async () => {
      beforeEach(async ({ page }) => {
        await newBlog('my new blog', 'stef', 'my-url', page)
      })

      test('user can like blog', async ({page}) => {

        await page.getByRole('button', {name: "view"}).click()

        await expect(page.getByText('my-url likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('my-url likes: 0')).not.toBeVisible()
        await expect(page.getByText('my-url likes: 1')).toBeVisible()
      })

      test('Can delete own blog', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())
        const blogToDelete = page.getByText('my new blog')
        // Expand blog detail
        await page.getByRole('button', {name:'view'}).click()
        // Validate button delete
        await expect(page.getByRole('button',{name:'remove'})).toBeVisible()
        // remove
        await page.getByRole('button',{name:'remove'}).click()
        
        await expect(blogToDelete).toHaveCount(0)
      })

      test('Cannot delete blog of other user', async ({ page }) => {
        // logout
        await page.getByRole('button',{name:'logout'}).click()
        await loginWith('test-user', 'test-user-sekret', page)
        // Expand blogs details
        await page.getByRole('button', {name:'view'}).click()
        // Validate that not exist button delete
        await expect(page.getByRole('button',{name:'remove'})).toHaveCount(0)
      })

      test('blogs are sorted by likes', async ({page}) => {
        await newBlog('my second blog', 'stef', 'my-url', page)
        await newBlog('my third blog', 'stef', 'my-url', page)
        const blogsLocator = await page.getByTestId('blogs').locator('div')

        const thirdBlog = await blogsLocator.filter({ hasText: 'my third blog stef view' })
        await thirdBlog.getByRole('button', {name: 'view'}).click()

        await page.getByRole('button', {name: 'like'}).click()
        await page.getByRole('button', {name: 'like'}).click()

        const blogEntries = await blogsLocator.all()
        // Now check if 'my third blog' is the first element (most liked)
        const mostLikedBlog = blogEntries[0].getByText('my third blog'); // Access the element from the sorted array
        await expect(mostLikedBlog).toBeVisible();

      })


    })




  })

})