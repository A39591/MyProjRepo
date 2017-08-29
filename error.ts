export class Error {
	
    public readonly errNum: number;
    public readonly message: string;

    constructor(num: number, message: string) {
			this.errNum = num;
        this.message = message;
    }
}