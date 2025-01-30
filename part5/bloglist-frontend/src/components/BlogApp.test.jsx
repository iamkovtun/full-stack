import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import BlogItem from './BlogItem'


describe('Blog', () => {
    test('renders blog\'s title and author', () => {
        const blog = {
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://www.test.com',
            likes: 1
        }
        
        const mockHandleClickLike = vi.fn()
        const mockHandleClickRemove = vi.fn()
        
        const {container} = render(
            <BlogItem 
                blog={blog} 
                onLike={mockHandleClickLike}
                onRemove={mockHandleClickRemove}
            />
        )
       
        //title visiable
        const span = container.querySelector('.blog-title-author')
        expect(span).toHaveTextContent(`${blog.title}`)
        //author visiable
        expect(span).toHaveTextContent(`${blog.author}`)
        //url not visiable
        expect(span).not.toHaveTextContent(`${blog.url}`)
        //likes not visiable
        expect(span).not.toHaveTextContent('likes')
        })
    test('the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
        const user = userEvent.setup()
        const blog = {
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://www.test.com',
            likes: 1
        }

        const mockHandleClickLike = vi.fn()
        const mockHandleClickRemove = vi.fn()
        
        const {container} = render(
            <BlogItem
                blog={blog} 
                onLike={mockHandleClickLike}
                onRemove={mockHandleClickRemove}
            />
        )

        const viewButton = screen.getByRole('button', { name: /view/i })
        await userEvent.click(viewButton)

        const div = container.querySelector('.blog-details')
        expect(div).toHaveTextContent(`${blog.url}`)
        expect(div).toHaveTextContent(`${blog.likes}`)
    })
    test('if the like button is clicked twice, the event handler the component received as props is called twice', async() => {
        const user = userEvent.setup()
        const blog = {
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://www.test.com',
            likes: 1
        }

        const mockHandleClickLike = vi.fn()
        const mockHandleClickRemove = vi.fn()
        
        const {container} = render(
            <BlogItem
                blog={blog} 
                onLike={mockHandleClickLike}
                onRemove={mockHandleClickRemove}
            />
        )

        const viewButton = screen.getByText("view")
        await user.click(viewButton)

        const likeButton = screen.getByRole('button', { name: /like/i })
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandleClickLike.mock.calls).toHaveLength(2)
    })

    test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
        const user = userEvent.setup()

        const newBlog = {
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://www.test.com',
        }
        const mockHandleSubmitBlog = vi.fn()
        const mockShowNotification = vi.fn()  
        
        const {container} = render(
            <BlogForm 
                ShowNotification={mockShowNotification}
                onSubmit={mockHandleSubmitBlog}
            />
        )
        // click new blog button
        const newBlogButton = screen.getByText('new blog')
        await user.click(newBlogButton)
        // fill the form
        // Fill form inputs using more reliable queries
        const titleInput = screen.getByPlaceholderText("your title");
        const authorInput = screen.getByPlaceholderText("name of author");
        const urlInput = screen.getByPlaceholderText("url to source");

        await user.type(titleInput, newBlog.title);
        await user.type(authorInput, newBlog.author);
        await user.type(urlInput, newBlog.url);

        // submit the form
        const createButton = screen.getByText('create')
        await user.click(createButton)
        // check the event handler is called with the right details
        expect(mockHandleSubmitBlog.mock.calls).toHaveLength(1)
        expect(mockHandleSubmitBlog.mock.calls[0][0]).toEqual(newBlog)
})

})