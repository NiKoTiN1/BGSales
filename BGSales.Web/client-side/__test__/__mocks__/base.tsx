jest.mock('react-router-dom', () => ({
	useLocation: jest.fn().mockReturnValue({
		pathname: '/another-route',
		search: '',
		hash: '',
		state: null,
		key: '5nvxpbdafa',
	}),
	useHistory: jest.fn().mockReturnValue({
		
	}),
}));
window.open = jest.fn();