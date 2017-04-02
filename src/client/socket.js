import * as io from 'socket.io-client';

const socket = (typeof window !== 'undefined') ? io() : null;

export default socket;
