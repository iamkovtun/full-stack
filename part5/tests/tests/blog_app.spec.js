const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog App', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('frontpage can be opened', async ({ page }) => {
        await expect(page.getByText('Blog App')).toBeVisible()
    });

    test('user can login', async ({ page }) => {      
        await page.getByTestId('username').fill('user');
        await page.getByTestId('password').fill('111');
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('user logged in')).toBeVisible()
    });

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('user');
            await page.getByTestId('password').fill('111');
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a note can be created', async ({ page }) =>  {
            const random = Math.random();
            
            const newBlog = {
                title: `New Blog ${random}`,
                author: "New Author",
                url: "New Url"
            }
            await page.getByRole('button', {name: 'new blog'}).click();
            await page.getByTestId('title').fill(`${newBlog.title}`);
            await page.getByTestId('author').fill(`${newBlog.author}`);
            await page.getByTestId('url').fill(`${newBlog.url}`);
            await page.getByRole('button', {name: 'create'}).click();
            const blogDiv = page.locator('.blog-list')
            blogDiv.getByText(`${newBlog.title} ${newBlog.author}`).waitFor()
            await expect(blogDiv.getByText(`${newBlog.title} ${newBlog.author}`)).toBeVisible();


            


        })


    })
})


