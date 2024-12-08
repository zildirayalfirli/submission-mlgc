import { ClientError } from './ClientError.js';

export class InputError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InputError';
    }
}