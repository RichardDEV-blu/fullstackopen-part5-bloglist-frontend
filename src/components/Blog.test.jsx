import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author, but no url or likes by default', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://example.com',
        likes: 5,
        user: {
            name: 'Richard',
            id: '123'
        }

    }

    const user = {
        name: 'Richard',
        id: '123'
    }

    const likeBlog = vi.fn()
    const deleteBlog = vi.fn()

    render(
        <Blog
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
        />
    )

    expect(screen.getByText('Test Blog Test Author')).toBeVisible()
    expect(screen.queryByText('https://example.com')).not.toBeVisible()
    expect(screen.queryByText('5 likes')).not.toBeVisible()

})


test('renders url and likes when view button is clicked', async () => {
    const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://example.com',
        likes: 5,
        user: {
            name: 'Richard',
            id: '123'
        }
    }

    const user = {
        name: 'Richard',
        id: '123'
    }

    const likeBlog = vi.fn()
    const deleteBlog = vi.fn()

    render(
        <Blog
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
        />
    )

    const userEventSetup = userEvent.setup()
    const viewButton = screen.getByText('view')
    await userEventSetup.click(viewButton)

    expect(screen.getByText('https://example.com')).toBeVisible()
    expect(screen.getByText('5 likes')).toBeVisible()
})
