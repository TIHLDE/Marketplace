/* eslint-disable no-var */


export interface PageProps<Params extends Record<string, string> = Record<string, never>> {
    params: Params;
    searchParams: { [key: string]: string | string[] | undefined };
}