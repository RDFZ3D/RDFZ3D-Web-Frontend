interface FieldValidationError {
    loc: string[],
    msg: string,
    type: string,
}

interface CommonErrorDetail {
    code: string,

    [key: string]: any
}


export class ErrorWithStatus extends Error {
    public status: number;
    public detail?: unknown;

    constructor(status: number, detail?: unknown) {
        super(detail?.toString())
        this.status = status;
        this.detail = detail;
    }
}

export class CommonErrorWithStatus extends ErrorWithStatus {
    public override status: Exclude<number, 422>;
    public override detail?: CommonErrorDetail;

    constructor(status: number, detail?: string | CommonErrorDetail) {
        super(status, detail);
        this.status = status;
        if (typeof detail === 'string') {
            this.detail = {code: detail};
        } else {
            this.detail = detail;
        }
    }
}

export class ValidationError extends ErrorWithStatus {
    public override status = 422;
    public override detail: FieldValidationError[];

    constructor(detail: FieldValidationError[]) {
        super(422, detail);
        this.detail = detail;
    }
}


export const raiseError = (status: number, detail?: unknown) => {
    if (status === 422) {
        throw new ValidationError(detail as FieldValidationError[]);
    } else {
        throw new CommonErrorWithStatus(status, detail as CommonErrorDetail);
    }
}
