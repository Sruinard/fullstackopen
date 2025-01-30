import { title } from "process"

const loginWith = async (username, password, page) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const newBlog = async (title, author, url, page) => {
    await page.getByRole('button', {name: 'new blog'}).click()

    await page.getByTestId('input-title').fill(title)
    await page.getByTestId('input-author').fill(author)
    await page.getByTestId('input-url').fill(url)

    await page.getByRole('button', {name: 'create'}).click()
}

export { loginWith, newBlog }
