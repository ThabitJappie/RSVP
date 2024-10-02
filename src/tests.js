import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';

test('renders event list', () => {
    render(<EventList />);
    const linkElement = screen.getByText(/Upcoming Events/i);
    expect(linkElement).toBeInTheDocument();
});
