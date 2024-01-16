

class ValidationError extends Error {
    private errors: Record<string, string | undefined>;

    constructor(errors: Record<string, string | undefined>) {
        super('An validation error occurred');
        this.errors = errors;
    }

    getErrors() {
        return this.errors;
    }
}


export default ValidationError;