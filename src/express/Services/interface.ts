/* v8 ignore start */
export interface Service {
    name: string;
    status: boolean;
}

export interface ServiceDocument extends Service {
    _id: string;
}
