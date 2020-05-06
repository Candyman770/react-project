import axios from 'axios';

const instance=axios.create({
	baseURL:'https://react-my-burger-aa110.firebaseio.com/'
});

export default instance;