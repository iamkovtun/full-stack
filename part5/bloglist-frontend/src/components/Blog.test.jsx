import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('Blog', () => {
    test('renders blog\'s title and author', () => {
        const blog = {
            title: 'Test Blog Title',
            author: 'Test Author',
            url: 'http://www.test.com',
        }
        
        const mockHandleClickLike = vi.fn()
        const mockHandleClickRemove = vi.fn()
        
        render(
            <Blog 
                blog={blog} 
                handleClickLike={mockHandleClickLike}
                handleClickRemove={mockHandleClickRemove}
            />
        )
       
        const element = screen.getByTestId('blog-title_author')
        expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
        console.log('1')
        expect(screen.queryByText(blog.url)).toBeNull()
        console.log('2')

        
        
    })
})